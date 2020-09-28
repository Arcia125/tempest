import React, { FC } from 'react';
import './MatchHistory.css';
import { MatchHistoryList } from './MatchHistoryList';
import { MatchHistory as IMatchHistory, Maybe } from '../operations';
import { getMatchHistoryData } from '../data';
import { WinLossRecord } from './WinLossRecord';
import { WinLossChart } from './WinLossChart';
import { ChampionRecord } from './ChampionRecord';

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
                <ChampionRecord
                  key={champRecord.key}
                  champRecord={champRecord}
                />
              );
            })}
        </div>
      )}
      <MatchHistoryList matchHistory={matchHistory} summonerId={summonerId} />
    </div>
  );
};

export default MatchHistory;
