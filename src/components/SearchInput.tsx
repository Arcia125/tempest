import React, { FC } from 'react';
import SearchIcon from './SearchIcon';
import './SearchInput.css';
import regions from '../static-data/regions.json';
import { classNames } from '../utils';
import RegionDropdown from './RegionDropdown';

interface PropsBase {
  onSearch: () => void;
  variant: 'window' | 'opaque';
  region: keyof typeof regions;
  setRegion: (selection: keyof typeof regions) => void;
}

export const regionOptions = Object.keys(regions);

export type Props = PropsBase &
  React.InputHTMLAttributes<Omit<HTMLInputElement, 'placeholder'>>;

const SearchInput: FC<Props> = ({
  onSearch,
  className,
  variant,
  region,
  setRegion,
  ...restProps
}) => {
  return (
    <div className={classNames('SearchInput', className, `variant-${variant}`)}>
      <input
        {...restProps}
        title="Summoner Name Search"
        className="SearchInput-input"
        type="search"
        placeholder="Search a summoner"
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
      />
      <RegionDropdown region={region} setRegion={setRegion} />
      <button
        className="SearchInput-submit"
        type="submit"
        aria-label="Search for summoner by name"
        onClick={onSearch}
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchInput;
