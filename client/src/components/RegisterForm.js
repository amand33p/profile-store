import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FormError from './FormError';
import DemoCredsInfo from './DemoCredsInfo';
import contactService from '../services/contacts';
import authService from '../services/auth';
import storageService from '../utils/localStorageHelpers';
import { useMediaQuery } from 'react-responsive';
import { Segment, Form, Button, Icon, Header } from 'semantic-ui-react';

const RegisterForm = ({ setUser, notify, isDarkMode }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { displayName, email, password } = userDetails;

  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    if (password !== confirmPassword)
      return setError(`Confirm password failed. Both passwords need to match.`);
    e.preventDefault();
    try {
      setIsLoading(true);
      const user = await authService.register(userDetails);
      setUser(user);
      contactService.setToken(user.token);
      storageService.saveUser(user);
      setIsLoading(false);
      setError(null);

      notify(`Welcome ${user.displayName}, you have successfully registered!`, {
        appearance: 'success',
      });
      history.push('/');
    } catch (err) {
      setIsLoading(false);
      const errRes = err?.response?.data;

      if (errRes?.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  return (
    <Segment
      className={
        isDarkMode ? 'login-reg-card dark-mode-segment' : 'login-reg-card'
      }
      inverted={isDarkMode}
    >
      <Header as={isMobile ? 'h3' : 'h2'} textAlign="center">
        <Icon name="signup" />
        Create an account
      </Header>
      <Form
        onSubmit={handleRegister}
        className={isDarkMode ? 'dark-mode-auth-form auth-form' : 'auth-form'}
      >
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
        <Form.Input
          required
          placeholder="Confirm Password"
          label="Confirm Password"
          type={showConfirmPass ? 'text' : 'password'}
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          icon="lock"
          iconPosition="left"
          action={
            confirmPassword !== '' && {
              icon: showConfirmPass ? 'eye slash' : 'eye',
              onClick: () => setShowConfirmPass(!showConfirmPass),
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
          <Icon name="signup" />
          Register
        </Button>
        <Header
          as="h4"
          textAlign={isMobile ? 'center' : 'left'}
          className="login-reg-bottom-text"
        >
          Already have an account? <Link to="/login">Login.</Link>
        </Header>
      </Form>
      {error && <FormError message={error} setError={setError} />}
      <DemoCredsInfo />
    </Segment>
  );
};

export default RegisterForm;
