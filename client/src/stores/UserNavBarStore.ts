import {makeAutoObservable} from "mobx";


import type {INavBarInfo, IUserOrganizations, IUserProjects} from "@/types/Organizations";
import {onClientSide} from "@/helpers/decorators/clientSide";

class UserNavBarStore {

    private activeOrganization: string = ""
    private chosenProject: IUserProjects | undefined = undefined;

    constructor() {
        makeAutoObservable(this)
        this.loadStateFromStorage()
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
            image: "https://www.example.com/user.jpg",
            name: "John Doe",
            email: "john.doe@example.com"
        }
    };

    public status: string = "initial"

    public setActiveOrganization = (organizationName: string): void => {
        this.activeOrganization = organizationName;
        this.saveStateToStorage()
    }

    public get getActiveOrganization(): string {
        return this.activeOrganization;
    }

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
            this.setActiveProject = state.activeProject
        }
    }

    public get getOrganizations(): IUserOrganizations[] {
        return this.NavBarInfo.organizations
    }

    public get activities_amount(): number {
        return this.NavBarInfo.activitiesAmount
    }

    public get activeProject(): undefined | IUserProjects {
        return this.chosenProject
    }

    public set setActiveProject(project: IUserProjects) {
        this.chosenProject = project
        this.saveStateToStorage()
    }

}


const userStore: UserNavBarStore = new UserNavBarStore()
export default userStore;