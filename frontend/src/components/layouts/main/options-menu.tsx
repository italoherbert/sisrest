
import { useState } from 'react';
import Link from 'next/link';
import { FaGear } from 'react-icons/fa6';

import ButtonIcon from '../../buttons/ButtonIcon';

const OptionsMenu = () => {
    const [open, setOpen] = useState( false );

    const dropdownOnClick = async () => {
        setOpen( !open );
    };

    return (
        <div>
            <ButtonIcon variant="alternative" onClick={dropdownOnClick}>
                <FaGear className='text-3lx'/>                
            </ButtonIcon>
            <div id="optionsDropdown" className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 ${open ? 'block' : 'hidden'}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link href="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            Logout
                        </Link>
                    </li>                    
                </ul>
            </div>
        </div>
    );
};

export default OptionsMenu;