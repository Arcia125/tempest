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

const Container: FC = ({ children }) => (
  <div className="MatchHistory">{children}</div>
);

const MatchHistory: FC<Props> = ({ matchHistory, summonerId }) => {
  const matchHistoryData = getMatchHistoryData(matchHistory, summonerId);

  if (!(matchHistory && matchHistory.matches && matchHistoryData)) {
    return <Container />;
  }

  const champRecords = Object.entries(matchHistoryData.recentChampionWinLoss)
    .map(([key, val]) => ({ key, ...val }))
    .sort((a, b) => {
      const aGames = a.win + a.loss;
      const bGames = b.win + b.loss;
      return aGames > bGames ? -1 : 1;
    })
    .slice(0, 3);

  return (
    <Container>
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
        <div className="MatchHistory-recent-champions">
          {champRecords.map((champRecord) => (
            <ChampionRecord key={champRecord.key} champRecord={champRecord} />
          ))}
        </div>
      </div>
      <MatchHistoryList matchHistory={matchHistory} summonerId={summonerId} />
    </Container>
  );
};

export default MatchHistory;
