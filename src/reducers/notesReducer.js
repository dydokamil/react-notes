import _ from 'lodash';

import consts from '../consts';

const initialState = { notes: undefined, error: undefined, selected: undefined };

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.NOTES_FETCH_SUCCESS: // multiple notes
      return {
        notes: _.mapKeys(action.notes.data, '_id'),
        error: undefined,
      };
    case consts.NOTES_FETCH_ERROR:
      return { ...state, error: action.error };

    case consts.NOTE_FETCH_SUCCESS: // single note
      return {
        ...state,
        error: undefined,
        notes: {
          ..._.omit(state.notes, action.note.data._id),
          [action.note.data._id]: action.note.data,
        },
      };

    case consts.NOTE_FETCH_ERROR:
      return { ...state, error: action.error };
    case consts.SELECT_NOTE:
      return { ...state, selected: action.selected };

    case consts.NEW_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.data._id]: action.note.data,
        },
      };

    case consts.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ..._.omit(state.notes, action.note.data._id),
          [action.note.data._id]: action.note.data,
        },
      };

    case consts.REMOVE_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ..._.omit(state.notes, action.id.id),
        },
        selected: undefined,
      };

    default:
      return state;
  }
}
