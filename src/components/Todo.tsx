// Dependencies
import { useState } from "react"
import { toast } from 'react-toastify';

// Icons
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { FaRegSquareCheck } from "react-icons/fa6";

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
        <div >
            {
                editState ? (
                    <div>
                        <input
                            type="text"
                            value={ newTitle }
                            onChange={ (e) => setNewTitle(e.target.value) }
                            onKeyDown={ (e) => { if (e.key === 'Enter') {
                                onEditTodo(id, newTitle)
                                setEditState(false)
                            }}}
                        />
                        <button
                            onClick={
                                () => {
                                    setEditState(false)
                                    toast.error("Edit canceled!")
                                }
                            }
                        >
                                <TiCancel />
                        </button>
                        <button
                            onClick={ () => {
                                onEditTodo(id, newTitle)
                                setEditState(false)
                            }}
                        >
                            <FaRegSquareCheck />
                        </button>
                    </div>
                ) : (
                    <div>
                        <input
                            type="checkbox"
                            id="custom-switch"
                            checked={ completed }
                            onChange={ 
                                () => onCompleteTodo(id)
                            }
                        />
                        <span>
                            {title}
                        </span>
                        <button
                            onClick={ () => setEditState(true) }
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={ () => onDeleteTodo(id) }
                        >
                            <MdDeleteForever />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Todo