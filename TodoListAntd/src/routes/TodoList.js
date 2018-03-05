import React from 'react';
import { connect } from 'dva';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';

const TodoListApp = ({ dispatch, todolist }) => {
    function handleToggle(task) {
        dispatch({
            type: 'todolist/toggleTask',
            payload: task
        });
    }

    function handleDelete(id) {
        dispatch({
            type: 'todolist/deleteTask',
            payload: id
        });
    }

    function handleAdd(params) {
        dispatch({
            type: 'todolist/addTask',
            payload: params
        });
    }

    return (
        <div>
            <h2>TodoList App</h2>
            <AddTodo onAdd={handleAdd} />
            <TodoList onToggle={handleToggle} onDelete={handleDelete} todolists={todolist}/>
        </div>
    );
};

// export default Products;
export default connect(({ todolist }) => ({
    todolist
}))(TodoListApp);