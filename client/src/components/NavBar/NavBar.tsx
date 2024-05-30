"use client"

import React, {useState, useLayoutEffect} from 'react';
import { observer } from "mobx-react"
import "./navBarMain.css"
import Logo from "../../../public/Logo.svg"
import Image from "next/image";
import userStore from "@/stores/UserNavBarStore";
import {DashBoard} from "@/components/NavBar/DashBoard";
import TasksImage from "../../../public/hammer-outline.svg";
import Link from "next/link";
import Activities from "@/components/NavBar/Activities";
import Projects from "@/components/NavBar/Projects/Projects";

const NavBar = observer(() => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true)
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    useLayoutEffect(() => {

        const setWindowHeight = (): void => {
            setIsDesktop(window.innerWidth > 600)
        }

        window.addEventListener("resize", setWindowHeight)
        setWindowHeight();

        return () => window.removeEventListener("resize", setWindowHeight)

    });

    return (
        <nav className={"navbar text-[18px] text-white"}>
            <div className="p-5 desktop:p-0 mobile-nav flex justify-between items-center">
                <Image src={Logo} alt="TGA" className="logo"/>
                {!isDesktop && <div
                    className={`text-white text-4xl ${showNavBar ? " rotate-45" : ""} cursor-pointer`}
                    onClick={() => {
                        setShowNavBar(!showNavBar)
                    }}
                >
                    +
                </div>}
            </div>
            {(isDesktop || showNavBar) && <div className={"px-4 desktop:px-0"}>
                <DashBoard organizations={userStore.getOrganizations}
                           activeOrganization={userStore.getActiveOrganization}
                           setActiveOrganization={userStore.setActiveOrganization}
                />
                <div className={"h-[2px] w-full bg-gray-500 my-4"}></div>
                <div className={"flex"}>
                    <Image src={TasksImage} alt={"tasks"} className={"w-7"}/>
                    <Link href={"tasks"} className={"ml-3"}>My Tasks</Link>
                </div>
                <Activities activitiesAmount={userStore.activities_amount}/>
                <Projects/>
            </div>
            }
        </nav>
    );
});

export default NavBar;