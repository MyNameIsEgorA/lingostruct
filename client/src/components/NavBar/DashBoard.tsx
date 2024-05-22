import "./navBarMain.css"
import {ReactNode, useState} from "react";

import IMG from "../../../public/Organization.svg"
import Image from "next/image";
import Arrow from "../../../public/arrow.svg"
import {IOrganizationLink} from "@/types/Organizations";
import Link from "next/link";
import {observer} from "mobx-react";
import userStore from "@/stores/UserStore";

interface IProps {
    organizations: IOrganizationLink[]
}

export const DashBoard: React.FC<IProps> = observer(({organizations}): ReactNode => {
    const [title, setTitle] = useState<string>(userStore.getActiveOrganization() !== "" ? userStore.getActiveOrganization : organizations[0].title)
    const [showList, setShowList] = useState<boolean>(true)

    return (
        <>
            <div className="organization flex items-center justify-between">
                <div className={"flex items-center space-x-4"}>
                    <Image src={IMG} alt={"Организация"} className="w-10 bg-[#F0F3F60f] p-2 rounded-lg"/>
                    <h3>{title}</h3>
                </div>
                <button onClick={() => {setShowList(!showList)}}>
                    <Image src={Arrow} alt={"arrow"} className={`w-4 transition-[500ms] ${showList ? "transform -rotate-180" : ""}`}></Image>
                </button>
            </div>
            <div className="ml-[56px] text-white ">
                {showList && organizations.map((organization, index) => {
                    return (
                        <div key={index} className={"py-3 p-3 border-t-[1px] border-white w-full"}>
                            <button className={""}
                                  onClick={() => {
                                      userStore.setActiveOrganization(organization.title)
                                      setTitle(userStore.getActiveOrganization())
                                      setShowList(false)
                                  }}
                                  >{organization.title}
                            </button>
                        </div>
                )})}
            </div>
        </>
    )
})

