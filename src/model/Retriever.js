
import axios from 'axios';

const BASE_URL = '/gene/';

class Retriever {

  static retrieveData(field, value, fnc) {
    let config = {
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    }
    axios.get(`${BASE_URL}${field}/${value}`, config).then(fnc);
  }
}

export default Retriever;
