
import "./App.css";
import Auth from "./components/auth/Auth";
import { useEffect, useState } from "react";
import Nav from "./components/nav/Nav";
import InflHome from "./components/inflhome/InflHome";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import CreatorIndex from "./components/creator/CreatorIndex";
import CreateIndex from "./components/createforms/CreateIndex";
import EditIndex from "./components/editforms/EditIndex";


function App() {
  // Token use state set up
  const [sessiontoken, setSessionToken] = useState("");
  const [creatorID, setCreatorID] = useState("");

  console.log("Token: ", sessiontoken);

    const updateToken = (newToken) => {
      localStorage.setItem("token", newToken);
      setSessionToken(newToken);
    };

    const updateCreatorID = (newCreatorID) => {
      localStorage.setItem('creatorID', newCreatorID)
      setCreatorID(newCreatorID);
    }
  
   // Token use ref set up
    useEffect(() => {
      if (localStorage.getItem("token")) {
   
        setSessionToken(localStorage.getItem("token"));
      }
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPageProp = queryParams.get('currentPage');

  return (

    <div className="App">
    {/* {sessiontoken !== "" ? (
      <Logout setSessionToken={setSessionToken} />
    ) : null} */}
       <Nav setSessionToken={setSessionToken}
        sessiontoken={sessiontoken} />
    <Routes>
      <Route path="/" element={<Auth 
      updateToken={updateToken} 
      updateCreatorID={updateCreatorID}
        />} />
    
    <Route path="/creator/frontpage" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken} 
    setCreatorID={setCreatorID}
    creatorID={creatorID}
    />
    }
    />
  
    <Route path="/creator/drinks" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'drinks'}
    />
    }
    />
 
    <Route path="/creator/promos" element={<CreatorIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={'promos'}
    />
    }
    />
 
         <Route path="/creator/create" element={<CreateIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={currentPageProp}
    />
    }
    />
        <Route path="/creator/edit" element={<EditIndex 
    setSessionToken={setSessionToken}
    sessiontoken={sessiontoken}
    setCreatorID={setCreatorID} 
    creatorID={creatorID}
    currentPage={currentPageProp}
    />
    }
    />

   
        
      
        <Route path="/" element={<Auth updateToken={updateToken} />} />
        <Route path="/inflHome" element={<InflHome updateToken={updateToken} />} />

      </Routes>

      <Footer />
    </div>

  );
}

export default App;