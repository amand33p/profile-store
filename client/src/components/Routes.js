import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from './Search';
import AddContactModal from '../components/AddContactModal';
import ContactsDisplay from '../components/ContactsDisplay';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import storageService from '../utils/localStorageHelpers';

const Routes = ({
  contacts,
  setContacts,
  user,
  setUser,
  search,
  setSearch,
  options,
  handleOptionAddition,
  notify,
  isLoading,
  isDarkMode,
}) => {
  return (
    <Switch>
      <Route exact path="/">
        {storageService.loadUser() || user ? (
          <>
            <Search
              setSearch={setSearch}
              search={search}
              isDarkMode={isDarkMode}
            />
            <AddContactModal
              setContacts={setContacts}
              options={options}
              handleOptionAddition={handleOptionAddition}
              notify={notify}
              isDarkMode={isDarkMode}
            />
            <ContactsDisplay
              contacts={contacts}
              setContacts={setContacts}
              search={search}
              options={options}
              handleOptionAddition={handleOptionAddition}
              notify={notify}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
          </>
        ) : (
          <Redirect to="login" />
        )}
      </Route>
      <Route exact path="/register">
        <RegisterForm
          setUser={setUser}
          notify={notify}
          isDarkMode={isDarkMode}
        />
      </Route>
      <Route exact path="/login">
        <LoginForm setUser={setUser} notify={notify} isDarkMode={isDarkMode} />
      </Route>
    </Switch>
  );
};

export default Routes;
