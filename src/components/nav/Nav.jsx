import React, { useEffect, useState } from 'react';

import '../../index.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,

} from 'reactstrap';
import Logout from '../auth/logout/Logout';


function HopSpotNav(props) {

  const sessiontoken = props.sessiontoken
  const setSessionToken = props.setSessionToken
  const creatorID = props.creatorID
  const setCreatorID = props.setCreatorID
  const inflID = props.inflID
  const setInflID = props.setInflID

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navbarBrandHref = creatorID ? '/creator/frontpage' : '/inflHome';

  return (
    <>
      <Navbar className="navbar-custom navbarcustom" {...props}>
        <NavbarBrand className="navbarcustom navbar-brand" href={navbarBrandHref}>HopSpot</NavbarBrand>
        <NavbarToggler className="navbarcustom navbar-toggler" onClick={toggle}>
          <div className='navbar-toggler-icon'></div>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto custom-collapse" navbar>
            <NavItem>
              <NavLink href="/profile/">Profile</NavLink>
            </NavItem>
            {creatorID && (
              <>
               <NavItem>
              <NavLink href="/creator/drinks">Drinks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/creator/promos">Promos</NavLink>
            </NavItem>
              </>
            )}
            <NavItem>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink> */}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Settings
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <NavbarText>Simple Text</NavbarText> */}
            {sessiontoken !== "" ? (
              <Logout
                sessiontoken={sessiontoken}
                setSessionToken={setSessionToken}
                creatorID={creatorID}
                setCreatorID={setCreatorID}
                inflID={inflID}
                setInflID={setInflID}
              />
            ) : null}
          </Nav >
        </Collapse>
      </Navbar>
    </>
  );

}

export default HopSpotNav;