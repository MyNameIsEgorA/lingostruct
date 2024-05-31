import React, { useState } from "react";
import { observer } from "mobx-react";
import userAuthStore from "@/stores/UserAuthStore";

interface IProps {
    handleNext: () => void,
}


const languagesList: string[] = [
    "Русский",
    "English",
    "Chinese",
    "German",
    "Italian",
    "French"
]


const SecondStep: React.FC<IProps> = observer(({ handleNext }) => {
    const [language, setLanguage] = useState<string>("");

    const handleLanguageChange = (e: any): void => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        if (languagesList.includes(selectedLanguage)) {
            userAuthStore.userLanguage = selectedLanguage;
        } else {
            userAuthStore.userLanguage = ""
        }
    };

    return (
        <>
            <div>
                <input
                    list="language"
                    type="text"
                    className={"input-field"}
                    name="language"
                    placeholder="language"
                    value={language}
                    onChange={handleLanguageChange}
                />
                <datalist id="language">
                    {languagesList.map((language, index) => {
                        return <option key={index} value={language}/>
                    })}
                </datalist>
                <button onClick={handleNext} className={"submit-button"}>Далее</button>
            </div>
        </>
    );
});

export default SecondStep;