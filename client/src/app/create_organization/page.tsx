import {Layout} from "@/components/ overall/Layout";
import OrganizationPage from "@/components/OrganizationPage/OrganizationPage";

export default function Home() {
    return (
        <div className="flex flex-col desktop:flex-row">
            <Layout showNavBar={true}/>
            <OrganizationPage/>
        </div>
    );
}
