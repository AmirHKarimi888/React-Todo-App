import { useEffect, useState } from "react"
import { Action, url } from "../api";

export const AddTodoPage = () => {
    const [todo, setTodo] = useState("");

    const OnChange = (event) => {
        setTodo(event.target.value);

        if(todo !== "") {
            document.querySelector(".addTodoInput").style.border = "1px solid #213547";
        }
    }

    let [todos, setTodos] = useState([]);

    useEffect(() => {
        Action.get(url + "/todos", (response) => {
            let temp = response.data
            temp.map((t) => {
                todos.push(t)
                setTodos(todos)
            })
        })
    }, [])

    const addTodo = () => {
        if(todo !== "") {
            Action.post(url + "/todos", {
                text: todo
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
            <input type="text" className="addTodoInput" onChange={ OnChange } onKeyUp={ (event) => event.code == "Enter" ? addTodo() : console.log("") } />
            <button onClick={ addTodo }>Add Todo</button>
        </div>
    )
}