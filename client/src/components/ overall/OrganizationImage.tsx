import Image from "next/image";
import IMG from "../../../public/Organization.svg";
import React from "react";

export function OrganizationImage(props: { title: string }) {
    return <>
        <Image src={IMG} alt={"Организация"} className="w-10 bg-[#F0F3F6] p-2 rounded-lg"/>
        <h3 className={"text-[18px]"}>
            {props.title}
        </h3>
    </>;
}