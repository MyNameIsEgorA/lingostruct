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
    const [show, setShow] = useState<boolean>(true)

    useLayoutEffect(() => {

        const setWindowHeight = (): void => {
            setShow(window.innerWidth > 600)
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
            <div className="p-10 desktop:p-0">
                <Image src={Logo} alt="TGA" className="logo"/>
            </div>
            {show && userData && <div>
                <DashBoard organizations={userData.organizations}/>
            </div>
            }
        </nav>
    );
});

export default NavBar;