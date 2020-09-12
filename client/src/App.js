import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Routes from './components/Routes';
import contactService from './services/contacts';
import { optionsArray } from './utils/arraysAndFuncs';
import storageService from './utils/localStorageHelpers';

import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState(optionsArray);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      setUser(loggedUser);
      contactService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        setIsLoading(true);
        const contacts = await contactService.getAll();
        setContacts(contacts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        notify(err.message, 'red');
      }
    };

    if (user) {
      getAllContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  let timeoutId = null;

  const notify = (message, color) => {
    clearTimeout(timeoutId);
    setNotification({ message, color });
    timeoutId = setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleOptionAddition = (e, data) => {
    setOptions((prevState) => [
      {
        key: data.value,
        text: data.value,
        value: data.value,
        icon: 'add circle',
      },
      ...prevState,
    ]);
  };

  return (
    <Container className="container">
      <NavBar user={user} setUser={setUser} />
      <Notification notification={notification} />
      <Routes
        contacts={contacts}
        setContacts={setContacts}
        user={user}
        setUser={setUser}
        options={options}
        handleOptionAddition={handleOptionAddition}
        notify={notify}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default App;
