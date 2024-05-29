"use client"

import React, { useState } from 'react';
import { IUserPassword, IUserRegisterContactInfo } from "@/types/User";
import "./authForm.css"
import FirstStep from "@/components/Auth/RegisterSteps/FirstStep";
import Image from "next/image";
import Logo from "../../../public/TGA.png";
import Link from "next/link";
import SecondStep from "@/components/Auth/RegisterSteps/SecondStep";
import {observer} from "mobx-react";
import userStore from "@/stores/UserStore";
import ThirdStep from "@/components/Auth/RegisterSteps/ThirdStep";


const RegistrationForm = observer(() => {
    const [step, setStep] = useState<number>(1);

    const handleNext = (): void => {
        console.log(userStore.userLanguage, userStore.userRegisterContactInfo)
        if (step === 1) {
            const {name, email} = userStore.userRegisterContactInfo
            if (name !== "" && email != "") {
                setStep(2);
            }
        } else if (step === 2 && userStore.userLanguage.language !== "") {
            setStep(3);
        }
    };

    return (
        <div className="left-component">
            <div>
                <Image src={Logo} alt={"TGA"}/>
            </div>
            <h3 className="form-heading">Sign up</h3>
            <div className="form-description mb-10">What are we working on today?</div>
            {step === 1 && <FirstStep handleNext={handleNext}/>}
            {step === 2 && <SecondStep handleNext={handleNext}/>}
            {step === 3 && <ThirdStep/>}
            <div className={"flex flex-col desktop:space-x-3 desktop:flex-row mt-6"}>
                <div>Already have an account?</div>
                <Link href={"login"}
                    className={"cursor-pointer text-orange-500"}
                >Log in</Link>
            </div>
        </div>
    );
})

export default RegistrationForm;