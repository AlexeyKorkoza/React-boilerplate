export default store => {
    return next => action => {
        console.group(action.type);
        console.log('prev state', store.getState());
        console.info('dispatching', action);
        const res = next(action);
        console.log('next state', store.getState());
        console.groupEnd(action.type);
        return res
    }
}