import React from 'react';
import ReactRedux from 'react-redux';
import InputArea from './InputArea';
import Grid from './Grid';

const { Provider } = ReactRedux;
let store = require('../model/reducer');

class Main extends React.Component {
  render() {
    return (
      <section className="content-section">

        <Provider store={store}>
          <InputArea />
        </Provider>

        <Provider store={store}>
          <Grid />
        </Provider>

      </section>
    );
  }
}

export default Main;
