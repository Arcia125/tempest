import React, { FC, HTMLAttributes } from 'react';
import './Legal.css';
import { classNames } from '../utils';

export type Props = HTMLAttributes<HTMLParagraphElement>;

export const Legal: FC<Props> = ({ className }) => {
  return (
    <p className={classNames('Legal', className)}>
      Tempest was created under Riot Games' "Legal Jibber Jabber" policy using
      assets owned by Riot Games. Riot Games does not endorse or sponsor this
      project.
    </p>
  );
};
