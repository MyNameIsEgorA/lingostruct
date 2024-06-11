import Image from "next/image";
import SettingsImage from "../../../public/SettingsImage.svg"
import React from "react";

const SettingInfo: React.FC<{edit?: boolean}> = ({edit}) => {

    const title: string = edit ? "Edit workspace" : "Create workspace"
    const description: string = "Place where you can " + (edit ? "edit" : "create") + "all information about your Company"

    return (
        <div className={"flex space-x-3"}>
            <div className={"px-[14px] py-[13px] bg-[#F0F3F6] rounded-[8px]"}>
                <Image src={SettingsImage} alt={"settings"}/>
            </div>
            <div>
                <h6 className={"text-[18px] text-gray-900"}>{title}</h6>
                <div className={"text-[14px] text-gray-400"}>{description}</div>
            </div>
        </div>
    )
}

export default SettingInfo