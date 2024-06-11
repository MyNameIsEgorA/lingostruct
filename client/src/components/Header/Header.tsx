import React, {useEffect, useState} from "react";
import {IUserProfile} from "@/types/User";
import {getUserProfile} from "@/api/user/getUserInfo";
import Image from "next/image";
import TGA from "@/../public/TGAwhite.svg"

const Header: React.FC = () => {

    const [userInfo, setUserInfo] = useState<IUserProfile>()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data: IUserProfile = await getUserProfile();
            setUserInfo(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <header className={"flex justify-between px-10 py-5 bg-[#202F3D] items-center"}>
                <Image src={TGA} alt={"TGA"}/>
                    <div className={"flex space-x-3 items-center"}>
                        {userInfo && <Image width={40} height={40} src={userInfo.image || ""} className={"rounded-full"} alt={""}/>}
                        <div className={"text-white"}>{userInfo?.name || ""}</div>
                    </div>
            </header>
            <div className={"px-[155px] pt-[56px] pb-8 bg-gray-200"}>
                <h2 className={"text-[#101828] font-bold text-[32px]"}>Welcome back, {userInfo?.name} 👋</h2>
                <span className={"text-[#667085] text-[14px]"}>Choose workspace to continue into your todos</span>
            </div>
        </div>
    )
}

export default Header