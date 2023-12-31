import React from "react"
import TodoItem from "./TodoItem"

function TodoBoard({todoList, onRemove, onToggle}){
    return (
        <div className="todo">
            <h1 className="title">Todo List</h1>
            {todoList.map(inputValue => (
            <TodoItem 
            inputValue={inputValue}
            key={inputValue.id} 
            onRemove={onRemove}
            onToggle={onToggle}
            />))}
        </div>
    )
}
export default TodoBoard
