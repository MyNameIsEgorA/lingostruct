export interface IProjectModal {
    projectName: string,
    projectCode: string,
    color: string,
    startDate: Date,
    endDate: Date,
    projectDescription: string,
    projectCost: string,
}

export interface IProjectInOrganization {
    id: number,
    name: string,
    membersAmount: number,
}