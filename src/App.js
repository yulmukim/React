import './App.css';
import React, {useCallback, useState, useRef} from 'react';
import TodoBoard from './components/TodoBoard.js';
import moment from "moment";

function App() {
  const today = moment().format("YYYY-MM-DD") // 현재 날짜 불러오기
  const day = moment().format("dddd") // 현재 요일 불러오기

  const [inputValue, setInputValue] = useState("") 
  const [todoList, setTodoList] = useState([])

  const nextId = useRef(0)

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

  // 삭제 버튼을 눌렀을 때 리스트에서 할일이 삭제되는 이벤트(onRemove)
  const onRemove = useCallback(id => { // useCallback 사용해서 재실행 횟수 줄이기
    setTodoList(todoList.filter(inputValue => inputValue.id !== id)) // 내장함수 filter 사용해서 입력된 id랑 일치하지 않은 경우 새로운 배열을 생성함
  }, [todoList])

  // 체크박스를 이용하여 할일을 완료했을 때 체크하는 이벤트(onToggle)
  const onToggle = useCallback(id => { // useCallback 사용해서 재실행 횟수 줄이기
    setTodoList(todoList.map(inputValue =>
      inputValue.id === id ? {...inputValue, checked: !inputValue.checked} : inputValue))
  }, [todoList]) // inputValue.id와 id를 비교하여 같으면 inputValue 객체를 복사하고, checked가 true이면 false로, checked가 false이면 true로 변경함

  return (
    <main className='body'>
      <div className="today-day">
        <p className="today">{today}</p>
        <p className="day">{day}</p>
      </div>
      <form className="todo-insert" onSubmit={onSubmit}>
        <input className="todo-input" placeholder = "할 일을 입력하세요." value = {inputValue} type="text" onChange={(event)=>
        setInputValue(event.target.value)}/>
        <button className="todo-button" >추가</button>
      </form>

      <TodoBoard 
        todoList={todoList}
        onRemove={onRemove}
        onToggle={onToggle}
        />
    </main>
  );
}
export default App;

