import React, { FC } from 'react';

import { Profile } from './Profile';
import AnimatedSpinner from './AnimatedSpinner';
import {
  queueFromQueueType,
  romanNumeralToNumber,
  RomanNumeral,
} from './rankedData';
import { useSummonerQuery } from './operations';
import { useParams } from 'react-router';

const log = window.require('electron-log');

const ProfilePage: FC = () => {
  const params = useParams<{ summonerName: string }>();
  const { loading, error, data } = useSummonerQuery({
    variables: {
      username: params.summonerName,
    },
  });

  if (loading) return <AnimatedSpinner />;
  if (error) {
    log.error(error);
    return <p>Something went wrong</p>;
  }
  const summoner = data?.summoner;
  const entry = summoner?.leagueEntries?.[0];
  return (
    <Profile
      summonerId={summoner?.id}
      profileIconId={summoner?.profileIconId}
      username={summoner?.name}
      summonerLevel={summoner?.summonerLevel}
      matchHistory={summoner?.matchHistory}
      rankedBadgeProps={{
        tier: entry?.tier?.toLowerCase(),
        rank: romanNumeralToNumber(entry?.rank as RomanNumeral),
        queue: entry?.queueType ? queueFromQueueType(entry.queueType) : null,
      }}
    />
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
