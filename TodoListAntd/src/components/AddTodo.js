import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const AddTodo = ({ onAdd, form }) => {
    const handleSubmit = function(e) {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                onAdd(values);

                form.setFieldsValue({ task_name: "" });
            }
        });
    }

    const { getFieldDecorator } = form;

    return (
        <div>
            <Form layout="inline" onSubmit={handleSubmit}>
                <FormItem>
                    {getFieldDecorator('task_name', {
                        rules: [{ required: true, message: '请输入任务名称' }],
                    })(
                        <Input size="large" placeholder="请输入任务名称" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button size="large" type="primary" htmlType="submit">添加</Button>
                </FormItem>
            </Form>
        </div>
    )
}

AddTodo.propTypes = {
    onAdd: PropTypes.func.isRequired
};

const NormalAddTodo = Form.create()(AddTodo);
export default NormalAddTodo;