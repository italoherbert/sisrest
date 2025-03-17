
export const RealFormatter = ({value}) => {

    const formattedValue = Intl.NumberFormat( "pt-BR", {
        style: "currency",
        currency: "BRL"
    } ).format( value );

    return (
        <span className="text-red-500">
            {formattedValue}
        </span>
    )
};