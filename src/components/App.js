import Header from './Header';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Project from './Project/index';
import Home from './Home';
import Login from './Login';
import Register from './Register';

import {  Layout } from 'antd';
const { Content, Footer} = Layout;
@inject('userStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore.pullUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <Layout>
          <Header />

          <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/projects/:id" component={Project} />
            <Route path="/" component={Home} />
          </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Project Management App
        </Footer>
        </Layout>
      );
    }
    return (
      <Header />
    );
  }
}
