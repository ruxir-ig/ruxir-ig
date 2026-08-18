import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ArrowUpRightProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
}

export function ArrowUpRight({ size = 16, className, ...props }: ArrowUpRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('inline-block', className)}
      {...props}
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
