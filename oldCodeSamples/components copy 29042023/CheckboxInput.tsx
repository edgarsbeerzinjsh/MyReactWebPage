

type CheckboxInputProps = {
    checked: boolean;
    onCheckboxChange: () => void;
}

export const CheckboxInput = ({checked, onCheckboxChange}:CheckboxInputProps) => {
    return (
        <input 
            type="checkbox" 
            checked={checked} 
            onChange={() => {
                onCheckboxChange()
        }}/>
    );
}