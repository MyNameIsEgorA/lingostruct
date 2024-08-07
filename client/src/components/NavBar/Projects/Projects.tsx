import React, {ReactNode, useState} from "react";
import {observer} from "mobx-react";
import userNavBarStore from "@/stores/UserNavBarStore";
import Icon from "@/../public/layers-outline.svg"
import Image from "next/image";
import Arrow from "../../../../public/arrow.svg";
import ProjectsList from "@/components/NavBar/Projects/ProjectsList";
import AddProject from "@/components/NavBar/Projects/AddProject";
import NavUserInfo from "@/components/NavBar/UserInfo/NavUserInfo";
import ProjectImage from "@/components/ overall/ProjectImage";

const Projects = (): ReactNode => {

    const [showList, setShowList] = useState<boolean>(true)

    return (
        <div>
            <div className={"flex mt-4 justify-between"}>
                <ProjectImage title={"Projects"}/>
                <button onClick={() => {
                    setShowList(!showList)
                }} className={"pr-3"}>
                    <Image src={Arrow}
                           alt={"arrow"}
                           className={`w-4 transition-[500ms] ${showList ? "transform -rotate-180" : ""}`}
                    />
                </button>
            </div>
            {showList && <ProjectsList/>}
        </div>
    )
}

export default Projects