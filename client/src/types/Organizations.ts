export interface IUserOrganizations {
    URL: string,
    title: string
}

export interface IUserProject {
    color: string,
    title: string,
    URL: string,
}

export interface IUserNavBarData {
    image: string,
    name: string,
    email: string,
}

export interface INavBarInfo {
    organizations: IUserOrganizations[],
    activitiesAmount: number,
    projects: IUserProject[],
    user: IUserNavBarData
}
