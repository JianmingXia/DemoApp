import { addTask, listTasks, toggleTask, deleteTask } from '../services/api';

export default {
    namespace: 'todolist',
    state: [],
    effects: {
        *addTask({ payload }, { call, put }) {
            const response = yield call(addTask, payload);

            yield put({
                type: 'add',
                payload: response.data
            });
        },
        *listTasks({ payload }, { call, put }) {
            const response = yield call(listTasks);

            yield put({
                type: 'list',
                payload: response.data
            });
        },
        *toggleTask({ payload }, { call, put }) {
            const response = yield call(toggleTask, { task_id: payload});

            yield put({
                type: 'toggle',
                payload: response.data
            });
        },
        *deleteTask({ payload }, { call, put }) {
            const response = yield call(deleteTask, { task_id: payload });

            yield put({
                type: 'delete',
                payload: response.data
            });
        },
    },
    reducers: {
        toggle(state, { payload: task }) {
            return state.map((item) => {
                if (item.id === task.id) {
                    return task;
                } else {
                    return item;
                }
            })
        },
        delete(state, { payload: task }) {
            return state.filter(item => item.id !== task.id);
        },
        add(state, { payload }) {
            return [
                payload,
                ...state
            ];
        },
        list(state, { payload }) {
            return payload;
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/') {
                    dispatch({
                        type: 'listTasks',
                    });
                }
            });
        },
    },
};