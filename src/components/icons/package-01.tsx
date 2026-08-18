import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface Package01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Package01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const lidVariants: Variants = {
  normal: { translateY: 0, scale: 1 },
  animate: {
    translateY: [0, -2, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const Package01Icon = forwardRef<Package01IconHandle, Package01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 20, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          overflow="visible"
        >
          <motion.path
            d="m16.5 9.4 4.5-2.8L12 2 3 6.6l4.5 2.8"
            variants={lidVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 6px' }}
          />
          <path d="M7.5 4.2 16.5 9.8" />
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="m3.27 6.96 8.73 5.04 8.73-5.04" />
          <path d="M12 22.08V12" />
        </svg>
      </div>
    );
  }
);

Package01Icon.displayName = 'Package01Icon';

export { Package01Icon };
