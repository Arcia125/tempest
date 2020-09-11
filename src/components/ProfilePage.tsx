import React, { FC } from 'react';
import { useParams } from 'react-router';
import AnimatedSpinner from './AnimatedSpinner';
import { Profile } from './Profile';
import { useSummonerQuery } from '../operations';
import { log } from '../utils';
import {
  queueFromQueueType,
  romanNumeralToNumber,
  RomanNumeral,
} from '../data';

const ProfilePage: FC = () => {
  const params = useParams<{ summonerName: string; region: string }>();
  const { loading, error, data } = useSummonerQuery({
    variables: {
      username: params.summonerName,
      region: params.region,
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
