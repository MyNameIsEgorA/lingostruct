import React, {useState} from "react";
import {observer} from "mobx-react";
import userLoginStore from "@/stores/UserLoginStore";
import {IUserPassword} from "@/types/User";

const ThirdStep = observer(() => {

    const [passwordData, setPasswordData] = useState<IUserPassword>({ password1: '', password2: '' });

    const handlePasswordChange = (e: any, field: string): void => {
        setPasswordData(prevPasswordData => ({
            ...prevPasswordData,
            [field]: e.target.value
        }));
        userLoginStore.userRegisterPasswords = passwordData;
    };

    return (
        <>
            <div>
                <div className="">
                    <h4 className="block text-gray-900 text-[14px] mb-1">
                        Password
                    </h4>
                    <input
                        type="password"
                        className={"input-field"}
                        placeholder="Пароль"
                        value={passwordData.password1}
                        onChange={(e) => handlePasswordChange(e, "password1")}
                    />
                </div>
                <div className="mt-5">
                    <h4 className="block text-gray-900 text-[14px] mb-1">
                        Confirm Password
                    </h4>
                    <input
                        type="password"
                        className={"input-field"}
                        placeholder="Подтвердите пароль"
                        value={passwordData.password2}
                        onChange={(e) => handlePasswordChange(e, "password2")}
                    />
                </div>
                <button className="submit-button">
                    Далее
                </button>
            </div>
        </>
    )
})

export default ThirdStep