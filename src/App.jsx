import { useEffect, useState } from 'react'
import { Header } from './component/layout/Header'
import { TodoComputed } from './component/todo/TodoComputed'
import { TodoCreate } from './component/todo/TodoCreate'
import { TodoFilter } from './component/todo/TodoFilter'
import { TodoList } from './component/todo/TodoList'

const initialStateTodo = JSON.parse(localStorage.getItem("todo")) || [];

const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const App = () => {

    const [todo, setTodo] = useState(initialStateTodo);
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);
    

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setTodo((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
        );
    };

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title,
            completed: false,
        }

        setTodo([
            ...todo,
            newTodo
        ])
    }

    const deleteTodo = (id) => {
        setTodo(todo.filter(( t ) => t.id !== id ))
    }

    const updateTodo = (id) => {
        setTodo(todo.map( (t) => t.id === id ? {...t, completed: !t.completed} : t ))
    }

    const computedItemsLeft = todo.filter((t) => !t.completed).length

    const clearCompleted = () => {
        setTodo(todo.filter((t) => !t.completed))
    }

    const changeFilter = (filter) => setFilter(filter)

    const filterTodo = () => {
        switch (filter) {
            case 'all':
                return todo
            
            case 'active':
                return todo.filter((to) => !to.completed)

            case 'completed':
                return todo.filter((to) => to.completed)
        
            default:
                return todo
        }
    }
    
    return (
        <div className="bg-[url('./assets/images/bg-mobile-light.jpg')] bg-no-repeat bg-contain bg-gray-300 min-h-screen dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]">
            <Header />

            <main className="container mx-auto px-4 mt-8 md:max-w-xl">
                <TodoCreate createTodo={createTodo} />

                <TodoList todo={filterTodo()} deleteTodo={deleteTodo} updateTodo={updateTodo} handleDragEnd={handleDragEnd} />
            
                <TodoComputed computedItemsLeft={computedItemsLeft} clearCompleted={clearCompleted} />

                <TodoFilter changeFilter={changeFilter} filter={filter} />
            </main>

            <footer className='mt-8 text-center dark:text-gray-400'>
                Drag and drop
            </footer>
        </div>
    )
} 