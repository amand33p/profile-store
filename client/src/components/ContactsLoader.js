import React from 'react';
import { Placeholder, Segment } from 'semantic-ui-react';

const ContactsLoader = () => {
  return (
    <div>
      {Array.from(new Array(3)).map((a) => (
        <Segment key={a} raised>
          <Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="full" />
              <Placeholder.Line length="full" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Segment>
      ))}
    </div>
  );
};

export default ContactsLoader;
