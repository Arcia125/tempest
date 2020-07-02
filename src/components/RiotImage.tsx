import React, { FC } from 'react';

import { RiotImageType } from '../types';
import { getImageAssetUrl } from '../riotAsset';

export interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  type: RiotImageType;
  name: string;
  className?: string;
}

export const RiotImage: FC<Props> = ({ type, name, ...props }) => {
  return <img alt="" {...props} src={getImageAssetUrl(type, name)} />;
};
