import React, { useState } from 'react';
import FormError from './FormError';
import contactService from '../services/contacts';
import { useMediaQuery } from 'react-responsive';
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
  isDarkMode,
}) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleContactDelete = async () => {
    try {
      setIsLoading(true);
      await contactService.deleteContact(id);
      setContacts(contacts.filter((c) => c.id !== id));
      setIsLoading(false);
      setError(null);

      notify(`Deleted contact "${contact.name}"`, {
        appearance: 'success',
      });
    } catch (err) {
      setIsLoading(false);
      const errRes = err.response.data;

      if (errRes && errRes.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  const handleLinkDelete = async () => {
    const targetContact = contacts.find((c) => c.id === id);
    const updatedContactsKey = targetContact.contacts.filter(
      (t) => t.id !== urlId
    );
    const updatedContact = { ...targetContact, contacts: updatedContactsKey };

    try {
      setIsLoading(true);
      await contactService.deleteLink(id, urlId);
      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      setIsLoading(false);
      setError(null);

      notify(`Deleted ${urlName} link "${urlLink}"`, {
        appearance: 'success',
      });
    } catch (err) {
      setIsLoading(false);
      const errRes = err.response.data;

      if (errRes && errRes.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  const isTypeContact = type === 'contact';

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Button
          content={
            isTypeContact ? (isMobile ? undefined : 'Delete') : undefined
          }
          icon={isTypeContact ? 'user delete' : 'delete'}
          color={isTypeContact ? 'red' : null}
          size={isTypeContact ? (isMobile ? 'mini' : 'medium') : 'tiny'}
          className={isTypeContact ? 'contact-del-btn' : 'delete-btn'}
          floated={isTypeContact ? null : 'right'}
          compact
        />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      className={isDarkMode ? 'dark-mode-modal' : ''}
    >
      <Header icon="trash alternate" content="Confirm Delete" />
      {error && <FormError message={error} setError={setError} />}
      <Modal.Content>
        <p>
          {isTypeContact
            ? `Are you sure you want to delete contact named as '${contact.name}'?`
            : `Are you sure you want to delete ${urlName} link '${urlLink}'?`}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)} floated="left">
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={isTypeContact ? handleContactDelete : handleLinkDelete}
          loading={isLoading}
          floated="right"
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
