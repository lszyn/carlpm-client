import TaskForm from './TaskForm';
import EditTaskForm from './EditTaskForm';
import LoadingSpinner from '../LoadingSpinner';
import React from 'react';
import { Button, Table, Divider, Tag } from 'antd';

export default class TasksTable extends React.Component {
  columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Completed',
    dataIndex: 'done',
    key: 'done',
    render: (_, task) => (
      <span>{task.done ? 'Yes' : 'No'}</span>
  )
  },{
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
  }, {
    title: 'Action',
    key: 'action',
    render: (_text, record) =>
    {
      return (
        <span>
          <a href="javascript:;" onClick={(e) => this.showEditTaskFormModal(record)}>Edit</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e) => this.props.onDeleteTask(record.id)}>Delete</a>
        </span>
      )
    }
    ,
  }];

    state = {
        isTaskFormModalVisible: false,
        isEditTaskFormModalVisible: false,
        taskToUpdate: {name: '', done: false, deadline: ''}
      };

      showTaskFormModal = () => {
        this.setState({ isTaskFormModalVisible: true });
      }

      showEditTaskFormModal = (task) => {
        this.setState({taskToUpdate: task , isEditTaskFormModalVisible: true});
      }
    
      closeTaskFormModal = () => {
        this.setState({ isTaskFormModalVisible: false });
      }

      closeEditTaskFormModal = () => {
        this.setState({ isEditTaskFormModalVisible: false });
      }

      handleComplete = (task) => {
        this.props.onCompleteTask(task);
      }
    
      handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          
    
          this.props.onCreateTask(values)
          console.log('Received values of form: ', values);
          form.resetFields();
          this.setState({ isTaskFormModalVisible: false });
        });
      }

      handleUpdate = (task) => {

          this.props.onUpdateTask(task)
   
          this.setState({ isEditTaskFormModalVisible: false });
      
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }

    render() {
        if (this.props.loading && this.props.tasks.length === 0) {
            return (
              <LoadingSpinner />
            );
          }
        
          return (
              <div>
                  <h2>Tasks
                  <Button type="primary" onClick={this.showTaskFormModal} style={{ float: 'right' }}>New Task</Button>
                  </h2>
                  <TaskForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.isTaskFormModalVisible}
                    onCancel={this.closeTaskFormModal}
                    onCreate={this.handleCreate}
                  />
                  <EditTaskForm
                    visible={this.state.isEditTaskFormModalVisible}
                    onCancel={this.closeEditTaskFormModal}
                    onUpdate={this.handleUpdate}
                    taskToUpdate={this.state.taskToUpdate}
                  />
                  <Table columns={this.columns} dataSource={this.props.tasks} />
              </div>
          );
    }
};
