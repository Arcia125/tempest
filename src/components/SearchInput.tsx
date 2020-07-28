import React, { FC } from 'react';
import SearchIcon from './SearchIcon';
import './SearchInput.css';
import { classNames } from '../utils';

interface PropsBase {
  onSearch: () => void;
  variant: 'window' | 'opaque';
}

export type Props = PropsBase &
  React.InputHTMLAttributes<Omit<HTMLInputElement, 'placeholder'>>;

const SearchInput: FC<Props> = ({
  onSearch,
  className,
  variant,
  ...restProps
}) => {
  return (
    <div className={classNames('SearchInput', className, `variant-${variant}`)}>
      <input
        {...restProps}
        className="SearchInput-input"
        type="search"
        placeholder="Search a summoner"
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
      />
      <button
        className="SearchInput-submit"
        type="submit"
        aria-label="Search"
        onClick={onSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
