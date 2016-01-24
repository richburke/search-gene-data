import React from 'react';

class FieldChooser extends React.Component {
  constructor() {
    super();

    this.state = {
      options: [
        {
          value: 'name',
          name: 'Name',
          selected: false
        },
        {
          value: 'chrom',
          name: 'Chromosome',
          selected: false
        }
      ]
    }
  }

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  update(value) {
    let options = this.state.options.map(function(item) {
      return {
        value: item.value,
        name: item.name
      };
    });

    this.setState({
      options
    });

    const {store} = this.context;
    store.dispatch({
      type: 'UPDATE_FIELD_TYPE',
      value
    });
  }

  render() {
    const props = this.props;
    const state = this.state;
    const {store} = this.context;
    const store_state = store.getState();

    let options = state.options.map((item, index) => {
      let value = item.value;
      let name = item.name;
      let selected = store_state.fieldType === value;
      let key = 'field-types-' + index;

      return (
        <label className={"btn btn-default " + (selected ? 'active' : '')}>
          <input type="radio" name="field-types" value={value} key={key} checked={selected} onChange={this.update.bind(this, value)} />{name}
        </label>
      );
    });

    return (
      <div className="field-types-group">
        <label className="filter-label">Filter by</label>
        <div className="btn-group" data-toggle="buttons">
          {options}
        </div>
      </div>
    );
  }
}

FieldChooser.contextTypes = {
  store: React.PropTypes.object
}

export default FieldChooser;
