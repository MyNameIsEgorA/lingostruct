import {makeAutoObservable} from "mobx";


import type {INavBarInfo, IUserShortData, IUserOrganizations, IUserProject} from "@/types/Organizations";
import {onClientSide} from "@/helpers/decorators/clientSide";
// import {authAxiosRequest} from "@/helpers/requests/authAxiosRequest";
import {AxiosInstance, AxiosResponse} from "axios";
import {IUserNavBar} from "@/types/User";
import Requests from "@/helpers/requests/authAxiosRequest";

class UserNavBarStore {

    private activeOrganization: string = ""
    private activeProject: IUserProject = {title: "", color: "", url: ""};

    constructor() {
        makeAutoObservable(this)
        this.loadStateFromStorage()
        // this.getApiData()
    }

    private NavBarInfo: INavBarInfo = {
        organizations: [
        ],
        activitiesAmount: 0,
        projects: [
        ],
        user: {
            email: "",
            image: '',
            name: ""
        }
    };

    public status: string = "initial"

    public getApiData = async (): Promise<void> => {
        const requestMaker: Requests = new Requests("profile/test");
        const response: any = await requestMaker.makeRequest()
        if (response) {
            this.NavBarInfo = response.data.detail[0]
            this.NavBarInfo.user.image = 'http://api.lingostruct.ru/media/profile/admin/3yqmiiq8ejjgjki0ws5qn872enbdaj1c.jpg'
            console.log(response.data.detail[0])
        }
    }

    public setActiveOrganization = (organizationName: string): void => {
        this.activeOrganization = organizationName;
        this.saveStateToStorage()
    }

    public get getActiveOrganization(): string {
        return this.activeOrganization;
    }

    @onClientSide
    private saveStateToStorage(): void  {
        localStorage.setItem('UserStore', JSON.stringify({
            status: this.status,
            activeOrganization: this.activeOrganization,
            activeProject: this.activeProject
        }))
    }

    @onClientSide
    private loadStateFromStorage(): void {
        const storedState: string | null = localStorage.getItem('UserStore');
        if (storedState) {
            const state = JSON.parse(storedState);
            this.status = state.status;
            this.activeOrganization = state.activeOrganization;
            this.activeProject = state.activeProject
        }
    }

    public get getOrganizations(): IUserOrganizations[] {
        return this.NavBarInfo.organizations
    }
    public get activities_amount(): number {
        return this.NavBarInfo.activitiesAmount
    }
    public get getActiveProject(): IUserProject {
        return this.activeProject
    }
    public setActiveProject = (project: IUserProject): void => {
        this.activeProject = project
        this.saveStateToStorage()
    }
    public get projectsList(): IUserProject[] {
        return this.NavBarInfo.projects
    }
    public get userInfo(): IUserShortData {
        return this.NavBarInfo.user
    }
    public setNavBarInfo(data: INavBarInfo): void {
        this.NavBarInfo = data
    }

}


const userNavBarStore: UserNavBarStore = new UserNavBarStore()
export default userNavBarStore;