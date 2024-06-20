import React from "react";
import UserAvatar from "@/components/OrganizationPage/UserManagement/UserAvatar";

interface IProps {
    name: string,
    image?: string,
}

const AdminUser: React.FC<IProps> = ({name, image}) => {

    const dataToImage: string = image ? image : name

    return (
        <li className={"flex items-center space-x-3"}>
            <UserAvatar item={dataToImage}/>
            <div>{name}</div>
        </li>
    )
}

export default AdminUser