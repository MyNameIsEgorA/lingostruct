import React from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import CloseImage from "@/../public/Delete.svg"

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 32,
            width: 518,
            borderRadius: 12,
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Серая прозрачная тень
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Новый проект"
        >
            <div className={"flex justify-between"}>
                <h2 className={"text-[18px]"}>Create new project</h2>
                <button onClick={onClose}>
                    <Image src={CloseImage} alt={"Close creating new project"}/>
                </button>
            </div>
            <div className="mt-2 text-[#79828B]">Add project information here</div>
        </Modal>
    );
};

export default NewProjectModal;