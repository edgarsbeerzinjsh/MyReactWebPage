import React, { useEffect, useState } from 'react';

type Article = {
    title: string;
    id: string;
    description: string;
}

export const TodoListFromServer = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    // useEffect - hooks kas skatās, kad komponente ir uzzīmēta (radusies)
    useEffect(() => {
        setArticles([
            {
            title: 'Title 1',
            id: '1',
            description:  'Description 1'
            },
        ]);
    }, []);

    return <div>TodoListFromServe</div>;
}
