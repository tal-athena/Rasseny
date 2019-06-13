import { createStore , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import {AsyncStorage} from 'react-native';
import reducers from '../reducers';
import {persistStore, persistCombineReducers} from "redux-persist";

const middleware = [ thunk ];
const config = {
      key: 'primary',
      storage: AsyncStorage,
};

let reducer = persistCombineReducers(config, reducers);

const store = createStore(
    reducer,
    undefined,
    compose(
        applyMiddleware(...middleware)
    )
);

persistStore(
    store,
    null,
    () => {store.getState()}
);

export default store; 