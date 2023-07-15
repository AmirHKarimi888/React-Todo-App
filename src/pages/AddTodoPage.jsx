import { useEffect, useState } from "react"
import { Action, url } from "../api";

export const AddTodoPage = () => {
    const [todo, setTodo] = useState("");

    const OnChange = (event) => {
        setTodo(event.target.value);

        if (todo !== "") {
            document.querySelector(".addTodoInput").style.border = "1px solid #213547";
        }
    }

    let [todos, setTodos] = useState([]);

    useEffect(() => {
        Action.get(url + "/todos", (response) => {
            todos = response.data;
            setTodos(todos);
        })
    }, [])

    const addTodo = () => {

        if (todo !== "") {
            let newTodo = {
                id: parseInt(todos.length) + 1,
                text: todo
            }

            Action.post(url + "/todos", newTodo)
                .then(() => {
                    todos = [...todos, newTodo];
                    setTodos(todos);
                })
                .then(() => {
                    setTodo("");
                    document.querySelector(".addTodoInput").value = "";
                })

        } else if (todo === "") {
            document.querySelector(".addTodoInput").style.border = "1px solid red";
        }
    }
    return (
        <div className="addTodoPage">
            <input type="text" className="addTodoInput" onChange={OnChange} onKeyUp={(event) => event.code == "Enter" ? addTodo() : console.log("")} />
            <button onClick={addTodo}>Add Todo</button>

            <div>
                <ul className="todos">
                    {
                        todos.map((todo, key) => {
                            key = todo.id
                            return (
                                <li className="todo" key={key}>
                                    <ul>
                                        <li className="todoText">{key} - {todo.text}</li>
                                        <li className="todoBtns">
                                            <button><i className="fa fa-edit"></i></button>
                                            <button><i className="fa fa-trash"></i></button>
                                        </li>
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}