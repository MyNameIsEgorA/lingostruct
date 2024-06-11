import Image from "next/image";
import Icon from "@/../public/layers-outline.svg";
import React from "react";

const ProjectImage: React.FC<{title: string}> = ({title}) => {
    return <div className="flex space-x-4">
        <Image src={Icon} alt={"Projects"}/>
        <h4>{title}</h4>
    </div>;
}

export default ProjectImage