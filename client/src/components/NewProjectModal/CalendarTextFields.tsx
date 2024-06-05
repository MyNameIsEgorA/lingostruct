import React, {Dispatch, ReactNode, useEffect, useState} from "react";
import {dateToString, stringToDate} from "@/helpers/TimeFunctions";


interface IProps {
    onTodayClickAction(): void,
    value: Date,
    setValue: Dispatch<any>,
}


const CalendarTextFields: React.FC<IProps> = ({onTodayClickAction, value, setValue}): ReactNode => {

    const [newValue, setNewValue] = useState<string>(dateToString(value))

    useEffect(() => {
        setNewValue(dateToString(value))
    }, [value]);

    const onChange = (e: any): void => {
        setNewValue(e.target.value)
        const res: false | Date = stringToDate(e.target.value)
        console.log("res" + res)
        if (res === false) {
            return
        } else {
            setValue(res)
        }
    }

    return (
        <div className={"flex justify-between mt-[16px]"}>
            <input type="text"
                   onChange={onChange}
                   value={newValue}
                   className={"w-[65%] bg-[#F0F3F6] border-none outline-none rounded-[8px] py-2 px-[14px] text-[16px] text-gray-700]"}
                   placeholder={"Select date"}
            />
            <button
                className={"w-[30%] bg-[#F0F3F6] border-none outline-none rounded-[8px] py-2 px-[14px] text-[16px] text-gray-500]"}
                onClick={onTodayClickAction}
            >
                today
            </button>
        </div>
    )
}

export default CalendarTextFields