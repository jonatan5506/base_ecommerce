import { cn } from "@/lib/utils";

const ProductPrice = ({value, className}: {value: number, className?: string}) => {

    //Formatar valor
    const stringValue = value.toFixed(2);
    //Pegar preço inteiro e decimal
    const [intValue, floatValue] = stringValue.split('.');
    return (
        <p className={cn("text-2xl", className)}>
            <span className="text-xs align-super">R$</span>
            {intValue}
            <span className="text-xs align-super">,{floatValue}</span>
        </p>
    );
}
 
export default ProductPrice;