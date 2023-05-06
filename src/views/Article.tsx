import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Article as ArticleType } from "../types/article";
import axios from "axios";
import { delay } from "../helpers/delay";
import { SERVER_URL } from "../constants/url";
import "../styles/components/article-page.scss"
import { Button } from "../components/Button";

const useFetchArticle = (articleId: string) => {
    const [article, setArticle] = useState<null | ArticleType>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {           
            try {
                setIsLoading(true);
                await delay(1000);
                const { data } = await axios.get(`${SERVER_URL}/${articleId}`);
                setArticle(data);
                setIsLoading(false); 
            } catch (e) {
                console.log(e);
                setIsLoading(false); 
            }
        };

        fetchData();

    }, [articleId]);

    return { isLoading, article};
}

export const Article = () => {

    const { articleId } = useParams<{ articleId: string }>();
    const { isLoading, article} = useFetchArticle(articleId || "");
    const navigate = useNavigate();
        
    if  (isLoading) {
        return <div>Loading...</div>
    }

    if (!article) {
        return <div className="not-found">Article not found</div>
    }

    return (
        <article className="article-page">
            <div>
                <Button onButtonClick={() => {
                    navigate("/articles");
                    // navigate(-1);
                }}>
                    Go back
                </Button>

                <h2>{article.title}</h2>
                <div>
                    <p>Description:</p>
                    <p className="article-description">{article.description}</p>
                    <p className="article-category">{`Category: ${article.category}`}</p>
                </div>
                {/* <Button onButtonClick={() =>{
                    
                }}>
                    Edit article
                </Button> */}
            </div>
            <img src={article.image} alt="Not provided"/>
        </article>
    )
}