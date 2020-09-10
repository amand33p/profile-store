import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Routes from './components/Routes';
import contactService from './services/contacts';
import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState(null);
  const [options, setOptions] = useState([
    { key: 'fb', text: 'Facebook', value: 'Facebook', icon: 'facebook' },
    { key: 'ig', text: 'Instagram', value: 'Instagram', icon: 'instagram' },
    { key: 'tw', text: 'Twitter', value: 'Twitter', icon: 'twitter' },
    { key: 'gh', text: 'Github', value: 'Github', icon: 'github' },
    { key: 'yt', text: 'Youtube', value: 'Youtube', icon: 'youtube' },
  ]);

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const contacts = await contactService.getAll();
        setContacts(contacts);
      } catch (error) {
        console.log(error);
      }
    };

    getAllContacts();
  }, []);

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
      <NavBar />
      <Notification notification={notification} />
      <Routes
        contacts={contacts}
        setContacts={setContacts}
        options={options}
        handleOptionAddition={handleOptionAddition}
        notify={notify}
      />
    </Container>
  );
};

export default App;
