import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Action, url } from "../api"

export const TodoPage = () => {
    let [todo, setTodo] = useState({})
    const { id } = useParams()

    useEffect(() => {
        Action.get(url + "/todos/" + id, (response) => {
            todo = response.data
            setTodo(todo)
        })
    }, [])

    return (
        <div className="todoPage">
            <h2>{ todo.title }</h2>
        </div>
    )
}