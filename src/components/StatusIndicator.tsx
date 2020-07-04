import React, { FC } from 'react';

import './StatusIndicator.css';
import { classNames } from '../utils';

interface Props {
  className?: string;
  status: 'searching' | 'creating';
}

const StatusIndicator: FC<Props> = ({ className, status }) => {
  return (
    <div
      className={classNames('StatusIndicator', className, `status-${status}`)}
    ></div>
  );
};

export default StatusIndicator;
