import React, { FC, SVGProps } from 'react';

interface BaseProps {
  variant: 'window' | 'opaque';
}

type Props = SVGProps<SVGSVGElement> & BaseProps;

const SearchIcon: FC<Props> = (props) => {
  return (
    <svg width={27} height={25} fill="none" {...props}>
      <defs>
        <circle id="outer-mag" cx={10.5} cy={10.5} r={10.5} />
        <clipPath id="clip">
          <use xlinkHref="#outer-mag" />
        </clipPath>
      </defs>
      <g>
        <use
          xlinkHref="#outer-mag"
          stroke="#5E767B"
          strokeWidth="6"
          clipPath="url(#clip)"
        />
      </g>
      <path stroke="#5E767B" strokeWidth={3} d="M7.061 5.939l18 18" />
      <circle
        cx={10.5}
        cy={10.5}
        r={8.5}
        fill={props.variant === 'window' ? 'rgb(20, 9, 72)' : '#2F484F'}
      />
    </svg>
  );
};

export default SearchIcon;
