import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const About = () => {
  return (
    <Header as="h1" icon textAlign="center">
      <Icon name="address card outline" />
      About
      <Header.Subheader>
        <p>
          A MERN stack app developed by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/lostghost-dev"
          >
            Bigyan Koirala
          </a>
          ,{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/amand33p"
          >
            Amandeep S.
          </a>{' '}
          and{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/sahilrajput03"
          >
            Sahil Rajput
          </a>
          .
        </p>
        <p>
          The original idea was, to have an app where we can save the profiles
          of popular and powerful software devs, teachers, at one place for our
          own comfort.
        </p>
      </Header.Subheader>
    </Header>
  );
};

export default About;
