import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, DatePicker, Checkbox } from 'antd';
const FormItem = Form.Item;

const EditTaskForm = Form.create()(
    class extends React.Component {
        state = {
            taskToUpdate: { name: '', done: false, deadline: moment().format() }
        }

        componentWillReceiveProps(props) {
            this.setState({ taskToUpdate: props.taskToUpdate })
        }

        changeName(e) {
            this.setState({taskToUpdate: { ...this.state.taskToUpdate, name: e.target.value }})
        }

        changeDeadline(date) {
            this.setState({taskToUpdate: {  ...this.state.taskToUpdate, deadline: date } } )
        }
        changeDone(e) {
            this.setState({taskToUpdate: {  ...this.state.taskToUpdate, done: !e.target.value }})
        }

        handleSave = () => {
            this.props.onUpdate(this.state.taskToUpdate)
        }

      render() {
        const { visible, onCancel } = this.props;
        
        return (
          <Modal
            visible={visible}
            title="Update Task"
            okText="Update"
            onCancel={onCancel}
            onOk={this.handleSave}
          >
            <Form layout="vertical">
              <FormItem label="Name">
                  <Input value={this.state.taskToUpdate.name} onChange={this.changeName.bind(this)}/>
              </FormItem>
              <FormItem label="Deadline">
                <DatePicker value={moment(this.state.taskToUpdate.deadline)} onChange={this.changeDeadline.bind(this)} />
              </FormItem>
              <FormItem label="Done">
                  <Checkbox value={this.state.taskToUpdate.done} checked={this.state.taskToUpdate.done} onChange={this.changeDone.bind(this)}>Done </Checkbox>
              </FormItem>
            </Form>
          </Modal>
        );
      }
    }
  );

  export default EditTaskForm;

  