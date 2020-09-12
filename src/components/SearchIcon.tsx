import React, { FC, SVGProps, useContext } from 'react';
import { themeContext } from '../theme';

interface BaseProps {}

type Props = SVGProps<SVGSVGElement> & BaseProps;

const SearchIcon: FC<Props> = (props) => {
  const { theme } = useContext(themeContext);
  return (
    <svg width={29} height={30} fill="none" {...props}>
      <path
        d="M18.73 17.5h-.955l-.339-.337a8.254 8.254 0 001.897-5.288c0-4.487-3.516-8.125-7.854-8.125s-7.854 3.638-7.854 8.125c0 4.488 3.516 8.125 7.854 8.125a7.669 7.669 0 005.111-1.962l.327.35v.987l6.041 6.238 1.8-1.863-6.029-6.25zm-7.25 0c-3.01 0-5.438-2.512-5.438-5.625S8.47 6.25 11.479 6.25c3.009 0 5.438 2.512 5.438 5.625s-2.43 5.625-5.438 5.625z"
        fill={theme.colors.accent0}
      />
    </svg>
  );
};

export default SearchIcon;
