import React, { FC } from 'react';
import { Legal } from './Legal';
import { classNames } from '../utils';
import './Footer.css';
import Typography, { TypographyVariants } from './Typography';

const VERSION = process.env.REACT_APP_VERSION;

interface Props {
  className?: string;
}

const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={classNames('Footer', className)}>
      <Typography
        className={classNames('Copyright', className)}
        variant={TypographyVariants.p}
      >
        Tempest{VERSION && ` v${VERSION}`} © 2020
      </Typography>
      <Legal />
    </footer>
  );
};

export default Footer;
