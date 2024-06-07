import React, {ReactNode, useEffect, useState} from "react";
import {observer} from "mobx-react";
import userNavBarStore from "@/stores/UserNavBarStore"
import {IUserProject} from "@/types/Organizations";
import SingleProject from "@/components/NavBar/Projects/SingleProject";
import userAuthStore from "@/stores/UserAuthStore";
import AddProject from "@/components/NavBar/Projects/AddProject";

const ProjectsList = observer((): ReactNode => {
    const projects: IUserProject[] = userNavBarStore.projectsList;
    const [active, setActive] = useState<IUserProject>(userNavBarStore.getActiveProject);

    useEffect(() => {
        setActive(userNavBarStore.getActiveProject);
    }, [userNavBarStore.getActiveProject]);

    return (
        <div className={"flex flex-col space-y-2 ml-2 mt-4"}>
            {projects.map((project, index) => {
                return <SingleProject key={index}
                                      color={project.color}
                                      url={project.url}
                                      title={project.title}
                                      isActive={project.url === active?.url}
                                      clickAction={() => {
                                          userNavBarStore.setActiveProject(project);
                                      }}
                />
            })}
            <AddProject/>
        </div>
    )
});

export default ProjectsList