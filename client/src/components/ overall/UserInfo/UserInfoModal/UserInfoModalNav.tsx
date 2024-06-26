import { useState } from "react"
import PasswordChange from "./PasswordChange"

const Options = [
    {title: "Account Info", id: 1},
    {title: "Password", id: 2},
    {title: "Delete Account", id: 3},
]

const UserInfoModalNav = () => {

    const [selectedOption, setSelectedOption] = useState<number>(1)

    return (
        <>
            <ul className="flex space-x-4 mt-5">
                {Options.map(option => {
                    return <li
                        key={option.id}
                        onClick={() => {setSelectedOption(option.id)}}
                        className={`${selectedOption === option.id ? 'text-orange-brand' : "text-gray-600"} 
                        text-[16px] font-medium cursor-pointer`}
                    >
                        {option.title}
                    </li>
                })}
            </ul>
            {selectedOption === 2 && <PasswordChange/>}
        </>
    )
}

export default UserInfoModalNav