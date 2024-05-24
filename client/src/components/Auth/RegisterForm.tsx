"use client"

import React, { useState } from 'react';
import {IUserPassword, IUserRegisterContactInfo} from "@/types/User";
import "./authForm.css"

const RegistrationForm = () => {
    const [step, setStep] = useState<number>(1);
    const [userData, setUserData] = useState<IUserRegisterContactInfo>({ name: '', email: '' });
    const [password, setPassword] = useState<IUserPassword>({password1: "", password2: ""});

    const handleNext = () => {
        if (step === 1 && userData.name && userData.email) {
            setStep(2);
        } else if (step === 2 && password.password1 && password.password2 == password.password2) {
            setStep(3);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleInputChange = (e: any): void => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handlePasswordChange = (e: any, field: string): void => {
        setPassword(prevPassword => ({
            ...prevPassword,
            [field]: e.target.value
        }));
    };

    return (
        <div className="left-component">
            {step === 1 && (
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleNext}>Далее</button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <button onClick={handleBack}>Назад</button>
                    <select>
                        {/* Выбор языка */}
                    </select>
                    <button onClick={handleNext}>Далее</button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <button onClick={handleBack}>Назад</button>
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password.password1}
                        onChange={() => handlePasswordChange(event, "password1")}
                    />
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={password.password2}
                        onChange={() => handlePasswordChange(event, "password2")}
                    />
                </div>
            )}
        </div>
    );
};

export default RegistrationForm;