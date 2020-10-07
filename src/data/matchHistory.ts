import {
  MatchHistoryItem,
  Maybe,
  GameOutcome,
  MatchParticipant,
  MatchParticipantIdentity,
  MatchHistory as IMatchHistory
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
  const cs = (participant?.stats?.totalMinionsKilled ?? 0) + (participant?.stats?.neutralMinionsKilled ?? 0);
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

export interface ChampionRecord {
  [key: string]: {
    win: number;
    loss: number;
  };
}

interface WinLossRecord<T extends 'W' | 'L' | 'D'> {
  x: T;
  y: number;
}

type LossRecord = WinLossRecord<'L'>;
type WinRecord = WinLossRecord<'W'>;
type DrawRecord = WinLossRecord<'D'>;

export interface MatchHistoryData {
  winLoss: [LossRecord, WinRecord] | [LossRecord, WinRecord, DrawRecord];
  recentChampionWinLoss: ChampionRecord;
}

export function getMatchHistoryData(
  matchHistory: IMatchHistory | null | undefined,
  summonerId: string | null | undefined
): MatchHistoryData | undefined {
  const initialMatchHistoryData: MatchHistoryData = {
    winLoss: [
      { x: 'L', y: 0 },
      { x: 'W', y: 0 },
    ],
    recentChampionWinLoss: {},
  };

  return matchHistory?.matches?.reduce((data, matchHistoryItem) => {
    const participantIdentity = getParticipantIdentity(
      matchHistoryItem,
      summonerId
    );
    const participant = getParticipant(matchHistoryItem, participantIdentity);
    const team = getTeam(matchHistoryItem, participant);
    const win = team?.win;
    const championKey = (matchHistoryItem?.champion || '').toString();

    if (!data.recentChampionWinLoss[championKey]) {
      data.recentChampionWinLoss[championKey] = { win: 0, loss: 0 };
    }

    if (won(win)) {
      data.winLoss[1].y += 1;
      data.recentChampionWinLoss[championKey].win += 1;
    } else if (lost(win)) {
      data.winLoss[0].y += 1;
      data.recentChampionWinLoss[championKey].loss += 1;
    } else {
      if (!data.winLoss[2]) data.winLoss[2] = { x: 'D', y: 0 };
      data.winLoss[2].y += 1;
    }

    return data;
  }, initialMatchHistoryData);
}
