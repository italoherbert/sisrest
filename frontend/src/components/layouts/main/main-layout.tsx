import { ReactNode, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children } : MainLayoutProps) => {
    const [sidebarVisible, setSidebarVisible] = useState( false );

    const onToggleSidebarVisible = async () => {
        setSidebarVisible( !sidebarVisible );
    };

    return (
        <>
            <Navbar onToggleSidebarVisible={ onToggleSidebarVisible } />
            <Sidebar visible={sidebarVisible} onToggleVisible={ onToggleSidebarVisible } />    
            <div className="flex justify-center justify-items-center mt-10">
                {children}   
            </div>
        </>
    );
};

export default MainLayout;