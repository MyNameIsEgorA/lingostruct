import {useState} from "react";
import {observer} from "mobx-react";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";

const FirstLayer = observer(() => {

    const [projectName, setProjectName] = useState<string>(projectInfoModalStore.projectName || "")
    const [projectCode, setProjectCode] = useState<string>(projectInfoModalStore.projectCode || "")

    const onProjectNameChange = (e: any): void => {
        setProjectName(e.target.value)
        projectInfoModalStore.setProjectName(projectName)
    }

    const onProjectCodeChange = (e: any): void => {
        setProjectCode(e.target.value)
        projectInfoModalStore.setProjectCode(projectCode)
    }

    return (
        <div className={"flex justify-between mt-5 w-full"}>
            <div className="">
                <h5>Project name</h5>
                <input type="text"
                       className="modal-section w-[278px]"
                       placeholder={"e.g. Building 52"}
                       value={projectName}
                       onChange={onProjectNameChange}
                />
            </div>
            <div className="">
                <h5>Project code</h5>
                <input type="text"
                       className="modal-section w-[156px]"
                       placeholder={"e.g. 5252538"}
                       value={projectCode}
                       onChange={onProjectCodeChange}
                />
            </div>
        </div>
    )
})

export default FirstLayer