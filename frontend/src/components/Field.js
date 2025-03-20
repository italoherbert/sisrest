
const Field = ({name, nameTextColor, valueTextColor, children}) => {
    return (
        <div className="flex flex-col">
            <div className={`${nameTextColor ?? 'text-gray-900'} text-sm`}>
                {name}
            </div>
            <div className={`${valueTextColor ?? 'text-blue-500'} text-lg`}>
                {children}
            </div>
        </div>
    )
};

export default Field;