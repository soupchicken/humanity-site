import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
const enhancer = compose(
  applyMiddleware( thunkMiddleware ),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);
import reducers from '../reducers'

export default ( initialState ) => {
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  );
    return store;
}
