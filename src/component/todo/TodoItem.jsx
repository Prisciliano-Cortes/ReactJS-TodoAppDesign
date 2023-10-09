import { forwardRef } from "react"
import { CheckIcon } from "../icon/CheckIcon"
import { CrossIcon } from "../icon/CrossIcon"

export const TodoItem = forwardRef (({ to, updateTodo, deleteTodo, ...props }, ref) => {
    return (
        <article 
            ref={ref}
            {...props}
            className='flex gap-4 items-center py-4 border-b-gray-400 border-b dark:bg-gray-800 '
        >
            <button
                onClick={() => updateTodo(to.id)} 
                className={`w-5 h-5 flex-none rounded-full border-2 ${to.completed ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center" : "inline-block"}`}
            >
                {
                    to.completed && <CheckIcon />
                }
            </button>

            <p className={`text-gray-700 dark:text-gray-400 grow ${to.completed ? 'line-through' : '' }`}>
                { to.title }
            </p>

            <button 
                className='flex-none'
                onClick={() => deleteTodo(to.id)} 
            >
                <CrossIcon />
            </button>
        </article>
    )
}
)