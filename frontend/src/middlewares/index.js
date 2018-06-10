import thunk from 'redux-thunk';

import logger from './logger';

const env = process.env.NODE_ENV || 'development';

const middlewares = [
    thunk,
];

const devMiddlewares = [
    //logger,
];

export default (env === 'development')
    ? [
        ...middlewares,
        ...devMiddlewares,
    ]
    : middlewares;