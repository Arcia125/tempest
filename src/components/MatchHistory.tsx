import React, { FC, useContext } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import './MatchHistory.css';
import { MatchHistoryList } from './MatchHistoryList';
import { MatchHistory as IMatchHistory, Maybe } from '../operations';
import { themeContext } from '../theme';
import {
  getParticipant,
  getParticipantIdentity,
  getTeam,
  lost,
  won,
} from '../data';
import Typography, { TypographyVariants } from './Typography';

export interface Props {
  matchHistory?: Maybe<IMatchHistory>;
  summonerId?: Maybe<string>;
}

const MatchHistory: FC<Props> = ({ matchHistory, summonerId }) => {
  const themeCtx = useContext(themeContext);
  const winLossData = matchHistory?.matches?.reduce(
    (acc, matchHistoryItem) => {
      const participantIdentity = getParticipantIdentity(
        matchHistoryItem,
        summonerId
      );
      const participant = getParticipant(matchHistoryItem, participantIdentity);
      const team = getTeam(matchHistoryItem, participant);
      const win = team?.win;
      if (won(win)) {
        acc[1].y += 1;
      } else if (lost(win)) {
        acc[0].y += 1;
      } else {
        if (!acc[2]) acc[2] = { x: 'D', y: 0 };
        acc[2].y += 1;
      }
      return acc;
    },
    [
      { x: 'L', y: 0 },
      { x: 'W', y: 0 },
    ]
  );

  return (
    <div className="MatchHistory">
      {matchHistory && matchHistory.matches && winLossData && (
        <div className="MatchHistory-win-loss">
          <div className="MatchHistory-win-loss-record">
            <Typography variant={TypographyVariants.p}>
              {matchHistory.matches.length}G {winLossData[1].y}W{' '}
              {winLossData[0].y}L {winLossData[2] && `${winLossData[2].y}D`}
            </Typography>
          </div>
          <div className="MatchHistory-win-loss-chart">
            <VictoryPie
              theme={VictoryTheme.material}
              colorScale={[
                themeCtx.theme.colors.important4,
                themeCtx.theme.colors.accent0,
                themeCtx.theme.colors.text,
              ]}
              style={{
                parent: {},
                data: {
                  stroke: 'none',
                },
                labels: {
                  display: 'none',
                },
              }}
              innerRadius={86}
              data={winLossData}
            />
            <Typography
              className="win-loss-rate"
              variant={TypographyVariants.p}
            >
              {(winLossData[1].y / matchHistory.matches.length) * 100}%
            </Typography>
          </div>
        </div>
      )}
      <MatchHistoryList matchHistory={matchHistory} summonerId={summonerId} />
    </div>
  );
};

export default MatchHistory;
