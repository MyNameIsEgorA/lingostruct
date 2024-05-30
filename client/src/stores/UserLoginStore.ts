import {makeAutoObservable} from "mobx";

import type {
    IUserLanguage,
    IUserLogin,
    IUserPassword,
    IUserRegisterContactInfo,
    IUserRegisterInfo,
    IUserToken
} from "@/types/User";
import loginUserAPI from "@/api/user/login";
import {onClientSide} from "@/helpers/decorators/clientSide";

class UserLoginStore {

    constructor() {
        makeAutoObservable(this)
    }

    private userRegisterData: IUserRegisterInfo = {
        email: "",
        password1: "",
        password2: "",
        language: "",
        name: "",
    }

    @onClientSide
    private saveTokenToStorage(tokensData: IUserToken): void {
        localStorage.setItem('UserToken', JSON.stringify({
            access: tokensData.access,
            refresh: tokensData.refresh,
        }))
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


const userLoginStore: UserLoginStore = new UserLoginStore()
export default userLoginStore;