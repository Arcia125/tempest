import React, { FC } from 'react';

import './MatchHistoryPreview.css';
import { RiotImageType } from './types';
import { RiotImage } from './RiotImage';
import { getImageNameByChampionKey } from './riotAsset';
import { championsByKey } from './championData';
import {
  MatchHistoryItem,
  Maybe,
  GameOutcome,
  MatchParticipant,
  MatchParticipantIdentity,
} from './operations';
import Typography, { TypographyVariants } from './Typography';

export interface Props {
  matchHistoryItem?: Maybe<MatchHistoryItem>;
  summonerId?: Maybe<string>;
}

// const winColor = theme.;

// const lossColor = 'red';

// const drawColor = 'white';

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
  // const participant = matchHistoryItem?.details?.participants?.find(
  //   (p) => p?.participantId === summoner?
  // );
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
        >
          {getGameOutcome(win)}
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
        >
          {getQueue(matchHistoryItem)}
        </Typography>
      </div>
    </div>
  );
};

function getQueue(matchHistoryItem?: Maybe<MatchHistoryItem>): React.ReactNode {
  return matchHistoryItem?.queue;
}

function getGameDuration(
  matchHistoryItem?: Maybe<MatchHistoryItem>
): React.ReactNode {
  return matchHistoryItem?.details?.gameDuration || '-';
}

function getCs(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const cs = participant?.stats?.totalMinionsKilled;
  return typeof cs === 'undefined' || cs === null ? '-' : `${cs} CS`;
}

function getKda(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const kills = participant?.stats?.kills;
  const deaths = participant?.stats?.deaths;
  const assists = participant?.stats?.assists;
  return typeof kills === 'undefined' || kills === null
    ? '-'
    : `${kills}/${deaths}/${assists}`;
}

function getGameOutcome(win?: Maybe<GameOutcome>): string | undefined {
  return win === GameOutcome.Win
    ? 'Victory'
    : win === GameOutcome.Fail
    ? 'Defeat'
    : 'Draw';
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
