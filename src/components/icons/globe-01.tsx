import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface Globe01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Globe01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const ringVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, 180, 360],
    scale: [1, 1.05, 1],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const Globe01Icon = forwardRef<Globe01IconHandle, Globe01IconProps>(
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
          <circle cx="12" cy="12" r="10" />
          <motion.path
            d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
            variants={ringVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <path d="M2 12h20" />
        </svg>
      </div>
    );
  }
);

Globe01Icon.displayName = 'Globe01Icon';

export { Globe01Icon };
