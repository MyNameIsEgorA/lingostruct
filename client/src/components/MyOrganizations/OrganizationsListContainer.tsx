import {useLayoutEffect, useState} from "react";
import {ActiveOrganization, IOrganizationsAPI} from "@/types/Organizations";
import {getAllOrganizationsList} from "@/api/organization/getAllOrganizations";
import Organization from "@/components/MyOrganizations/Organization";
import Link from "next/link";
import OrganizationsNotFoundLink from "./OrganizationsNotFoundLink";
import OrganizationsList from "./OrganizationsList";

const OrganizationsListContainer = () => {

    const [acitveOrganizations, setActiveOrganizations] = useState<ActiveOrganization[] | null>(null);
    const [invitedOrganizations, setInvitedOrganizations] = useState<ActiveOrganization[] | null>(null)

    useLayoutEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data: {data: IOrganizationsAPI} = await getAllOrganizationsList();
            setActiveOrganizations(data.data.active_organizations);
            setInvitedOrganizations(data.data.invited)
        };

        fetchData();
    }, []);

    return (
        <div>
            <OrganizationsList organizations={acitveOrganizations}/>
            <h3>{invitedOrganizations && invitedOrganizations.length !== 0 && "Workspace invitations"}</h3>
            <OrganizationsNotFoundLink/>
            <OrganizationsList organizations={invitedOrganizations}/>
        </div>
    )
}

export default OrganizationsListContainer