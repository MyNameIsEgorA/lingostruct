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
    memberSince: string,
    email: string,
}

export interface RequestUser {
    id: number, 
    name: string,
    role: string,
    status: string,
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

export interface ActiveOrganization {
    id: number,
        organization: {
            id: number,
            name: string,
            country: string,
            city: string,
            address: string,
            date_register: string,
            creator: number,
        }
} 

export interface IOrganizationsAPI {
    active_organizations: ActiveOrganization[],
    invited: any[]
}

export interface IOrganizationPage {
    request_user: RequestUser,
    organization: {
        creator: any,
        id: number,
        name: string,
        country: string,
        city: string,
        address: string,
        date_register: string,
        members: IUserInOrganization[],
        projects: IProjectInOrganization[],
    },
}

export interface IOrganizationPageUsers {
    administrators: IUserInOrganization[],
    workspaceMembers: IUserInOrganization[]
}