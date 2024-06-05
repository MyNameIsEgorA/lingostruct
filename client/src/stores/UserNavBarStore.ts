import {makeAutoObservable} from "mobx";


import type {INavBarInfo, IUserNavBarData, IUserOrganizations, IUserProject} from "@/types/Organizations";
import {onClientSide} from "@/helpers/decorators/clientSide";
// import {authAxiosRequest} from "@/helpers/requests/authAxiosRequest";
import {AxiosInstance, AxiosResponse} from "axios";
import {IUserNavBar} from "@/types/User";

class UserNavBarStore {

    private activeOrganization: string = ""
    private activeProject: IUserProject = {title: "", color: "", URL: ""};

    constructor() {
        makeAutoObservable(this)
        this.loadStateFromStorage()
        // this.getApiData()
    }

    private NavBarInfo: INavBarInfo = {
        organizations: [
            {
                URL: "https://www.organization1.com",
                title: "Organization 1"
            },
            {
                URL: "https://www.organization2.com",
                title: "Organization 2"
            }
        ],
        activitiesAmount: 99,
        projects: [
            {
                color: "#FF0000",
                title: "Project 1",
                URL: "https://www.project1.com"
            },
            {
                color: "#00FF00",
                title: "Project 2",
                URL: "https://www.project2.com"
            }
        ],
        user: {
            email: "john.doe@example.com",
            image: 'http://api.lingostruct.ru/media/profile/admin/3yqmiiq8ejjgjki0ws5qn872enbdaj1c.jpg',
            name: "John Doe"
        }
    };

    public status: string = "initial"

    // private getApiData = async (): Promise<void> => {
    //     const instance: false | AxiosInstance = await authAxiosRequest()
    //     if (!instance) {
    //         console.log("ERROR IN `public getApiData: no token`")
    //         return;
    //     }
    //     const data: any = await instance.get("/profile/test")
    //     // this.setNavBarInfo(data.data.detail[0])
    //     console.log(data.data.detail[0])
    // }

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
    public get userInfo(): IUserNavBarData {
        return this.NavBarInfo.user
    }
    public setNavBarInfo(data: INavBarInfo): void {
        this.NavBarInfo = data
    }

}


const userNavBarStore: UserNavBarStore = new UserNavBarStore()
export default userNavBarStore;