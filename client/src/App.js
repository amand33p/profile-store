import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import contactService from './services/contacts';
import { optionsArray } from './utils/arraysAndFuncs';
import storageService from './utils/localStorageHelpers';
import { useToasts } from 'react-toast-notifications';
import { Container, Segment } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState(optionsArray);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { addToast: notify } = useToasts();

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
        notify(err.message, {
          appearance: 'error',
        });
      }
    };

    if (user) {
      getAllContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const darkMode = storageService.loadDarkMode();
    if (darkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const handleOptionAddition = (e, data) => {
    setOptions((prevState) => [
      {
        key: data.value,
        text: data.value,
        value: data.value,
        icon: 'linkify',
      },
      ...prevState,
    ]);
  };

  return (
    <Segment className="main-segment" inverted={isDarkMode}>
      <Container className="container">
        <NavBar
          user={user}
          setUser={setUser}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <Routes
          contacts={contacts}
          setContacts={setContacts}
          user={user}
          setUser={setUser}
          search={search}
          setSearch={setSearch}
          options={options}
          handleOptionAddition={handleOptionAddition}
          notify={notify}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
        />
      </Container>
    </Segment>
  );
};

export default App;
