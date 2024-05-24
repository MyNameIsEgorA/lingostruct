"use client"

import React, {useState, useLayoutEffect} from 'react';
import { observer } from "mobx-react"
import "./navBarMain.css"
import Logo from "../../../public/Logo.svg"
import Image from "next/image";
import { IUserNavBar } from "@/types/User";
import userStore from "@/stores/UserStore";
import {DashBoard} from "@/components/NavBar/DashBoard";

const NavBar = observer(() => {
    const [userData, setUserData] = useState<IUserNavBar | undefined>();
    const [isDesktop, setIsDesktop] = useState<boolean>(true)
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    useLayoutEffect(() => {

        const setWindowHeight = (): void => {
            setIsDesktop(window.innerWidth > 600)
        }
        const fetchData = async (): Promise<void> => {
            const data: IUserNavBar | undefined = await userStore.getNavBarData();
            setUserData(data);
        };

        fetchData();
        window.addEventListener("resize", setWindowHeight)
        setWindowHeight();

        return () => window.removeEventListener("resize", setWindowHeight)

    }, []);

    return (
        <nav className={"navbar"}>
            <div className="p-5 desktop:p-0 mobile-nav flex justify-between items-center">
                <Image src={Logo} alt="TGA" className="logo"/>
                {!isDesktop && <div
                    className={`text-white text-4xl ${showNavBar ? " rotate-45" : ""} cursor-pointer`}
                    onClick={() => {setShowNavBar(!showNavBar)}}
                >
                    +
                </div>}
            </div>
            {(isDesktop || showNavBar) && userData && <div>
                <DashBoard organizations={userData.organizations}/>
            </div>
            }
        </nav>
    );
});

export default NavBar;