import React from 'react';
import { connect } from 'dva';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import FilterTodo from '../components/FilterTodo';

import { FilterTypes } from '../constants.js';

const TodoListApp = ({ dispatch, todolist, filter }) => {
    function handleToggle(value) {
        dispatch({
            type: 'todolist/toggleTask',
            payload: value
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

    function handleFilter(params) {
        dispatch({
            type: 'filter/toggle',
            payload: params
        });
    }

    return (
        <div>
            <h2>TodoList App</h2>
            <FilterTodo onToggle={handleFilter} filter={filter} />
            <AddTodo onAdd={handleAdd} />
            <TodoList onToggle={handleToggle} onDelete={handleDelete} todolists={todolist} />
        </div>
    );
};

const selectVisibleTodos = (todos, filter) => {
    switch (filter.value) {
        case FilterTypes.ALL:
            return todos;
        case FilterTypes.COMPLETED:
            return todos.filter(item => item.completed);
        case FilterTypes.UNCOMPLETED:
            return todos.filter(item => !item.completed);
        default:
            throw new Error('unsupported filter');
    }
}

// export default Products;
export default connect(({ todolist, filter }) => ({
    todolist: selectVisibleTodos(todolist, filter),
    filter
}))(TodoListApp);