import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Это необходимо для доступности модального окна

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Пример модального окна"
      style={{
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 32,
            width: 520,
            height: 214,
            borderRadius: 12,
            minHeight: 600,
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Серая прозрачная тень
        },
    }}
    >
      <h3 className=''>Invite members in workspace</h3>
      <h5>Here you can invite new users by email</h5>
      <button onClick={onRequestClose}>Закрыть</button>
    </Modal>
  );
};

export default ModalComponent;