import MainView from './MainView';
import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@withRouter
@observer
export default class Home extends React.Component {

  render() {
    return (
      <MainView />
    );
  }
}
