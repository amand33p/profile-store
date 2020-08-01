import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const NavBar = ({ page, setPage }) => {
  const handleNav = (e, data) => {
    setPage(data.name);
  };

  return (
    <Menu color="teal">
      <Menu.Item header>
        <Icon name="user circle outline" />
        Profile Finder
      </Menu.Item>
      <Menu.Item
        as="a"
        name="Home"
        active={page === 'Home'}
        onClick={handleNav}
      />
      <Menu.Item
        as="a"
        name="About"
        active={page === 'About'}
        onClick={handleNav}
      />
    </Menu>
  );
};

export default NavBar;
