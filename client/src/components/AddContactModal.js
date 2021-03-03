import React, { useState } from 'react';
import FormError from './FormError';
import contactService from '../services/contacts';
import { generateBase64Encode } from '../utils/arraysAndFuncs';
import { useMediaQuery } from 'react-responsive';
import { Modal, Header, Form, Button, Icon, Image } from 'semantic-ui-react';

const AddContactModal = ({
  setContacts,
  options,
  handleOptionAddition,
  notify,
  isDarkMode,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [site, setSite] = useState('');
  const [displayPicture, setDisplayPicture] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const addNewContact = async (e) => {
    e.preventDefault();

    const contactObject = {
      name,
      contacts: {
        url,
        site,
      },
      displayPicture,
    };

    try {
      setIsLoading(true);
      const returnedObject = await contactService.addNew(contactObject);
      setContacts((prevState) => prevState.concat(returnedObject));
      setIsLoading(false);
      setError(null);

      notify(`Added new contact named as "${returnedObject.name}"`, {
        appearance: 'success',
      });
      handleClose();

      setName('');
      setUrl('');
      setSite('');
      setDisplayPicture('');
      setFileName('');
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

  const fileInputOnChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setDisplayPicture);
  };

  const clearfileSelection = () => {
    setDisplayPicture('');
    setFileName('');
  };

  return (
    <Modal
      closeIcon
      open={modalOpen}
      trigger={
        <Button
          color="teal"
          icon
          labelPosition="left"
          fluid={isMobile}
          size={isMobile ? 'medium' : 'large'}
        >
          <Icon name="add user" />
          Add New Contact
        </Button>
      }
      onOpen={handleOpen}
      onClose={handleClose}
      className={isDarkMode ? 'dark-mode-modal modal' : 'modal'}
    >
      <Header icon="user add" content="Add New Contact" />
      {error && <FormError message={error} setError={setError} />}
      <Modal.Content>
        <Form onSubmit={addNewContact}>
          <Form.Input
            required
            placeholder="Enter name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon="user secret"
            iconPosition="left"
          />
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
            onAddItem={handleOptionAddition}
            onChange={(e, data) => setSite(data.value)}
          />

          <Button
            as="label"
            icon="upload"
            htmlFor="dp-image"
            label={{
              basic: true,
              content:
                fileName === ''
                  ? 'Select Image for DP'
                  : `Selected "${fileName}"`,
            }}
            labelPosition="right"
          />
          <input
            type="file"
            id="dp-image"
            accept="image/*"
            hidden
            onChange={fileInputOnChange}
          />
          {displayPicture && (
            <Button
              onClick={clearfileSelection}
              size="small"
              className={
                isDarkMode
                  ? 'clear-preview-btn dark-mode-clear-btn'
                  : 'clear-preview-btn'
              }
            >
              <Icon name="remove circle" />
              Un-select Image
            </Button>
          )}
          {displayPicture && (
            <Image
              src={displayPicture}
              size="medium"
              rounded
              className="upload-preview"
            />
          )}
          <Modal.Actions>
            <Button
              color="green"
              type="submit"
              floated="right"
              loading={isLoading}
            >
              <Icon name="add user" />
              Submit
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AddContactModal;
