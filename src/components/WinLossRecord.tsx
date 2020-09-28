import React from 'react';
import Typography, { TypographyVariants } from './Typography';

export interface Props {
  games: React.ReactNode;
  wins: React.ReactNode;
  losses: React.ReactNode;
  draws: React.ReactNode;
}

export function WinLossRecord({ games, wins, losses, draws }: Props) {
  return (
    <Typography variant={TypographyVariants.p}>
      {games}G {wins}W {losses}L {draws && draws > 0 && `${draws}D`}
    </Typography>
  );
}
