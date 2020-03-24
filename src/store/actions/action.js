import * as ACTION_TYPES from './action_types';

export const setAllCharacters = (characters) => {
    return {
        type: ACTION_TYPES.SUCCESS,
        payload: characters
    }
};

