const PainelItem = ({children, className}) => {
    let classNames = "border border-gray-300 rounded bg-blue-50";
    if ( className !== undefined )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    );
};

export default PainelItem;