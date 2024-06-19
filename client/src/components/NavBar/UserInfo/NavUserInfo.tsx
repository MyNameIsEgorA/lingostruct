import userNavBarStore from "@/stores/UserNavBarStore";
import Image from "next/image";
import {IUserShortData} from "@/types/Organizations";
import Options from "@/../public/ellipsis-horizontal-outline.svg"
import {useState} from "react";
import UserManagementOptions from "@/components/NavBar/UserInfo/UserManagementOptions";

const NavUserInfo = () => {

    const userData: IUserShortData = userNavBarStore.userInfo
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <div className={"relative"}>
            {isActive &&  <UserManagementOptions/>}
            <div className={` border-opacity-10 px-5 flex rounded-2xl mx-[-8px] mb-4 py-5 items-center
            ${isActive ? "bg-gray-600 shadow-2xl border-t-2 border-white" : ""}`}
                 onClick={() => setIsActive(!isActive)}
            >
                <Image className={"rounded-full w-10 h-10"} width={40} height={40} src={userData.image} alt={"картинка пользователя"}/>
                <div className={"ml-3"}>
                    <h6 className={"text-[14px]"}>{userData.name}</h6>
                    <span className={"text-[14px] text-white opacity-50"}>{userData.email}</span>
                </div>
                <Image src={Options} alt={"user options"} className={"ml-3 cursor-pointer"}/>
            </div>
        </div>
    )
}

export default NavUserInfo