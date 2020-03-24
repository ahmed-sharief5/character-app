import * as ACTION_TYPES from '../actions/action_types';

const initialState = {
  characters : [],
  error: "",
  species: [],
  gender: [],
  totalPages: 0,
  fetchingDone: false
}

const CharactersReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCHING:
        return {
          ...state,
          fetchingDone: false
        }
      case ACTION_TYPES.SUCCESS:
        return {
          ...state,
          characters: action.payload.characters,
          species: action.payload.species,
          gender: action.payload.gender,
          totalPages: action.payload.totalPages,
          fetchingDone: true
        }
      case ACTION_TYPES.FAILURE:
        return {
          ...state,
          error: action.payload,
          fetchingDone: true
        }
      case ACTION_TYPES.SEARCHING:
        return {
          ...state,
          characters: action.payload.characters,
          species: action.payload.species,
          gender: action.payload.gender,
          totalPages: action.payload.totalPages,
          fetchingDone: false
        }
      default:
        return state
    }
}

export default CharactersReducer;