import React, { FC } from 'react';

import './BadgeLayout.css';

const BadgeLayout: FC<{}> = ({ children }) => (
  <div className="BadgeLayout">{children}</div>
);

export default BadgeLayout;
