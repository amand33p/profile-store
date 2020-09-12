import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const FormError = ({ message, setError }) => {
  return (
    <Message negative>
      <Message.Header>
        Error
        <Button
          icon="close"
          color="red"
          floated="right"
          onClick={() => setError(null)}
          compact
          size="small"
        />
      </Message.Header>
      <p>{message}</p>
    </Message>
  );
};

export default FormError;
