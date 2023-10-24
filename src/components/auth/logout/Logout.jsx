import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

import '../../../App.css'

function Logout(props) {

  const sessiontoken = props.sessiontoken;
  const setSessionToken = props.setSessionToken;
  const creatorID = props.creatorID;
  const setCreatorID = props.setCreatorID;
  const inflID = props.inflID;
  const setInflID = props.setInflID;



  const navigate = useNavigate();

  const signout = () => {

   if (creatorID)  
     {
      localStorage.removeItem("creatorID")
      // setCreatorID("")
    }
    if (inflID)  
    {
     localStorage.removeItem("influencerID")
     // setInflID("")
   }
     
    

    localStorage.removeItem("token");
      // setSessionToken("");
   
    navigate("/");
  };

  const style = {
    float: 'right',
    margin: '.5em'
  }

  return (
    <>
      <Button class="custom-button"
        color="danger"
        // outline style={style} 

        onClick={signout}>
        Signout
      </Button>
    </>
  );

}

export default Logout