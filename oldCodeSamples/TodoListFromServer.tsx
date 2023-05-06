import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Article = {
    title: string;
    id: string;
    descriptions: string;
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
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                await delay(1000);
                // const data = await fetch(API_URL, {
                //     method: 'GET',
                //     headers: {
                //         "Content-Type": "application/json"
                //     }
                // });
                    
                // const articles = await data.json();
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

    const addArticle = async() => {
        const newArticle = {
            title: 'Article ' + (articles.length + 1),
            descriptions: 'Article ' + (articles.length + 1) + ' description'
        };

        try {
            // post pieprasijums
            setIsLoading(true);
            await delay(1000);
            // const response = await fetch(API_URL, {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify(newArticle),
            // });
      
            // const article = await response.json();
      
            const { data } = await axios.post(API_URL, newArticle);
      
            setArticles([...articles, data]);
            setIsLoading(false);
            setCount(count + 1);
        } catch (error) {
            setIsLoading(false);
            console.log("error", error);
        }
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }
        
    // useEffect(() => {
    //     console.log({count}, count);
    // }, [count]);

    return (
        <div>
            {articles.length > 0 
                ? articles.map((article) => {
                return (
                    <div key={article.id}>
                        <h1>{article.title}</h1>
                        <p>{article.descriptions}</p>
                    </div>
                );
            }) : null 
            }
            <button onClick={addArticle}>
                Add new article
            </button>
        </div>
    );
}

//1. Pieprasījums uz serveri
//2. Pieglabājam datus steitā
//3. Renderējam datus no state

/* 
useEffect(callback, [dependency])
dependency - array of dependencies, when any of them changes, useEffect will be called again

useEffect(() => {te ko darīs, funkcijas}, [te uz ko skatoties, ja tukšs,
             tad neskatīsies neko = nostrādās tikai 1. = lapu ielādējot]);

*/

/*
useEffect piemērs, kur paši ierakstam datus: 

export const TodoListFromServer = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    // useEffect - hooks kas skatās, kad komponente ir uzzīmēta (radusies)
    useEffect(() => {
        setArticles([
            {
            title: 'Article 1',
            id: '1',
            description: 'Article 1 description 1'
            },
        ]);
        console.log('useEffect nostrādā');
    }, []);

    return (
        <div>
            {articles.map((article) => {
                return (
                    <div key={article.id}>
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
*/

/*
Dati no servera:

        const data = fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
    Atdod promise objektu

            const data = fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {console.log("response", response);})

    Atdod respone objektu

        const data = fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json()).then((data) => {
            console.log("data", data)
        });

    Atgriež jau masīvu ar datiem

            fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((articles) => {
                setArticles(articles);
        })
            .catch((error) => {
                console.log(error);
            });

        Pievienojam vēl catch error

Tipiski vecais veids:

    useEffect(() => {
        const fetchData = () => {
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => response.json())
                .then((articles) => {
                    setArticles(articles);
                })
                .catch((error) => {
                    console.log(error);
                });    
            };
            
            fetchData();
        }, []);

Bet jaunais ir šāds (async await):

    useEffect(() => {
            const fetchData = async() => {
                try {
                    const data = await fetch(API_URL, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        
                    const articles = await data.json();
        
                    setArticles(articles);
                } catch (error) {
                    console.log("erorr", error)
                }
                
            };
                
                fetchData();
            }, []);

Ar vēl pieliktu Standarta loading state:

 useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                const data = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                    
                const articles = await data.json();
                setArticles(articles);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.log("erorr", error)
            }            
        };
            
        fetchData();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>
    }

Sūtīšana uz serveri:

            const response = await fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newArticle),
            });
      
            const article = await response.json();

    Bet ar axios tieši tas pats:

        const { data } = await axios.post(API_URL, newArticle);
*/