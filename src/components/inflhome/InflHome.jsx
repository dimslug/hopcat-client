import React from "react";
import UpcomingPromos from "./UpcomingPromos";
import Nav from "../nav/Nav";
import HopSpotNav from "../nav/Nav";

function InflHome(props) {
  console.log(props);

  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const inflID = props.inflID;
  const setInflID = props.setInflID;

  return (
    <>
      <HopSpotNav setSessionToken={setSessionToken} sessiontoken={sessiontoken} inflID={inflID} setInflID={setInflID}  />
      <UpcomingPromos setSessionToken={setSessionToken} sessiontoken={sessiontoken} setInflID={setInflID} inflID={inflID} />
    </>
  );
}

export default InflHome;
