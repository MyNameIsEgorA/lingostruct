import {makeAutoObservable} from "mobx";

import type {
    IUserLanguage,
    IUserLogin,
    IUserNavBar, IUserPassword,
    IUserRegisterContactInfo,
    IUserRegisterInfo,
    IUserToken
} from "@/types/User";
import {IOrganizationLink} from "@/types/Organizations";
import loginUserAPI from "@/api/user/login";

function onClientSide(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
        if (typeof localStorage !== 'undefined') {
            return originalMethod.apply(this, args);
        } else {
            console.error('localStorage is not available');
        }
    };
}

class UserStore {

    constructor() {
        makeAutoObservable(this)
        this.loadStateFromStorage()
    }

    public activeOrganization: string = ""
    public status: string = "initial"
    private userRegisterData: IUserRegisterInfo = {
        email: "",
        password1: "",
        password2: "",
        language: "",
        name: "",
    }

    public async getNavBarData(): Promise<IUserNavBar | undefined> {
        const organizationsList: IOrganizationLink[] = [{title: "Strabag", URL:"123"}, {title: "HH.RU", URL:"234"}, {title: "avito", URL:"2345"}]
        try {
            this.saveStateToStorage()
            return {
                organizations: organizationsList,
                email: "eanahin8v@mail.ru",
                activities: 99,
                name: "Anakhin Egor",
                projects: ["Постройка дома", "Постройка дачи"],
            }
        } catch (e) {
            return undefined
        }
    }

    public setActiveOrganization(organizationName: string): void {
        this.activeOrganization = organizationName;
        this.saveStateToStorage()
    }

    public getActiveOrganization(): string {
        return this.activeOrganization;
    }

    private saveStateToStorage(): void  {
        localStorage.setItem('UserStore', JSON.stringify({
            status: this.status,
            activeOrganization: this.activeOrganization
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

}


const userStore: UserStore = new UserStore()
export default userStore;