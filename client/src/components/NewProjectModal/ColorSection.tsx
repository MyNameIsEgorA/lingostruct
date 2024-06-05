import React, {Dispatch, SetStateAction} from "react";
import projectInfoModalStore from "@/stores/ProjectInfoModalStore";

const colors: string[] = ["#F04438", "#FAB005", "#12B76A", "#7950F2",
    "#FF7E0D", "#40C057", "#0070FF", "#FD14BC"]


interface IProps {
    active: string,
    setActive: Dispatch<SetStateAction<string>>,
}


const ColorSection: React.FC<IProps> = ({active, setActive}) => {

    return (
        <div className={"colors-container absolute mt-2 border-[1px] border-gray-200 shadow-2xl"}>
            {colors.map((color, index) => {
                return <div
                    key={index}
                    className={`color ${color === active ? "border-[2px] border-orange-500" : ""}`}
                    style={{backgroundColor: color}}
                    onClick={(): void => {
                        setActive(color)
                        projectInfoModalStore.setProjectColor(color)
                    }}
                ></div>
            })}
        </div>
    )
}

export default ColorSection