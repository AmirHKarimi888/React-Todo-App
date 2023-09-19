import { Link } from "react-router-dom"

export const Header = () => {

    return (
        <div className="header">
            <h2>Add Todo App</h2>
            <nav style={{display: "flex", margin: "0 auto", justifyContent: "center", gap: "60px", marginTop: "30px", marginBottom: "30px"}}>
                <Link to="/">Home </Link>
                <Link to="/add-todo"> Add Todo </Link>
            </nav>
        </div>
    )
}