import React, { useState } from 'react';
import { useHistory } from 'react-router';
import regions from '../static-data/regions.json';

export const useSearch = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<keyof typeof regions>('na');

  const setter: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const history = useHistory();

  const handleSearch = () => {
    if (search) history.push(`/summoner/profile/${region}/${search}`);
  };

  return {
    search,
    handleSearch,
    setter,
    region,
    setRegion,
  };
};
