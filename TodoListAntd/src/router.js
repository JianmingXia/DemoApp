import React from 'react';
import { Router, Route } from 'dva/router';
import TodoList from './routes/TodoList';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" exact component={TodoList} />
    </Router>
  );
}

export default RouterConfig;
