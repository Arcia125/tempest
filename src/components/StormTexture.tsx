import React, { FC } from 'react';
import { useStormScene } from '../hooks';


export const StormTexture: FC = (props) => {
  const [el] = useStormScene();

  return (
    <div
      style={{ position: 'fixed', top: 0, zIndex: -1 }}
      ref={el as any}
    ></div>
  );
};
