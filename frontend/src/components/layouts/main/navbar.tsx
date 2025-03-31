import { FaBars } from "react-icons/fa6";

import OptionsMenu from "./options-menu";

import SimpleButton from "../../buttons/SimpleButton";

interface NavbarProps {
    onToggleSidebarVisible(): void;
}

const Navbar = ({onToggleSidebarVisible} : NavbarProps) => {
    return (
        <nav className="bg-blue-50 dark:bg-gray-900 border-b border-gray-300">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex justify-left items-center">
                    <SimpleButton onClick={onToggleSidebarVisible}>
                        <FaBars className="text-3xl"/>
                    </SimpleButton>
                    <h1 className="mx-3 text-3xl font-bold text-gray-500">
                        SisRest
                    </h1>
                </div>
                <OptionsMenu />
            </div>
        </nav>
    );
};

export default Navbar;