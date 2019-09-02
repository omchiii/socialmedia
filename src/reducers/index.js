import {combineReducers} from 'redux';
import noteReducer from './noteReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	notes: noteReducer,
	user: userReducer,
	loading: loadingReducer
});


export default rootReducer;