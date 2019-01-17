import React from 'react';
import { Modal, Form, Input, DatePicker, Checkbox } from 'antd';
const FormItem = Form.Item;

const TaskForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Create new Task"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input the name of the task!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="Deadline">
                {getFieldDecorator('deadline')(<DatePicker />)}
              </FormItem>
              <FormItem label="Done">
                {getFieldDecorator('done', {
                    valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox>Done </Checkbox>
                )}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default TaskForm;

  