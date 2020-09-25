import {
  MatchHistoryItem,
  Maybe,
  GameOutcome,
  MatchParticipant,
  MatchParticipantIdentity,
} from '../operations';
import { leftPad } from '../utils';

export function getGameDuration(
  matchHistoryItem?: Maybe<MatchHistoryItem>
): React.ReactNode {
  const duration = matchHistoryItem?.details?.gameDuration ?? 0;
  const format = (v: number) => leftPad(v, '0', 2);
  return `${format(Math.floor(duration / 60))}:${format(duration % 60)}`;
}

export function getCs(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const cs = participant?.stats?.totalMinionsKilled ?? 0;
  return `${cs} CS`;
}

export function getKda(participant?: Maybe<MatchParticipant>): React.ReactNode {
  const kills = participant?.stats?.kills;
  const deaths = participant?.stats?.deaths;
  const assists = participant?.stats?.assists;
  return typeof kills === 'undefined' || kills === null
    ? '0/0/0'
    : `${kills}/${deaths}/${assists}`;
}

export function getGameOutcome(win?: Maybe<GameOutcome>): string {
  return won(win) ? 'Victory' : lost(win) ? 'Defeat' : 'Draw';
}

export function lost(win?: Maybe<GameOutcome>) {
  return win === GameOutcome.Fail;
}

export function won(win?: Maybe<GameOutcome>) {
  return win === GameOutcome.Win;
}

export function getTeam(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  participant?: Maybe<MatchParticipant>
) {
  return matchHistoryItem?.details?.teams?.find(
    (t) => t?.teamId === participant?.teamId
  );
}

export function getParticipant(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  participantIdentity?: Maybe<MatchParticipantIdentity>
) {
  return matchHistoryItem?.details?.participants?.find(
    (p) => p?.participantId === participantIdentity?.participantId
  );
}

export function getParticipantIdentity(
  matchHistoryItem?: Maybe<MatchHistoryItem>,
  summonerId?: Maybe<string>
) {
  return matchHistoryItem?.details?.participantIdentities?.find(
    (pI) => pI?.player?.summonerId === summonerId
  );
}
