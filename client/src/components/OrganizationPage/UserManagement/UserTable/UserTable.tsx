import "./UserTable.css"
import UserAvatar from "../UserAvatar"
import { IUserInOrganization } from "@/types/Organizations"
import { OrganizationStore } from "@/stores/OrganizationStore"
import UserRow from "./UserRow"
import { useState } from "react"
import { Pagination } from "@mui/material"

const UserTable: React.FC<{ members: IUserInOrganization[], className: string }> = ({ members, className }) => {
    const organizationStore: OrganizationStore = OrganizationStore.getInstance(1)
    const isUserAdmin: boolean = organizationStore.userStatus !== "member"

    const [page, setPage] = useState<number>(1);
    const membersPerPage: number = 10;

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const displayedMembers = members.slice((page - 1) * membersPerPage, page * membersPerPage);

    return (
        <div>
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
                    {displayedMembers.map((member, index) => {
                        return (
                            <UserRow
                                image={member.image}
                                name={member.name || "member"}
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
            <Pagination
                count={Math.ceil(members.length / membersPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </div>
    )
}

export default UserTable