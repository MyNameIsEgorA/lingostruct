import { makeAutoObservable } from "mobx";
import { IOrganizationPage, IOrganizationPageUsers, IUserInOrganization } from "@/types/Organizations";
import { getOrganizationData } from "@/api/organization/getOrganizationData";
import { onClientSide } from "@/helpers/decorators/clientSide";

export class OrganizationStore {
    private static instance: OrganizationStore | null = null;

    private _organizationData: IOrganizationPage | null = null;
    private _userStatus: string = "admin";
    private _organizationID: number;

    private constructor(id: number) {
        makeAutoObservable(this);
        this._organizationID = id;
    }

    public static getInstance(id: number): OrganizationStore {
        if (!OrganizationStore.instance) {
            OrganizationStore.instance = new OrganizationStore(id);
        }
        return OrganizationStore.instance;
    }

    public async initialize(): Promise<void> {
        const response: IOrganizationPage = await getOrganizationData(this._organizationID)
        this._organizationData = response;
        this._userStatus = this._organizationData.request_user.role;
        this.setOrganizationID(this._organizationID);
    }

    @onClientSide
    private setOrganizationID(id: number): void {
        sessionStorage.setItem("organizationID", JSON.stringify(this._organizationID));
    }

    @onClientSide
    public static getOrganizationId(): string | null {
        const organizationID = sessionStorage.getItem("organizationID");
        if (!organizationID) {
            return null;
        }
        return JSON.parse(organizationID);
    }

    private getAdmins = (): IUserInOrganization[] => {
        const admins: IUserInOrganization[] = [];
        if (this._organizationData) {
            this._organizationData.organization.members.forEach(user => {
                if (user.role === "admin" || user.role === "owner") {
                    admins.push(user);
                }
            });
        }
        return admins;
    }

    public get usersPageData(): IOrganizationPageUsers {
        return {
            administrators: this.getAdmins(),
            workspaceMembers: this._organizationData ? this._organizationData.organization.members : []
        };
    }

    public get userStatus(): string {
        return this._userStatus;
    }
}