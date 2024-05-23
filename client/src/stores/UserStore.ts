import {makeAutoObservable} from "mobx";

import {IUserLogin, IUserNavBar, IUserToken} from "@/types/User";
import {IOrganizationLink} from "@/types/Organizations";
import loginUserAPI from "@/api/user/login";
import login from "@/api/user/login";
import {string} from "yup";
import {cookies} from "next/headers";

class UserStore {

    status: string = "initial"
    activeOrganization: string = ""

    constructor() {
        makeAutoObservable(this)
        this.loadStateFromStorage()
    }

    getNavBarData = async (): Promise<IUserNavBar | undefined> => {
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

    setActiveOrganization = (organizationName: string): void => {
        this.activeOrganization = organizationName;
        this.saveStateToStorage()
    }

    getActiveOrganization = (): string => {
        return this.activeOrganization
    }

    saveStateToStorage = () => {
        localStorage.setItem('UserStore', JSON.stringify({
            status: this.status,
            activeOrganization: this.activeOrganization
        }));
    }

    saveTokenToStorage = (tokensData: IUserToken) => {
        localStorage.setItem('UserToken', JSON.stringify({
            access: tokensData.access,
            refresh: tokensData.refresh,
        }))
    }

    loadStateFromStorage = () => {
        const storedState = localStorage.getItem('UserStore');
        if (storedState) {
            const state = JSON.parse(storedState);
            this.status = state.status;
            this.activeOrganization = state.activeOrganization;
        }
    }

    loginUser = async (loginData: IUserLogin): Promise<string | undefined> => {
        const response: string | IUserToken = await loginUserAPI(loginData)
        if (typeof response == "string") {
            return undefined
        }
        this.saveTokenToStorage(response)
        return "cool"
    }

}


const userStore: UserStore = new UserStore()
export default userStore;