import React, { FC } from 'react';

import { useErrorMutation } from '../operations';
import ErrorBoundary from './ErrorBoundary';
import { log } from '../utils';

const ErrorReporter: FC = ({ children }) => {
  const [reportError, errorMutation] = useErrorMutation();

  return (
    <ErrorBoundary
      onError={(errorState) => {
        log.error(errorState);
        reportError({
          variables: {
            error: JSON.stringify({
              error: JSON.stringify(errorState.error, [
                ...Object.getOwnPropertyNames(errorState.error),
              ]),
              info: errorState.info,
            }),
          },
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorReporter;
