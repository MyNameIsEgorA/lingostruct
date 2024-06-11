"use client"

import Header from "@/components/Header/Header";
import OrganizationsList from "@/components/MyOrganizations/OrganizationsList";
import Footer from "@/components/Footer";

const MyOrganizations = () => {

    return (
        <>
            <Header/>
            <OrganizationsList/>
            <Footer/>
        </>
    );
};

export default MyOrganizations;