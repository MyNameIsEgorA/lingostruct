import React from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import CloseImage from "@/../public/Delete.svg";
import { observer } from "mobx-react";
import "./modal.css";
import FirstLayer from "@/components/NewProjectModal/FirstLayer";
import SecondLayer from "@/components/NewProjectModal/SecondLayer";
import Description from "@/components/NewProjectModal/Description";
import Price from "@/components/NewProjectModal/Price";
import ModalButtons from "@/components/NewProjectModal/modalButtons";

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

Modal.setAppElement("#app");

const NewProjectModal: React.FC<NewProjectModalProps> = observer(({ isOpen, onClose }) => {

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
            minHeight: 600,
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
                    <Image src={CloseImage} alt={"Close creating new project"} />
                </button>
            </div>
            <div className="mt-2 text-[#79828B]">Add project information here</div>
            <FirstLayer />
            <SecondLayer />
            <Description />
            <Price/>
            <ModalButtons onClose={onClose}/>
        </Modal>
    );
});

export default NewProjectModal;