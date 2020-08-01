import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import AddContactForm from './components/AddContactForm';
import ContactsDisplay from './components/ContactsDisplay';
import Notification from './components/Notification';
import About from './components/About';
import contactService from './services/contacts';
import { Container } from 'semantic-ui-react';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState('Home');
  const [notification, setNotification] = useState(null);
  const [options, setOptions] = useState([
    { key: 'fb', text: 'Facebook', value: 'Facebook', icon: 'facebook' },
    { key: 'ig', text: 'Instagram', value: 'Instagram', icon: 'instagram' },
    { key: 'tw', text: 'Twitter', value: 'Twitter', icon: 'twitter' },
    { key: 'gh', text: 'Github', value: 'Github', icon: 'github' },
    { key: 'yt', text: 'Youtube', value: 'Youtube', icon: 'youtube' },
  ]);

  useEffect(() => {
    contactService.getAll().then((contacts) => {
      setContacts(contacts);
    });
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
      <NavBar page={page} setPage={setPage} />
      {page === 'Home' ? (
        <>
          <Notification notification={notification} />
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
        </>
      ) : (
        <>
          <About />
        </>
      )}
    </Container>
  );
};

export default App;
