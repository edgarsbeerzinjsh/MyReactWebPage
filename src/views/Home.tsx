import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="home">
            <h2>
                React App
            </h2>
            <ul>
                <li>
                    <Link to="/todos">
                    Todos
                    </Link>
                    <p>
                        Simple Todo page where you can add, edit, delete, check done simple tasks.
                    </p>
                </li>
                <li>
                    <Link to="/articles">
                    Articles
                    </Link>
                    <p>
                        Article page where you can see small summary of articles, add new ones, edit or delete existing ones, filter them and navigate to full article page.
                    </p>
                </li>
                <li>
                    <Link to="/login">
                    Login
                    </Link>
                    <p>
                        Form with input field validation.
                    </p>
                </li>
            </ul>
        </div>
    )
}