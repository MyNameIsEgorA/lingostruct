import React, { useEffect, useState } from "react";
import {generateDates} from "@/helpers/TimeFunctions";
import SideArrow from "@/../public/sideArrow.svg";
import Image from "next/image";
import CalendarTextFields from "@/components/NewProjectModal/CalendarTextFields";
import { observer } from "mobx-react";

interface IProps {
    getDate: Date | null;
    setNewDate(date: Date): void;
}

const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Calendar: React.FC<IProps> = observer(({ getDate, setNewDate }) => {
    const [date, setDate] = useState<Date>(getDate ? new Date(getDate) : new Date());

    useEffect(() => {
        if (getDate) {
            setDate(new Date(getDate));
        }
    }, [getDate]);

    useEffect(() => {
        setDate(getDate || new Date());
        setNewDate(date)
    }, [getDate]);

    const handlePickDay = (day: number, type: string): void => {
        if (type === "next") {
            increaseMonth()
        } else if (type === "prev") {
            decreaseMonth()
        } else {
            const newDate: Date = new Date(date.getFullYear(), date.getMonth(), day);
            setDate(newDate);
            setNewDate(newDate);
        }
    };

    const setNewDateInput = (date: Date): void => {
        setDate(date);
        setNewDate(date);
    }

    const increaseMonth = (): void => {
        setDate(prevDate => {
            const month: number = prevDate.getMonth() === 11 ? 0 : prevDate.getMonth() + 1;
            const year: number = prevDate.getMonth() === 11 ? prevDate.getFullYear() + 1 : prevDate.getFullYear();
            return new Date(year, month, 1);
        });
    };

    const decreaseMonth = (): void => {
        setDate(prevDate => {
            const month: number = prevDate.getMonth() === 0 ? 11 : prevDate.getMonth() - 1;
            const year: number = prevDate.getMonth() === 0 ? prevDate.getFullYear() - 1 : prevDate.getFullYear();
            return new Date(year, month, 1);
        });
    };

    const setToday = (): void => {
        const today: Date = new Date();
        setDate(today);
        setNewDate(today);
    }

    console.log(date)
    console.log(date.getFullYear())
    const currentDates: {date: number, month: string}[][] = date ? generateDates(date.getFullYear(), date.getMonth()) : [];

    return (
        <div className={"p-8 shadow-2xl w-[328px] rounded-[16px]"}>
            <div className="heading flex justify-between text-gray-700 text-[16px] font-semibold">
                <button onClick={decreaseMonth}>
                    <Image src={SideArrow} alt={""} />
                </button>
                <div>{`${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.getDate() !== 0 ? ', ' + date.getDate() : ""}`}</div>
                <button onClick={increaseMonth}>
                    <Image src={SideArrow} alt={""} className={"rotate-180"} />
                </button>
            </div>
            <CalendarTextFields onTodayClickAction={setToday} value={date} setValue={setNewDateInput}/>
            <div className={"flex justify-items-end w-full mt-[16px] text-gray-600 text-[14px] font-medium"}>
                <div className="flex-grow">Mo</div>
                <div className="flex-grow">Tu</div>
                <div className="flex-grow">We</div>
                <div className="flex-grow">Th</div>
                <div className="flex-grow">Fr</div>
                <div className="flex-grow">Sat</div>
                <div className="flex-grow-0">Su</div>
            </div>
            <div className={'flex flex-col space-y-2 mt-3'}>
                {currentDates.map((week, index) => (
                    <div key={index} className={"flex justify-items-end w-full"}>
                        {week.map((day, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer ${day.date === date.getDate() && day.month === "this" ? " text-orange-brand" : ""}
                                ${index === 6 ? "flex-grow-0  " : "flex-grow"} 
                                ${day.month !== "this" ? "text-gray-400" : ""}
                 `}
                                onClick={() => handlePickDay(day.date, day.month)}
                            >
                                {day.date}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Calendar;