import React from 'react';
import { Col, List, Icon, Checkbox, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import styles from './TodoList.less';

const TodoList = ({ onToggle, onDelete, todolists }) => {
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
                            <Checkbox checked={item.completed} onChange={() => onToggle(item.id)}></Checkbox>
                            <label className={styles.name + " " + (item.completed ? styles.complete : "")}>{item.name}</label>
                        </List.Item>
                    )}
                />
            </Col>
        </div>
    );
};

TodoList.propTypes = {
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    todolists: PropTypes.array.isRequired
};

export default TodoList;