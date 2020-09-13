import React from 'react';
import ContactCard from './ContactCard';
import ContactsLoader from './ContactsLoader';
import { Header, Icon } from 'semantic-ui-react';

const ContactsDisplay = ({
  contacts,
  setContacts,
  search,
  options,
  handleOptionAddition,
  notify,
  isLoading,
}) => {
  const filterByName = (contact, search) => {
    return contact.name.toLowerCase().includes(search.toLowerCase());
  };

  const filterByProfileLinks = (contact, search) => {
    const urlsArray = contact.contacts.map((c) => c.url);

    return urlsArray.find((u) =>
      u.toLowerCase().includes(search.toLowerCase())
    );
  };

  const contactsToDisplay = contacts.filter(
    (c) => filterByName(c, search) || filterByProfileLinks(c, search)
  );

  return (
    <div className="contacts-display">
      {search !== '' && contactsToDisplay.length !== 0 && (
        <Header className="main-text">
          <Icon name="searchengin" />
          Showing search results for query "{search}"
        </Header>
      )}
      {isLoading ? (
        <ContactsLoader />
      ) : (
        contactsToDisplay.map((contact) => (
          <ContactCard
            contact={contact}
            contacts={contacts}
            setContacts={setContacts}
            options={options}
            handleOptionAddition={handleOptionAddition}
            key={contact.id}
            notify={notify}
          />
        ))
      )}
      {search !== '' && contactsToDisplay.length === 0 && (
        <Header textAlign="center" as="h2" className="main-text">
          <Icon name="searchengin" />
          Search: No matches found for "{search}"
        </Header>
      )}
      {!isLoading && search === '' && contactsToDisplay.length === 0 && (
        <Header textAlign="center" as="h2" className="main-text">
          <Icon name="info" />
          No contacts added yet.
        </Header>
      )}
    </div>
  );
};

export default ContactsDisplay;
