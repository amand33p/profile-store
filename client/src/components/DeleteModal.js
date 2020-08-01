import React, { useState } from 'react';
import contactService from '../services/contacts';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const DeleteModal = ({
  type,
  contacts,
  setContacts,
  contact,
  id,
  urlId,
  urlLink,
  urlName,
  notify,
}) => {
  const [open, setOpen] = useState(false);

  const handleContactDelete = async (id) => {
    try {
      await contactService.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
      notify(`Contact '${contact.name}' deleted!`, 'green');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
    }
  };

  const handleLinkDelete = async (id, urlId, urlLink, urlName) => {
    const targetContact = contacts.find((c) => c.id === id);
    const updatedContactsKey = targetContact.contacts.filter(
      (t) => t.id !== urlId
    );
    const updatedContact = { ...targetContact, contacts: updatedContactsKey };

    try {
      await contactService.deleteLink(id, urlId);
      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      notify(`${urlName} link '${urlLink}' deleted!`, 'green');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
    }
  };

  const isTypeContact = type === 'contact';

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button
          content={isTypeContact ? 'Delete' : undefined}
          icon={isTypeContact ? 'user delete' : 'delete'}
          color="red"
          floated="right"
          size={isTypeContact ? 'medium' : 'tiny'}
          className={isTypeContact ? 'contact-del-btn' : 'delete-btn'}
        />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="delete" content="Confirm Delete" />
      <Modal.Content>
        <p>
          {isTypeContact
            ? `Are you sure want to delete contact named as '${contact.name}'?`
            : `Are you sure want to delete ${urlName} link '${urlLink}'?`}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={() =>
            isTypeContact
              ? handleContactDelete(id)
              : handleLinkDelete(id, urlId, urlLink, urlName)
          }
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
