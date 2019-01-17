import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row } from 'antd';













import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id='components-form-demo-normal-login'>
        <Form onSubmit={this.props.handleSubmit} className="login-form">
        <h2>Log In</h2>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.props.handleEmailChange} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.props.handlePasswordChange} type="password" placeholder="Password" />
            )}
          </FormItem>

            <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or&nbsp; 
            <Link to="/register">
               register now!
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

@inject('authStore')
@withRouter
@observer
export default class Login extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.login()
      .then(() => this.props.history.replace('/'));
  };

  render() {
    //TODO display errors for auth forms
    const { values, errors, inProgress } = this.props.authStore;

    return (
        <WrappedLoginForm 
          handleEmailChange={this.handleEmailChange} 
          handlePasswordChange={this.handlePasswordChange} 
          handleSubmit={this.handleSubmitForm} />
    );
  }
}
