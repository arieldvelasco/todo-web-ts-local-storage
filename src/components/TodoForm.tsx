import React, { useState } from 'react'

interface TodoFormProps {
    onAddTodo: (title: string) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {

    const [ newTitle, setNewTitle ] = useState<string>('')

    return (
        <div>
            <input
                type="text"
                value={ newTitle }
                onChange={ (e) => setNewTitle(e.target.value) }
                onKeyDown={ (e) => { if (e.key === 'Enter') {
                    onAddTodo(newTitle)
                    setNewTitle('')
                } } }
            />
            <button onClick={ (e) => {
                e.preventDefault()
                onAddTodo(newTitle)
                setNewTitle('')
            }} >ADD</button>
        </div>
    )
}

export default TodoForm