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
          name: 'Chrom',
          selected: false
        }
      ]
    }
  }

  componentDidMount() {
    const {store} = this.context;
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
      type: 'UPDATE_FIELD_CHOICE',
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
      let key = 'units' + index;

      return (
        <label className={"btn btn-default " + (selected ? 'active' : '')}>
          <input type="radio" name="units" value={value} key={key} checked={selected} onChange={this.update.bind(this, value)} />{name}
        </label>
      );
    });

    return (
      <div className="btn-group units-group pull-right" data-toggle="buttons">
        {options}
     </div>
    );
  }
}

FieldChooser.contextTypes = {
  store: React.PropTypes.object
}

export default FieldChooser;
