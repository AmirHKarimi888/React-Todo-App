import { useEffect, useState } from "react"
import { Action, url } from "../api";

export const AddTodoPage = () => {
    let [todoText, setTodoText] = useState("");
    let [todoId, setTodoId] = useState("");

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

    let [globalEditStatus, setGlobalEditStatus] = useState(false);

    const changeEditStatus = (id) => {
        let td = "";

        todos.filter((todo) => {
            if (todo.id == id) {
                td = { ...todo, editStatus: !todo.editStatus }
                globalEditStatus = !todo.editStatus
                setGlobalEditStatus(globalEditStatus)
                if (globalEditStatus === true) {
                    todoText = todo.text
                    setTodoText(todoText)
                    document.querySelector(".addTodoInput").value = todoText;
                    todoId = todo.id
                    setTodoId(todoId)
                } else {
                    todoText = ""
                    setTodoText(todoText)
                    document.querySelector(".addTodoInput").value = "";
                    todoId = ""
                    setTodoId(todoId)
                }
            }
        })

        todos = todos.filter((todo) => {
            if (todo.id != id) {
                return todo
            }
        })

        todos.push(td)
        todos.reverse()

        setTodos(todos)
    }

    const editTodo = () => {
        Action.delete(url + "/todos/" + todoId)
            .then(() => {
                todos = todos.filter((todo) => {
                    if (todoId != todo.id) {
                        return todo
                    }
                })
                setTodos(todos)
            })
            .then(() => {
                if (todoText !== "") {
                    let newTodo = {
                        id: todoId,
                        text: todoText,
                        editStatus: false
                    }

                    Action.post(url + "/todos", newTodo)
                        .then(() => {
                            todos = [...todos, newTodo]
                            todos.sort()
                            setTodos(todos)
                        })
                        .then(() => {
                            setTodoText("")
                            document.querySelector(".addTodoInput").value = ""
                        })

                } else if (todoText === "") {
                    document.querySelector(".addTodoInput").style.border = "1px solid red"
                }
            })
            .then(() => {
                globalEditStatus = false
                setGlobalEditStatus(globalEditStatus)
            })
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
            <input type="text" className="addTodoInput" onChange={OnChange} onKeyUp={(event) => event.code == "Enter" ? !globalEditStatus ? addTodo() : editTodo() : console.log("")} />
            {!globalEditStatus && <button onClick={addTodo}>Add Todo</button>}
            {globalEditStatus && <button onClick={editTodo}>Edit Todo</button>}

            <div>
                <ul className="todos">
                    {
                        todos.map((todo, key) => {
                            key = todo.id
                            return (
                                <li className="todo" key={key}>
                                    <ul>
                                        <li className="todoText">{key} - {todo.text} </li>
                                        <li className="todoBtns">
                                            {!todo.editStatus && <button onClick={() => changeEditStatus(key)}><i className="fa fa-edit"></i></button>}
                                            {todo.editStatus && <button onClick={() => changeEditStatus(key)}><i style={{ "color": "green" }} className="fa fa-edit"></i></button>}
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