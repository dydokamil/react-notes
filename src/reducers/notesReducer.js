import _ from 'lodash'

const initialState = { notes: undefined, error: undefined }

export default function (state = initialState, action) {
  switch (action.type) {
    case 'NOTES_FETCH_SUCCESS': // multiple notes
      return {
        notes: _.mapKeys(action.notes.data, '_id'),
        error: undefined
      }
    case 'NOTES_FETCH_ERROR':
      return { ...state, error: action.error }
    case 'NOTE_FETCH_SUCCESS': // single note
      // not implemented
      break
    case 'NOTE_FETCH_FAILURE':
      // not implemented
      break
    default:
      return state
  }
}
