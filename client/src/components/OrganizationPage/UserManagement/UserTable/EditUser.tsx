import DeleteUser from "@/../public/Trash.svg";
import Edit from "@/../public/Edit.svg";
import Image from "next/image";

interface IProps {
    isHovered: boolean,
    email: string,
    name: string,
}

const EditUser: React.FC<IProps> = ({ isHovered, email, name }) => {
    return (
        <div>
            {isHovered && 
                <div className="flex space-x-5">
                    <Image src={Edit} alt="Edit User" />
                    <Image src={DeleteUser} alt="Delete User" />
                </div>
            }
        </div>
    );
};

export default EditUser;