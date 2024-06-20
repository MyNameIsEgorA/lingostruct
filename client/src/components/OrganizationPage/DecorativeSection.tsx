import React from "react";
import UserManagementImage from "@/../public/person-outline.svg"
import WorkSpaceManagementImage from "@/../public/SettingsImage.svg"
import ProjectsManagementImage from "@/../public/hammer-outline.svg"
import Image from "next/image";
import {UserPagesEnum} from "@/components/OrganizationPage/Navigation";

type DecorativeSectionData = {
    heading: string,
    description: string,
    image: string
}

const items: DecorativeSectionData[] = [
    {
        heading: "Edit organization",
        description: "There you can update information about your Organization",
        image: WorkSpaceManagementImage
    },
    {
        heading: "Edit user",
        description: "There you can update your list in workspace",
        image: UserManagementImage
    },
    {
        heading: "Choose project",
        description: "There you can choose your projects list in workspace.",
        image: ProjectsManagementImage
    },
    {
        heading: "To be DONE",
        description: "TO DO",
        image: ProjectsManagementImage
    },
]

interface DecorativeSectionProps {
    id: UserPagesEnum;
    className?: string;
}

const DecorativeSection: React.FC<DecorativeSectionProps> = ({id, className}) => {

    const data: DecorativeSectionData = items[id]

    return (
        <>
            <div className={"flex space-x-3 my-8 transition-[500ms]"}>
                <div className={"p-4 rounded-[8px] bg-gray-200"}>
                    <Image src={data.image} alt={data.heading} width={20} height={20}/>
                </div>
                <div>
                    <h5 className={"font-semibold text-[18px]"}>{data.heading}</h5>
                    <h6 className={"text-[#667085]"}>{data.description}</h6>
                </div>
            </div>
            <div className={"w-full h-0.5 bg-gray-100 " + className}></div>
        </>
    )
}

export default DecorativeSection