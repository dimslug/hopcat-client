import React, { useRef } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import FullButton from '../buttons/FullButton';

function ProfileForm() {

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const profilePicRef = useRef();
    const aboutMeRef = useRef();
    const socialMediaLinksRef = useRef();
    const locationRef = useRef();

    const fetchProfile = async () => {
        
    };


    return (

        // create a form that will allow the user to update their profile with new information for First Name, Last Name, Email, Password, Profile Picture Upload, About Me, Social Media Links, and Location using reactstrap
        <>
            <h2>Update Profile</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup floating>
                    <Input type="text"
                        innerRef={firstNameRef}
                        id='firstname'
                        name='firstname'
                        placeholder='First Name'
                    />
                    <Label for='firstname'>
                        First Name
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                        innerRef={lastNameRef}
                        id='lastname'
                        name='lastname'
                        placeholder='Last Name'
                    />
                    <Label for='lastname'>
                        Last Name
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='email'
                        innerRef={emailRef}
                        id='email'
                        name='email'
                        placeholder='Email'
                    />
                    <Label for='email'>
                        Email
                    </Label>
                </FormGroup>
                <FormGroup floating>
                <Input
                        innerRef={passwordRef}
                        id='password'
                        name='password'
                        placeholder='Password'
                        type='password'
                    />
                    <Label for='password'>
                        Password
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='file'
                        innerRef={profilePicRef}
                        id='profilePic'
                        name='profilePic'
                        placeholder='Profile Picture'
                    />
                    <Label for='profilePic'>
                        Profile Picture
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                        innerRef={aboutMeRef}
                        id='aboutMe'
                        name='aboutMe'
                        placeholder='About Me'
                    />
                    <Label for='aboutMe'>
                        About Me
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                        innerRef={socialMediaLinksRef}
                        id='socialMediaLinks'
                        name='socialMediaLinks'
                        placeholder='Social Media Links'
                    />
                    <Label for='socialMediaLinks'>
                        Social Media Links
                    </Label>
                </FormGroup>
                <FormGroup floating>
                    <Input type='text'
                    innerRef={locationRef}
                    id='location'
                    name='location'
                    placeholder='Location'/>
                    <Label for='location'>
                        Location
                    </Label>
                </FormGroup>
                <FullButton>
                    <Button type='submit'>Update Profile</Button>
                </FullButton>
            </Form>
        </>

    );
}

export default ProfileForm