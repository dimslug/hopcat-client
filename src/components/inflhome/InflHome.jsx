import React from 'react'
import UpcomingPromos from './UpcomingPromos'
import Nav from '../nav/Nav'

function InflHome( props ) {
    console.log(props)


    const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;

    return (
        <>
        <UpcomingPromos />
        </>
    )
}

export default InflHome