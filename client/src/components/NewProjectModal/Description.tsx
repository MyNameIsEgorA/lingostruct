import {ReactNode, useEffect, useState} from "react";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";

const Description = (): ReactNode => {

    const [value, setValue] = useState<string>(projectInfoModalStore.projectDescription)
    const changeValue = (e: any): void => {
        setValue(e.target.value)
    }

    useEffect(() => {
        projectInfoModalStore.setDescription(value)
    }, [value]);

    return (
        <div className="mt-5 -z-10">
            <h5>Project description</h5>
            <textarea
                value={value}
                onChange={changeValue}
                placeholder={"Please describe your project here...."}
                className={"modal-section min-h-[128px] w-full mt-2"}
            />

        </div>
    )
}

export default Description