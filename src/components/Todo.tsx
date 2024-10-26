// Dependencies
import { useState } from "react"

// Types
import { TodoType } from "../types/todo"

// Icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";



interface TodoProps {
    id:string,
    title: string,
    completed: boolean,
    onCompleteTodo: (id: string) => void,
    onEditTodo: (id: string, title: string) => void,
    onDeleteTodo: (id: string) => void
}

const Todo: React.FC<TodoProps> = ({ id, title, completed, onCompleteTodo, onEditTodo, onDeleteTodo }) => {

    const [ editState, setEditState ] = useState<boolean>(false)
    const [ newTitle, setNewTitle ] = useState<string>(title)
    
    return (
        <div>
            {
                editState ? (
                    <div>
                        <input type="text" value={ newTitle } onChange={ (e) => setNewTitle(e.target.value) } />
                        <button onClick={ () => setEditState(false) } >Cancel</button>
                        <button onClick={ () => {
                            onEditTodo(id, newTitle)
                            setEditState(false)
                        }} >Save</button>
                    </div>
                ) : (
                    <div>
                        <input type="checkbox" checked={ completed } onChange={ 
                            () => onCompleteTodo(id)
                        } />
                        <span>{ title }</span>
                        <button onClick={ () => setEditState(true) } ><FaEdit /></button>
                        <button onClick={ () => onDeleteTodo(id) } ><MdDeleteForever /></button>
                    </div>
                )
            }
        </div>
    )
}

export default Todo