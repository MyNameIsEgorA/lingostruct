import React, {ReactNode, useState} from "react";
import {observer} from "mobx-react";
import userStore from "@/stores/UserNavBarStore";
import Icon from "@/../public/layers-outline.svg"
import Image from "next/image";
import Arrow from "../../../../public/arrow.svg";

const Projects = (): ReactNode => {

    const [showList, setShowList] = useState<boolean>(false)

    return (
        <div className={"flex mt-4 justify-between"}>
            <div className="flex space-x-4">
                <Image src={Icon} alt={"Projects"}/>
                <h4>Projects</h4>
            </div>
            <button onClick={() => {
                setShowList(!showList)
            }} className={"pr-3"}>
                <Image src={Arrow}
                       alt={"arrow"}
                       className={`w-4 transition-[500ms] ${showList ? "transform -rotate-180" : ""}`}
                />
            </button>
        </div>
    )
}

export default Projects