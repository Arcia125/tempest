import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';

import { Profile } from './Profile';
import AnimatedSpinner from './AnimatedSpinner';
import { useMockQuery } from './useMockQuery';
import { mockSummoner } from './mockData/summoner';
import { queueFromQueueType } from './rankedData';

/*
  id: ID
  accountId: ID
  puuid: ID
  name: string!
  profileIconId: ID
  revisionDate: string,
  summonerLevel: Int
*/
const GET_PROFILE = gql`
  query GetProfile($username: string) {
    summoner(username: $username) {
      id
      accountId
      name
      profileIconId
      revisionDate
      summonerLevel

      matchHistory {
        totalGames
        matches {
          platformId
          gameId
          champion
          queue
          season
          role
          lane
          timestamp
        }
      }

      leagueEntries {
        entries {
          queueType
          tier
          rank
          leaguePoints
          wins
          losses
          veteran
          inactive
          freshBlood
          hotStreak
        }
      }
    }
  }
`;

const ProfilePage: FC = () => {
  const { loading, error, data } = useMockQuery(mockSummoner);
  // const { loading, error, data } = useQuery(GET_PROFILE, {
  //   variables: { username: 'Arcia125' },
  // });
  if (loading) return <AnimatedSpinner />;
  if (error) {
    console.error(error);
    return <p>Something went wrong</p>;
  }
  const { summonerLevel, name, matchHistory, leagueEntries } = mockSummoner;
  const [entry] = leagueEntries.entries;
  console.log(entry);
  return (
    <Profile
      username={name}
      summonerLevel={summonerLevel}
      matchHistory={matchHistory}
      rankedBadgeProps={{
        tier: entry.tier.toLowerCase(),
        rank: entry.rank,
        queue: queueFromQueueType(entry.queueType),
      }}
    />
  );
};

ProfilePage.propTypes = {};

export default ProfilePage;
