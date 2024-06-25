import { useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";
import CloseImage from "@/../public/Delete.svg"
import UserInfoModalNav from "./UserInfoModalNav";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

Modal.setAppElement("#__next")

const UserInfoModal: React.FC<IProps> = ({ isOpen, onClose }) => {

    useEffect(() => {
        console.log("is Open: ", isOpen)
    }, [isOpen])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 32,
            width: 676,
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
            ariaHideApp={false}
        >
            <div className="flex justify-between">
                <h3 className="text-gray-900 text-[18px] font-medium">Account settings</h3>
                <Image onClick={onClose} src={CloseImage} alt="close"/>
            </div>
            <h5 className="mt-1 text-gray-400">Update your profile picture and account details here</h5>
            <UserInfoModalNav/>
        </Modal>
    );
};

export default UserInfoModal