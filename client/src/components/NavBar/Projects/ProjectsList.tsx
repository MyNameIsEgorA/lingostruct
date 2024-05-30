import {ReactNode, useEffect, useState} from "react";
import {observer} from "mobx-react";
import userStore from "@/stores/UserStore"
import {IUserProjects} from "@/types/Organizations";

const ProjectsList = observer((): ReactNode => {

    const [projects, setProjects] = useState<IUserProjects[]>([])

    useEffect(() => {
        // setProjects(userStore.)
    }, []);

    return (
        <div className={"flex flex-col space-y-2"}>

        </div>
    )
})

export default ProjectsList