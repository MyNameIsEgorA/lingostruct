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
                role: "admin",
                email: "email@email.com",
                memberSince: "10 Jan 2022"
            },
            members: [
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "admin",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "owner",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "inactive",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "owner",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "admin",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "active",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "invited",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
                },
                {
                    name: "Egor",
                    status: "rejected",
                    id: 1,
                    role: "member",
                    email: "email@email.com",
                    memberSince: "10 Jan 2022"
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