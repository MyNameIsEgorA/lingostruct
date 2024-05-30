import {makeAutoObservable} from "mobx";

import type {
    IUserLanguage,
    IUserLogin,
    IUserPassword,
    IUserRegisterContactInfo,
    IUserRegisterInfo,
    IUserToken
} from "@/types/User";
import type {INavBarInfo, IUserOrganizations, IUserProjects} from "@/types/Organizations";
import loginUserAPI from "@/api/user/login";
import {onClientSide} from "@/helpers/decorators/clientSide";

class UserStore {

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
    private userRegisterData: IUserRegisterInfo = {
        email: "",
        password1: "",
        password2: "",
        language: "",
        name: "",
    }

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
    private saveTokenToStorage(tokensData: IUserToken): void {
        localStorage.setItem('UserToken', JSON.stringify({
            access: tokensData.access,
            refresh: tokensData.refresh,
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

    @onClientSide
    public async loginUser(loginData: IUserLogin): Promise<string | undefined>  {
        const response: string | IUserToken = await loginUserAPI(loginData)
        if (typeof response == "string") {
            return undefined
        }
        this.saveTokenToStorage(response)
        return "cool"
    }

    public set userRegisterContactInfo({name, email}: IUserRegisterContactInfo) {
        this.userRegisterData.name = name;
        this.userRegisterData.email = email;
    }

    public get userRegisterContactInfo(): IUserRegisterContactInfo {
        return {name: this.userRegisterData.name, email: this.userRegisterData.email}
    }

    public get userLanguage(): IUserLanguage {
        return {language: this.userRegisterData.language}
    }

    public set userLanguage(language: string) {
        this.userRegisterData.language = language;
    }

    public set userRegisterPasswords({password1, password2}: IUserPassword) {
        this.userRegisterData.password1 = password1
        this.userRegisterData.password2 = password2
    }

    public get getUserRegisterData(): IUserRegisterInfo {
        return {...this.userRegisterData}
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


const userStore: UserStore = new UserStore()
export default userStore;