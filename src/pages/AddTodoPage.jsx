import { useEffect, useState } from "react"
import { Action, url } from "../api";

export const AddTodoPage = () => {
    let [todoText, setTodoText] = useState("");

    const OnChange = (event) => {
        setTodoText(event.target.value);

        if (todoText !== "") {
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

        if (todoText !== "") {
            let newTodo = {
                id: parseInt(todos.length) + 1,
                text: todoText,
                editStatus: false
            }

            Action.post(url + "/todos", newTodo)
                .then(() => {
                    todos = [...todos, newTodo];
                    setTodos(todos);
                })
                .then(() => {
                    setTodoText("");
                    document.querySelector(".addTodoInput").value = "";
                })

        } else if (todoText === "") {
            document.querySelector(".addTodoInput").style.border = "1px solid red";
        }
    }



    const deleteTodo = (id) => {
        Action.delete(url + `/todos/${id}`)
            .then(() => {
                todos = todos.filter((todo) => {
                    if (todo.id != id) {
                        return todo
                    }
                })
            })
            .then(() => {
                setTodos(todos)
            })
    }
    return (
        <div className="addTodoPage">
            <input type="text" className="addTodoInput" onChange={OnChange} onKeyUp={(event) => event.code == "Enter" ? addTodo() : null} />
            <button onClick={addTodo}>Add Todo</button>

            <div>
                <ul className="todos">
                    {
                        todos.map((todo, key) => {
                            key = todo.id
                            return (
                                <li className="todo" key={key}>
                                    <ul>
                                        <li className="todoText">{todo.title} </li>
                                        <li className="todoBtns">
                                            <button onClick={() => deleteTodo(key)}><i className="fa fa-trash"></i></button>
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