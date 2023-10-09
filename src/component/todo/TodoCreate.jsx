import { useState } from "react"

export const TodoCreate = ({ createTodo }) => {

    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim()) {
            return setTitle('')
        } 

        createTodo(title)
        setTitle('')
    }
    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-md overflow-hidden py-2 flex gap-3 items-center px-4">
            <span className="rounded-full border-2 inline-block w-4 h-4"></span>
            <input 
                type="text"
                placeholder="Create a new todo..."
                className="w-full text-gray-400 outline-none dark:bg-gray-800"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </form>
    )
}