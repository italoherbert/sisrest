
const SimpleButton = ({onClick, disabled, children}) => {
    return (
        <button type="button" className="cursor-pointer" onClick={onClick} disabled={disabled ?? ''}>
            {children}
        </button>
    );
};

export default SimpleButton;