import React, {Dispatch, SetStateAction, useState} from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import UnSuccessImage from "../../../../public/unsuccess.svg"
import CloseImage from "../../../../public/Delete.svg"
import Link from "next/link";

const customStyles: {} = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'none',
        border: 'none',
        padding: 32,
        overflow: 'visible',
        backgroundColor: "#ffffff",
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
};

const UnSuccessModal: React.FC<{setter: Dispatch<SetStateAction<boolean | null>>}> = ({setter}) => {
    const [isOpen, setIsOpen] = useState(true); // Используйте хук useState для управления состоянием модального окна

    const closeModal = () => {
        setIsOpen(false); // Закрываем модальное окно при нажатии на крестик
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className={"w-[400px]"}>
                    <div className={"flex justify-between"}>
                        <Image width={40} height={40} src={UnSuccessImage} alt={"Successfully created"}/>
                        <Image src={CloseImage} alt={"Close modal window"} onClick={() => {
                            closeModal()
                            setter(null)
                        }} />
                    </div>
                    <h5 className={"text-gray-900 text-[18px] mt-4"}>
                        Organization not create...
                    </h5>
                    <div className={"text-gray-600 text-[14px] mt-1"}>
                        Organization with this name is already existing. Let`s try to change organization name.
                    </div>
                    <div className={"mt-10"}>
                        <Link
                            className={"bg-orange-brand text-white py-2.5 px-[125px] rounded-xl"}
                            href={"/my_organizations/"}>
                            Go to organizations
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UnSuccessModal;