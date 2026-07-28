import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Dithering } from '@paper-design/shaders-react';
import type { DitheringShape } from '@paper-design/shaders';
import type { ShaderKey } from '../data/site';
import './Atmosphere.css';

type Preset = {
  colorFront: string;
  shape: DitheringShape;
  speed: number;
  scale: number;
  rotation: number;
};

const presets: Record<ShaderKey, Preset> = {
  idle: {
    colorFront: '#8a8078',
    shape: 'simplex',
    speed: 0.28,
    scale: 0.95,
    rotation: -8,
  },
  auscult: {
    colorFront: '#5c6b5a',
    shape: 'ripple',
    speed: 0.18,
    scale: 0.9,
    rotation: 0,
  },
  candis: {
    colorFront: '#7a4e3a',
    shape: 'dots',
    speed: 0.3,
    scale: 1.1,
    rotation: 10,
  },
  musetalk: {
    colorFront: '#4a5a6b',
    shape: 'wave',
    speed: 0.4,
    scale: 0.88,
    rotation: -6,
  },
  tracelink: {
    colorFront: '#6b4f3a',
    shape: 'sphere',
    speed: 0.22,
    scale: 1.02,
    rotation: 4,
  },
  sar: {
    colorFront: '#5a5e4a',
    shape: 'swirl',
    speed: 0.26,
    scale: 1,
    rotation: -12,
  },
  other: {
    colorFront: '#6a5a4a',
    shape: 'warp',
    speed: 0.24,
    scale: 0.92,
    rotation: 6,
  },
};

const COLOR_BACK_LIGHT = '#f3f1ec';
const COLOR_BACK_DARK = '#141a28';

/** Brighter fronts so the dither reads on the navy ground */
const darkFronts: Record<ShaderKey, string> = {
  idle: '#c4b8a8',
  auscult: '#8ec4a4',
  candis: '#e8a070',
  musetalk: '#9ab0d4',
  tracelink: '#d4b08a',
  sar: '#b0bc88',
  other: '#c9b090',
};

function canUseWebGl() {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  context?.getExtension('WEBGL_lose_context')?.loseContext();
  return context !== null;
}

function resolveMaxPixels() {
  const gecko = CSS.supports('-moz-appearance', 'none');
  return gecko ? 420_000 : 720_000;
}

function isDarkTheme() {
  return typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
}

function readThemeBack() {
  if (typeof document === 'undefined') return COLOR_BACK_LIGHT;
  return isDarkTheme() ? COLOR_BACK_DARK : COLOR_BACK_LIGHT;
}

function frontFor(key: ShaderKey, dark: boolean) {
  return dark ? darkFronts[key] : presets[key].colorFront;
}

export function Atmosphere() {
  const [enabled, setEnabled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [variant, setVariant] = useState<ShaderKey>('idle');
  const [paused, setPaused] = useState(false);
  const [dark, setDark] = useState(false);
  const [ink, setInk] = useState(presets.idle.colorFront);
  const [maxPixels, setMaxPixels] = useState(720_000);
  const [colorBack, setColorBack] = useState(COLOR_BACK_LIGHT);
  const softTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<ShaderKey>('idle');

  useEffect(() => {
    setMaxPixels(resolveMaxPixels());
    const initialDark = isDarkTheme();
    setDark(initialDark);
    setColorBack(readThemeBack());
    setInk(frontFor('idle', initialDark));

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setReduceMotion(motion.matches);
      setEnabled(canUseWebGl() && !motion.matches);
    };
    updateMotion();
    motion.addEventListener('change', updateMotion);

    const onTheme = () => {
      const nextDark = isDarkTheme();
      setDark(nextDark);
      setColorBack(readThemeBack());
      setInk(frontFor(variantRef.current, nextDark));
    };
    window.addEventListener('themechange', onTheme);

    const applyVariant = (key: ShaderKey) => {
      variantRef.current = key;
      setVariant(key);
      setInk(frontFor(key, isDarkTheme()));
      const root = rootRef.current;
      if (!root || motion.matches) return;
      root.classList.add('is-shifting');
      if (softTimer.current) window.clearTimeout(softTimer.current);
      softTimer.current = window.setTimeout(() => {
        root.classList.remove('is-shifting');
      }, 520);
    };

    const onEnter = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const host = target?.closest?.('[data-shader]') as HTMLElement | null;
      const key = (host?.dataset.shader as ShaderKey | undefined) ?? 'idle';
      applyVariant(key);
    };

    const onLeaveWork = () => applyVariant('idle');

    const work = document.getElementById('work');
    work?.addEventListener('pointerover', onEnter, { passive: true });
    work?.addEventListener('focusin', onEnter);
    work?.addEventListener('pointerleave', onLeaveWork);
    const onFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && work?.contains(next)) return;
      applyVariant('idle');
    };
    work?.addEventListener('focusout', onFocusOut);

    const syncScrollPause = () => {
      setPaused(document.documentElement.hasAttribute('data-scrolling'));
    };
    const scrollObserver = new MutationObserver(syncScrollPause);
    scrollObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-scrolling'],
    });
    syncScrollPause();

    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      motion.removeEventListener('change', updateMotion);
      window.removeEventListener('themechange', onTheme);
      work?.removeEventListener('pointerover', onEnter);
      work?.removeEventListener('focusin', onEnter);
      work?.removeEventListener('pointerleave', onLeaveWork);
      work?.removeEventListener('focusout', onFocusOut);
      scrollObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (softTimer.current) window.clearTimeout(softTimer.current);
    };
  }, []);

  const preset = presets[variant];
  const colorFront = frontFor(variant, dark);
  const fallbackStyle = { '--ink': ink } as CSSProperties;
  const showShader = enabled && !reduceMotion;

  return (
    <div className="atmosphere" data-atmosphere aria-hidden="true" ref={rootRef}>
      <div className="atmosphere__fallback" style={fallbackStyle} />
      {showShader ? (
        <div className="atmosphere__shader">
          <Dithering
            colorBack={colorBack}
            colorFront={colorFront}
            shape={preset.shape}
            speed={paused ? 0 : preset.speed}
            scale={preset.scale}
            rotation={preset.rotation}
            minPixelRatio={1}
            maxPixelCount={maxPixels}
            webGlContextAttributes={{
              antialias: false,
              powerPreference: 'low-power',
              alpha: false,
              depth: false,
              stencil: false,
              desynchronized: true,
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ) : null}
      <div className="atmosphere__veil" />
    </div>
  );
}
