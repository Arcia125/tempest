import React, { FC } from 'react';

import './HeaderContainer.css';

export const HeaderContainer: FC = ({ children }) => (
  <header className="App-header">{children}</header>
);
