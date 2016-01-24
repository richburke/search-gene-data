import moment from 'moment';

class DataFormatter {

  static format(data) {
    return data.map(item => {
      item.txStart = Number(item.txStart).toLocaleString();
      item.txEnd = Number(item.txEnd).toLocaleString();

      return item;
    });
  }
}

export default DataFormatter;
