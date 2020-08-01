import React from 'react';
import ContactCard from './ContactCard';

const ContactsDisplay = ({
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
}) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {contacts.map((contact) => (
        <ContactCard
          contact={contact}
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          handleOptionAddition={handleOptionAddition}
          key={contact.id}
          notify={notify}
        />
      ))}
    </div>
  );
};

export default ContactsDisplay;
