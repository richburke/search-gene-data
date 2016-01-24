import React from 'react';
import ReactRedux from 'react-redux';
import FieldChooser from './FieldChooser';
import SearchBox from './SearchBox';
import Grid from './Grid';

const { Provider } = ReactRedux;
let store = require('../model/reducer');

class Main extends React.Component {
  render() {
    return (
      <section>

        <Provider store={store}>
          <FieldChooser />
        </Provider>

        <Provider store={store}>
          <SearchBox />
        </Provider>

        <Provider store={store}>
          <Grid />
        </Provider>

      </section>
    );
  }
}

export default Main;
