import React from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';

const NavBar = ({ user, setUser }) => {
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleLogout = () => {
    setUser(null);
    storageService.logoutUser();
  };

  const logoutMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu>
          <Dropdown.Item>{`Hi, ${user.displayName}`}</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <>
        <Menu.Item>{`Hi, ${user.displayName}`}</Menu.Item>
        <Menu.Item name="Logout" onClick={handleLogout} />
      </>
    );
  };

  const loginRegisterMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/register">
            Register
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/login">
            Login
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <>
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
      </>
    );
  };

  return (
    <Menu color="teal" size="large" borderless={isMobile ? true : false}>
      <Menu.Item header>
        <Icon name="user circle outline" color="teal" />
        Profile Store
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? <>{logoutMenu()}</> : <>{loginRegisterMenu()}</>}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
