import {createStore, applyMiddleware}  from 'redux';
import DataFormatter from './DataFormatter';
import SearchUtils from './SearchUtils';
import Retriever from './Retriever';

const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
const MAYBE_UPDATE_SUGGESTIONS = 'MAYBE_UPDATE_SUGGESTIONS';
const LOAD_SUGGESTIONS_BEGIN = 'LOAD_SUGGESTIONS_BEGIN';
const CLEAR_LOCATION = 'CLEAR_LOCATION';
const UPDATE_UNITS = 'UPDATE_UNITS';
const RETRIEVE_VALUES = 'RETRIEVE_VALUES';
const UPDATE_DATA = 'UPDATE_DATA';

const initialState = {
  value: '',
  suggestions: [],
  isLoading: false,
  isRetrieving: true,
  location: '',
  haveData: false,
  fieldType: 'name',
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
    case UPDATE_INPUT_VALUE:
      // if (SearchUtils.hasMatch(Retriever.getLocations(), action.value)) {
      //   Retriever.retrieveLocationData(action.value, dispatchUpdateWeatherDataAction);
      //
      //   return {
      //     ...state,
      //     value: action.value,
      //     location: action.value
      //   };
      // }

      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    case UPDATE_DATA:
      return {
        ...state,
        raw: action.raw,
        display: action.display,
        haveData: true
      };

    case UPDATE_UNITS:
      return {
        ...state,
        units: action.value
      };

    case CLEAR_LOCATION:
      return {
        ...state,
        value: '',
        location: '',
        haveData: false,
        raw: {},
        display: {}
      };

    case RETRIEVE_VALUES:
      Retriever.retrieveData(state.fieldType, state.value, dispatchUpdateDataAction);

      return {
        ...state,
        isRetrieving: true
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
