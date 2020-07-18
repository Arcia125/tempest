import React from 'react';
import ReactDOM from 'react-dom';

type RenderParams = Parameters<typeof ReactDOM.render>;

export const createRenderer = (
  ProviderComponent: React.ElementType,
  root: RenderParams[1]
) => {
  return (Component: React.ElementType) =>
    ReactDOM.render(
      <React.StrictMode>
        <ProviderComponent>
          <Component />
        </ProviderComponent>
      </React.StrictMode>,
      root
    );
};
