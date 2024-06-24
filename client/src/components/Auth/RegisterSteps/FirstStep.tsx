import React, { useState } from "react";
import { IUserRegisterContactInfo } from "@/types/User";
import "../inputFields.css";
import { observer } from "mobx-react";
import userAuthStore from "@/stores/UserAuthStore";
import { emailValidation, fullNameValidation } from "@/helpers/validations";

interface IProps {
    handleNext: () => void;
}

const FirstStep: React.FC<IProps> = observer(({ handleNext }) => {
    const [userData, setUserData] = useState<IUserRegisterContactInfo>({
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState<{ name: string; email: string }>({
        name: "",
        email: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        const newUserData = { ...userData, [name]: value };
        setUserData(newUserData);

        let newErrors = { ...errors };
        if (name === "name") {
            newErrors.name = fullNameValidation(value) ? "" : "Invalid full name, example: 'Robert Paulson'";
        }

        if (name === "email") {
            newErrors.email = emailValidation(value) ? "" : "Invalid email";
        }

        setErrors(newErrors);
        userAuthStore.userRegisterContactInfo = newUserData;
    };

    return (
        <>
            <div className={"desktop:w-[344px]"}>
                <div className={`input-container ${errors.name ? 'input-container-error' : ''}`}>
                    <h4 className="block text-gray-900 text-[14px] mb-1">Full name</h4>
                    <input
                        className={"input-field"}
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className={`mt-9 input-container ${errors.email ? 'input-container-error' : ''}`}>
                    <h4 className="block text-gray-900 text-[14px] mb-1">Email</h4>
                    <input
                        className={"input-field"}
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <button
                    onClick={() => {
                        if (Object.values(errors).every((error) => error === "")) {
                            handleNext();
                        }
                    }}
                    className="submit-button"
                >
                    Далее
                </button>
            </div>
        </>
    );
});

export default FirstStep;