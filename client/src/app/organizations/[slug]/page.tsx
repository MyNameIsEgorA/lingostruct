"use client";

import { useParams } from 'next/navigation';
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import OrganizationPage from "@/components/OrganizationPage/OrganizationPage";
import {Layout} from "@/components/ overall/Layout";

export default function Page() {
    const params: Params = useParams();
    const slug: string | string[] = params.slug;

    return (
        <div className={"flex"}>
            <Layout showNavBar={true}/>
            <OrganizationPage id={Number(slug)}/>
        </div>
    );
}