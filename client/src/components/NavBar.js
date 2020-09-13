import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';

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
        <Menu.Item name="Logout" onClick={handleLogout} icon="sign-out" />
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
          icon="signup"
        />
        <Menu.Item
          as={Link}
          name="Login"
          to="/login"
          active={location.pathname === '/login'}
          icon="sign-in"
        />
      </>
    );
  };

  return (
    <Menu color="teal" borderless={isMobile ? true : false}>
      <Menu.Item header className="nav-title">
        <div className="nav-logo">
          <Icon name="user circle outline" color="teal" />
          Profile Store
        </div>
        <small>
          Made with <Icon name="heart" color="pink" /> by{' '}
          <a
            href="https://github.com/amand33p"
            target="_blank"
            rel="noopener noreferrer"
          >
            amand33p
          </a>
        </small>
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? <>{logoutMenu()}</> : <>{loginRegisterMenu()}</>}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
