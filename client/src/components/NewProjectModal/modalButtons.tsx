import React, {ReactNode} from "react";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";

interface IProps {
    onClose(): void,
}

const ModalButtons: React.FC<IProps> = ({onClose}): ReactNode => {

    const onCancel = (): void => {
        projectInfoModalStore.clearSessionStorage()
        onClose()
    }

    const onCreateProject = (): void => {
        projectInfoModalStore.onCreateProject()
        onCancel()
    }

    return (
        <div className={"mt-5 flex w-full justify-end space-x-3"}>
            <button
                className={"bg-[#F0F3F6] rounded-[8px] px-7 py-3"}
                onClick={onCancel}
            >
                Cancel
            </button>
            <button className={"bg-[#0070FF] px-5 py-3 rounded-[8px] text-white"}
                    onClick={onCreateProject}
            >
                Create Project
            </button>
        </div>
    )
}

export default ModalButtons