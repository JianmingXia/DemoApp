import request from '../utils/request';

export function addTask(params) {
  return request('/api/addTask', {
    method: 'POST',
    body: params
  });
}

export function listTasks() {
  return request('/api/listTasks');
}

export function toggleTask(params) {
  return request('/api/toggleTask', {
    method: 'POST',
    body: params
  });
}

export function deleteTask(params) {
  return request('/api/deleteTask', {
    method: 'POST',
    body: params
  });
}