import NavBar from "@/components/NavBar/NavBar";

interface LayoutProps {
    showNavBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({showNavBar }) => {
    return (
        <div className="mr-[280px]">
            {showNavBar && <NavBar />}
        </div>
    );
};