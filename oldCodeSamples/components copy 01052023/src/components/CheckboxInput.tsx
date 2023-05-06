

type CheckboxInputProps = {
    id: string;
    checked: boolean;
    onCheckboxChange: () => void;
}

export const CheckboxInput = ({id, checked, onCheckboxChange}:CheckboxInputProps) => {
    return (
        <input
            id={id} 
            type="checkbox" 
            checked={checked} 
            onChange={() => {
                onCheckboxChange()
        }}/>
    );
}