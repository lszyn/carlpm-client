import TasksTable from './TasksTable';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import RedError from '../RedError';

@inject('projectsStore', 'tasksStore', 'userStore')
@withRouter
@observer
export default class Project extends React.Component {
  state = {
    projectId: this.props.match.params.id
  }
  componentDidMount() {
    const projectId = this.props.match.params.id;
    this.props.projectsStore.loadProject(projectId, { acceptCached: true });
    this.props.tasksStore.loadTasks(projectId)
  }

  handleDeleteTask = (id) => {
    this.props.tasksStore.deleteTask(this.state.projectId, id);
  };

  handleCreateTask = (task) => {
    this.props.tasksStore.createTask(this.state.projectId, task);
  }

  handleUpdateTask = (task) => {
    this.props.tasksStore.updateTask(this.state.projectId, task);
  }

  render() {
    const projectId = this.props.match.params.id;
    const { tasks, isLoading } = this.props.tasksStore;
    const project = this.props.projectsStore.getProject(projectId);

    if (!project) return <RedError message="Can't load project" />;

    return (
      <div>
            <h2>Project: {project.title}</h2>
            <p>Description: {project.description}</p>
            <TasksTable
                tasks={tasks}
                loading={isLoading}
                onCreateTask={this.handleCreateTask}
                onUpdateTask={this.handleUpdateTask}
                onDeleteTask={this.handleDeleteTask}
        />
      </div>
    );
  }
}
