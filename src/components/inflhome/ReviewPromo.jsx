import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Label, Button } from 'reactstrap';
import { TEInput } from "tw-elements-react"
import FullButton from '../buttons/FullButton';
import { baseURL } from "../../environments";

export default function ReviewPromo() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const drinkID = queryParams.get('drink_id');
    const promoID = queryParams.get('promo_id');

    const navigate = useNavigate();

 //! UseStates
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(0);

    console.log(promoID)
    console.log(drinkID)

//! Primary Category & Price Selector event handlers
const handlePrimaryCategoryChange = (e) => {
    setSelectedPrimaryCategory(e.target.value)
    console.log(selectedPrimaryCategory)
  }
  
    const handlePriceSelect = (value) => {
      setSelectedPrice(value);
      console.log(selectedPrice)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // const creatorID = creatorID
      const name = nameRef.current.value;
      const cat1 = cat1Ref.current.value;
      const cat2 = cat2Ref.current.value;
      const price = selectedPrice;
      const description = descriptionRef.current.value;
      // const photo = photoRef.current.value;
  
      let body = JSON.stringify({
        creatorID,
        name,
        cat1,
        cat2,
        price,
        description,
        // photo,
  
      });
  
      let url = `${baseURL}/drink/create`;
  
      let headers = new Headers();
      headers.append(`Content-Type`, `application/json`);
      headers.append("Authorization", sessiontoken);
  
      const requestOptions = {
        headers: headers,
        body: body,
        method: "POST",
      };
  
      try {
        const res = await fetch(url, requestOptions);
        const data = await res.json();
  
        console.log(data);
        navigate("/creator/drinks");
      } catch (err) {
        console.error(err.message);
      }
    };
  
    const nameRef = useRef();
    const cat1Ref = useRef();
    const cat2Ref = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const photoRef = useRef();
    
  return (
    <>
    
    Review Promo
    <Form>
    <Label>Price</Label>
    
        <ul className="tw-my-1 tw-flex tw-justify-center tw-list-none tw-gap-1 tw-p-0" data-te-rating-init>
          {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
      <span
      className={`tw-text-primary hover:tw-outline-none hover:tw-outline-primary hover:tw-transition tw-duration-300 [&>svg]:h-5 [&>svg]:w-5 ${
        selectedPrice >= index + 1 ? "text-warning" : "tw-outline tw-outline-primary"
      }`}
      data-te-rating-icon-ref
      onClick={() => handleRating(index + 1)}
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
</svg>
        </span>
      </li>
      ))}
      </ul>
    <FullButton>
          <Button color="success">Share Review</Button>
        </FullButton> 
    </Form>
    </>
  )
}
