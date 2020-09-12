import React from 'react';
import LinkFormModal from './LinkFormModal';
import DeleteModal from './DeleteModal';
import DisplayPictureModal from './DisplayPictureModal';
import EditContactModal from './EditContactModal';
import { siteIconsArray, randomColor } from '../utils/arraysAndFuncs';

import { Header, Card, List, Label } from 'semantic-ui-react';

const ContactCard = ({
  contact,
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Header className="card-header">
          <div>
            {contact.displayPicture.exists ? (
              <DisplayPictureModal imageLink={contact.displayPicture.link} />
            ) : (
              <Label
                circular
                color={randomColor()}
                size="massive"
                className="avatar-label"
              >
                {contact.name[0]}
              </Label>
            )}
            <span className="name-header">{contact.name}</span>
          </div>
          <div>
            <EditContactModal
              setContacts={setContacts}
              id={contact.id}
              notify={notify}
              oldName={contact.name}
            />
            <DeleteModal
              type="contact"
              contact={contact}
              contacts={contacts}
              setContacts={setContacts}
              id={contact.id}
              notify={notify}
            />
          </div>
        </Header>
      </Card.Content>
      <Card.Content>
        <List divided relaxed animated>
          {contact.contacts.map((c) => (
            <List.Item key={c + c.id}>
              <List.Icon
                name={
                  siteIconsArray.includes(c.site.toLowerCase())
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
                      c.url.startsWith('http') ? `${c.url}` : `https://${c.url}`
                    }
                  >
                    {c.url.startsWith('http') ? c.url.split('//')[1] : c.url}
                  </a>
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
                  <LinkFormModal
                    type="edit"
                    id={contact.id}
                    urlId={c.id}
                    contacts={contacts}
                    setContacts={setContacts}
                    options={options}
                    handleOptionAddition={handleOptionAddition}
                    urlToEdit={c.url}
                    siteToEdit={c.site}
                    notify={notify}
                  />
                </List.Header>
                <List.Description as="a">{c.site}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
        <LinkFormModal
          type="add"
          id={contact.id}
          contacts={contacts}
          setContacts={setContacts}
          options={options}
          handleOptionAddition={handleOptionAddition}
          notify={notify}
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
