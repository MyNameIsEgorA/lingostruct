import React, {ReactNode, useLayoutEffect, useState} from "react";
import {IUserProject} from "@/types/Organizations";
import Link from "next/link";

interface IProps extends IUserProject {
    isActive: boolean;
    clickAction: () => void;
}

const SingleProject: React.FC<IProps> = ({title, url, color, isActive, clickAction}): ReactNode => {

    const [show, setShow] = useState<boolean>(false);

    useLayoutEffect(() => {
        setShow(isActive)
    }, [isActive]);

    return (
        <div onClick={clickAction} className={""}>
            <Link href={url}
                  onClick={() => clickAction()}>
                <div
                    className={`text-white rounded-lg text-[16px] px-8 py-2 flex space-x-2 items-center ${show ? "bg-white bg-opacity-10" : "text-opacity-50"}`}>
                    <div style={{ borderColor: color, backgroundColor: show ? color : ""}} className={`border-[${color}] border-2 w-[14px] h-[14px] rounded-[4px]`}></div>
                    <div>{title}</div>
                </div>
            </Link>
        </div>
    )
}

export default SingleProject