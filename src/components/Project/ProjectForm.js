import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const ProjectForm = Form.create()(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal
            visible={visible}
            title="Create new Project"
            okText="Create"
            onCancel={onCancel}
            onOk={onCreate}
          >
            <Form layout="vertical">
              <FormItem label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input the title of collection!' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="Description">
                {getFieldDecorator('description')(<Input type="textarea" />)}
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default ProjectForm;

  