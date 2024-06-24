import React from "react";
import {IUserInOrganization} from "@/types/Organizations";
import AdminUser from "@/components/OrganizationPage/UserManagement/AdminUser";

const AdminSection: React.FC<{admins: IUserInOrganization[]}> = ({admins}) => {

    return (
        <div className={""}>
            <h3 className={"font-bold text-[18px] text-gray-800"}>Administrators</h3>
            <ul className={"flex flex-wrap gap-x-14 text-[16px] font-semibold mt-5 gap-y-5"}>
                {admins.map((admin, index) => {
                    return <AdminUser name={admin.name || "admin"} image={admin.image} key={index}/>
                })}
            </ul>
            <div className={"w-full h-0.5 bg-gray-200 mt-10"}></div>
        </div>
    )
}

export default AdminSection