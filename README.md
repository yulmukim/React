# Todo List
오늘의 Todo List를 작성할 수 있는 웹을 간단하게 구현했다.
<br /><br />

## 프로젝트 소개
 
나만의 Todo List를 작성할 수 있는 웹으로, 주요 기능으로, 할 일 추가 기능, 완료 기능, 삭제 기능으로 이루어져 있다.

<img width="380" alt="todolist_img" src="https://github.com/yulmukim/react_todolist/assets/73217281/56f0465b-afd0-41d0-8cee-8ceecead2250">

### App.js
onSubmit(추가)이벤트
```js
  // 값을 입력하고 버튼을 눌렀을 때 값을 추가하는 이벤트(onSubmit)
  const onSubmit = (event) => {
    event.preventDefault(); // onSubmit 후에 새로고침 되지 않게 막기
    if(inputValue === ""){ // 입력값이 공백일 때
      return
    } 
      const newTodo = {
        id : nextId.current,
        text : inputValue,
        checked : false
      }
      setTodoList([...todoList, newTodo]) // todolist 복사하여 새로운 값 추가
      nextId.current += 1 // 값이 추가될 때마다 nextId.id도 1씩 증가
      setInputValue("");
  }
```
<br />

onRemove(삭제)이벤트
```js
// 삭제 버튼을 눌렀을 때 리스트에서 할일이 삭제되는 이벤트(onRemove)
  const onRemove = useCallback(id => { // useCallback 사용해서 재실행 횟수 줄이기
    setTodoList(todoList.filter(inputValue => inputValue.id !== id)) // 내장함수 filter 사용해서 입력된 id랑 일치하지 않은 경우 새로운 배열을 생성함
  }, [todoList])
```
<br />

onToggle(완료)이벤트
```js
// 체크박스를 이용하여 할일을 완료했을 때 체크하는 이벤트(onToggle)
  const onToggle = useCallback(id => { // useCallback 사용해서 재실행 횟수 줄이기
    setTodoList(todoList.map(inputValue =>
      inputValue.id === id ? {...inputValue, checked: !inputValue.checked} : inputValue))
  }, [todoList]) // inputValue.id와 id를 비교하여 같으면 inputValue 객체를 복사하고, checked가 true이면 false로, checked가 false이면 true로 변경함
```
<br />

## 컴포넌트
<img width="344" alt="todolist 컴포넌트" src="https://github.com/yulmukim/react_todolist/assets/73217281/e7453ff9-9901-4cc5-82ee-c7eb1eb69627">

### TodoBoard.js
```js
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
```
<br />

### TodoItem.js
```js
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
```
