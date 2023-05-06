

type InputTextProps = {
    labelName?: string;
    id: string;
    value: string;
    placeholder: string;
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputText = ({ labelName, id, value, placeholder, onValueChange }: InputTextProps) => {
    return (
        <>
            <label htmlFor={id}>{labelName}</label>
            <input 
                id={id} 
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(event) => {
                    onValueChange(event);
                }}/>
        </>
    )
};