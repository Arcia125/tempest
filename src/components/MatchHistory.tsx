import React, { FC } from 'react';
import './MatchHistory.css';
import { MatchHistoryList } from './MatchHistoryList';
import { MatchHistory as IMatchHistory, Maybe } from '../operations';
import {
  getImageNameByChampionKey,
  getParticipant,
  getParticipantIdentity,
  getTeam,
  lost,
  won,
} from '../data';
import Typography, { TypographyVariants } from './Typography';
import { RiotImage } from './RiotImage';
import { RiotImageType } from '../types';
import { WinLossRecord } from './WinLossRecord';
import { WinLossChart, Props as WinLossChartProps } from './WinLossChart';

export interface Props {
  matchHistory?: Maybe<IMatchHistory>;
  summonerId?: Maybe<string>;
}

const MatchHistory: FC<Props> = ({ matchHistory, summonerId }) => {
  const matchHistoryData = getMatchHistoryData(matchHistory, summonerId);

  return (
    <div className="MatchHistory">
      {matchHistory && matchHistory.matches && matchHistoryData && (
        <div className="MatchHistory-top">
          <div className="MatchHistory-win-loss">
            <div className="MatchHistory-win-loss-record">
              <WinLossRecord
                games={matchHistory.matches.length}
                wins={matchHistoryData.winLoss[1].y}
                losses={matchHistoryData.winLoss[0].y}
                draws={matchHistoryData.winLoss[2]?.y}
              />
            </div>
            <WinLossChart
              data={matchHistoryData.winLoss}
              games={matchHistory.matches.length}
            />
          </div>
          {Object.entries(matchHistoryData.recentChampionWinLoss)
            .map(([key, val]: [string, any]) => ({ key, ...val }))
            .sort((a, b) => {
              const aGames = a.win + a.loss;
              const bGames = b.win + b.loss;
              return aGames > bGames ? -1 : 1;
            })
            .slice(0, 3)
            .map((champRecord) => {
              console.log(champRecord);
              return (
                <div key={champRecord.key}>
                  <RiotImage
                    type={RiotImageType.CHAMPION}
                    name={getImageNameByChampionKey(String(champRecord.key))}
                  />
                  <Typography variant={TypographyVariants.p}>
                    {champRecord.win === 0
                      ? 0
                      : (champRecord.win /
                          (champRecord.win + champRecord.loss)) *
                        100}
                    %
                  </Typography>
                </div>
              );
            })}
        </div>
      )}
      <MatchHistoryList matchHistory={matchHistory} summonerId={summonerId} />
    </div>
  );
};

export default MatchHistory;

function getMatchHistoryData(
  matchHistory: IMatchHistory | null | undefined,
  summonerId: string | null | undefined
) {
  return matchHistory?.matches?.reduce(
    (data, matchHistoryItem) => {
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
    },
    {
      winLoss: [
        { x: 'L', y: 0 },
        { x: 'W', y: 0 },
      ],
      recentChampionWinLoss: {},
    } as {
      winLoss: WinLossChartProps['data'];
      recentChampionWinLoss: any;
    }
  );
}
