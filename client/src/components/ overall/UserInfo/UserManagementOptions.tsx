"use client"

import Link from "next/link"
import { useState } from "react"
import UserInfoModal from "./UserInfoModal/UserInfoModal"

const UserManagementOptions = () => {

    const classes: string = "hover:text-black transition-[500ms] cursor-pointer"
    const [isUserSettingsOpen, setIsUserSettingsOpen] = useState<boolean>(false)

    return (
        <div className={"bg-white rounded-3xl text-gray-600 px-3 py-5 w-[120%] shadow-2xl shadow-blue-950"}>
            <div className={classes} onClick={() => {
                setIsUserSettingsOpen(true)
                console.log("clicked")
            }}>Settings</div>
            <div className={"border-y-2 py-[12px] my-3 border-gray-800 " + classes}>
                <Link href={"create_organization"}>Create New Organizations</Link>
            </div>
            <div className={classes}
                 onClick={() => {
                     sessionStorage.clear()
                     window.location.href="/login/"
                 }}
            >Log out</div>
            <UserInfoModal isOpen={isUserSettingsOpen} onClose={() => {setIsUserSettingsOpen(false)}}/>
        </div>
    )
}

export default UserManagementOptions