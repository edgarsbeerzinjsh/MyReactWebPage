import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Article } from "../types/article";
import { delay } from "../helpers/delay";
import { ArticleForm } from "./ArticleForm";
import "../styles/components/articles.scss";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants/url";
import { CATEGORY_LIST } from "../constants/category-list";

export const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [editedArticle, setEditedArticle] = useState<null | Article>(null);
  const [setedCategory, setSetedCategory] = useState("all");

  useEffect(() => {
 
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await delay(1000);
        const data = await fetch(SERVER_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const articles = await data.json();
        setArticles(articles);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const addNewArticle = async (article : Article) => {
    const newArticle = {
      ...article,
    };

    try {
      setIsLoading(true);
      await delay(1000);

      const { data } = await axios.post(SERVER_URL, newArticle);

      setArticles([...articles, data]);
      setIsNewArticle(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const editArticle = async (editedArticle : Article) => {
    try {
      setIsLoading(true);
      await delay(1000);

      const {data} = await axios.put(`${SERVER_URL}/${editedArticle.id}`, editedArticle);
      
      setArticles(
        articles.map((article) => {
          if (article.id === data.id) {
            return data;
          }
          return article;
        })
      );
      
      setEditedArticle(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  }

  const deleteArticle = async (id?: string) => {

    if (!id) {
      return;
    }

    try {
      setIsLoading(true);
      await delay(1000);

      await axios.delete(`${SERVER_URL}/${id}`);

      setArticles(articles.filter((article) => article.id !== id));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {!isNewArticle && (
        <Button
          id="add-new-article-button" 
          onButtonClick={()=> {
            setIsNewArticle(true);
        }}>Add new article</Button>
      )}
      <div className="category-filter">
        <p>Filter articles by category:</p>
        <div>
          {CATEGORY_LIST.map((each) => {
            return (
            <div className="radio-category">
              <label htmlFor={each}>{each}</label>
              <input 
                type="radio" 
                name="category" 
                value={each} 
                id={each} 
                checked={setedCategory === each}
                onChange={(e) => {
                  setSetedCategory(e.target.value)
                }} />
            </div>
            );
          })}
          <div className="radio-category">
            <label htmlFor="all">All categories</label>
            <input 
              type="radio" 
              name="category" 
              value="all" 
              id="all" 
              checked={setedCategory === "all"}
                onChange={(e) => {
                  setSetedCategory(e.target.value)
                }}/>
          </div>
        </div>
      </div>
      
      <ul className="articles-list">
        {articles.length > 0
          ? articles.map((article) => {
            if (article.category === setedCategory || setedCategory === "all")
            {
                return (
                  <li key={article.id}>
                  <article className="article-card">
                    <div className="article-card-intro">
                      <img src={article.image} alt="Not provided"/>
                      <h3>{article.title}</h3>
                    </div>

                    <div className="article-card-buttons">
                    <Button onButtonClick={() => {
                      deleteArticle(article.id);
                    }}
                    >Delete</Button>

                    <Button onButtonClick={() => {
                      setEditedArticle(article);
                    }}
                    >Edit</Button>
                    </div>

                    <Link to={`/articles/${article.id}`}>
                      Go to article
                    </Link>
                  </article>
                </li>);
              };
              return null;
            })
            : null}
      </ul>

      {isNewArticle && (
        <ArticleForm
          onCancel={() => {
            setIsNewArticle(false);
          }} 
          onSubmit={(body) => {
            addNewArticle(body);
          }}/>
      )}

      {editedArticle && (
        <ArticleForm
          initialValues={editedArticle}
          onCancel={() => {
            setEditedArticle(null);
          }} 
          onSubmit={(body) => {
            editArticle(body);
          }}/>
      )}
    </div>
  );
};
