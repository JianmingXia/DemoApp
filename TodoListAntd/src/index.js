import dva from 'dva';
import './index.css';
// import browserHistory from 'history/createBrowserHistory';

// 1. Initialize
// const app = dva();
const app = dva({
    initialState: {
        todolist: [
            { id: 0, name: '本地任务', completed: false },
            { id: 1, name: '本地任务 2', completed: true }
        ],
    },
    // history: browserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/todolist').default);
app.model(require('./models/filter').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
