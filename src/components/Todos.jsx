import axios from "axios"
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
        <div className="todos">
            <ul>
                {
                    todos.map((todo, key) => {
                        key = todo.id
                        return (
                            <li key={ key }>
                                <h4>{ key } - { todo.text }</h4>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}