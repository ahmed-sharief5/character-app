import * as ACTION_TYPES from './action_types';

export const setAllCharacters = (characters) => {
    return {
        type: ACTION_TYPES.SUCCESS,
        payload: characters
    }
};

export const fetchingCharacters = (characters) => {
    return {
        type: ACTION_TYPES.FETCHING,
        payload: characters
    }
};

