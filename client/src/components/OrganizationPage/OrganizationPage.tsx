import SettingInfo from "@/components/OrganizationPage/SettingInfo";
import FormSection from "@/components/OrganizationPage/FormSection/FormSection";

const OrganizationPage = () => (
    <div className={"flex flex-col p-8"}>
        <h2 className={"text-[24px] font-semibold text-[#101828]"}>Workspace creating</h2>
        <h5 className={"mt-1 text-[14px] text-[#667085] mb-5"}>manage your team members and their account permissions here.</h5>
        <SettingInfo edit={false}/>
        <FormSection/>
    </div>
);

export default OrganizationPage;