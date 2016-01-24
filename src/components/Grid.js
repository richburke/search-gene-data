import React from 'react';
import Griddle from 'griddle-react';

class Grid extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const {store} = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = this.state;
    const {store} = this.context;
    const store_state = store.getState();

    const data = store_state.display.map((item, index) => {
      item.index = index;
      return item;
    });

    const column_metadata = [
      {
        columnName: 'name',
        order: 1,
        displayName: 'Name',
        cssClassName: 'column-name'
      },
      {
        columnName: 'chrom',
        order: 2,
        displayName: 'Chromosome',
        cssClassName: 'column-chrom'
      },
      {
        columnName: 'txStart',
        order: 4,
        displayName: 'Start',
        cssClassName: 'column-txstart'
      },
      {
        columnName: 'txEnd',
        order: 4,
        displayName: 'End',
        cssClassName: 'column-txend'
      }
    ];

    return (
      <div className="grid-container">
        <Griddle
          results={data}
          columns={["name", "chrom", "txStart", "txEnd"]}
          columnMetadata={column_metadata}
          noDataMessage="Enter or modify the search criteria to retrieve gene data."
          resultsPerPage="15" />
      </div>
    );
  }
}

Grid.contextTypes = {
  store: React.PropTypes.object
}

export default Grid;
