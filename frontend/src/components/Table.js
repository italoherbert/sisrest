
export const Table = ({children}) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            {children}
        </table>
    )
};

export const TableHead = ({children}) => {
    return (
        <thead className="bg-gray-50">
            {children}
        </thead>
    )
};

export const TableBody = ({children}) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {children}
        </tbody>
    )
};

export const TableTR = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    );
};

export const TableTD = ({children}) => {
    return (
        <td className="bg-white divide-y divide-gray-200">
            {children}
        </td>
    );
};

export const TableTH = ({children}) => {
    return (
        <th className="bg-white divide-y divide-gray-200">
            {children}
        </th>
    )
};