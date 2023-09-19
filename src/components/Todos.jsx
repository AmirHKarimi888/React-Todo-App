import { Link } from "react-router-dom";
import { url, Action } from "../api"
import { useEffect, useState } from "react"

export const Todos = () => {

    let [todos, setTodos] = useState([]);

    useEffect(() => {
        todos = Action.get(url + "/todos", (response) => {
            todos = response.data;
            setTodos(todos);
        })
    }, [])

    return (
        <div>
            <ul className="todos">
                {
                    todos.map((todo, key) => {
                        key = todo.id
                        return (
                            <li className="todo" key={key}>
                                <ul>
                                    <li style={{ "width": "100%" }}>
                                        <Link to={"/todos/" + key} style={{ "textDecoration": "none", "color": "white" }}><h3>{todo.title} </h3></Link>
                                    </li>
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}