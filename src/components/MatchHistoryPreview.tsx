import React, { FC } from 'react';
import './MatchHistoryPreview.css';
import { RiotImage } from './RiotImage';
import Typography, { TypographyVariants } from './Typography';
import { MatchHistoryItem, Maybe } from '../operations';
import { RiotImageType } from '../types';
import {
  championsByKey,
  getQueue,
  getImageNameByChampionKey,
  getParticipantIdentity,
  getParticipant,
  getGameOutcome,
  getGameDuration,
  won,
  lost,
  getKda,
  getCs,
  getTeam,
} from '../data';

export interface Props {
  matchHistoryItem?: Maybe<MatchHistoryItem>;
  summonerId?: Maybe<string>;
}

export const MatchHistoryPreview: FC<Props> = ({
  matchHistoryItem,
  summonerId,
}) => {
  const participantIdentity = getParticipantIdentity(
    matchHistoryItem,
    summonerId
  );
  const participant = getParticipant(matchHistoryItem, participantIdentity);
  const team = getTeam(matchHistoryItem, participant);
  const win = team?.win;
  const gameOutcome = getGameOutcome(win);
  return (
    <div className={`MatchHistoryPreview MatchHistoryPreview_${gameOutcome}`}>
      <div className="MatchHistoryPreview-wl-tab" />
      <RiotImage
        className="MatchHistoryPreview-champion-image"
        type={RiotImageType.CHAMPION}
        name={getImageNameByChampionKey(String(matchHistoryItem?.champion))}
        alt={
          matchHistoryItem?.champion
            ? championsByKey[matchHistoryItem.champion]?.name
            : ''
        }
      />
      <div className="MatchHistoryPreview-details">
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_outcome"
          color={won(win) ? 'accent0' : lost(win) ? 'important4' : 'text'}
        >
          {gameOutcome}
        </Typography>
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_kda"
        >
          {getKda(participant)}
        </Typography>
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_cs"
          color="accent4"
        >
          {getCs(participant)}
        </Typography>
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_duration"
        >
          {getGameDuration(matchHistoryItem)}
        </Typography>
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_queue"
          color="accent4"
        >
          {getQueue(matchHistoryItem)}
        </Typography>
      </div>
    </div>
  );
};
