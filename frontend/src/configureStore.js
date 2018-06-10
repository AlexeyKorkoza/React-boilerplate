import { createStore, applyMiddleware } from 'redux';

import middlewares from './middlewares/index';

import rootReducer from './reducers';

export default function configureStore(initState) {
    return createStore(
        rootReducer,
        initState,
        applyMiddleware.apply(this, middlewares),
    );
}
