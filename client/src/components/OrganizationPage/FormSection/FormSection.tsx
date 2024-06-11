"use client"

import {IFullOrganizationInfo} from "@/types/Organizations";
import {Field, Form, Formik} from "formik";
import {createOrganization} from "@/api/organization/create";
import {useState} from "react";
import SuccessModal from "@/components/OrganizationPage/FormSection/SuccessModal";
import UnSuccessModal from "@/components/OrganizationPage/FormSection/UnSuccessModal";

const FormSection = () => {

    const [isCorrectData, setIsCorrectData] = useState<null | boolean>(null)
    const data: IFullOrganizationInfo = {address: "", name: "", city: "", country: ""}

    return (
        <div id={"create-organization"}>
            <Formik initialValues={data} onSubmit={async (values) => {
                const status: number = await createOrganization(values)
                setIsCorrectData(status !== 400)
            }}>
                <Form className={"space-y-[98px] mt-10"}>
                    <div className={"space-y-4"}>
                        <div>
                            <label htmlFor="name">Organization name</label>
                            <Field id="name" name="name" placeholder={"Strabag"}
                                   className={"input-section w-[800px]"}/>
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <Field id="country" name="country" placeholder={"Russia"}
                                   className={"input-section w-[800px]"}/>
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <Field id="city" name="city" placeholder={"Saint-Petersburg"}
                                   className={"input-section w-[800px]"}/>
                        </div>
                        <div>
                            <label htmlFor="address">Address</label>
                            <Field id="address" name="address" placeholder={"Karpovka river"}
                                   className={"input-section w-[800px]"}/>
                        </div>
                    </div>
                    <button
                        className={"mt-[98px] py-3 px-10 bg-blue-700 text-white rounded-[16px] flex justify-items-end"}
                        type={"submit"}>Save</button>
                </Form>
            </Formik>
            {isCorrectData === true && <SuccessModal/>}
            {typeof isCorrectData === "boolean" && !isCorrectData && <UnSuccessModal setter={setIsCorrectData}/>}
        </div>
    )
}

export default FormSection