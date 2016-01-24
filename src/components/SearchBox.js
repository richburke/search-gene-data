import React from 'react';
import ReactDOM from 'react-dom';

class SearchBox extends React.Component {

  constructor() {
    super();

    this.state = {
      allowRetrieve: false
    }
  }

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _cleanInput(value) {
    return value.trim().replace(/([^a-z0-9_-]+)/gi, '');
  }

  update(event) {
    const value = this._cleanInput(event.target.value);

    // We're not going to allow or bother to do a search with less than 4
    // characters.
    if (value.length < 4) {
      this.setState({
        allowRetrieve: false
      })

      return;
    }

    this.setState({
      allowRetrieve: true
    })

    const {store} = this.context;
    const store_state = store.getState();

    store.dispatch({
      type: 'UPDATE_SEARCH_VALUE',
      value
    });
  }

  clear() {
    React.findDOMNode(this.refs.searchInput).value = '';

    this.setState({
      allowRetrieve: false
    })

    const {store} = this.context;
    store.dispatch({
      type: 'CLEAR_SEARCH'
    });
  }

  retrieve() {
    const {store} = this.context;
    store.dispatch({
      type: 'RETRIEVE_VALUES'
    });
  }

  render() {
    const props = this.props;
    const {store} = this.context;
    const store_state = store.getState();
    const have_data = store_state.haveData;
    const allow_retrieve = this.state.allowRetrieve;
    const field_type = store_state.fieldType;
    const placeholder = field_type === 'chrom' ? 'Enter a chromozome value' : 'Enter a name';

    return (
        <div className="search input-group">
          <input ref="searchInput" type="text" className="searchbox" placeholder={placeholder} onKeyUp={this.update.bind(this)} />

          <span
            className={"fa fa-arrow-circle-right retrieve " + (allow_retrieve ? 'show' : '')}
            onClick={this.retrieve.bind(this)}>
          </span>
          <span
            className={"fa fa-times-circle clear " + (have_data ? 'show' : '')}
            onClick={this.clear.bind(this)}>
          </span>
        </div>
    );
  }
}

SearchBox.contextTypes = {
  store: React.PropTypes.object
}

export default SearchBox;
