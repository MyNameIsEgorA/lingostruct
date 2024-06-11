import {useEffect, useState} from "react";
import {IOrganizationApi} from "@/types/Organizations";
import {getAllOrganizationsList} from "@/api/organization/getAllOrganizations";
import Organization from "@/components/MyOrganizations/Organization";
import Link from "next/link";

const OrganizationsList = () => {

    const [organizationsData, setOrganizationsData] = useState<IOrganizationApi[] | null>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const data = await getAllOrganizationsList();
            setOrganizationsData(data.data.organizations);
            console.log(data.data)
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul className="mt-10 mx-auto w-fit space-y-3">
                {organizationsData && organizationsData.map(
                    (data, index) => {
                        return <Organization key={index} {...data}/>
                    }
                )}
            </ul>
            <div className={"mx-auto w-fit mt-8"}>
                <span>Can't find a workspace?</span>
                <Link href={"/login/"} className={"text-orange-brand ml-2"}>Try login with another email</Link>
            </div>
        </div>
    )
}

export default OrganizationsList