import React, { FC } from 'react';

import { Profile } from './Profile';
import AnimatedSpinner from './AnimatedSpinner';
import {
  queueFromQueueType,
  romanNumeralToNumber,
  RomanNumeral,
} from './rankedData';
import { useSummonerQuery } from './operations';

const ProfilePage: FC = () => {
  const { loading, error, data } = useSummonerQuery({
    variables: {
      username: 'Arcia125',
    },
  });

  if (loading) return <AnimatedSpinner />;
  if (error) {
    console.error(error);
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
        queue: entry?.queueType ? queueFromQueueType(entry?.queueType) : null,
      }}
    />
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
