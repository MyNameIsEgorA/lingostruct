import React, {useState} from "react";
import {IUserRegisterContactInfo} from "@/types/User";
import "../inputFields.css"
import {observer} from "mobx-react";
import userStore from "@/stores/UserStore";

interface IProps {
    // userData: IUserRegisterContactInfo,
    // handleInputChange: (event: any) => void,
    handleNext: () => void,
}


const FirstStep: React.FC<IProps> = observer(({handleNext}) => {

    const [userData, setUserData] = useState<IUserRegisterContactInfo>({
        name: "",
        email: "",
    })

    const handleInputChange = (event: any): void => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "name") {
            setUserData(
                {...userData, name: value}
            )
        }

        if (name === "email") {
            setUserData(
                {...userData, email: value}
            )
        }

        userStore.userRegisterContactInfo = userData
    }

    return (
        <>
            <div className={"desktop:w-[344px]"}>
                <div>
                    <h4 className="block text-gray-900 text-[14px] mb-1">
                        Full name
                    </h4>
                    <input className={"input-field"}
                           type="text"
                           name="name"
                           placeholder="Enter name"
                           value={userData.name}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="mt-5">
                    <h4 className="block text-gray-900 text-[14px] mb-1">
                        Email
                    </h4>
                    <input className={"input-field"}
                           type="email"
                           name="email"
                           placeholder="Enter email"
                           value={userData.email}
                           onChange={handleInputChange}
                    />
                </div>
                <button
                    onClick={handleNext}
                    className="submit-button"
                >Далее</button>
            </div>
        </>
    )
})

export default FirstStep