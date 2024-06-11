import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from "next/image";
import SuccessImage from "../../../../public/Success.svg"
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

const SuccessModal = () => {

    return (
        <div>
            <Modal
                isOpen={true}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className={"w-[400px]"}>
                    <div className={"flex justify-between"}>
                        <Image src={SuccessImage} alt={"Successfully created"}/>
                        <Image src={CloseImage} alt={"Close modal window"}/>
                    </div>
                    <h5 className={"text-gray-900 text-[18px] mt-4"}>
                        Organization created!
                    </h5>
                    <div className={"text-gray-600 text-[14px] mt-1"}>
                        This Organization has been published. Now you can add people who you want to work in this project.
                        You can make it on the main page of your organizations.
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

export default SuccessModal;