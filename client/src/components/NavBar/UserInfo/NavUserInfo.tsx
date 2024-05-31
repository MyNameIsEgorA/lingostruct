import {observer} from "mobx-react";
import userNavBarStore from "@/stores/UserNavBarStore";
import Image from "next/image";
import {IUserNavBarData} from "@/types/Organizations";

const NavUserInfo = observer(() => {

    const userData: IUserNavBarData = userNavBarStore.userInfo

    return (
        <div className={"p-8 border-t-2 border-white border-opacity-10"}>
            <Image width={40} height={40} src={userData.image} alt={"картинка пользователя"}/>
        </div>
    )
})

export default NavUserInfo