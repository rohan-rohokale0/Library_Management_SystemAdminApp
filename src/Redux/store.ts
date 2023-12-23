import { createStore, combineReducers } from 'redux';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import loanAccountNumbersSlice from './loanAccountNumbersSlice';

const store = createStore(
    combineReducers({
        root: rootReducer,
        loanAccountNumbers: loanAccountNumbersSlice,
        // Add other reducers if needed
    })
);

export default store;
