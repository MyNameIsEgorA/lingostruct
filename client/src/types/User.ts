import {IUserOrganizations} from "@/types/Organizations";


export interface IUserNavBar {
    organizations: IUserOrganizations[],
    activities: Number,
    projects: string[],
    imageURL?: string,
    name: string,
    email: string,
}


export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    password2: string,
    username: string,
}


export interface IUserToken {
    access: string,
    refresh: string,
}


export interface IUserRegisterContactInfo {
    name: string,
    email: string,
}


export interface IUserLanguage {
    language: string,
}


export interface IUserPassword {
    password1: string,
    password2: string,
}

export interface IUserProfile {
    name: string,
    email: string,
    image: string,
}

export interface IUserRegisterInfo extends IUserRegisterContactInfo, IUserLanguage, IUserPassword {};