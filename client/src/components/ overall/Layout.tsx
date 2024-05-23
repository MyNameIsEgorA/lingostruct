import {ReactNode} from "react";
import NavBar from "@/components/NavBar/NavBar";

interface LayoutProps {
    showNavBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({showNavBar }) => {
    return (
        <>
            {showNavBar && <NavBar />}
        </>
    );
};