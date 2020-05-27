import React from 'react'
import PropTypes from 'prop-types'

const RankedBadge = ({ league, rank }) => {
  return (
    <div>
      <p>{league}</p>
      <p>{rank}</p>
    </div>
  )
}

RankedBadge.propTypes = {

}

export default RankedBadge
