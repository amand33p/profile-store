import React from 'react';
import LinkFormModal from './LinkFormModal';
import DeleteModal from './DeleteModal';
import DisplayPictureModal from './DisplayPictureModal';
import EditContactModal from './EditContactModal';
import { siteIconsArray, randomColor } from '../utils/arraysAndFuncs';
import { useMediaQuery } from 'react-responsive';
import { Header, Card, List, Label } from 'semantic-ui-react';

const ContactCard = ({
  contact,
  contacts,
  setContacts,
  options,
  handleOptionAddition,
  notify,
  isDarkMode,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const linkCharCount = isMobile ? '30' : '70';

  const formattedLink = (link) => {
    return link.length > linkCharCount
      ? link.slice(0, linkCharCount).concat('...')
      : link;
  };

  return (
    <Card fluid className={isDarkMode ? 'dark-mode-card' : ''}>
      <Card.Content>
        <Header className="card-header">
          <div>
            {contact.displayPicture.exists ? (
              <DisplayPictureModal
                imageLink={contact.displayPicture.link}
                contactName={contact.name}
                isDarkMode={isDarkMode}
              />
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
            <strong className="name-header">{contact.name}</strong>
          </div>
          <div>
            <EditContactModal
              setContacts={setContacts}
              id={contact.id}
              notify={notify}
              oldName={contact.name}
              isDarkMode={isDarkMode}
            />
            <DeleteModal
              type="contact"
              contact={contact}
              contacts={contacts}
              setContacts={setContacts}
              id={contact.id}
              notify={notify}
              isDarkMode={isDarkMode}
            />
          </div>
        </Header>
      </Card.Content>
      <Card.Content>
        <List divided relaxed animated={!isMobile} inverted={isDarkMode}>
          {contact.contacts.map((c) => (
            <List.Item key={c.id}>
              <List.Icon
                name={
                  siteIconsArray.includes(c.site.toLowerCase())
                    ? c.site.toLowerCase()
                    : 'linkify'
                }
                color={isDarkMode ? null : 'black'}
                size="big"
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
                    {formattedLink(c.url).startsWith('http')
                      ? formattedLink(c.url).split('//')[1]
                      : formattedLink(c.url)}
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
                    isDarkMode={isDarkMode}
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
                    isDarkMode={isDarkMode}
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
          isDarkMode={isDarkMode}
        />
      </Card.Content>
    </Card>
  );
};

export default ContactCard;
