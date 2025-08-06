import React from 'react';

export const CircularTextIcon = ({ size = 40, className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="circlePath"
      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
      fill="transparent"
    />
    <text className="fill-current text-sm font-bold uppercase tracking-widest">
      <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
        Charity Starter
      </textPath>
    </text>
  </svg>
);