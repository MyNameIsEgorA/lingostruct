import React from "react";
import {OrganizationStore} from "@/stores/OrganizationStore";
import {IUserInOrganization, IUserOrganizations} from "@/types/Organizations";
import AdminSection from "@/components/OrganizationPage/UserManagement/AdminSection";
import AllMembers from "./AllMembers";

const UserManagement: React.FC<{organizationsStore: OrganizationStore}> = ({organizationsStore}) => {
    const members: IUserInOrganization[] = organizationsStore.usersPageData.workspaceMembers
    const admins: IUserInOrganization[] = organizationsStore.usersPageData.administrators

    return (
        <div>
            <AdminSection admins={admins}/>
            <AllMembers members={members}/>
        </div>
    )
}

export default UserManagement