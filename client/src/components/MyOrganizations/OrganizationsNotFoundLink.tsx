import Link from "next/link"

const OrganizationsNotFoundLink = () => {
    return (
        <div className={"mx-auto w-fit mt-8"}>
            <span>Can't find a workspace?</span>
            <Link href={"/login/"} className={"text-orange-brand ml-2"}>Try login with another email</Link>
        </div>
    )
}

export default OrganizationsNotFoundLink