import {Layout} from "@/components/ overall/Layout";
import OrganizationInfoPage from "@/components/OrganizationPage/OrganizationInfoPage";

export default function Home() {
    return (
        <div className="flex flex-col desktop:flex-row">
            <Layout showNavBar={true}/>
            <OrganizationInfoPage/>
        </div>
    );
}
