import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddContactForm from '../components/AddContactForm';
import ContactsDisplay from '../components/ContactsDisplay';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const Routes = ({
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
}) => {
  return (
    <Switch>
      <Route exact path="/">
        <AddContactForm
          setContacts={setContacts}
          options={options}
          handleOptionAddition={handleOptionAddition}
          notify={notify}
        />
        <ContactsDisplay
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          handleOptionAddition={handleOptionAddition}
          notify={notify}
        />
      </Route>
      <Route exact path="/register">
        <RegisterForm />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
    </Switch>
  );
};

export default Routes;
