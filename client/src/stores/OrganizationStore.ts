import { makeAutoObservable } from "mobx";
import { IOrganizationPage, IOrganizationPageUsers, IUserInOrganization } from "@/types/Organizations";
import { getOrganizationData } from "@/api/organization/getOrganizationData";

export class OrganizationStore {
    private static instance: OrganizationStore | null = null;

    private _organizationData: IOrganizationPage;
    private _userStatus: string = "admin";
    private _organizatinoID: number;

    private constructor(id: number) {
        makeAutoObservable(this);
        this._organizationData = getOrganizationData(id);
        this._userStatus = this._organizationData.requestUser.role
        this._organizatinoID = id;
    }

    public static getInstance(id: number): OrganizationStore {
        if (!OrganizationStore.instance) {
            OrganizationStore.instance = new OrganizationStore(id);
        }
        return OrganizationStore.instance;
    }

    private getAdmins = (): IUserInOrganization[] => {
        const admins: IUserInOrganization[] = [];
        this._organizationData.members.forEach(user => {
            if (user.role === "admin" || user.role === "owner") {
                admins.push(user);
            }
        });
        return admins;
    }

    public get usersPageData(): IOrganizationPageUsers {
        return {
            administrators: this.getAdmins(),
            workspaceMembers: this._organizationData.members
        };
    }

    public get userStatus(): string {
        return this._userStatus;
    }
}
