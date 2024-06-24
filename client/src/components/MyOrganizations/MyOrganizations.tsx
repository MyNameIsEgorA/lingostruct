"use client"

import Header from "@/components/Header/Header";
import OrganizationsListContainer from "@/components/MyOrganizations/OrganizationsListContainer";
import Footer from "@/components/Footer";

const MyOrganizations = () => {

    return (
        <>
            <Header/>
            <OrganizationsListContainer/>
            <Footer/>
        </>
    );
};

export default MyOrganizations;