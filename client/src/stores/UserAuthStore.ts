import {makeAutoObservable} from "mobx";

import type {
    IUserLanguage,
    IUserLogin,
    IUserPassword, IUserRegister,
    IUserRegisterContactInfo,
    IUserRegisterInfo,
    IUserToken
} from "@/types/User";
import loginUserAPI from "@/api/user/login";
import {onClientSide} from "@/helpers/decorators/clientSide";
import registerUserAPI from "@/api/user/register";

class UserAuthStore {

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
        sessionStorage.setItem('UserToken', JSON.stringify({
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

    @onClientSide
    public async registerUser(): Promise<boolean> {
        return await registerUserAPI(this.userRegisterData)
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


const userAuthStore: UserAuthStore = new UserAuthStore()
export default userAuthStore;