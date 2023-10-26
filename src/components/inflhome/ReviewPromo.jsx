import React, { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Row, Nav } from 'reactstrap';
import { TEInput } from "tw-elements-react"
import FullButton from '../buttons/FullButton';
import { baseURL } from "../../environments";
import HopSpotNav from '../nav/Nav';

export default function ReviewPromo(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const inflID = localStorage.getItem('influencerID');
    const promoID = queryParams.get('promo_id');
    const sessiontoken = localStorage.getItem('token')
   

    const navigate = useNavigate();

 //! UseStates
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(0);
  const [drinkID, setDrinkID] = useState()
  const [creatorID, setCreatorID] = useState()
  

    console.log(promoID)
    console.log(inflID)
    let promoCreatorID = ''
    let promoDrinkID = ''

//! Rating Selector event handlers
    const handleRating = (value) => {
      setRating(value);
      console.log(rating)
    }
  
    //! HandleSubmit
    const handleSubmit = async (e) => {
      e.preventDefault();
      const description = descriptionRef.current.value;
      // const photo = photoRef.current.value;
  
      let body = JSON.stringify({
        promoID,
        inflID,
        rating,
        description,
        // photo,
  
      });
      console.log(body)
      let url = `${baseURL}/reviews/review`;
  
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
        getDrinkID()
       
      } catch (err) {
        console.error(err.message);
      }
    };

    //! UpdateDrink -- Step One
    const getDrinkID = async () => {
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
      console.log(data.results[0].drinkID)
      promoDrinkID = (data.results[0].drinkID);
      promoCreatorID = (data.results[0].creatorID)
      
    } catch (err) {
      console.error(err.message);
    } finally {
        updateDrinkReviewDB()
      
    }
  };
    
 //! UpdateDrink -- Step Two
 const updateDrinkReviewDB = async () => {
 
  console.log('inside updateDrinkReviewDB :', promoDrinkID)
const requestBody = {};

  requestBody.creatorID = promoCreatorID
  // requestBody.drinkID = promoDrinkID
  requestBody.ratings = rating
  

  console.log(`Data from form payload : ${JSON.stringify(requestBody)}`);

  let url = `${baseURL}/drink/review/${promoDrinkID}`;

  let headers = new Headers();
  headers.append(`Content-Type`, `application/json`);
  headers.append("Authorization", sessiontoken);

  const requestOptions = {
    headers: headers,
    body: JSON.stringify(requestBody),
    method: "PATCH",
  };

  try {
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    console.log(data.results)
    navigate("/inflHome");
  } catch (err) {
    console.error(err.message);
  }
};
  
    const descriptionRef = useRef();
    const ratingRef = useRef();
    const photoRef = useRef();
    
  return (
    <>
    <HopSpotNav
   inflID={inflID} />
    
    Review Promo
    <Form onSubmit={handleSubmit}>
    <FormGroup>
          <Label>Comment</Label>
          <Input
            name="ratingDescription"
            innerRef={descriptionRef}
            type="string"
          ></Input>
        </FormGroup>
        <div class="tw-mb-3">
  <label
    for="formFile"
    class="tw-mb-2 tw-inline-block tw-text-neutral-700 tw-dark:text-neutral-200"
    >Photo
    </label>
  <input
    class="tw-relative tw-m-0 tw-block tw-w-full tw-min-w-0 tw-flex-auto tw-rounded tw-border tw-border-solid tw-border-neutral-300 tw-bg-clip-padding tw-px-3 tw-py-[0.32rem] tw-text-base tw-font-normal tw-text-neutral-700 tw-transition tw-duration-300 tw-ease-in-out tw-file:-mx-3 tw-file:-my-[0.32rem] tw-file:overflow-hidden tw-file:rounded-none tw-file:border-0 tw-file:border-solid tw-file:border-inherit tw-file:bg-neutral-100 tw-file:px-3 tw-file:py-[0.32rem] tw-file:text-neutral-700 tw-file:transition tw-file:duration-150 tw-file:ease-in-out tw-file:[border-inline-end-width:1px] tw-file:[margin-inline-end:0.75rem] tw-hover:file:bg-neutral-200 tw-focus:border-primary tw-focus:text-neutral-700 tw-focus:shadow-te-primary tw-focus:outline-none tw-dark:border-neutral-600 tw-dark:text-neutral-200 tw-dark:file:bg-neutral-700 tw-dark:file:text-neutral-100 tw-dark:focus:border-primary"
    type="file"
    id="formFile" />
</div>
    <Label>Rating</Label>
    
        <ul className="tw-my-1 tw-flex tw-justify-center tw-list-none tw-gap-1 tw-p-0" data-te-rating-init>
          {Array.from({ length: 5 }).map((_, index) => (
      <li key={index}>
      <span
      className={`tw-text-primary hover:tw-outline-none hover:tw-outline-primary hover:tw-transition tw-duration-300 [&>svg]:h-5 [&>svg]:w-5 ${
        rating >= index + 1 ? "text-warning" : "tw-outline tw-outline-primary"
      }`}
      data-te-rating-icon-ref
      onClick={() => handleRating(index + 1)}
      >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
  <path fill-rule="evenodd" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
        </span>
      </li>
      ))}
      </ul>
      <Row className="d-flex">
      {/* <!-- Facebook --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="tw-h-5 tw-w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>

      {/* <!-- Messenger --> */}
      <svg
        className="tw-h-5 tw-w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
      </svg>

      {/* <!-- Formally Known As Twitter --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
      </svg>

      {/* <!-- Instagram --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>

      {/* <!-- Pinterest --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>

      {/* <!-- Telegram --> */}
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.41421",
        }}
      >
        <path
          id="telegram-1"
          d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"
        />
      </svg>

      {/* <!-- Snapchat --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" />
      </svg>


      {/* <!-- Reddit --> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z" />
      </svg>
      </Row>
    <FullButton>
          <Button color="success">Share Review</Button>
        </FullButton> 
    </Form>
    </>
  )
}
