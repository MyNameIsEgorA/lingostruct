import {ReactNode} from "react";
import NavBar from "@/components/NavBar/NavBar";

interface LayoutProps {
    children: ReactNode,
    showNavBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showNavBar }) => {
    return (
        <>
            {showNavBar && <NavBar />}
            <main>{children}</main>
        </>
    );
};