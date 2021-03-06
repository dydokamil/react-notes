import _ from 'lodash'

import consts from '../actions/consts'

const initialState = { notes: undefined, error: undefined, selected: undefined }

export default function (state = initialState, action) {
  switch (action.type) {
    case consts.FETCH_NOTES_SUCCESS: // multiple notes
      return {
        ...state,
        notes: _.mapKeys(action.notes, '_id'),
        error: undefined
      }
    case consts.FETCH_NOTES_ERROR:
      return { ...state, error: action.error }

    case consts.NOTE_FETCH_SUCCESS: // single note
      return {
        ...state,
        error: undefined,
        notes: {
          ..._.omit(state.notes, action.note.data._id),
          [action.note.data._id]: action.note.data
        }
      }
    case consts.NOTE_FETCH_ERROR:
      return { ...state, error: action.error }

    case consts.SELECT_NOTE:
      return { ...state, selected: action.id }

    case consts.NEW_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ...state.notes,
          [action.note.data._id]: action.note.data
        }
      }
    case consts.NEW_NOTE_ERROR:
      return {
        ...state,
        error: action.error
      }

    case consts.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ..._.omit(state.notes, action.note.data._id),
          [action.note.data._id]: action.note.data
        }
      }
    case consts.UPDATE_NOTE_ERROR:
      return {
        ...state,
        error: action.error
      }

    case consts.REMOVE_NOTE_SUCCESS:
      return {
        ...state,
        notes: {
          ..._.omit(state.notes, action.id)
        },
        selected: undefined
      }
    case consts.REMOVE_NOTE_ERROR:
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}
