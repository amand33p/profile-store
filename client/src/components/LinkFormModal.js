import React, { useState } from 'react';
import FormError from './FormError';
import contactService from '../services/contacts';
import { useMediaQuery } from 'react-responsive';
import { Modal, Header, Form, Button, Icon } from 'semantic-ui-react';

const LinkFormModal = ({
  id,
  urlId,
  contacts,
  setContacts,
  type,
  options,
  handleOptionAddition,
  urlToEdit,
  siteToEdit,
  notify,
  isDarkMode,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState(urlToEdit ? urlToEdit : '');
  const [site, setSite] = useState(siteToEdit ? siteToEdit : '');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const newObject = {
    url,
    site,
  };

  const addNewLink = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const returnedObject = await contactService.addLink(id, newObject);
      setContacts(contacts.map((c) => (c.id !== id ? c : returnedObject)));
      setIsLoading(false);
      setError(null);

      notify(`Added new ${newObject.site} link "${newObject.url}"`, {
        appearance: 'success',
      });
      setUrl('');
      setSite('');
      handleClose();
    } catch (err) {
      setIsLoading(false);
      const errRes = err?.response?.data;

      if (errRes?.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  const editLink = async (e) => {
    e.preventDefault();

    const targetContact = contacts.find((c) => c.id === id);

    try {
      setIsLoading(true);
      const returnedObject = await contactService.editLink(
        id,
        urlId,
        newObject
      );

      const updatedContactsKey = targetContact.contacts.map((t) =>
        t.id !== urlId ? t : returnedObject
      );

      const updatedContact = {
        ...targetContact,
        contacts: updatedContactsKey,
      };

      setContacts(contacts.map((c) => (c.id !== id ? c : updatedContact)));
      setIsLoading(false);
      setError(null);

      notify(`Edited ${newObject.site} link to "${newObject.url}"`, {
        appearance: 'success',
      });
      handleClose();
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

  const isTypeEdit = type === 'edit';

  return (
    <Modal
      closeIcon
      open={modalOpen}
      trigger={
        <Button
          color={isTypeEdit ? null : 'green'}
          size={isTypeEdit ? 'tiny' : isMobile ? 'mini' : 'small'}
          floated={isTypeEdit ? 'right' : 'left'}
          icon={isTypeEdit ? 'edit' : 'add'}
          content={isTypeEdit ? undefined : 'Add URL'}
          className={isTypeEdit ? 'edit-btn' : 'add-btn'}
          compact
        />
      }
      onOpen={handleOpen}
      onClose={handleClose}
      className={isDarkMode ? 'dark-mode-modal modal' : 'modal'}
    >
      <Header
        icon="linkify"
        content={isTypeEdit ? 'Edit Link - URL & Site' : 'Add New Link'}
      />
      {error && <FormError message={error} setError={setError} />}
      <Modal.Content>
        <Form onSubmit={isTypeEdit ? editLink : addNewLink}>
          <Form.Input
            required
            placeholder="For ex, https://www.facebook.com"
            type="text"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            icon="linkify"
            iconPosition="left"
          />
          <Form.Select
            required
            value={site}
            options={options}
            label="Site"
            allowAdditions
            selection
            search
            placeholder="Select a site"
            onChange={(e, data) => setSite(data.value)}
            onAddItem={handleOptionAddition}
          />
          <Button
            type="submit"
            color="green"
            floated="right"
            loading={isLoading}
          >
            <Icon name={isTypeEdit ? 'edit' : 'add'} />
            {isTypeEdit ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default LinkFormModal;
