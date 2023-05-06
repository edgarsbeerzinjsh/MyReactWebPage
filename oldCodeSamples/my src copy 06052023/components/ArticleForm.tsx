import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Button';
import { Article } from '../types/article';
import '../styles/components/article-form.scss';
import axios from 'axios';
import { CATEGORY_LIST } from '../constants/category-list';

type ArticleFormProps = {
    onSubmit: (body: Article) => void;
    onCancel: () => void;
    initialValues?: Article;
}

export const ArticleForm = ({onSubmit, onCancel, initialValues}: ArticleFormProps) => {
    const [title, setTitle] = useState(initialValues?.title || '');
    const [description, setDescription] = useState(initialValues?.description || '');
    const [category, setCategory] = useState(initialValues?.category || CATEGORY_LIST[0]);
    const [image, setImage] = useState(initialValues?.image || '');

    const input = useRef<HTMLInputElement | null>(null);

    
    useEffect(() => {
      input.current?.focus();

      if (image === '')
      {const fetchRandomImage = async () => {           
            try {
                const getData = await axios.get(`https://picsum.photos/600/800`);
                const picLink = getData.request.responseURL;
                setImage(picLink);
            } catch (e) {
                console.log(e);
            }
            };

        fetchRandomImage();}
    }, []);
    

  return (
    <form
        className="article-form" 
        onSubmit={(e) => {
        e.preventDefault();
        const body = {
            id: initialValues?.id,
            title,
            description,
            category,
            image
        };

        onSubmit(body);
    }}>
        <label htmlFor="article-title">Article title</label>
        <input 
            ref={input}
            type="text" 
            id="article-title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
        />

        <label htmlFor="article-description">Article description</label>
        <textarea 
            id="article-description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label htmlFor="article-category">Article category</label>
        <select 
            id="article-category"
            value={category}
            onChange={(e) => {
                setCategory(e.target.value);
            }}
        >
            {CATEGORY_LIST.map((each) => {
                return (
                    <option value={each}>{each}</option>
                );
            })}
        </select>

        <label htmlFor="article-image">Article image</label>
        <input 
            type="text"
            id="article-image" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
        />

        <Button type="submit">Save</Button>

        <Button
            variant='secondary'  
            onButtonClick={() => {
            onCancel();
        }}>Cancel</Button>
    </form>
  )
}