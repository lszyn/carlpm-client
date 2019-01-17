import React from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Layout, Menu } from 'antd';
const PageHeader = Layout.Header;

@inject('userStore', 'commonStore', 'authStore')
@observer
class Header extends React.Component {

  logOut = () => {
    this.props.authStore.logout()
  };

  render() {
    const { currentUser } = this.props.userStore;
    return (
        <PageHeader className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <NavLink to="/">
                    Home
                </NavLink>
              </Menu.Item>
              {!currentUser && (
                <Menu.Item key="login" style={{ float: 'right' }}>
                  <NavLink to="/login">
                      Sign In
                  </NavLink>
                </Menu.Item>
              )}
              {!currentUser && (
                <Menu.Item key="signup" style={{ float: 'right' }}>
                  <NavLink to="/register">
                      Sign Up
                  </NavLink>
                </Menu.Item>
              )}
              {currentUser && (
                <Menu.Item key="projects">
                  <NavLink to="/projects">
                     Projects
                  </NavLink>
                </Menu.Item>
              )}
              {currentUser && (
                <Menu.Item key="logout" onClick={this.logOut} style={{ float: 'right' }}>
                     Log Out
                </Menu.Item>
              )}
            </Menu>
      </PageHeader>
    );
  }
}

export default Header;