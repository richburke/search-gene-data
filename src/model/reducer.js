import {createStore, applyMiddleware}  from 'redux';
import DataFormatter from './DataFormatter';
import SearchUtils from './SearchUtils';
import Retriever from './Retriever';

const UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE';
const CLEAR_SEARCH = 'CLEAR_SEARCH';
const UPDATE_FIELD_TYPE = 'UPDATE_FIELD_TYPE';
const RETRIEVE_VALUES = 'RETRIEVE_VALUES';
const UPDATE_DATA = 'UPDATE_DATA';

const initialState = {
  fieldType: 'name',
  search: '',
  suggestions: [],
  isLoading: false,
  haveData: false,
  raw: [],
  display: []
};

function dispatchUpdateDataAction(response) {
  const state = store.getState();
  const data = response.data.results;

  store.dispatch({
    type: 'UPDATE_DATA',
    raw: data,
    display: DataFormatter.format(data)
  });
}

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCH_VALUE:
      return {
        ...state,
        search: action.value
      };

    case UPDATE_DATA:
      return {
        ...state,
        raw: action.raw,
        display: action.display,
        haveData: true,
        isLoading: false
      };

    case UPDATE_FIELD_TYPE:
      return {
        ...state,
        fieldType: action.value
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        search: '',
        haveData: false,
        isLoading: false,
        raw: [],
        display: []
      };

    case RETRIEVE_VALUES:
      Retriever.retrieveData(state.fieldType, state.search, dispatchUpdateDataAction);

      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
}

function thunkMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      return typeof action === 'function' ? action(dispatch, getState) : next(action);
    };
  };
}

const store = applyMiddleware(thunkMiddleware)(createStore)(reducer);
module.exports = store;
