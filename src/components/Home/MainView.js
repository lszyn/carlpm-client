import ProjectsList from '../Project/ProjectsList';

import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom'
import Login from '../Login';

@inject('projectsStore', 'commonStore', 'userStore')
@withRouter
@observer
export default class MainView extends React.Component {

  componentDidMount() {
    this.props.projectsStore.loadProjects();
  }

  render() {
    const { currentUser } = this.props.userStore;
    const { projects, isLoading } = this.props.projectsStore;

    return (
      <div>
      {currentUser ? <ProjectsList
                projects={projects}
                loading={isLoading}
        /> : <Login /> }
      </div>
    );
  }
};
