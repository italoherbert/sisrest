
import Link from 'next/link';
import SimpleButton from '../../buttons/SimpleButton';
import { FaArrowLeft } from 'react-icons/fa6';

const SidebarLink = ({href, children}) => {
    return (
        <Link href={href} className="block px-6 py-1 text-gray-500 hover:bg-gray-100 hover:text-blue-800 dark:hover:bg-gray-600 dark:hover:text-white">
            {children}
        </Link>
    )
}

const Sidebar = ({visible, onVisible}) => {    
    return (
        <aside className={`absolute left-0 z-40 w-64 border-r border-gray-300 h-screen transition-transform -translate-x-full sm:translate-x-0 ${visible ? 'block' : 'hidden'}`} aria-label="Sidebar">
            <div className="h-full py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="font-medium">
                    <li className="pb-3">
                        <h1 className="text-2xl px-3 flex justify-between items-center">
                            Menu
                            <SimpleButton onClick={onVisible}>
                                <FaArrowLeft />
                            </SimpleButton>
                        </h1>
                    </li>
                    <li>
                        <SidebarLink href="/cardapio-item">
                            Cardápio
                        </SidebarLink>
                    </li>
                    <li>
                        <SidebarLink href="/cardapio-item/novo">
                            Novo
                        </SidebarLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;