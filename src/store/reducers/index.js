import CharactersReducer from "./characters_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    charactersReducer: CharactersReducer
})

export default rootReducer;
