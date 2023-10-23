import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Button,
  Row,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { baseURL } from "../../environments";
import PlaceComponent from "../placecomponent/PlaceComponent";

export default function DisplayPromo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const promoID = queryParams.get('promo_id');

  console.log(promoID);


  const navigate = useNavigate();

  //! useStates
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessiontoken, setSessionToken] = useState();


  //! useEffects

  useEffect(() => { setSessionToken(localStorage.token); }, []
  )

  useEffect(() => {

    fetchPromo();
    console.log(promo);

  }, [sessiontoken]);


  //! Fetch Promo
  const fetchPromo = async () => {
    console.log(`promoID : ${promoID}`);
    console.log(`sessiontoken : ${sessiontoken}`);
    const url = `${baseURL}/promo/getone/${promoID}`;
    const requestOption = {
      method: "GET",
      headers: new Headers({
        Authorization: sessiontoken,
      }),
    };
    try {
      const res = await fetch(url, requestOption);
      const data = await res.json();
      console.log(`data : ${JSON.stringify(data)}`);
      console.log(`data : ${data.results}`);
      setPromo(data.results);

    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false)

    }
  };

  //! Display
  const displayPromo = () => {
    console.log("DISPLAY Promo", promo);


    const startDateFormatter = new Date(promo[0].startDate);
    const startDateFomatted = startDateFormatter.toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
    const endDateFormatter = new Date(promo[0].endDate);
    const endDateFomatted = endDateFormatter.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return (
      <div>
        <h2>{promo[0].promoText}</h2>
        <Row className="d-flex justify-content-center">
          <Card className="card rounded-lg"
            style={{
              width: "18rem",
            }}
          >
            <div className="card-image-container">
              <img alt="Sample" class="card-image" src="https://picsum.photos/300/200" />
            </div>
            <CardBody>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                <p>Promo Active Between Start and End date Below</p>
              </CardSubtitle>
              <CardText>
                <ul>
                  <li>Start Date: {startDateFomatted}</li>
                  <li>End Date: {endDateFomatted}</li>
                </ul>
                <PlaceComponent

                  currentAddress={promo[0].promoPlace.formattedAddress}
                />
              </CardText>
              <Button
                color="success"
                onClick={() =>
                  navigate(
                    `/inflHome/reviewPromo?drink_id=${promo[0].drinkID}&promo_id=${promo[0]._id}`
                  )
                }
              >
                Review
              </Button>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  };


  return (
    <>
      {loading ? (

        <p>Loading...</p>
      ) : promo && promo.length > 0 ? (
        displayPromo()
      ) : (
        <p>No data found.</p>
      )}</>
  )
}