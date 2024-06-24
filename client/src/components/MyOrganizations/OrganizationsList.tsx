import { ActiveOrganization } from "@/types/Organizations"
import React from "react"
import Organization from "./Organization"

interface IProps {
    organizations: ActiveOrganization[] | null,
}

const OrganizationsList: React.FC<IProps> = ({organizations}) => {
    return (
        <>
        {<ul className="mt-10 mx-auto w-fit space-y-3">
            {organizations && organizations.map((organization, index) => {
                return <Organization 
                    key={index}
                    membersAmount={organization.organization.id}
                    name={organization.organization.name}
                    id={organization.organization.id}/>
            })}
        </ul>}
        </>
    )
}

export default OrganizationsList