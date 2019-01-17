import ProjectForm from './ProjectForm';
import EditProjectForm from './EditProjectForm';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';
import { Button, Table, Divider, Tag } from 'antd';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';
const linkToProject = (project) => {
    <Link to={`/article/${project.id}`} className="preview-link">
        {project.title}
  </Link>
}

@inject('projectsStore')
export default class ProjectsList extends React.Component {

    state = {
        isProjectFormModalVisible: false,
        isEditProjectFormModalVisible: false
    };

    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, project) => (<Link to={`/article/${project.id}`}>{project.title}</Link>),
    }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    }, {
        title: 'Action',
        key: 'action',
        render: (_text, record) => (
            <span>
            <a href="javascript:;">Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={(e) => this.props.projectsStore.deleteProject(record.id)}>Delete</a>
            </span>
        ),
    }];

    showProjectFormModal = () => {
        this.setState({ isProjectFormModalVisible: true });
    }

    closeProjectFormModal = () => {
        this.setState({ isProjectFormModalVisible: false });
    }

    showEditProjectFormModal = () => {
        this.setState({ isEditProjectFormModalVisible: true });
    }

    closeEditProjectFormModal = () => {
        this.setState({ isEditProjectFormModalVisible: false });
    }
    
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.props.projectsStore.createArticle(values)
            form.resetFields();
            this.setState({ isProjectFormModalVisible: false });
        });
    }

    handleUpdate = (project) => {
        this.props.projectsStore.updateArticle(project)
        this.setState({ isEditProjectFormModalVisible: false });
    }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
    

    render() {
        if (this.props.loading && this.props.projects.length === 0) {
            return (
              <LoadingSpinner />
            );
          }
          return (
              <div>
                  <h2>Projects
                  <Button type="primary" onClick={this.showProjectFormModal} style={{ float: 'right' }}>New Project</Button>
                  </h2>
                    <ProjectForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.isProjectFormModalVisible}
                        onCancel={this.closeProjectFormModal}
                        onCreate={this.handleCreate}
                    />
                    <EditProjectForm
                        visible={this.state.isEditProjectFormModalVisible}
                        onCancel={this.closeEditProjectFormModal}
                        onUpdate={this.handleUpdate}
                    />
                  <Table columns={this.columns} dataSource={this.props.projects} />
              </div>
          );
    }
};
