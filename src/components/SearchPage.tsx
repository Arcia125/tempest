import React, { FC } from 'react';

import Search from './Search';

export interface Props {
  variant: 'window' | 'opaque';
}

const SearchPage: FC<Props> = (props) => {
  return <Search variant={props.variant} />;
};

export default SearchPage;
