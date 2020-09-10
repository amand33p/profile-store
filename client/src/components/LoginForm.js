import React, { useState } from 'react';
import { Form, Button, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = credentials;

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('logged in', email, password);
  };

  return (
    <Form onSubmit={handleLogin}>
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

      <Button
        animated="vertical"
        color="teal"
        icon
        labelPosition="left"
        type="submit"
        floated="right"
        size="large"
      >
        <Icon name="sign-in" />
        Login
      </Button>
      <Header as="h4">
        Don't have an account? <Link to="/register">Register.</Link>
      </Header>
    </Form>
  );
};

export default LoginForm;
