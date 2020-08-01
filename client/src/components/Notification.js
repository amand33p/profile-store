import React from 'react';
import { Segment } from 'semantic-ui-react';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <Segment inverted color={notification.color} secondary>
      {notification.message}
    </Segment>
  );
};

export default Notification;
