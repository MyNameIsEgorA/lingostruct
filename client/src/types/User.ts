import {IOrganizationLink} from "@/types/Organizations";

export interface IUserNavBar {
    organizations: IOrganizationLink[],
    activities: Number,
    projects: string[],
    imageURL?: string,
    name: string,
    email: string,
}