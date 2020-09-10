import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Routes from './components/Routes';
import contactService from './services/contacts';
import optionsArray from './utils/optionsArray';
import storageService from './utils/localStorageHelpers';

import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState(optionsArray);

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
        const contacts = await contactService.getAll();
        setContacts(contacts);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getAllContacts();
    }
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
    <Container>
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
      />
    </Container>
  );
};

export default App;
