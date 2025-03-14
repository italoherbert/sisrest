
const Label = ({lfor, children}) => {
    return (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {children}
        </label>
    );
};

export default Label;