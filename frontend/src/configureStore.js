import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default function configureStore(initState) {
  return createStore(rootReducer, initState);
}
