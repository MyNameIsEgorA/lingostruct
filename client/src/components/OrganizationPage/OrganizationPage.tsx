// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import Navigation, {UserPagesEnum} from "@/components/OrganizationPage/Navigation";
import DecorativeSection from "@/components/OrganizationPage/DecorativeSection";
import UserManagement from "@/components/OrganizationPage/UserManagement/UserManagement";
import {observer} from "mobx-react";
import {OrganizationStore} from "@/stores/OrganizationStore";

interface Tab {
    id: number;
    label: string;
}

const OrganizationsPage: React.FC<{id: number}> = observer(({id}) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const organizationStore: OrganizationStore = OrganizationStore.getInstance(id)
    organizationStore.initialize()

    useEffect(() => {
        console.log(activeTab)
    }, [activeTab]);

    return (
        <div className={"p-8 w-full"}>
            <h2 className={"font-semibold text-[24px] text-[#101828]"}>Workspace settings</h2>
            <h4 className={"text-[#667085] text-[14px]"}>Manage your team members and their account permissions here.</h4>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab}/>
            <DecorativeSection id={activeTab} className={"mb-9"}/>
            {activeTab === UserPagesEnum.UserManagement && <UserManagement organizationsStore={organizationStore}/>}
        </div>
    )
});

export default OrganizationsPage;