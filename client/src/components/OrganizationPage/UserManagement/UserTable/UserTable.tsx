import "./UserTable.css"
import UserAvatar from "../UserAvatar"
import { IUserInOrganization } from "@/types/Organizations"
import { OrganizationStore } from "@/stores/OrganizationStore"
import UserRow from "./UserRow"

const UserTable: React.FC<{members: IUserInOrganization[], className: string}> = ({members, className}) => {

    const organizationStore: OrganizationStore = OrganizationStore.getInstance(1)
    const isUserAdmin = organizationStore.userStatus !== "member"
    
    return (
            <table className={className}>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Status</th>
                        <th>Member since</th>
                        <th>Email address</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => {
                        return (
                            <UserRow 
                                image={member.image}
                                name={member.name}
                                status={member.status}
                                memberSince={member.memberSince}
                                email={member.email}
                                role={member.role}
                                isUserAdmin={isUserAdmin}
                                key={index}
                            />
                        )
                    })}
                </tbody>
            </table>
    )
}

export default UserTable