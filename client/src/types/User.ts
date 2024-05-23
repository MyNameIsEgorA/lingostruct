import {IOrganizationLink} from "@/types/Organizations";

export interface IUserNavBar {
    organizations: IOrganizationLink[],
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


export interface IUserToken {
    access: string,
    refresh: string,
}