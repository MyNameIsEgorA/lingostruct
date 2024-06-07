"use client"

import ActivitiesImage from "@/../public/notifications-outline.svg"
import React, {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {observer} from "mobx-react";

interface IProps {
    activitiesAmount: number
}

const Activities: React.FC<IProps> = ({activitiesAmount}): ReactNode => {

    const [activities, setActivities] = useState<number>(activitiesAmount)

    useEffect(() => {
        setActivities(activitiesAmount)
    }, [activitiesAmount]);

    return (
        <Link href={"/activities"}>
            <div className={"flex mt-4 w-full relative items-center justify-between cursor-pointer"}>
                <div className={"flex items-center"}>
                    <Image src={ActivitiesImage} alt={"activities"} className={"w-7"}/>
                    <h4 className={"ml-3"}>Activities</h4>
                </div>
                <div className={"hover:text-orange-400 transition-[500ms] space-x-2 text-orange-brand px-2 py-0.5 bg-[#FB6A18] rounded-[12px] bg-opacity-10 hover:bg-opacity-20 flex items-center"}>
                    <div className={"rounded-full w-2 h-2 bg-orange-brand text-[12px] leading-[18px]"}></div>
                    <div className={""}>{activities}</div>
                </div>
            </div>
        </Link>
    )
}

export default Activities;