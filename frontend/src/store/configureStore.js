import {  createStore, applyMiddleware, compose } from "redux";
import {rootSaga} from '../store/sagas/index'
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./rootReducer";


const middlewareSaga = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: true
}) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middlewareSaga)))
middlewareSaga.run(rootSaga)

export default store;