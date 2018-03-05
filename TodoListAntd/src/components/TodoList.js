import React from 'react';
import { Col, List, Icon, Checkbox, Popconfirm } from 'antd';
import styles from './TodoList.less';

const TodoList = ({ onChange, onDelete, todolists }) => {
    return (
        <div>
            <Col span={9}>
                <List
                    dataSource={todolists}
                    renderItem={item => (
                        <List.Item className={styles.todo_item} actions={[
                            <Popconfirm title="确认删除此任务么?" okText="确认" cancelText="取消" onConfirm={() => onDelete(item.id)}>
                                    <Icon type="close" />
                                </Popconfirm>
                            ]}>
                            <Checkbox checked={item.completed} onChange={() => onChange(item.id)}></Checkbox>
                            <label className={styles.name + " " + (item.completed ? styles.complete : "")}>{item.name}</label>
                        </List.Item>
                    )}
                />
            </Col>
        </div>
    );
};

export default TodoList;