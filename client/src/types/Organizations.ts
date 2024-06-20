import {IProjectInOrganization} from "@/types/Project";

export interface IUserOrganizations {
    url: string,
    title: string
}

export interface IUserProject {
    color: string,
    title: string,
    url: string,
}

export interface IUserShortData {
    image: string,
    name: string,
    email: string,
}

export interface INavBarInfo {
    organizations: IUserOrganizations[],
    activitiesAmount: number,
    projects: IUserProject[],
    user: IUserShortData
}

export interface IUserInOrganization {
    id: number,
    role: string,
    name: string,
    status: string,
    image?: string,
}

export interface IFullOrganizationInfo {
    name: string,
    country: string,
    city: string,
    address: string
}

export interface IOrganizationApi {
    id: number,
    name: string,
    membersAmount: number
}

export interface IOrganizationsAPI {
    organizations: IOrganizationApi[]
}

export interface IOrganizationPage {
    id: number,
    creator: number,
    name: string,
    country: string,
    city: string,
    address: string,
    data_register: string,
    requestUser: IUserInOrganization,
    members: IUserInOrganization[],
    projects: IProjectInOrganization[],
}

export interface IOrganizationPageUsers {
    administrators: IUserInOrganization[],
    workspaceMembers: IUserInOrganization[]
}