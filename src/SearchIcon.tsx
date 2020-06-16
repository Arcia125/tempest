import React, { FC, SVGProps } from 'react';

const SearchIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width={27} height={25} fill="none" {...props}>
      <circle cx={10.5} cy={10.5} r={10.5} fill="#5E767B" />
      <path stroke="#5E767B" strokeWidth={3} d="M7.061 5.939l18 18" />
      <circle cx={10.5} cy={10.5} r={8.5} fill="#2F484F" />
    </svg>
  );
};

export default SearchIcon;
