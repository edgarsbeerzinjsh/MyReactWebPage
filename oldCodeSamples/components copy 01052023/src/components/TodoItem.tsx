import {Button} from './Button';
import { CheckboxInput } from './CheckboxInput';
import { InputText } from './InputText';
import { useState } from 'react';
import "../styles/components/item.scss";

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
        <li className="item">
            {!inEdit ? (
                <span className="item-title">{todo.title}</span>
            ) : (
                <form 
                    className="edit-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setInEdit(!inEdit);
                        onEdit(editValue);
                    }}>
                    <InputText
                        id="edit-title"
                        value={editValue}
                        placeholder={editValue}
                        onValueChange={(event) => {
                            const newValue = event.target.value;
                            setEditValue(newValue);
                        }}/>
                    <Button
                        children="Save"
                        type="submit"/>
                </form>
            )}
            <div className="item-content">
                <label htmlFor={todo.id}>
                    {todo.isDone ? "Done" : "Not done"}
                    <CheckboxInput
                        id={todo.id}
                        checked={todo.isDone}
                        onCheckboxChange={() => {
                            onCheckboxChange();
                    }}/>
                </label>

                <Button 
                    children="Delete"
                    onButtonClick={() => {
                        onDelete();
                    }}/>
                <Button
                    variant={inEdit ? "primary" : "secondary"}
                    children={inEdit ? "Cancel" : "Edit"}
                    onButtonClick={() => {
                        setInEdit(!inEdit);
                        setEditValue(todo.title);
                    }}/>
            </div>
        </li>    
    );
}