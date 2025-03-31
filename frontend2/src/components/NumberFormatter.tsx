
interface RealFormatterProps {
    value: number;
    isBold?: boolean;
}

export const RealFormatter = ({value, isBold} : RealFormatterProps) => {

    const formattedValue = Intl.NumberFormat( "pt-BR", {
        style: "currency",
        currency: "BRL"
    } ).format( value );

    return (
        <span className={`${isBold == true ? 'font-bold' : 'font-normal'} text-red-500`}>
            {formattedValue}
        </span>
    )
};