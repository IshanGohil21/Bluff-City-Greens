import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import { rootReducer } from './Reducer/rootReducer';

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));