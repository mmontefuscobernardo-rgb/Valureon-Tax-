import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'iconOnly';
  className?: string;
  iconSize?: number;
}

export default function Logo({ variant = 'horizontal', className = '', iconSize = 48 }: LogoProps) {
  // SVG drawing of the geometric 'V' icon
  const renderIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 hover:scale-105"
    >
      {/* Background shape / glow effect or just clean vector */}
      <path
        d="M18 20 H34 L50 64 L66 20 H82 L58 84 H42 L18 20 Z"
        fill="currentColor"
        className="text-[#E08200] opacity-10"
      />
      {/* Outer V Left side */}
      <path
        d="M18 20 H28 L50 72 L72 20 H82 L50 88 L18 20 Z"
        fill="currentColor"
        className="text-[#E08200]"
      />
      {/* Inner design lines of the V logo */}
      <path
        d="M34 20 L50 56 L66 20 H58 L50 38 L42 20 H34 Z"
        fill="currentColor"
        className="text-[#E08200] opacity-90"
      />
      <path
        d="M50 88 L64 56 L56 52 L46 74 L50 88 Z"
        fill="currentColor"
        className="text-[#E08200] opacity-80"
      />
      <path
        d="M40 36 L30 58 L38 62 L48 40 L40 36 Z"
        fill="currentColor"
        className="text-[#E08200] opacity-80"
      />
    </svg>
  );

  if (variant === 'iconOnly') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{renderIcon()}</div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderIcon()}
        <div className="mt-3">
          <span className="font-sans text-3xl font-light tracking-wide text-white">
            Valureon
          </span>
          <span className="font-sans text-3xl font-semibold tracking-wide text-[#E08200] ml-1">
            Tax
          </span>
        </div>
        <div className="mt-1">
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#E08200] font-medium block">
            SOLUÇÕES TRIBUTÁRIAS
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className={`flex items-center ${className}`}>
      {renderIcon()}
      <div className="ml-3 flex flex-col justify-center select-none leading-none">
        <div>
          <span className="font-sans text-2xl font-light tracking-wide text-white">
            Valureon
          </span>
          <span className="font-sans text-2xl font-semibold tracking-wide text-[#E08200] ml-1">
            Tax
          </span>
        </div>
        <div className="mt-1">
          <span className="font-sans text-[8px] tracking-[0.2em] text-[#E08200] font-semibold">
            SOLUÇÕES TRIBUTÁRIAS
          </span>
        </div>
      </div>
    </div>
  );
}
