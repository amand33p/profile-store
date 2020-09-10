import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import contactService from '../services/contacts';
import authService from '../services/auth';
import storageService from '../utils/localStorageHelpers';

import { Form, Button, Icon, Header } from 'semantic-ui-react';

const RegisterForm = ({ setUser }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const { displayName, email, password } = userDetails;

  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    if (password !== confirmPassword) return console.log('confirm pass failed');
    e.preventDefault();
    try {
      const user = await authService.register(userDetails);
      setUser(user);
      contactService.setToken(user.token);
      storageService.saveUser(user);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      <Form.Input
        required
        placeholder="For ex. Ben Awad"
        label="Dispay Name"
        type="text"
        name="displayName"
        value={displayName}
        onChange={handleOnChange}
        icon="user"
        iconPosition="left"
      />
      <Form.Input
        required
        placeholder="For ex. abc@example.com"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleOnChange}
        icon="at"
        iconPosition="left"
      />
      <Form.Input
        required
        placeholder="Password must have minimum characters of 6."
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handleOnChange}
        icon="lock"
        iconPosition="left"
      />
      <Form.Input
        required
        placeholder="Confirm Password"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        icon="lock"
        iconPosition="left"
      />

      <Button
        animated="vertical"
        color="teal"
        icon
        labelPosition="left"
        type="submit"
        floated="right"
        size="large"
      >
        <Icon name="signup" />
        Register
      </Button>
      <Header as="h4">
        {' '}
        Already have an account? <Link to="/login">Login.</Link>
      </Header>
    </Form>
  );
};

export default RegisterForm;
