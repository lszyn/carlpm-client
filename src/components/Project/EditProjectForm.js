import React from 'react';
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

const EditProjectForm = Form.create()(
    class extends React.Component {
        state = {
            projectToUpdate: { title: '', description: '' }
        }

        componentWillReceiveProps(props) {
            this.setState({ projectToUpdate: props.projectToUpdate })
        }

        changeTitle(e) {
            this.setState({ projectToUpdate: { ...this.state.projectToUpdate, title: e.target.value }})
        }

        changeDescription(e) {
            this.setState({ projectToUpdate: {  ...this.state.projectToUpdate, description: e.target.value }})
        }

        handleSave = () => {
            this.props.onUpdate(this.state.projectToUpdate)
        }

      render() {
        const { visible, onCancel } = this.props;
        
        return (
          <Modal
            visible={visible}
            title="Update Project"
            okText="Update"
            onCancel={onCancel}
            onOk={this.handleSave}
          >
            <Form layout="vertical">
              <FormItem label="Title">
                  <Input value={this.state.projectToUpdate.title} onChange={this.changeTitle.bind(this)}/>
              </FormItem>
              <FormItem label="Description">
                <Input type="textarea" value={this.state.projectToUpdate.description} onChange={this.changeDescription.bind(this)} />
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default EditProjectForm;

  