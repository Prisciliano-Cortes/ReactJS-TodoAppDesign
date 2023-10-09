import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TodoItem } from "./TodoItem"

export const TodoList = ({ todo = [], updateTodo, deleteTodo, handleDragEnd }) => {

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todo">
                {(droppableProvided) => (
                    <div
                        className="mt-8 overflow-hidden rounded-t-md bg-white transition-all duration-1000 dark:bg-gray-800 [&>article]:p-4"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                    >
                        {todo.map((to, index) => (
                            <Draggable
                                key={to.id}
                                draggableId={`${to.id}`}
                                index={index}
                            >
                                {(provided) => (
                                    <TodoItem
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        to={to}
                                        deleteTodo={deleteTodo} 
                                        updateTodo={updateTodo}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

        // <div className="bg-white rounded-t-md [&>article]:px-4 mt-8">
        //     {
        //         todo.map( (to) => (
        //             <TodoItem key={to.id} to={to} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        //         ))
        //     }
        // </div>
    )
}