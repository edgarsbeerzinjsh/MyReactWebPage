import {Button} from './Button';
import { InputText } from './InputText';
import { useState } from 'react';
import "../styles/components/item.scss";

type ArticleItemProps = {
    article: {
        title: string;
        id: string;
        description: string;
    }
    onEdit: (title: string,  description: string) => void;
}

export const ArticleItem = ({ article, onEdit }: ArticleItemProps) => {
    const [inEdit, setInEdit] = useState(false);
    const [editTitle, setTitleValue] = useState(article.title);
    const [editDescription, setDescriptionValue] = useState(article.description);
    
    return (
        <li className="item">
            {!inEdit ? (
                <div className="item-content">
                    <p className="item-title">{article.title}</p>
                    <p className="item-description">{article.description}</p>
                </div>

            ) : (
                <form 
                    className="edit-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setInEdit(!inEdit);
                        onEdit(editTitle, editDescription);
                    }}>
                    <div className="item-content">
                        <InputText
                            id="edit-title"
                            value={editTitle}
                            placeholder={editTitle}
                            onValueChange={(event) => {
                                const newValue = event.target.value;
                                setTitleValue(newValue);
                            }}/>
                        <InputText
                            id="edit-description"
                            value={editDescription}
                            placeholder={editDescription}
                            onValueChange={(event) => {
                                const newValue = event.target.value;
                                setDescriptionValue(newValue);
                            }}/>
                    </div>
                    <Button
                        children="Save"
                        type="submit"/>
                </form>
            )}
            <div className="item-content">
                <Button
                    variant={inEdit ? "primary" : "secondary"}
                    children={inEdit ? "Cancel" : "Edit"}
                    onButtonClick={() => {
                        setInEdit(!inEdit);
                        setTitleValue(article.title);
                        setDescriptionValue(article.description);
                    }}/>
            </div>
        </li>    
    );
}