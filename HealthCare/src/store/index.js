import { composeWithDevTools } from 'redux-devtools-extension';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducer/auth';

const reducers = combineReducers({
  auth: authReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
