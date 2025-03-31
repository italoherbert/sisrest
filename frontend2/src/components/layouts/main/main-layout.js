import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const MainLayout = ({ children }) => {
    const [sidebarVisible, setSidebarVisible] = useState( false );

    const onSidebarVisible = async () => {
        setSidebarVisible( !sidebarVisible );
    };

    return (
        <>
            <Navbar onSidebarVisible={ onSidebarVisible } />
            <Sidebar visible={sidebarVisible} onVisible={ onSidebarVisible } />    
            <div className="flex justify-center justify-items-center mt-10">
                {children}   
            </div>
        </>
    );
};

export default MainLayout;