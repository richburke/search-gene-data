import React from 'react';

class LoadingIndicator extends React.Component {

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const {store} = this.context;
    const store_state = store.getState();
    const loading = store_state.isLoading ? '...loading...' : '';

    return (
      <span className="loading-indicator">{loading}</span>
    );
  }
}

LoadingIndicator.contextTypes = {
  store: React.PropTypes.object
};

export default LoadingIndicator;
