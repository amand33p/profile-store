import React, { useState } from 'react';
import { Form, Button, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const { displayName, email, password } = userDetails;

  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    if (password !== confirmPassword) return console.log('confirm pass failed');
    e.preventDefault();
    console.log('registred', displayName, email, password);
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
        icon="mail"
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
