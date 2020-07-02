import React, { FC } from 'react';

import './SearchInput.css';
import SearchIcon from './SearchIcon';
import { classNames } from '../utils';

interface PropsBase {
  onSearch: () => void;
}

export type Props = PropsBase &
  React.InputHTMLAttributes<Omit<HTMLInputElement, 'placeholder'>>;

const SearchInput: FC<Props> = ({ onSearch, className, ...restProps }) => {
  return (
    <div className={classNames('SearchInput', className)}>
      <input
        {...restProps}
        className="SearchInput-input"
        type="search"
        placeholder="Search a summoner"
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
      />
      <button className="SearchInput-submit" type="submit" onClick={onSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
