import TodoListItem from "./TodoListItem";
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map(todo => {
                if (todo !== "empty")
                    return <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />;
            })}
            {/* {todos.map(todo => (<TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />))} */}
        </div>
    );
};

export default TodoList;