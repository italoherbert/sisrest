const Painel = ({className, children}) => {
    let classNames = "border border-gray-300 rounded";
    if ( className !== undefined )
        classNames += " "+className;

    return (
        <div className={classNames}>
            {children}
        </div>
    );
};

export default Painel;