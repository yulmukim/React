import {
    MdCheckBoxOutlineBlank,
    MdCheckBox
} from 'react-icons/md'
import React from "react"
import cn from "classnames"
import { CiTrash } from "react-icons/ci";

function TodoItem({inputValue, onRemove, onToggle}){
    const {id, text, checked} = inputValue
    return(
      <div className="todo-item">
        <div className='checkbox-text'>
          <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</div>
          <div className='text'>{text}</div>
        </div>
          <div className="remove" onClick={() => onRemove(id)}>
        <CiTrash />
      </div>
    </div>
    )
}
export default TodoItem
