import { useEffect, useState } from 'react';
import { HeadphonesIcon } from './icons/headphones';
import { Moon02Icon } from './icons/moon-02';
import { Sun03Icon } from './icons/sun-03';

function readTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function FloatControls() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(readTheme());
    const onTheme = () => setTheme(readTheme());
    window.addEventListener('themechange', onTheme);
    return () => window.removeEventListener('themechange', onTheme);
  }, []);

  return (
    <div className="float-controls" role="group" aria-label="Site controls">
      <button
        type="button"
        className="float-controls__btn pressable"
        data-music-toggle
        aria-label="Play music"
        title="Music"
        aria-pressed="false"
      >
        <HeadphonesIcon size={18} className="float-controls__icon" />
      </button>
      <span className="float-controls__divider" aria-hidden="true" />
      <button
        type="button"
        className="float-controls__btn pressable"
        data-theme-toggle
        aria-label="Toggle light and dark theme"
        title="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun03Icon size={18} className="float-controls__icon" />
        ) : (
          <Moon02Icon size={18} className="float-controls__icon" />
        )}
      </button>
    </div>
  );
}
