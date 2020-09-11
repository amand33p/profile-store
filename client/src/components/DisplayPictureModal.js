import React, { useState } from 'react';
import { getCircularAvatar } from '../utils/arraysAndFuncs';

import { Header, Modal, Image } from 'semantic-ui-react';

const DisplayPictureModal = ({ imageLink }) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      trigger={
        <Image
          avatar
          style={{ width: '49px', height: '49px' }}
          src={getCircularAvatar(imageLink)}
          className="avatar-image"
        />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="picture" content="Preview: Display Picture " />
      <Modal.Content>
        <Image
          src={imageLink}
          size="large"
          rounded
          className="avatar-preview"
        />
      </Modal.Content>
    </Modal>
  );
};

export default DisplayPictureModal;
