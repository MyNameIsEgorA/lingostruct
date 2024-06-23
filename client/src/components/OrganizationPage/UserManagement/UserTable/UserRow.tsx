import UserAvatar from "../UserAvatar"
import EditUser from "./EditUser";
import UserStatus from "./UserStatus";
import { useState } from "react";

interface IProps {
    image?: string,
    name: string,
    status: string,
    memberSince: string,
    email: string,
    role: string,
    isUserAdmin: boolean;
}

const UserRow: React.FC<IProps> = ({name, status, memberSince, email, role, isUserAdmin, image}) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    const onMouseEnter = () => {
        setIsHovered(true)
    }

    const onMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <tr
            className={"transition-[500ms] " + (isHovered ? "bg-gray-50" : "")} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <td className="flex items-center space-x-3">
                <UserAvatar item={image || name}/>
                <span>{name}</span>    
            </td>
            <td><UserStatus status={status}/></td>
            <td>{memberSince}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{isUserAdmin ? <EditUser isHovered={isHovered} email={email} name={name}/> : ""}</td>
        </tr>
    )
}

export default UserRow;