import {
  Link,
} from "react-router-dom";
import styled from "styled-components";
import * as React from "react";

const Navbar = () => (
  <List>
    <ListItem>
      <Linking><Link to="/">Home</Link></Linking>
      <Linking><Link to="/jobs">Jobs</Link></Linking>
      <Linking><Link to="/vehicle" >Vehicle</Link></Linking>
      <Linking><Link to="/drivers" >Drivers</Link></Linking>

    </ListItem>
  </List>
);

const List = styled.nav`
  list-style-type: none;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const ListItem = styled.ul`
  list-style-type: none;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Linking = styled.li`
  margin-right: 20px;
  font-size: 20px;
  text-transform: uppercase;
  color: #0c0b0b;
  cursor: pointer;
`;

export default Navbar;