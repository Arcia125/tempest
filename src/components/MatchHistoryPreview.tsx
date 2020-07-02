import React, { FC } from 'react';

import './MatchHistoryPreview.css';
import { RiotImageType } from '../types';
import { RiotImage } from './RiotImage';
import { getImageNameByChampionKey } from '../riotAsset';
import { championsByKey } from '../championData';
import {
  MatchHistoryItem,
  Maybe,
  GameOutcome,
  MatchParticipant,
  MatchParticipantIdentity,
} from '../operations';
import Typography, { TypographyVariants } from './Typography';
import { getQueueName } from '../queueData';
import { leftPad } from '../utils';

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
            ? championsByKey[matchHistoryItem.champion].name
            : ''
        }
      />
      <div className="MatchHistoryPreview-details">
        <Typography
          variant={TypographyVariants.p}
          className="MatchHistoryPreview-details_outcome"
          color={won(win) ? 'babyBlue' : lost(win) ? 'peach' : 'eggshell'}
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
          color="blizzardBlue"
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
          color="blizzardBlue"
        >
          {getQueue(matchHistoryItem)}
        </Typography>
      </div>
    </div>
  );
};

function getQueue(matchHistoryItem?: Maybe<MatchHistoryItem>): React.ReactNode {
  return typeof matchHistoryItem?.queue === 'number'
    ? getQueueName(matchHistoryItem?.queue)
    : '-';
}

function getGameDuration(
  matchHistoryItem?: Maybe<MatchHistoryItem>
): React.ReactNode {
  const duration = matchHistoryItem?.details?.gameDuration ?? 0;
  const format = (v: number) => leftPad(v, '0', 2);
  return `${format(Math.floor(duration / 60))}:${format(duration % 60)}`;
}

function getCs(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const cs = participant?.stats?.totalMinionsKilled ?? 0;
  return `${cs} CS`;
}

function getKda(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const kills = participant?.stats?.kills;
  const deaths = participant?.stats?.deaths;
  const assists = participant?.stats?.assists;
  return typeof kills === 'undefined' || kills === null
    ? '0/0/0'
    : `${kills}/${deaths}/${assists}`;
}

function getGameOutcome(win?: Maybe<GameOutcome>): string {
  return won(win) ? 'Victory' : lost(win) ? 'Defeat' : 'Draw';
}

function lost(win?: Maybe<GameOutcome>) {
  return win === GameOutcome.Fail;
}

function won(win?: Maybe<GameOutcome>) {
  return win === GameOutcome.Win;
}

function getTeam(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  participant?: Maybe<MatchParticipant>
) {
  return matchHistoryItem?.details?.teams?.find(
    (t) => t?.teamId === participant?.teamId
  );
}

function getParticipant(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  participantIdentity?: Maybe<MatchParticipantIdentity>
) {
  return matchHistoryItem?.details?.participants?.find(
    (p) => p?.participantId === participantIdentity?.participantId
  );
}

function getParticipantIdentity(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  summonerId?: Maybe<string>
) {
  return matchHistoryItem?.details?.participantIdentities?.find(
    (pI) => pI?.player?.summonerId === summonerId
  );
}
