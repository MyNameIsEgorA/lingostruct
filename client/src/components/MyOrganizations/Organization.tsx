import {IOrganizationApi} from "@/types/Organizations";
import React from "react";
import ProjectImage from "@/components/ overall/ProjectImage";
import {OrganizationImage} from "@/components/ overall/OrganizationImage";
import Link from "next/link";
import Image from "next/image";
import Arrow from "@/../public/sideArrow.svg"

const Organization: React.FC<IOrganizationApi> = ({membersAmount, name, id}) => {
    return (
        <li className={"list-none w-[668px] border-2 p-4 rounded-2xl hover:shadow transition-[500ms]"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex space-x-4"}>
                    <OrganizationImage title={""}/>
                    <div>
                        <h5 className={"text-gray-900"}>{name + "'s Workspace"}</h5>
                        <span className={"text-gray-400 text-[12px]"}>{membersAmount} members</span>
                    </div>
                </div>
                <Link href={`organizations/${id}/`} className={"px-4 py-2 bg-gray-200 rounded-xl flex items-center space-x-3"}>
                    <div>Open</div>
                    <Image src={Arrow} alt={"Перейти на страницу организации"} className={"rotate-180"} />
                </Link>
            </div>
        </li>
    )
}

export default Organization