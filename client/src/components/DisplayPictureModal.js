import React, { useState } from 'react';
import { getCircularAvatar } from '../utils/arraysAndFuncs';

import { Header, Modal, Image } from 'semantic-ui-react';

const DisplayPictureModal = ({ imageLink, contactName, isDarkMode }) => {
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
      className={isDarkMode ? 'dark-mode-modal' : ''}
    >
      <Header icon="picture" content={`DP Preview: ${contactName}`} />
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
