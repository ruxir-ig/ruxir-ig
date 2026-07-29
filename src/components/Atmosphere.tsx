import { useEffect, useRef, useState } from 'react';
import { FlutedGlass, ImageDithering } from '@paper-design/shaders-react';
import type { DitheringType, GlassDistortionShape, GlassGridShape } from '@paper-design/shaders';
import type { ShaderKey } from '../data/site';
import './Atmosphere.css';

const HERO_IMAGE = '/visuals/hero-coast.jpg';

type Mood = {
  hue: string;
  sat: string;
  bright: string;
  contrast: string;
  sepia: string;
};

const moods: Record<ShaderKey, Mood> = {
  idle: { hue: '0deg', sat: '1.05', bright: '1', contrast: '1.04', sepia: '0' },
  assetflow: { hue: '165deg', sat: '0.92', bright: '0.98', contrast: '1.1', sepia: '0.04' },
  auscult: { hue: '95deg', sat: '0.78', bright: '0.96', contrast: '1.08', sepia: '0.12' },
  candis: { hue: '-18deg', sat: '1.25', bright: '1.04', contrast: '1.1', sepia: '0.18' },
  musetalk: { hue: '200deg', sat: '0.9', bright: '0.98', contrast: '1.06', sepia: '0.05' },
  tracelink: { hue: '28deg', sat: '1.15', bright: '1.02', contrast: '1.12', sepia: '0.2' },
  sar: { hue: '55deg', sat: '0.7', bright: '1.05', contrast: '1.18', sepia: '0.08' },
  other: { hue: '-8deg', sat: '1.1', bright: '1', contrast: '1.05', sepia: '0.1' },
};

type DitherPreset = {
  kind: 'dither';
  colorFront: string;
  colorBack: string;
  colorHighlight: string;
  darkFront: string;
  darkBack: string;
  darkHighlight: string;
  type: DitheringType;
  size: number;
  colorSteps: number;
  originalColors: boolean;
  inverted: boolean;
  speed: number;
};

type GlassPreset = {
  kind: 'glass';
  shape: GlassGridShape;
  distortionShape: GlassDistortionShape;
  size: number;
  angle: number;
  distortion: number;
  blur: number;
  shadows: number;
  highlights: number;
  stretch: number;
  grainOverlay: number;
  colorShadow: string;
  colorHighlight: string;
  speed: number;
};

const presets: Record<ShaderKey, DitherPreset | GlassPreset> = {
  idle: {
    kind: 'dither',
    colorFront: '#d8cfc4',
    colorBack: '#1a1e28',
    colorHighlight: '#f3f1ec',
    darkFront: '#c4b8a8',
    darkBack: '#0e121c',
    darkHighlight: '#e8dfd4',
    type: '8x8',
    size: 1.6,
    colorSteps: 5,
    originalColors: true,
    inverted: false,
    speed: 0.12,
  },
  assetflow: {
    kind: 'glass',
    shape: 'pattern',
    distortionShape: 'flat',
    size: 0.44,
    angle: 18,
    distortion: 0.48,
    blur: 0.1,
    shadows: 0.34,
    highlights: 0.2,
    stretch: 0.12,
    grainOverlay: 0.06,
    colorShadow: '#162d35',
    colorHighlight: '#b9e4dc',
    speed: 0.32,
  },
  auscult: {
    kind: 'glass',
    shape: 'wave',
    distortionShape: 'lens',
    size: 0.42,
    angle: 12,
    distortion: 0.55,
    blur: 0.12,
    shadows: 0.35,
    highlights: 0.18,
    stretch: 0.15,
    grainOverlay: 0.08,
    colorShadow: '#2a3a30',
    colorHighlight: '#c8e0d0',
    speed: 0.35,
  },
  candis: {
    kind: 'dither',
    colorFront: '#e8a070',
    colorBack: '#2a1810',
    colorHighlight: '#ffd4a8',
    darkFront: '#f0b080',
    darkBack: '#1a100c',
    darkHighlight: '#ffe0c0',
    type: '4x4',
    size: 2.4,
    colorSteps: 4,
    originalColors: false,
    inverted: false,
    speed: 0.22,
  },
  musetalk: {
    kind: 'glass',
    shape: 'lines',
    distortionShape: 'prism',
    size: 0.55,
    angle: 90,
    distortion: 0.45,
    blur: 0.08,
    shadows: 0.28,
    highlights: 0.22,
    stretch: 0.05,
    grainOverlay: 0.04,
    colorShadow: '#1a2438',
    colorHighlight: '#b8c8e8',
    speed: 0.4,
  },
  tracelink: {
    kind: 'glass',
    shape: 'zigzag',
    distortionShape: 'cascade',
    size: 0.38,
    angle: 8,
    distortion: 0.62,
    blur: 0.1,
    shadows: 0.4,
    highlights: 0.15,
    stretch: 0.2,
    grainOverlay: 0.1,
    colorShadow: '#3a2818',
    colorHighlight: '#f0d8b8',
    speed: 0.28,
  },
  sar: {
    kind: 'dither',
    colorFront: '#b0bc88',
    colorBack: '#141810',
    colorHighlight: '#e8f0c0',
    darkFront: '#c4d090',
    darkBack: '#0c1008',
    darkHighlight: '#f0f8d0',
    type: '2x2',
    size: 2.8,
    colorSteps: 3,
    originalColors: false,
    inverted: false,
    speed: 0.2,
  },
  other: {
    kind: 'glass',
    shape: 'linesIrregular',
    distortionShape: 'contour',
    size: 0.48,
    angle: 0,
    distortion: 0.5,
    blur: 0.15,
    shadows: 0.3,
    highlights: 0.12,
    stretch: 0.1,
    grainOverlay: 0.06,
    colorShadow: '#2a2418',
    colorHighlight: '#e8e0d0',
    speed: 0.3,
  },
};

const sharedGl = {
  antialias: false,
  powerPreference: 'low-power' as const,
  alpha: false,
  depth: false,
  stencil: false,
};

const fillStyle = { width: '100%', height: '100%' } as const;

function canUseWebGl() {
  if (typeof document === 'undefined') return false;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
  context?.getExtension('WEBGL_lose_context')?.loseContext();
  return context !== null;
}

function resolveMaxPixels() {
  const gecko = CSS.supports('-moz-appearance', 'none');
  return gecko ? 480_000 : 900_000;
}

function applyMood(key: ShaderKey) {
  const mood = moods[key];
  const root = document.documentElement;
  root.style.setProperty('--hero-hue', mood.hue);
  root.style.setProperty('--hero-sat', mood.sat);
  root.style.setProperty('--hero-bright', mood.bright);
  root.style.setProperty('--hero-contrast', mood.contrast);
  root.style.setProperty('--hero-sepia', mood.sepia);
  root.dataset.heroMood = key;
}

function isShaderKey(value: string | undefined): value is ShaderKey {
  return !!value && value in presets;
}

export function Atmosphere() {
  const [enabled, setEnabled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [variant, setVariant] = useState<ShaderKey>('idle');
  const [paused, setPaused] = useState(false);
  const [maxPixels, setMaxPixels] = useState(900_000);
  const softTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const variantRef = useRef<ShaderKey>('idle');

  useEffect(() => {
    setMaxPixels(resolveMaxPixels());
    applyMood('idle');

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      const ok = canUseWebGl() && !motion.matches;
      setReduceMotion(motion.matches);
      setEnabled(ok);
      document.documentElement.dataset.atmosphere = ok ? 'live' : 'fallback';
    };
    updateMotion();
    motion.addEventListener('change', updateMotion);

    const applyVariant = (key: ShaderKey) => {
      if (variantRef.current === key) return;
      variantRef.current = key;
      setVariant(key);
      applyMood(key);

      const root = rootRef.current;
      if (!root || motion.matches) return;
      root.classList.add('is-shifting');
      if (softTimer.current) window.clearTimeout(softTimer.current);
      softTimer.current = window.setTimeout(() => {
        root.classList.remove('is-shifting');
      }, 420);
    };

    const onEnter = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const host = target?.closest?.('[data-shader]') as HTMLElement | null;
      const key = host?.dataset.shader;
      if (isShaderKey(key)) applyVariant(key);
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
      work?.removeEventListener('pointerover', onEnter);
      work?.removeEventListener('focusin', onEnter);
      work?.removeEventListener('pointerleave', onLeaveWork);
      work?.removeEventListener('focusout', onFocusOut);
      scrollObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (softTimer.current) window.clearTimeout(softTimer.current);
      delete document.documentElement.dataset.atmosphere;
    };
  }, []);

  const showShader = enabled && !reduceMotion;
  const active = presets[variant];
  const showGlass = active.kind === 'glass';
  const ditherPreset =
    active.kind === 'dither' ? active : (presets.idle as DitherPreset);
  const glassPreset =
    active.kind === 'glass' ? active : (presets.auscult as GlassPreset);
  const ditherSpeed = paused || showGlass ? 0 : ditherPreset.speed;
  const glassSpeed = paused || !showGlass ? 0 : glassPreset.speed;

  return (
    <div className="atmosphere" data-atmosphere aria-hidden="true" ref={rootRef}>
      <div className="atmosphere__fallback" />
      {showShader ? (
        <div className="atmosphere__shader">
          <div className="atmosphere__layer" data-active={showGlass ? undefined : ''}>
            <ImageDithering
              image={HERO_IMAGE}
              fit="cover"
              scale={1}
              colorFront={ditherPreset.darkFront}
              colorBack={ditherPreset.darkBack}
              colorHighlight={ditherPreset.darkHighlight}
              type={ditherPreset.type}
              size={ditherPreset.size}
              colorSteps={ditherPreset.colorSteps}
              originalColors={ditherPreset.originalColors}
              inverted={ditherPreset.inverted}
              speed={ditherSpeed}
              minPixelRatio={1}
              maxPixelCount={maxPixels}
              webGlContextAttributes={sharedGl}
              style={fillStyle}
            />
          </div>
          <div className="atmosphere__layer" data-active={showGlass ? '' : undefined}>
            <FlutedGlass
              image={HERO_IMAGE}
              fit="cover"
              scale={1}
              colorBack="#00000000"
              colorShadow={glassPreset.colorShadow}
              colorHighlight={glassPreset.colorHighlight}
              shape={glassPreset.shape}
              distortionShape={glassPreset.distortionShape}
              size={glassPreset.size}
              angle={glassPreset.angle}
              distortion={glassPreset.distortion}
              blur={glassPreset.blur}
              shadows={glassPreset.shadows}
              highlights={glassPreset.highlights}
              stretch={glassPreset.stretch}
              grainOverlay={glassPreset.grainOverlay}
              edges={0.2}
              speed={glassSpeed}
              minPixelRatio={1}
              maxPixelCount={maxPixels}
              webGlContextAttributes={sharedGl}
              style={fillStyle}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
