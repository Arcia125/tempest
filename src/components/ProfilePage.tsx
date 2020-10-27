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
  return (
    <Profile
      summonerId={summoner?.id}
      profileIconId={summoner?.profileIconId}
      username={summoner?.name}
      summonerLevel={summoner?.summonerLevel}
      matchHistory={summoner?.matchHistory}
      rankedBadgeProps={[...(summoner?.leagueEntries || [])]
        .sort((entry) => (entry?.queueType === 'RANKED_SOLO_5x5' ? -1 : 1))
        .map((entry) => ({
          tier: entry?.tier?.toLowerCase(),
          rank: romanNumeralToNumber(entry?.rank as RomanNumeral),
          queue: entry?.queueType ? queueFromQueueType(entry.queueType) : null,
          leaguePoints: entry?.leaguePoints,
        }))}
    />
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
