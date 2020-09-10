import React, { useState } from 'react';
import contactService from '../services/contacts';

import { Form, Button, Icon, Label } from 'semantic-ui-react';

const AddContactForm = ({
  setContacts,
  options,
  handleOptionAddition,
  notify,
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [site, setSite] = useState('');

  const addNewContact = async (e) => {
    e.preventDefault();

    const contactObject = {
      name,
      contacts: {
        url,
        site,
      },
    };

    try {
      const returnedObject = await contactService.addNew(contactObject);
      setContacts((prevState) => prevState.concat(returnedObject));

      notify(`New contact '${returnedObject.name}' added!`, 'green');

      setName('');
      setUrl('');
      setSite('');
    } catch (error) {
      console.error(error.message);
      notify(`${error.message}`, 'red');
    }
  };

  return (
    <Form onSubmit={addNewContact}>
      <Form.Group widths="equal">
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
          type="url"
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
          placeholder={
            <div>
              <Icon name="globe" color="black" /> Select a site
            </div>
          }
          onAddItem={handleOptionAddition}
          onChange={(e, data) => setSite(data.value)}
        />
      </Form.Group>
      <Button
        animated="vertical"
        color="teal"
        icon
        labelPosition="left"
        type="submit"
      >
        <Icon name="add user" />
        Add new contact
      </Button>
    </Form>
  );
};

export default AddContactForm;
