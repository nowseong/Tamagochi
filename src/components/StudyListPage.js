import { useState, useEffect, useRef } from "react";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { ref, set, onValue } from "firebase/database";
import { auth, db } from "../firebase";

const StudyListPage = () => {
  // const [,updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);
  // const todos = useRef([]);
  const [todos, setTodos] = useState([]);
  const date = useRef(new Date());
  useEffect(() => {
    // date.current = new Date();
    const todosRef = ref(db, `users/${auth.currentUser.uid}/todos`);
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      // nextId.current = date.getTime();
      setTodos(data);
    });
    console.log(auth.currentUser);
  }, []);
  
  const nextId = useRef(null);

  const onInsert = text => {
    date.current = new Date();
    nextId.current = date.current.getTime();
    console.log(nextId.current);
    const todo = {
      id: nextId.current,
      text,
      checked: false
    };
    // todos.current = todos.current.concat(todo);
    // nextId.current = date.getTime();
    // nextId.current = date.getTime();
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.concat(todo));
    setTodos(todos.concat(todo));
    // console.log(todos);
  };

  const onRemove = id => {
    // todos.current = todos.current.filter(todo => todo.id !== id);
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.filter(todo => todo.id !== id));
    setTodos(todos.filter(todo => todo.id !== id));
    // forceUpdate();
  };

  const onToggle = id => {
    // todos.current = todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo);
    set(ref(db, `users/${auth.currentUser.uid}/todos`), todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo));
    setTodos(
      todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ),
    );
    // forceUpdate();
  }
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default StudyListPage;