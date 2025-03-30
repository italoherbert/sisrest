import { ReactNode } from 'react';

interface FormProps {
    children: ReactNode;
}


const Form = ({children} : FormProps) => {
    return (
        <div className="max-w-sm mx-auto">
            {children}
        </div>
    );
};

export default Form;