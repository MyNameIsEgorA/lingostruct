import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import userAuthStore from "@/stores/UserAuthStore";
import { IUserPassword } from "@/types/User";
import { useRouter } from "next/navigation";

// Функция валидации пароля
export const passwordValidation = (password: string): boolean => {
    return (
        password.length > 8 &&
        /\d/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password)
    );
};

const ThirdStep = observer(() => {
    const [passwordData, setPasswordData] = useState<IUserPassword>({
        password1: "",
        password2: "",
    });
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const router = useRouter();

    const handlePasswordChange = (e: any, field: string): void => {
        const newPasswordData = {
            ...passwordData,
            [field]: e.target.value,
        };
        setPasswordData(newPasswordData);

        if (field === "password1") {
            if (!passwordValidation(newPasswordData.password1)) {
                setPasswordError("Password is weak");
            } else {
                setPasswordError("");
            }
        }

        if (field === "password2") {
            if (newPasswordData.password1 !== newPasswordData.password2) {
                setConfirmPasswordError("Passwords are different");
            } else {
                setConfirmPasswordError("");
            }
        }
    };

    const handleSubmit = async (): Promise<void> => {
        if (!passwordError && !confirmPasswordError) {
            userAuthStore.userRegisterPasswords = passwordData;
            setIsSuccess(await userAuthStore.registerUser());
        }
    };

    useEffect(() => {
        if (isSuccess === true) {
            router.push('/register/success');
        } else if (isSuccess === false) {
            router.push("register/not_success")
        }
    }, [isSuccess, router]);

    return (
        <>
            <div>
                <div className="input-container">
                    <h4 className="block text-gray-900 text-[14px] mb-1">Password</h4>
                    <input
                        type="password"
                        className={"input-field"}
                        placeholder="Пароль"
                        value={passwordData.password1}
                        onChange={(e) => handlePasswordChange(e, "password1")}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className={`input-container mt-9 ${confirmPasswordError ? 'input-container-error' : ''}`}>
                    <h4 className="block text-gray-900 text-[14px] mb-1">Confirm Password</h4>
                    <input
                        type="password"
                        className={"input-field"}
                        placeholder="Подтвердите пароль"
                        value={passwordData.password2}
                        onChange={(e) => handlePasswordChange(e, "password2")}
                    />
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                </div>
                <button className="submit-button" onClick={handleSubmit}>Далее</button>
                {isSuccess && <div>Все круто</div>}
            </div>
        </>
    );
});

export default ThirdStep;