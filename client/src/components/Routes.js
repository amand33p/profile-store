import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddContactForm from '../components/AddContactForm';
import ContactsDisplay from '../components/ContactsDisplay';

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
    </Switch>
  );
};

export default Routes;
