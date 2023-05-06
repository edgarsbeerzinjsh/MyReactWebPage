import {Button} from './Button';
import { CheckboxInput } from './CheckboxInput';
import { InputText } from './InputText';
import { useState } from 'react';

type TodoItemProps = {
    todo: {
        title: string;
        id: string;
        isDone: boolean;
    }
    onCheckboxChange: () => void;
    onDelete: () => void;
    onEdit: (text: string) => void;
}

export const TodoItem = ({ todo,  onCheckboxChange,  onDelete, onEdit }: TodoItemProps) => {
    const [inEdit, setInEdit] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    
    return (
        <div>
            {!inEdit ? (
                <span>{todo.title}</span>
            ) : (
                <form>
                    <InputText
                        id="edit-title"
                        labelName="Edit todo"
                        value={editValue}
                        placeholder={editValue}
                        onValueChange={(event) => {
                            const newValue = event.target.value;
                            setEditValue(newValue);
                        }}/>
                </form>
            )}
            <CheckboxInput
                checked={todo.isDone}
                onCheckboxChange={() => {
                    onCheckboxChange()
            }}/>
            <Button 
                text="Delete"
                onButtonClick={() => {
                    onDelete()
                }}/>
            <Button
                variant={inEdit ? "primary" : "secondary"}
                text={inEdit ? "Save" : "Edit"}
                onButtonClick={() => {
                    setInEdit(!inEdit)
                    onEdit(editValue)
                }}/>
            {inEdit ? (
                <Button
                    text="Cancel"
                    onButtonClick={() => {
                        setInEdit(!inEdit)
                        setEditValue(todo.title)
                        onEdit(todo.title)
                    }}/>
            ) : null}
        </div>    
    );
}

/*
InputText

                <label htmlFor="edit-title">Edit todo</label>
                <input 
                    id="edit-title" 
                    type="text"
                    value={editValue}
                    placeholder={editValue}
                    onChange={(event) => {
                        const newValue = event.target.value;
                        setEditValue(newValue);
                    }}/>
*/