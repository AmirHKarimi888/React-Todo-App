import { useState } from "react"

export const AddTodoPage = () => {
    const [todo, setTodo] = useState("");

    return (
        <div className="addTodoPage">
            <input type="text" className="addTodoInput" onChange={ (event) => setTodo(event.target.value) } />
            <button>Add Todo</button>
        </div>
    )
}