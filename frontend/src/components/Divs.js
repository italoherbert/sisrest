
export const DivItemsCenter = ({className, children}) => {
    let classNames = "flex justify-center items-center";
    if ( className !== undefined && className !== null )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    )
};