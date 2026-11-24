/**
 * Pointer-driven spring for the homepage name.
 *
 * Ruchir rises in on load. Kalokhe waits behind it, and the first hover
 * pulls Kalokhe toward the pointer inside an elastic radius. When the
 * pointer stops or leaves, Kalokhe springs onto the line after Ruchir
 * and stays there.
 */

type Spring = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  skew: number;
  vskew: number;
};

type LetterSpring = {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vrot: number;
  skew: number;
  vskew: number;
  sx: number;
  sy: number;
  vsx: number;
  vsy: number;
};

type Tone = {
  k: number;
  d: number;
};

const RISE: Tone = { k: 78, d: 10.8 };
const FOLLOW: Tone = { k: 58, d: 14.6 };
const SETTLE: Tone = { k: 132, d: 12.6 };
const TOUCH: Tone = { k: 88, d: 14.2 };
const LETTER: Tone = { k: 210, d: 27 };

const RISE_EM = 1.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function makeSpring(partial: Partial<Spring> = {}): Spring {
  return {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    skew: 0,
    vskew: 0,
    ...partial,
  };
}

function stepScalar(value: number, velocity: number, target: number, dt: number, tone: Tone) {
  const nextVelocity = velocity + ((target - value) * tone.k - velocity * tone.d) * dt;
  return {
    value: value + nextVelocity * dt,
    velocity: nextVelocity,
  };
}

function stepSpring(body: Spring, targetX: number, targetY: number, targetRot: number, targetSkew: number, dt: number, tone: Tone) {
  const x = stepScalar(body.x, body.vx, targetX, dt, tone);
  const y = stepScalar(body.y, body.vy, targetY, dt, tone);
  const rot = stepScalar(body.rot, body.vrot, targetRot, dt, { k: tone.k * 1.15, d: tone.d * 1.05 });
  const skew = stepScalar(body.skew, body.vskew, targetSkew, dt, { k: tone.k * 1.4, d: tone.d });
  body.x = x.value;
  body.vx = x.velocity;
  body.y = y.value;
  body.vy = y.velocity;
  body.rot = rot.value;
  body.vrot = rot.velocity;
  body.skew = skew.value;
  body.vskew = skew.velocity;
}

/** Follow the pointer inside `radius`, then rubber-band. Slope is continuous enough for the spring to hide the seam. */
function elasticPull(dx: number, dy: number, radius: number) {
  const dist = Math.hypot(dx, dy);
  if (dist < 0.001 || radius <= 0) return { x: 0, y: 0 };

  const elasticity = 0.62;
  const follow = 0.86;
  let pulled: number;
  if (dist <= radius) {
    pulled = dist * follow;
  } else {
    const overflow = dist - radius;
    const banded = (elasticity * overflow * radius) / (radius + elasticity * overflow);
    pulled = radius * follow + banded;
  }

  const scale = pulled / dist;
  return { x: dx * scale, y: dy * scale };
}

/** Kalokhe is stuck behind Ruchir at first: it gives a little, slips back, then breaks free toward the pointer. */
function breakFree(time: number) {
  const t = clamp(time / 0.6, 0, 1);
  const smooth = t * t * t * (t * (6 * t - 15) + 10);
  const slip = Math.sin(Math.PI * clamp(time / 0.3, 0, 1)) * 0.09;
  return smooth - slip * (1 - t);
}

function wordTransform(body: Spring) {
  return `translate3d(${body.x.toFixed(2)}px,${body.y.toFixed(2)}px,0) rotate(${body.rot.toFixed(2)}deg) skewX(${body.skew.toFixed(2)}deg)`;
}

function letterTransform(letter: LetterSpring) {
  return `translate3d(${letter.x.toFixed(2)}px,${letter.y.toFixed(2)}px,0) rotate(${letter.rot.toFixed(2)}deg) skewX(${letter.skew.toFixed(2)}deg) scale(${letter.sx.toFixed(3)},${letter.sy.toFixed(3)})`;
}

function paintWord(el: HTMLElement, body: Spring, opacity?: number) {
  el.style.transform = wordTransform(body);
  if (opacity !== undefined) el.style.opacity = opacity.toFixed(3);
}

function clearPaint(el: HTMLElement) {
  el.style.transform = '';
  el.style.opacity = '';
}

function stepLetters(letters: LetterSpring[], body: Spring, dt: number, wobble: number, time: number) {
  const speed = Math.hypot(body.vx, body.vy);
  const stretch = clamp(speed / 1650, 0, 0.2);
  const skew = clamp(-body.vx / 110, -8, 8);
  const count = letters.length;
  const mid = (count - 1) / 2;

  for (let index = 0; index < count; index += 1) {
    const letter = letters[index];
    const lead = index - mid;
    const spread = mid === 0 ? 0 : lead / mid;
    const bob = Math.sin(time * 13.2 + index * 0.8) * wobble * (2.8 + Math.abs(lead) * 0.5);
    const twist = Math.sin(time * 15.4 + index * 0.86) * wobble * 4.8;

    const tx = clamp(body.vx * 0.009 * lead, -12, 12);
    const ty = clamp(body.vy * 0.006 * lead, -10, 10) + bob;
    const trot = clamp(body.vx * 0.012 * spread, -6, 6) + twist;
    const tskew = skew * (0.55 + 0.45 * Math.abs(spread));
    const tsx = 1 + stretch * (0.7 + 0.3 * Math.abs(spread));
    const tsy = 1 - stretch * 0.58;

    const x = stepScalar(letter.x, letter.vx, tx, dt, LETTER);
    const y = stepScalar(letter.y, letter.vy, ty, dt, LETTER);
    const rot = stepScalar(letter.rot, letter.vrot, trot, dt, LETTER);
    const sk = stepScalar(letter.skew, letter.vskew, tskew, dt, LETTER);
    const sx = stepScalar(letter.sx, letter.vsx, tsx, dt, LETTER);
    const sy = stepScalar(letter.sy, letter.vsy, tsy, dt, LETTER);

    letter.x = x.value;
    letter.vx = x.velocity;
    letter.y = y.value;
    letter.vy = y.velocity;
    letter.rot = rot.value;
    letter.vrot = rot.velocity;
    letter.skew = sk.value;
    letter.vskew = sk.velocity;
    letter.sx = sx.value;
    letter.sy = sy.value;
    letter.vsx = sx.velocity;
    letter.vsy = sy.velocity;

    letter.el.style.transform = letterTransform(letter);
  }
}

function bodyCalm(body: Spring, x = 0, y = 0) {
  return (
    Math.hypot(body.x - x, body.y - y) < 0.3 &&
    Math.hypot(body.vx, body.vy) < 8 &&
    Math.abs(body.rot) < 0.15 &&
    Math.abs(body.skew) < 0.15
  );
}

function bindLetters(nodes: HTMLElement[]): LetterSpring[] {
  return nodes.map((el) => ({
    el,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    skew: 0,
    vskew: 0,
    sx: 1,
    sy: 1,
    vsx: 0,
    vsy: 0,
  }));
}

function showSettled(root: HTMLElement, firstMotion: HTMLElement, lastMotion: HTMLElement, letters: HTMLElement[]) {
  document.documentElement.dataset.nameMotion = 'settled';
  document.documentElement.classList.add('name-booted');
  clearPaint(firstMotion);
  clearPaint(lastMotion);
  for (const letter of letters) clearPaint(letter);
  root.style.userSelect = '';
}

export function bootNameIntro() {
  const root = document.querySelector<HTMLElement>('[data-name-intro]');
  const firstWord = root?.querySelector<HTMLElement>('.name-intro__word--first');
  const lastWord = root?.querySelector<HTMLElement>('.name-intro__word--last');
  const firstMotion = firstWord?.querySelector<HTMLElement>('.name-intro__motion');
  const lastMotion = lastWord?.querySelector<HTMLElement>('.name-intro__motion');
  if (!root || !firstWord || !lastWord || !firstMotion || !lastMotion) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const settleNow = () => {
    showSettled(root, firstMotion, lastMotion, [
      ...root.querySelectorAll<HTMLElement>('.name-intro__letter'),
    ]);
  };

  if (reduce.matches) {
    settleNow();
    return;
  }

  const mode = finePointer.matches ? 'drag' : 'touch';
  document.documentElement.dataset.nameMotion = mode;

  const firstLetters = bindLetters([...firstMotion.querySelectorAll<HTMLElement>('.name-intro__letter')]);
  const lastLetters = bindLetters([...lastMotion.querySelectorAll<HTMLElement>('.name-intro__letter')]);

  for (const letter of firstLetters) {
    letter.sx = 0.92;
    letter.sy = 1.12;
    letter.rot = -3.5;
  }

  const ruchir = makeSpring();
  const kalokhe = makeSpring();
  let parkX = 0;
  let parkY = 0;
  let radius = 260;
  let fontSize = 48;
  let phase: 'hidden' | 'pull' | 'settle' | 'done' = 'hidden';
  let tone: Tone = mode === 'touch' ? TOUCH : SETTLE;
  let ruchirWobble = 0.55;
  let kalokheWobble = 0;
  let ruchirLive = true;
  let loop = 0;
  let lastTime = 0;
  let clock = 0;
  let pullTime = 0;
  let stillFor = 0;
  let touchGate = true;
  let aimX = 0;
  let aimY = 0;
  const pointer = { x: 0, y: 0 };
  const lastMove = { x: 0, y: 0 };
  let prevRuchirVy = 0;

  const measure = () => {
    fontSize = parseFloat(getComputedStyle(root).fontSize) || 48;
    const ruchirCenter = firstWord.offsetLeft + firstMotion.offsetLeft + firstMotion.offsetWidth / 2;
    const ruchirMiddle = firstWord.offsetTop + firstMotion.offsetTop + firstMotion.offsetHeight / 2;
    const kalokheCenter = lastWord.offsetLeft + lastMotion.offsetLeft + lastMotion.offsetWidth / 2;
    const kalokheMiddle = lastWord.offsetTop + lastMotion.offsetTop + lastMotion.offsetHeight / 2;
    parkX = ruchirCenter - kalokheCenter;
    parkY = ruchirMiddle - kalokheMiddle;
    radius = clamp(fontSize * 5.1, 210, 380);
  };

  const restCenter = () => {
    const box = root.getBoundingClientRect();
    return {
      x: box.left + lastWord.offsetLeft + lastMotion.offsetLeft + lastMotion.offsetWidth / 2,
      y: box.top + lastWord.offsetTop + lastMotion.offsetTop + lastMotion.offsetHeight / 2,
    };
  };

  /** Hovering Ruchir, or the empty spot where Kalokhe will rest, starts the pull. */
  const overName = (x: number, y: number) => {
    const box = root.getBoundingClientRect();
    const pad = fontSize * 0.3;
    const left = box.left + firstWord.offsetLeft - pad;
    const right = box.left + lastWord.offsetLeft + lastMotion.offsetWidth + pad;
    const top = box.top + firstWord.offsetTop - pad;
    const bottom = box.top + firstWord.offsetTop + firstWord.offsetHeight + pad;
    return x >= left && x <= right && y >= top && y <= bottom;
  };

  const fade = () => {
    const traveled = Math.hypot(kalokhe.x - parkX, kalokhe.y - parkY);
    const edge = Math.max(34, fontSize * 0.48);
    const t = clamp(traveled / edge, 0, 1);
    return t * t * (3 - 2 * t);
  };

  const riseOpacity = () => {
    const t = clamp(1 - ruchir.y / (fontSize * RISE_EM * 0.8), 0, 1);
    return t * t * (3 - 2 * t);
  };

  const ensureLoop = () => {
    if (loop) return;
    lastTime = performance.now();
    loop = requestAnimationFrame(tick);
  };

  const disarm = () => {
    document.documentElement.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('blur', onLeave);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointermove', onWatch);
  };

  const release = () => {
    if (phase !== 'pull') return;
    phase = 'settle';
    tone = SETTLE;
    const speed = Math.hypot(kalokhe.vx, kalokhe.vy);
    kalokheWobble = Math.min(1, 0.7 + speed / 1400);
    disarm();
    ensureLoop();
  };

  function onMove(event: PointerEvent) {
    if (phase !== 'pull') return;
    const dx = event.clientX - lastMove.x;
    const dy = event.clientY - lastMove.y;
    if (dx * dx + dy * dy > 1) {
      stillFor = 0;
      lastMove.x = event.clientX;
      lastMove.y = event.clientY;
    }
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }

  function onLeave() {
    release();
  }

  function onEnter(event: PointerEvent) {
    if (phase !== 'hidden') return;
    phase = 'pull';
    tone = FOLLOW;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    lastMove.x = event.clientX;
    lastMove.y = event.clientY;
    stillFor = 0;
    pullTime = 0;
    window.removeEventListener('pointermove', onWatch);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    ensureLoop();
  }

  function onWatch(event: PointerEvent) {
    if (phase !== 'hidden') {
      window.removeEventListener('pointermove', onWatch);
      return;
    }
    if (overName(event.clientX, event.clientY)) onEnter(event);
  }

  const finishKalokhe = () => {
    phase = 'done';
    disarm();
    for (const letter of lastLetters) clearPaint(letter.el);
    clearPaint(lastMotion);
    document.documentElement.dataset.nameMotion = 'settled';
  };

  const finishRuchir = () => {
    ruchirLive = false;
    for (const letter of firstLetters) clearPaint(letter.el);
    clearPaint(firstMotion);
  };

  const stop = () => {
    if (loop) cancelAnimationFrame(loop);
    loop = 0;
    disarm();
  };

  const onReduce = () => {
    if (!reduce.matches) return;
    stop();
    settleNow();
  };

  reduce.addEventListener('change', onReduce);

  function integrate(dt: number) {
    clock += dt;
    ruchirWobble *= Math.exp(-3.1 * dt);
    kalokheWobble *= Math.exp(-3.3 * dt);

    if (ruchirLive) {
      const tilt = clamp(-ruchir.vy / 140, -5, 5);
      const lean = clamp(-ruchir.vx / 160, -4, 4);
      stepSpring(ruchir, 0, 0, tilt, lean, dt, RISE);
      if (prevRuchirVy < -20 && ruchir.vy >= 0) ruchirWobble = Math.max(ruchirWobble, 0.62);
      prevRuchirVy = ruchir.vy;
      stepLetters(firstLetters, ruchir, dt, ruchirWobble, clock);
    }

    const ruchirLanded = Math.abs(ruchir.y) < 2.5 && Math.abs(ruchir.vy) < 70 && clock > 0.32;
    if (mode === 'touch' && phase === 'hidden' && touchGate && (ruchirLanded || clock > 1.15)) {
      touchGate = false;
      phase = 'settle';
      tone = TOUCH;
      kalokheWobble = 0.4;
    }

    if (phase === 'pull') {
      pullTime += dt;
      stillFor += dt;
      const tilt = clamp(-kalokhe.vx / 92 + (aimY / radius) * -2.4, -8, 8);
      const lean = clamp(-kalokhe.vx / 120, -6, 6);
      stepSpring(kalokhe, aimX, aimY, tilt, lean, dt, FOLLOW);
    } else if (phase === 'settle') {
      const tilt = clamp(-kalokhe.vy / 160, -3.5, 3.5);
      const lean = clamp(-kalokhe.vx / 150, -3.5, 3.5);
      stepSpring(kalokhe, 0, 0, tilt, lean, dt, tone);
      if (Math.hypot(kalokhe.x, kalokhe.y) < 0.08 && Math.hypot(kalokhe.vx, kalokhe.vy) < 2) {
        kalokhe.x = 0;
        kalokhe.y = 0;
        kalokhe.vx = 0;
        kalokhe.vy = 0;
        kalokhe.rot = 0;
        kalokhe.vrot = 0;
        kalokhe.skew = 0;
        kalokhe.vskew = 0;
      }
    }

    if (phase === 'pull' || phase === 'settle') {
      stepLetters(lastLetters, kalokhe, dt, kalokheWobble, clock + 1.2);
    }
  }

  function render() {
    if (ruchirLive) paintWord(firstMotion!, ruchir, riseOpacity());
    if (phase === 'pull' || phase === 'settle') paintWord(lastMotion!, kalokhe, fade());
  }

  function tick(now: number) {
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    dt = clamp(dt, 0.001, 0.034);

    if (phase === 'pull') {
      const center = restCenter();
      const dx = pointer.x - center.x;
      const dy = pointer.y - center.y;
      const pulled = elasticPull(dx, dy, radius);
      const tug = breakFree(pullTime);
      aimX = parkX + (pulled.x - parkX) * tug;
      aimY = parkY + (pulled.y - parkY) * tug;
      if ((pullTime > 0.75 && stillFor > 0.22) || Math.hypot(dx, dy) > radius * 1.9) release();
    }

    const steps = dt > 0.02 ? 2 : 1;
    const step = dt / steps;
    for (let index = 0; index < steps; index += 1) integrate(step);
    render();

    if (ruchirLive && ((bodyCalm(ruchir) && ruchirWobble < 0.08) || clock > 2.2)) {
      finishRuchir();
    }

    if (phase === 'settle' && bodyCalm(kalokhe) && kalokheWobble < 0.08) {
      finishKalokhe();
    }

    const waitingForHover = mode === 'drag' && phase === 'hidden';
    if ((phase === 'done' || waitingForHover) && !ruchirLive) {
      loop = 0;
      return;
    }

    loop = requestAnimationFrame(tick);
  }

  const boot = () => {
    measure();
    ruchir.y = fontSize * RISE_EM;
    ruchir.rot = -5;
    kalokhe.x = parkX;
    kalokhe.y = parkY;
    paintWord(firstMotion, ruchir, 0);
    paintWord(lastMotion, kalokhe, 0);
    for (const letter of firstLetters) letter.el.style.transform = letterTransform(letter);
    document.documentElement.classList.add('name-booted');

    if (mode === 'drag') {
      window.addEventListener('pointermove', onWatch, { passive: true });
    }

    window.addEventListener('resize', () => {
      const previousParkX = parkX;
      const previousParkY = parkY;
      measure();
      if (phase === 'hidden') {
        kalokhe.x += parkX - previousParkX;
        kalokhe.y += parkY - previousParkY;
        paintWord(lastMotion, kalokhe, 0);
      }
    });

    ensureLoop();
  };

  if (document.fonts?.ready) {
    void document.fonts.ready.then(boot);
  } else {
    boot();
  }
}
