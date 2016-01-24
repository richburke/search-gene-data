import React from 'react';
import Griddle from 'griddle-react';

class Grid extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   options: [
    //     {
    //       value: 'metric',
    //       name: 'Metric',
    //       selected: false
    //     },
    //     {
    //       value: 'imperial',
    //       name: 'Imperial',
    //       selected: false
    //     }
    //   ]
    // }
  }

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // update(value) {
  //   let options = this.state.options.map(function(item) {
  //     return {
  //       value: item.value,
  //       name: item.name
  //     };
  //   });
  //
  //   this.setState({
  //     options
  //   });
  //
  //   const {store} = this.context;
  //   store.dispatch({
  //     type: 'UPDATE_UNITS',
  //     value
  //   });
  // }

  render() {
    const props = this.props;
    const state = this.state;
    const {store} = this.context;
    const store_state = store.getState();
    const data = store_state.display;

    const column_configs = [
      {
        columnName: 'name',
        order: 1,
        displayName: 'Name'
      },
      {
        columnName: 'chrom',
        order: 2,
        displayName: 'Chromozome'
      },
      {
        columnName: 'txStart',
        order: 4,
        displayName: 'Start'
      },
      {
        columnName: 'txEnd',
        order: 4,
        displayName: 'End'
      }
    ];

    return (
      <Griddle
      results={data}
      columns={["name", "chrom", "txStart", "txEnd"]}
      columnMetadata={column_configs}
      resultsPerPage="15" />
    );
  }
}

Grid.contextTypes = {
  store: React.PropTypes.object
}

export default Grid;
