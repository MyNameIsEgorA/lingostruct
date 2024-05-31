import React, { useState } from 'react';
import AddNewProject from "@/../public/Add.svg";
import Image from "next/image"; // Предполагается, что NewProjectModal находится в том же каталоге
import NewProjectModal from '@/components/NewProjectModal/Modal';

const AddProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className={"flex space-x-2 ml-[30px] pt-3"} onClick={openModal}>
                <Image src={AddNewProject} alt={"create new projects"} />
                <h5 className={"text-[14px]"}>Add new project</h5>
            </button>
            <NewProjectModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default AddProject;