// Dependencies
import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"

// Types
import { TodoType } from "./types/todo"

// Components
import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { loadData, saveData } from "./utils/local-storage"


const App = (): JSX.Element => {

    const [ todos, setTodos ] = useState<TodoType[]>(loadData('todos'))

    useEffect(() => {
        saveData('todos', todos)
    }, [todos])

    const handleAddTodo = (title: string) => {
        const newTodo: TodoType = {
            id: uuid(),
            title,
            completed: false
        }
        setTodos([...todos, newTodo])
    }

    const handleCompleteTodo = (id: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleEditTodo = (id: string, title: string) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                }
            }
            return todo
        })

        setTodos(newTodos)
    }

    const handleDeleteTodo = (id: string) => {
        const newTodos = todos.filter( todo => todo.id !== id  )
        setTodos(newTodos)
    }

    return (
        <div>
            <header><TodoForm onAddTodo={ handleAddTodo } /></header>
            <main>
                <TodoList
                    todos={ todos }
                    onCompleteTodo={ handleCompleteTodo }
                    onEditTodo={ handleEditTodo }
                    onDeleteTodo={ handleDeleteTodo }
                />
            </main>
        </div>
    )
}

export default App