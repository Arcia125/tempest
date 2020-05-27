import React from 'react'
import PropTypes from 'prop-types'
import UsernamePlate from './UsernamePlate'
import RankedBadge from './RankedBadge'
import MatchHistory from './MatchHistory'

const Profile = props => {
  return (
    <div>
      <UsernamePlate username="Arcia125"/>
      <RankedBadge league="Ranked Solo" rank="Silver 4" />  
      <MatchHistory />
    </div>
  )
}

Profile.propTypes = {

}

export { Profile };
