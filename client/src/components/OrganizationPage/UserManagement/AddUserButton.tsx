import React, { ButtonHTMLAttributes, useState } from "react";
import AddUserIcon from "@/../public/AddUser.svg"
import Image from "next/image";
import AddUserModal from "./AddUserModal/AddUserModal"

const AddUserButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {

    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <>
            <button 
                {...props}
                onClick={() => {setShowModal(true)}}
                className="flex items-center space-x-2 rounded-[8px] bg-gray-200 py-3 px-5 hover:shadow-md transition]">
                <Image src={AddUserIcon} alt="Add User"/>
                <div>Add User</div>
            </button>
            {showModal && <AddUserModal onRequestClose={() => setShowModal(false)} isOpen={showModal}/>}
        </>
    );
};

export default AddUserButton;