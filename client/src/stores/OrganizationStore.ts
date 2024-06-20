import {makeAutoObservable} from "mobx";
import {IOrganizationPage, IOrganizationPageUsers, IUserInOrganization} from "@/types/Organizations";
import {getOrganizationData} from "@/api/organization/getOrganizationData";


export class OrganizationStore {

    private organizationData: IOrganizationPage;

    constructor(id: number) {
        makeAutoObservable(this)
        this.organizationData = getOrganizationData(id)
    }

    private getAdmins = (): IUserInOrganization[] => {
        const admins: IUserInOrganization[] = []
        this.organizationData.members.forEach(user => {
            if (user.role === "admin" || user.role === "owner") {
                admins.push(user)
            }
        })
        return admins
    }

    public get usersPageData(): IOrganizationPageUsers {
        return (
            {
                administrators: this.getAdmins(),
                workspaceMembers: this.organizationData.members
            }
        )
    }

}

export default OrganizationStore