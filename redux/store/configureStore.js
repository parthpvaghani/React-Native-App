import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// reducers
import rootReducer from "../reducers/rootReducer";


// sagas (All Saga's Combination)
import rootSaga from "../Sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(sagaMiddleware),
    
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
