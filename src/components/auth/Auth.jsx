import React, { useState } from 'react'
import CreatorSignup from './creatorsignup/CreatorSignup'
import CreatorLogin from './creatorlogin/CreatorLogin';
import InflLogin from './inflLogin/InflLogin';
import InflSignup from './inflSignup/InflSignup';
import { Button, Col, Container, Row } from 'reactstrap';

function Auth(props) {

    const [button, setButton] = useState('Signup')
    const [typeButton, setTypeButton] = useState('Creator')

    const swapForm = () => {
        button === "Login" ?
            setButton('Signup') :
            setButton('Login')
    }

    const swapFormType = () => {
        typeButton === "Influencer" ?
            setTypeButton('Creator') :
            setTypeButton('Influencer')
    }

    const displayForm = () => {
        return (
            typeButton === "Influencer" ?
                button === "Login" ?
                <Row>
                    <Col md="6">

                        <CreatorSignup
                            updateToken={props.updateToken}
                            updateCreatorID={props.updateCreatorID}
/>
                     
                    </Col>
                </Row> :
                <Row>
                    <Col md="6">

                        <CreatorLogin
                            updateToken={props.updateToken}
                            updateCreatorID={props.updateCreatorID}
/>
                     
                    </Col>
                </Row>

            :
            button === "Login" ?
            <Row>
                <Col md="6">
                <InflSignup
                            updateToken={props.updateToken}

                        />

                </Col>
            </Row> :
            <Row>
                <Col md="6">
                <InflLogin
                            updateToken={props.updateToken}
                            username={props.currentUsername}

                        />
                </Col>
            </Row>
        )
    }
    
    return (
        <>


            <Container>
                {displayForm()}
                <Row>
                <Button onClick={swapForm} color='dark'>{button}</Button>
                <Button onClick={swapFormType} color='dark'>{typeButton}</Button>
                </Row>
            </Container>


        </>
    )
   
}

export default Auth