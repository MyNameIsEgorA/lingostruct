"use client"

import "./navBarMain.css"
import React, {ReactNode, useEffect, useState} from "react";

import IMG from "../../../public/Organization.svg"
import Image from "next/image";
import Arrow from "../../../public/arrow.svg"
import {IUserOrganizations} from "@/types/Organizations";


interface IProps {
    activeOrganization: string,
    organizations: IUserOrganizations[]
    setActiveOrganization: (title: string) => void
}


export const DashBoard: React.FC<IProps> = ({activeOrganization, setActiveOrganization, organizations}): ReactNode => {
    const [title, setTitle] = useState<string>("")
    const [showList, setShowList] = useState<boolean>(false)

    useEffect(() => {
        if (activeOrganization !== "") {
            setTitle(activeOrganization)
            return
        }
        setTitle(organizations[0]?.title || "No organization")
    }, []);

    return (
        <div className="dashboard-data text-white text-[18px]">
            <div className="organization flex items-center justify-between ">
                <div className={"flex items-center space-x-4"}>
                    <Image src={IMG} alt={"Организация"} className="w-10 bg-[#F0F3F60f] p-2 rounded-lg"/>
                    <h3 className={"text-[18px]"}>
                        {title}
                    </h3>
                </div>
                <button onClick={() => {setShowList(!showList)}} className={"pr-"}>
                    <Image src={Arrow} alt={"arrow"} className={`w-4 transition-[500ms] ${showList ? "transform -rotate-180" : ""}`}></Image>
                </button>
            </div>
            <div className="ml-[56px] text-white ">
                {showList && organizations.map((organization, index) => {
                    return (
                        <div key={index} className={"py-3 p-3 border-t-[1px] text-[18px] border-white w-full"}>
                            {/*<Link  href={organization.URL}>*/}
                                <button className={""}
                                      onClick={() => {
                                          setActiveOrganization(organization.title)
                                          setTitle(organization.title)
                                          setShowList(false)
                                      }}
                                      >{organization.title}
                                </button>
                            {/*</Link>*/}
                        </div>
                )})}
            </div>
        </div>
    )
}

