import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <div className="header">
            <h2>Add Todo App</h2>
            <nav>
                <Link to="/">Home </Link>|
                <Link to="/add-todo"> Add Todo </Link>
            </nav>
        </div>
    )
}