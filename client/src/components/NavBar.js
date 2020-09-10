import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <Menu color="teal">
      <Menu.Item header>
        <Icon name="user circle outline" />
        Profile Store
      </Menu.Item>
      <Menu.Item
        as={Link}
        name="Home"
        to="/"
        active={location.pathname === '/'}
      />
      <Menu.Item
        as={Link}
        name="Register"
        to="/register"
        active={location.pathname === '/register'}
      />
      <Menu.Item
        as={Link}
        name="Login"
        to="/login"
        active={location.pathname === '/login'}
      />
    </Menu>
  );
};

export default NavBar;
