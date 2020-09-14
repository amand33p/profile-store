import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FormError from './FormError';
import contactService from '../services/contacts';
import authService from '../services/auth';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Segment, Form, Button, Icon, Header } from 'semantic-ui-react';

const LoginForm = ({ setUser, notify }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    message: `Email: 'test@test.com' & password: 'password'`,
    title: 'Demo Account Credentials',
    positive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const history = useHistory();

  const { email, password } = credentials;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await authService.login(credentials);
      setUser(user);
      contactService.setToken(user.token);
      storageService.saveUser(user);
      setIsLoading(false);
      setError(null);

      notify(`Welcome ${user.displayName}, you're logged in!`, {
        appearance: 'success',
      });
      history.push('/');
    } catch (err) {
      setIsLoading(false);
      const errRes = err.response.data;

      if (errRes && errRes.error) {
        return setError({ message: errRes.error });
      } else {
        return setError({ message: err.message });
      }
    }
  };

  return (
    <Segment className="login-reg-card">
      <Header as={isMobile ? 'h3' : 'h2'} textAlign="center">
        <Icon name="sign-in" />
        Login to your account
      </Header>
      <Form onSubmit={handleLogin} className="auth-form">
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
          type={showPass ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={handleOnChange}
          icon="lock"
          iconPosition="left"
          action={
            password !== '' && {
              icon: showPass ? 'eye slash' : 'eye',
              onClick: () => setShowPass(!showPass),
            }
          }
        />

        <Button
          animated="vertical"
          color="teal"
          icon
          labelPosition="left"
          type="submit"
          floated="right"
          loading={isLoading}
          size={isMobile ? 'small' : 'large'}
          fluid={isMobile}
        >
          <Icon name="sign-in" />
          Login
        </Button>
        <Header
          as="h4"
          textAlign={isMobile ? 'center' : ''}
          className="login-reg-bottom-text"
        >
          Don't have an account? <Link to="/register">Register.</Link>
        </Header>
      </Form>
      {error && (
        <FormError
          message={error.message}
          title={error.title}
          positive={error.positive}
          setError={setError}
        />
      )}
    </Segment>
  );
};

export default LoginForm;
