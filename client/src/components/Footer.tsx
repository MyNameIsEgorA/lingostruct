import Link from "next/link";

const Footer = () => {
    return (
        <div className={"absolute py-5 bottom-0 border-t-2 px-10 w-full flex justify-between"}>
            <div className={"space-x-5"}>
                <Link href={"https://www.google.com/"}>Impressum</Link>
                <Link href={"https://www.google.com/"}>Datenschutz</Link>
                <Link href={"https://www.google.com/"}>AGB</Link>
            </div>
            <div>© Copyright TGA 4.0 2023</div>
        </div>
    )
}

export default Footer