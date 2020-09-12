import React from 'react';
import ContactCard from './ContactCard';
import { Placeholder, Segment } from 'semantic-ui-react';

const ContactsDisplay = ({
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
  isLoading,
}) => {
  return (
    <div className="contacts-display">
      {isLoading
        ? Array.from(new Array(3)).map((a) => (
            <Segment key={a} raised>
              <Placeholder fluid>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder.Paragraph>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="full" />
                  <Placeholder.Line length="full" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          ))
        : contacts.map((contact) => (
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
