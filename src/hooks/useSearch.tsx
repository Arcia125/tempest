import React, { useState } from 'react';
import { useHistory } from 'react-router';

export const useSearch = () => {
  const [search, setSearch] = useState('');

  const setter: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);

  const history = useHistory();

  const handleSearch = () => {
    if (search) history.push(`/summoner/profile/${search}`);
  };

  return {
    search,
    handleSearch,
    setter,
  };
};
