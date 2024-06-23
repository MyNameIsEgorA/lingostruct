const UserStatus: React.FC<{status: string}> = ({status}) => {

    let styles: string = "px-[15px] py-[6px] w-fit rounded-xl"
    if (status === "active") {
        styles += " text-[#12B76A] bg-[#12B76A] bg-opacity-10"
    } 
    if (status === "invited") {
        styles += " text-[#E5A94E] bg-[#E5A94E] bg-opacity-10"
    }
    if (status === "rejected") {
        styles += " text-[#DC271B] bg-[#DC271B] bg-opacity-10"
    }

    return (
        <div className={styles}>
            {status}
        </div>
    )
}

export default UserStatus