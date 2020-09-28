import React, { useContext } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import { MatchHistoryData } from '../data';
import { themeContext } from '../theme';
import Typography, { TypographyVariants } from './Typography';

export interface Props {
  data: MatchHistoryData['winLoss'];
  games: number;
}

export function WinLossChart({ data, games }: Props) {
  const themeCtx = useContext(themeContext);

  return (
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
        data={data}
      />
      <Typography className="win-loss-rate" variant={TypographyVariants.p}>
        {(data[1].y / games) * 100}%
      </Typography>
    </div>
  );
}
