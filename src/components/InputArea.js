import React from 'react';
import FieldChooser from './FieldChooser';
import SearchBox from './SearchBox';
import LoadingIndicator from './LoadingIndicator';

class InputArea extends React.Component {

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <FieldChooser />
        <SearchBox />
        <LoadingIndicator />
      </div>
    );
  }
}

InputArea.contextTypes = {
  store: React.PropTypes.object
};

export default InputArea;
