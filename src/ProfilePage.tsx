import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Profile } from './Profile';
import AnimatedSpinner from './AnimatedSpinner';
import { clearTimeout } from 'timers';
import { useMockQuery } from './useMockQuery';

/*
  id: ID
  accountId: ID
  puuid: ID
  name: String!
  profileIconId: ID
  revisionDate: String,
  summonerLevel: Int
*/
const GET_SUMMONER = gql`
  query GetSummoner($username: String) {
    summoner(username: $username) {
      id
      accountId
      name
      profileIconId
      revisionDate
      summonerLevel
    }
  }
`;

const ProfilePage = (props) => {
  const hardCodedUserName = 'Arcia125';
  const summonerQuery = useMockQuery({
    id: 'DIDIaRatq8OMKvidt6JKDE4OT3u41pnrg8LfDrL9ca0eLAM',
    accountId: 'OZ9T-2DxV4E5tyoxCMDfOwXdK5Gt1OSapBVmUVHgTxdiAw',
    name: 'Arcia125',
    profileIconId: '4576',
    revisionDate: '1590624238000',
    summonerLevel: 105,
    __typename: 'Summoner',
  });
  // const { loading, error, data } = useQuery(GET_SUMMONER, {
  //   variables: { username: hardCodedUserName },
  // });
  if (summonerQuery.loading) return <AnimatedSpinner />;
  if (summonerQuery.error)
    return (
      <p>
        Something went wrong{' '}
        {summonerQuery.error && summonerQuery.error.message}
      </p>
    );
  const { summonerLevel, name } = summonerQuery.data;
  return <Profile username={name} summonerLevel={summonerLevel} />;
};

ProfilePage.propTypes = {};

export default ProfilePage;
