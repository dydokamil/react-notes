import consts from './consts'

export const fetchNotesRequest = () => ({ type: consts.FETCH_NOTES_REQUEST })
export const fetchNotesSuccess = notes => ({
  type: consts.FETCH_NOTES_SUCCESS,
  notes
})
export const fetchNotesError = error => ({
  type: consts.FETCH_NOTES_ERROR,
  error
})

export const selectNoteRequest = id => ({
  type: consts.SELECT_NOTE_REQUEST,
  id
})
export const selectNote = id => ({
  type: consts.SELECT_NOTE,
  id
})

export const fetchNoteRequest = id => ({
  type: consts.FETCH_NOTE_REQUEST,
  id
})
export const fetchNoteSuccess = note => ({
  type: consts.FETCH_NOTE_SUCCESS,
  note
})
export const fetchNoteError = error => ({
  type: consts.FETCH_NOTE_ERROR,
  error
})

// new note
export const newNoteRequest = () => ({
  type: consts.NEW_NOTE_REQUEST
})
export const newNoteSuccess = note => ({
  type: consts.NEW_NOTE_SUCCESS,
  note
})
export const newNoteError = error => ({
  type: consts.NEW_NOTE_ERROR,
  error
})

// update note
export const updateNoteRequest = note => ({
  type: consts.UPDATE_NOTE_REQUEST,
  note
})
export const updateNoteSuccess = note => ({
  type: consts.UPDATE_NOTE_SUCCESS,
  note
})
export const updateNoteError = error => ({
  type: consts.UPDATE_NOTE_ERROR,
  error
})

// remove note
export const removeNoteRequest = id => ({
  type: consts.REMOVE_NOTE_REQUEST,
  id
})
export const removeNoteSuccess = id => ({
  type: consts.REMOVE_NOTE_SUCCESS,
  id
})
export const removeNoteError = error => ({
  type: consts.REMOVE_NOTE_ERROR,
  error
})
