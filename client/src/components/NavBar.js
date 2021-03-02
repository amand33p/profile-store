import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';

const NavBar = ({ user, setUser, isDarkMode, setIsDarkMode }) => {
  const [iconLoading, setIconLoading] = useState(false);
  const location = useLocation();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleLogout = () => {
    setUser(null);
    storageService.logoutUser();
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    setIconLoading(true);
    storageService.saveDarkMode(!isDarkMode);
    setTimeout(() => setIconLoading(false), 2150);
  };

  const logoutMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu className={isDarkMode ? 'dark-mode-menu' : ''}>
          <Dropdown.Item>
            <Icon name="user" />
            <span>{`Hi, ${user.displayName}`}</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>
            <Icon name="sign-out" />
            <span>Logout</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDarkModeToggle}>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              color={isDarkMode ? 'purple' : 'yellow'}
            />
            <span>Dark Mode: {isDarkMode ? 'ON' : 'OFF'}</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <>
        <Menu.Item>
          <Icon name="user" />
          {`Hi, ${user.displayName}`}
        </Menu.Item>
        <Menu.Item name="Logout" onClick={handleLogout} icon="sign-out" />
      </>
    );
  };

  const loginRegisterMenu = () => {
    return isMobile ? (
      <Dropdown item icon="sidebar">
        <Dropdown.Menu className={isDarkMode ? 'dark-mode-menu' : ''}>
          <Dropdown.Item as={Link} to="/register">
            <Icon name="signup" />
            <span>Register</span>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/login">
            <Icon name="sign-in" />
            <span>Login</span>
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDarkModeToggle}>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              color={isDarkMode ? 'purple' : 'yellow'}
            />
            <span>Dark Mode: {isDarkMode ? 'ON' : 'OFF'}</span>
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
    <Menu
      borderless={isMobile}
      inverted={isDarkMode}
      size="small"
      color="teal"
      className="nav-bar"
    >
      <Menu.Item header className="nav-title">
        <div className="nav-logo">
          <Icon name="user circle" />
          Profile Store
        </div>
        <small>
          Made with <Icon name="heart" color="pink" /> by{' '}
          <a
            href="https://github.com/amand33p"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            amand33p
          </a>
        </small>
      </Menu.Item>
      <Menu.Menu position="right">
        {user ? <>{logoutMenu()}</> : <>{loginRegisterMenu()}</>}
        {!isMobile && (
          <Menu.Item>
            <Icon
              name={isDarkMode ? 'moon' : 'sun'}
              size="large"
              color={isDarkMode ? 'purple' : 'yellow'}
              circular
              loading={iconLoading}
              link
              onClick={handleDarkModeToggle}
            />
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
