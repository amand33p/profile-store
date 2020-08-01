import React from 'react';
import LinkFormModal from './LinkFormModal';
import DeleteModal from './DeleteModal';
import { Card, List } from 'semantic-ui-react';

const ContactCard = ({
  contact,
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
}) => {
  const siteIcons = [
    'facebook',
    'github',
    'youtube',
    'twitter',
    'instagram',
    'blogger',
    'linkedin',
    'reddit',
  ];

  return (
    <Card fluid>
      <Card.Content style={{ justifyContent: 'center' }}>
        <h2>
          {contact.name}
          <DeleteModal
            type="contact"
            contact={contact}
            contacts={contacts}
            setContacts={setContacts}
            id={contact.id}
            notify={notify}
          />
        </h2>
      </Card.Content>
      <Card.Content>
        <List divided relaxed animated>
          {contact.contacts.map((c) => (
            <List.Item key={c + c.id}>
              <List.Icon
                name={
                  siteIcons.includes(c.site.toLowerCase())
                    ? c.site.toLowerCase()
                    : 'add circle'
                }
                color="black"
              />
              <List.Content>
                <List.Header>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      c.url.startsWith('https://' || 'http://')
                        ? `${c.url}`
                        : `https://${c.url}`
                    }
                  >
                    {c.url}
                  </a>
                  <LinkFormModal
                    id={contact.id}
                    urlId={c.id}
                    contacts={contacts}
                    setContacts={setContacts}
                    options={options}
                    handleOptionAddition={handleOptionAddition}
                    urlToEdit={c.url}
                    siteToEdit={c.site}
                    type="edit"
                    notify={notify}
                  />
                  <DeleteModal
                    type="link"
                    contact={contact}
                    contacts={contacts}
                    setContacts={setContacts}
                    id={contact.id}
                    urlId={c.id}
                    urlLink={c.url}
                    urlName={c.site}
                    notify={notify}
                  />
                </List.Header>
                <List.Description as="a">{c.site}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <LinkFormModal
          id={contact.id}
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          handleOptionAddition={handleOptionAddition}
          type="add"
          notify={notify}
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
