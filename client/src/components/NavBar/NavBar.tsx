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

    useLayoutEffect(() => {
        const fetchData = async () => {
            const data = await userStore.getNavBarData();
            setUserData(data);
        };

        fetchData();
    }, []); // пустой массив зависимостей означает, что эффект будет выполнен только один раз при монтировании компонента

    return (
        <nav className={"navbar"}>
            <Image src={Logo} alt="TGA" className="logo"/>

            {userData && <div>
                {userData.email}
                <DashBoard organizations={userData.organizations}/>
            </div>}
        </nav>
    );
});

export default NavBar;