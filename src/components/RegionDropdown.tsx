import React from 'react';
import Dropdown from 'react-dropdown-now';
import { regionOptions } from './SearchInput';
import regions from '../static-data/regions.json';
import './RegionDropdown.css';
import 'react-dropdown-now/style.css';

const RegionDropdown = ({
  region,
  setRegion,
}: {
  region: string;
  setRegion: (selection: keyof typeof regions) => void;
}) => (
  <Dropdown
    className="RegionDropdown"
    options={regionOptions}
    value={region}
    onChange={(opt) => setRegion(opt.value)}
    arrowOpen="▼"
    arrowClosed="▼"
  />
);

export default RegionDropdown;
