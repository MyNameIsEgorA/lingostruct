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
