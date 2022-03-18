import {
  Link,
} from "react-router-dom";
import styled from "styled-components";
import * as React from "react";

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

const Navbar = () => (
  <List>
    <ListItem>
      <Linking><Link to="/">Home</Link></Linking>
      <Linking><Link to="/">Jobs</Link></Linking>
      <Linking><Link to="/Vehicle" >Vehicle</Link></Linking>
    </ListItem>
  </List>
);

export default Navbar;