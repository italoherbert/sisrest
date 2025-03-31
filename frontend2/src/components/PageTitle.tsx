import { ReactNode } from "react";

interface PageTitleProps {
    children: ReactNode;
}

const PageTitle = ({children}: PageTitleProps) => {
    return (
        <h1 className="text-2xl font-bold text-center">
            {children}
        </h1>
    );
};

export default PageTitle;