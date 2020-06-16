import React, { FC } from 'react';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';

const Home: FC = () => {
  return (
    <div className="Home">
      {/* <ProfilePage /> */}
      <SearchPage />
    </div>
  );
};

export default Home;
