import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const FormError = ({ message, setError, title, positive }) => {
  return (
    <Message negative={positive ? false : true}>
      <Message.Header>
        {title || 'Error'}
        <Button
          icon="close"
          color="red"
          floated="right"
          onClick={() => setError(null)}
          compact
          size="mini"
          circular
        />
      </Message.Header>
      <p>{message}</p>
    </Message>
  );
};

export default FormError;
