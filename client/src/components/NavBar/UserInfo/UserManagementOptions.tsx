import Link from "next/link"

const UserManagementOptions = () => {

    const classes: string = "hover:text-black transition-[500ms] cursor-pointer"

    return (
        <div className={"bg-white rounded-3xl text-gray-600 px-3 py-5 w-[120%] shadow-2xl shadow-blue-950"}>
            <div className={classes}>Settings</div>
            <div className={"border-y-2 py-[12px] my-3 border-gray-800 " + classes}>
                <Link href={"create_organization"}>Create New Organizations</Link>
                </div>
            <div className={classes}
                 onClick={() => {
                     sessionStorage.clear()
                     window.location.href="/login/"
                 }}
            >Log out</div>
        </div>
    )
}

export default UserManagementOptions