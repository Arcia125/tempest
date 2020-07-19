import React, { FC } from 'react';
import { getImageAssetUrl } from '../data';
import { RiotImageType } from '../types';


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
