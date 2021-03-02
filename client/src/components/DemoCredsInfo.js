import React from 'react';
import { Message } from 'semantic-ui-react';
import demoCredentials from '../data/demoCreds';

const DemoCredsInfo = () => {
  return (
    <Message header="Demo Account Credentials" content={demoCredentials} />
  );
};

export default DemoCredsInfo;
