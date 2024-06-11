import Image from "next/image";
import DateImage from "../../../public/dateImage.svg";
import Calendar from "@/components/NewProjectModal/Calendar";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";
import React, {useRef, useState} from "react";
import Arrow from "@/../public/arrow.svg"
import ColorSection from "@/components/NewProjectModal/ColorSection";

const SecondLayer = () => {

    const [showStartDate, setShowStartDate] = useState<boolean>(false);
    const [showEndDate, setShowEndDate] = useState<boolean>(false);
    const [showColors, setShowColors] = useState<boolean>(false)
    const [currentColor, setCurrentColor] = useState<string>(projectInfoModalStore.projectColor)

    return (
            <div className="flex justify-between mt-5">
                <div className="relative">
                    <button className="input-section items-center space-x-3"
                            onClick={() => {
                                setShowColors(!showColors)
                                setShowEndDate(false)
                                setShowStartDate(false)
                            }}
                    >
                        <div className={`color`} style={{backgroundColor: currentColor}}></div>
                        <Image src={Arrow} alt={"open"}
                               className={`brightness-50 h-4 transition-[500ms] ${showColors ? "rotate-180" : ""}`}/>
                    </button>
                    {showColors && <ColorSection active={currentColor} setActive={setCurrentColor}/>}
                </div>


                <div className="relative">
                    <button className={"w-[169px] input-section flex items-center space-x-3"}
                            onClick={() => {
                                setShowStartDate(!showStartDate)
                                setShowEndDate(false)
                                setShowColors(false)
                            }}>
                        <Image src={DateImage} alt={"time"}/>
                        <span className="">select date</span>
                    </button>
                    {showStartDate && (
                        <div className={"absolute z-20"}>
                            <Calendar
                                getDate={projectInfoModalStore.startDate}
                                setNewDate={projectInfoModalStore.setStartDate}/>
                        </div>
                    )}
                </div>


                <div className="relative">
                    <button className={"w-[169px] input-section flex items-center space-x-3"}
                            onClick={() => {
                                setShowEndDate(!showEndDate)
                                setShowStartDate(false)
                                setShowColors(false)
                            }}>
                        <Image src={DateImage} alt={"time"}/>
                        <span className="">select date</span>
                    </button>
                    {showEndDate && (
                        <div className={"absolute right-0"}>
                            <Calendar
                                getDate={projectInfoModalStore.endDate}
                                setNewDate={projectInfoModalStore.setEndDate}/>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default SecondLayer