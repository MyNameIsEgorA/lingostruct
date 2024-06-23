import React from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import CloseModal from "@/../public/Delete.svg"
import { OrganizationStore } from '@/stores/OrganizationStore';
import { useState } from 'react';
import AddUserInput from './AddUserInput';

Modal.setAppElement('#__next');

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
            borderRadius: 12,
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Серая прозрачная тень
        },
    }}
    >
      <div className='flex justify-between'>
        <h3 className='text-[18px] text-gray-900'>Invite members in workspace</h3>
        <button>
          <Image src={CloseModal} alt='Close' onClick={onRequestClose}/>
        </button>

      </div>
      <h5 className="text-gray-400 mt-1">Here you can invite new users by email</h5>
      <AddUserInput 
        onRequestClose={onRequestClose}/>
    </Modal>
  );
};

export default ModalComponent;