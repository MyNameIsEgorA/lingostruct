import {IOrganizationPage} from "@/types/Organizations";

export const getOrganizationData = (id: number): IOrganizationPage => {
    return (
        {
            name: "Strabag",
            country: "Russia",
            address: "Saint-Petersburg",
            creator: 1,
            data_register: "10.08.2024",
            requestUser: {
                name: "Egor",
                status: "active",
                id: 1,
                role: "admin"
            },
            members: [
                {
                    name: "Egor Dmitrievich",
                    status: "active",
                    id: 1,
                    role: "admin"
                },
                {
                    name: "Vitya",
                    status: "inactive",
                    id: 3,
                    role: "owner"
                },
                {
                    name: "Sasha",
                    status: "rejected",
                    id: 2,
                    role: "user"
                },
            ],
            id: 1,
            projects: [
                {name: "Some Name", id: 1, membersAmount: 10},
                {name: "Some Name", id: 1, membersAmount: 10}
            ],
            city: "Saint-Petersburg"
        }
    )
 }