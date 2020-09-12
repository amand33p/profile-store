import React, { useState } from 'react';
import contactService from '../services/contacts';
import { generateBase64Encode } from '../utils/arraysAndFuncs';
import { useMediaQuery } from 'react-responsive';
import { Modal, Header, Form, Button, Icon, Image } from 'semantic-ui-react';

const EditContactModal = ({ oldName, setContacts, id, notify }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState(oldName);
  const [displayPicture, setDisplayPicture] = useState('');
  const [fileName, setFileName] = useState('');

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
      displayPicture,
    };

    try {
      const returnedObject = await contactService.editContact(
        id,
        contactObject
      );
      setContacts((prevState) =>
        prevState.map((p) => (p.id !== id ? p : returnedObject))
      );

      notify(`Contact '${returnedObject.name}' updated!`, 'green');
      handleClose();

      setName('');
      setDisplayPicture('');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
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
          content={isMobile ? undefined : 'Edit'}
          icon="edit"
          color="instagram"
          size={isMobile ? 'mini' : 'medium'}
          className="contact-edit-btn"
          compact
        />
      }
      onOpen={handleOpen}
      onClose={handleClose}
      style={{ padding: '10px' }}
    >
      <Header icon="edit" content="Edit Contact - Name &amp; Display Picture" />
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
          <Button
            as="label"
            icon="upload"
            htmlFor="dp-image"
            label={{
              basic: true,
              content:
                fileName === ''
                  ? 'Select image for DP'
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
              size="mini"
              className="clear-preview-btn"
            >
              <Icon name="remove circle" />
              Clear
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
            <Button color="green" type="submit" floated="right">
              <Icon name="edit" />
              Update
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default EditContactModal;
