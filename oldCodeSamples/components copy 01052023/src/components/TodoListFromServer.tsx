import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import { ArticleItem } from './ArticleItem';

type Article = {
    title: string;
    id: string;
    description: string;
}

//delay, lai redzētu isLoading
const delay = (ms: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  };



//JSON server: json-server --watch db.json --port 3004
const API_URL = "http://localhost:3004/articles";

export const TodoListFromServer = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addingArticle, setAddingArticle] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                await delay(1000);
                const { data } = await axios.get(API_URL);
                setArticles(data);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.log("erorr", error)
            }            
        };
            
        fetchData();
    }, []);

    const addArticle = async(newArticle: Article) => {
        try {
            setIsLoading(true);
            await delay(1000);
            const { data } = await axios.post(API_URL, newArticle);
      
            setArticles([...articles, data]);
            setIsLoading(false);
            setAddingArticle(false);
            //setCount(count + 1);
        } catch (error) {
            setIsLoading(false);
            setAddingArticle(false);
            console.log("error", error);
        }
    };

    const deleteArticle = async(id: string) => {
        const articleToRemove = articles.find((article) => {
            return article.id === id;
        });

        try {
            setIsLoading(true);
            await delay(1000);
            await axios.delete(API_URL + '/' + articleToRemove?.id);
            
            const newArticles = articles.filter((article) => {
                return article.id !== id;
            });
            setArticles(newArticles);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    };
    
    const editArticle = async (editedArticle: Article) => {
        try {
            setIsLoading(true);
            await delay(1000);
            const { data } = await axios.put(API_URL + '/' + editedArticle.id, editedArticle);

            const newArticles = articles.map((newArticle) => {
                if (newArticle.id === data.id) {
                    return {...editedArticle, title: editedArticle.title, description: editedArticle.description};
                }

                return newArticle;
                });

            setArticles(newArticles);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const formingArticle = () => {
        return (
            <form 
                className="form"  
                onSubmit={(event) => {
                  event.preventDefault();
        
                  const newArticle: Article = {
                    title: inputValue,
                    id: Math.random().toString(),
                    description: descriptionValue
                  };
        
                  addArticle(newArticle);
                  setInputValue("");
                  setDescriptionValue("");
                }}
              >
                <label htmlFor="article-title">Add article title</label>
                <div>
                  <input
                    id="article-title"
                    type="text"
                    value={inputValue}
                    placeholder="Article title"
                    onChange={(event) => {
                      const newValue = event.target.value;
                      setInputValue(newValue);
                    }}
                  />
              
                </div>
                <label htmlFor="article-description">Add article description</label>
                <div>
                  <input
                    id="article-description"
                    type="text"
                    value={descriptionValue}
                    placeholder="Article description"
                    onChange={(event) => {
                      const newDescriptionValue = event.target.value;
                      setDescriptionValue(newDescriptionValue);
                    }}
                  />
        
                  <Button 
                    type="submit"
                    children="Add article"
                  />              
                </div>
              </form> 
        );
    }

        
    return (
        <div className="container">
            <h1>Articles</h1>
            <ul>
                {articles.length > 0 
                    ? articles.map((article) => {
                    return (
                        <>
                            <ArticleItem 
                                article={article}
                                key={article.id}
                                onEdit={(editTitle, editDescription) => {
                                    const editedArticle = {...article, title: editTitle, description: editDescription};
                                    editArticle(editedArticle);
                                }}
                            />
                            <button onClick={() => {deleteArticle(article.id)}}>
                            Delete article
                            </button>
                        </>
                    );
                }) : null 
            }
      </ul>
            {/* {articles.length > 0 
                ? articles.map((article) => {
                return (
                    !editingArticle ?                        
                        <div key={article.id}>
                            <h1>{article.title}</h1>
                            <p>{article.description}</p>
                            <button onClick={() => {deleteArticle(article.id)}}>
                                Delete article
                            </button>
                            <button onClick={() => {
                                setEditingArticle(true)
                            }}>
                                Edit article
                            </button>
                        </div> : editArticle(article)
                    );
                }) : null 
            } */}
            <button onClick={() => {
                setAddingArticle(true);
            }}>
                Add new article
            </button>
            {addingArticle ? 
                formingArticle() : null}
        </div>
    );
}