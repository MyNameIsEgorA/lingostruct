import { OrganizationStore } from "@/stores/OrganizationStore"
import { IUserInOrganization } from "@/types/Organizations"
import { observer } from "mobx-react"
import AddUserButton from "./AddUserButton";
import UserTable from "./UserTable/UserTable";

const AllMembers: React.FC<{members: IUserInOrganization[]}> = observer(({members}) => {

    const organizationsStore: OrganizationStore = OrganizationStore.getInstance(1);
    const userRole: string = organizationsStore.userStatus;
    const description: string = (userRole === "member" ? "See " : "Manage ") + "your team members and their account permissions here"

    return (
        <>
            <div className="flex justify-between items-center mt-8">
                <div>
                    <div className="text-[18px] text-gray-900">Workspace members</div>
                    <div className="text-[14px] text-[#667085] mt-1">{description}</div>
                </div>
                {userRole !== "member" && <AddUserButton />}
            </div>
            <UserTable members={members} className="mt-5"/>
        </>
    )
})

export default AllMembers