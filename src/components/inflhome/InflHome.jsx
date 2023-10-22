import React from 'react'
import UpcomingPromos from './UpcomingPromos'
import Nav from '../nav/Nav'

function InflHome( props ) {
    console.log(props)


    const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;

    return (
        <>
          <Nav setSessionToken={setSessionToken}
        sessiontoken={sessiontoken} />
        <UpcomingPromos />
        </>
    )
}

export default InflHome