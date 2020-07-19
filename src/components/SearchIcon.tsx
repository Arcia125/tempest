import React, { FC, SVGProps, useContext } from 'react';
import { themeContext } from '../theme';


interface BaseProps {}

type Props = SVGProps<SVGSVGElement> & BaseProps;

const SearchIcon: FC<Props> = (props) => {
  const { theme } = useContext(themeContext);
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
          stroke={theme.colors.accent0}
          strokeWidth="6"
          clipPath="url(#clip)"
        />
      </g>
      <path
        stroke={theme.colors.accent0}
        strokeWidth={3}
        d="M7.061 5.939l18 18"
      />
      <circle cx={10.5} cy={10.5} r={8.5} fill={theme.colors.background} />
    </svg>
  );
};

export default SearchIcon;
