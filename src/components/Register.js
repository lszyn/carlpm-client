import { Link } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';

import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id='components-form-demo-normal-login'>
        <Form onSubmit={this.props.handleSubmit} className="login-form">
        <h2>Sign Up</h2>
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
              Sign Up
            </Button>
            Or&nbsp; 
            <Link to="/login">
               login!
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
const WrappedSignUpForm = Form.create()(LoginForm);


@inject('authStore')
@observer
export default class Register extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.register()
      .then(() => this.props.history.replace('/'));
  };

  render() {
    //TODO for future, when will handle displaying errors
    const { values, errors, inProgress } = this.props.authStore;

    return (
      <WrappedSignUpForm
        handleEmailChange={this.handleEmailChange} 
        handlePasswordChange={this.handlePasswordChange} 
        handleSubmit={this.handleSubmitForm} 
        
      />
    );
  }
}
