
interface MessageProps {
    message : string | null | undefined;
    type: "error" | "info"; 
}

const Message = ({message, type} : MessageProps) => {
    return (
        <>
            { message === null || message === undefined ? 
                <></>
            :
                <>
                    { type === "error" ?
                        <div className="text-red-500">{message}</div>
                    :
                        <div className="text-blue-600 dark:text-sky-400">{message}</div>
                    }
                </>
            }
        </>
    );
}

export default Message;