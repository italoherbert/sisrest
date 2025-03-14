
const Message = ({message, type}) => {
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