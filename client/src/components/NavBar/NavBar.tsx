"use client"

import React, {useState, useLayoutEffect, useEffect} from 'react';
import { observer } from "mobx-react"
import "./navBarMain.css"
import Logo from "../../../public/Logo.svg"
import Image from "next/image";
import userNavBarStore from "@/stores/UserNavBarStore";
import {DashBoard} from "@/components/NavBar/DashBoard";
import TasksImage from "@/../public/hammer-outline.svg";
import Link from "next/link";
import Activities from "@/components/NavBar/Activities";
import Projects from "@/components/NavBar/Projects/Projects";
import NavUserInfo from "@/components/NavBar/UserInfo/NavUserInfo";

const NavBar = observer(() => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true)
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    useEffect((): void => {
        userNavBarStore.getApiData()
    }, []);

    useLayoutEffect(() => {

        const setWindowHeight = (): void => {
            setIsDesktop(window.innerWidth > 600)
        }

        window.addEventListener("resize", setWindowHeight)
        setWindowHeight();

        return () => window.removeEventListener("resize", setWindowHeight)

    });

    return (
        <nav className={"navbar text-[18px] text-white flex flex-col"}>
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
            {(isDesktop || showNavBar) && <div className={"flex-col flex px-4 h-full desktop:px-0"}>
                <DashBoard organizations={userNavBarStore.getOrganizations}
                           activeOrganization={userNavBarStore.getActiveOrganization}
                           setActiveOrganization={userNavBarStore.setActiveOrganization}
                />
                <div className={"h-[2px] w-full bg-gray-500 my-4"}></div>
                <div className={"flex"}>
                    <Image src={TasksImage} alt={"tasks"} className={"w-7"}/>
                    <Link href={"tasks"} className={"ml-3"}>My Tasks</Link>
                </div>
                <Activities activitiesAmount={userNavBarStore.activities_amount}/>
                <Projects/>
            </div>
            }
            {(isDesktop || showNavBar) && <div className={"flex-grow-[1]"}>
                <NavUserInfo/>
            </div>}
        </nav>
    );
});

export default NavBar;