import * as actions from './actions'
import consts from './consts'

describe('actions', () => {
  describe('when fetching all notes', () => {
    it('should create an action to fetch all notes', () => {
      const fetchNotesRequestAction = { type: consts.FETCH_NOTES_REQUEST }

      expect(actions.fetchNotesRequest()).toEqual(fetchNotesRequestAction)
    })

    it('should create an action on a successful notes fetch', () => {
      const notes = 'Some notes'
      const fetchNotesSuccessAction = {
        type: consts.FETCH_NOTES_SUCCESS,
        notes
      }

      expect(actions.fetchNotesSuccess(notes)).toEqual(fetchNotesSuccessAction)
    })

    it('should create an action on an erroneous notes fetch', () => {
      const error = 'Some error'
      const fetchNotesSuccessAction = { type: consts.FETCH_NOTES_ERROR, error }

      expect(actions.fetchNotesError(error)).toEqual(fetchNotesSuccessAction)
    })
  })

  describe('when selecting a note', () => {
    it('should create an action to request a note selection', () => {
      const id = 1
      const selectNoteActionRequest = { type: consts.SELECT_NOTE_REQUEST, id }

      expect(actions.selectNoteRequest(id)).toEqual(selectNoteActionRequest)
    })

    it('should create an action when user selects a note', () => {
      const id = 1
      const selectNoteAction = { type: consts.SELECT_NOTE, id }

      expect(actions.selectNote(id)).toEqual(selectNoteAction)
    })
  })

  describe('when fetching a single note', () => {
    it('should create an action to request a note selection', () => {
      const id = 1
      const selectNoteActionRequest = { type: consts.FETCH_NOTE_REQUEST, id }

      expect(actions.fetchNoteRequest(id)).toEqual(selectNoteActionRequest)
    })

    it('should create an action on a successful note fetch', () => {
      const note = 'Some note'
      const fetchNoteSuccessAction = { type: consts.FETCH_NOTE_SUCCESS, note }

      expect(actions.fetchNoteSuccess(note)).toEqual(fetchNoteSuccessAction)
    })

    it('should create an action on an erroneous note fetch', () => {
      const error = 'Some error'
      const fetchNoteErrorAction = { type: consts.FETCH_NOTE_ERROR, error }

      expect(actions.fetchNoteError(error)).toEqual(fetchNoteErrorAction)
    })
  })

  describe('when creating a new note', () => {
    it('should create an action to request a note creation', () => {
      const newNoteActionRequest = { type: consts.NEW_NOTE_REQUEST }

      expect(actions.newNoteRequest()).toEqual(newNoteActionRequest)
    })

    it('should create an action on a successful note creation', () => {
      const note = 'Some note'
      const newNoteSuccessAction = { type: consts.NEW_NOTE_SUCCESS, note }

      expect(actions.newNoteSuccess(note)).toEqual(newNoteSuccessAction)
    })

    it('should create an action on an erroneous note creation', () => {
      const error = 'Some error'
      const newNoteErrorAction = { type: consts.NEW_NOTE_ERROR, error }

      expect(actions.newNoteError(error)).toEqual(newNoteErrorAction)
    })
  })

  describe('when updating a note', () => {
    const note = { id: 1, content: 'Something', name: 'Some name' }

    it('should create an action to request a note update', () => {
      const updateNoteActionRequest = { type: consts.UPDATE_NOTE_REQUEST, note }

      expect(actions.updateNoteRequest(note)).toEqual(updateNoteActionRequest)
    })

    it('should create an action on a successful note update', () => {
      const updateNoteSuccessAction = { type: consts.UPDATE_NOTE_SUCCESS, note }

      expect(actions.updateNoteSuccess(note)).toEqual(updateNoteSuccessAction)
    })

    it('should create an action on an erroneous note update', () => {
      const error = 'some error'
      const updateNoteErrorAction = { type: consts.UPDATE_NOTE_ERROR, error }

      expect(actions.updateNoteError(error)).toEqual(updateNoteErrorAction)
    })
  })

  describe('when removing a note', () => {
    const id = 1
    it('should create an action to request a note deletion', () => {
      const removeNoteActionRequest = { type: consts.REMOVE_NOTE_REQUEST, id }

      expect(actions.removeNoteRequest(id)).toEqual(removeNoteActionRequest)
    })

    it('should create an action on a successful note removal', () => {
      const removeNoteActionSuccess = { type: consts.REMOVE_NOTE_SUCCESS, id }

      expect(actions.removeNoteSuccess(id)).toEqual(removeNoteActionSuccess)
    })

    it('should create an action on an erroneous note removal', () => {
      const error = 'Some error'
      const removeNoteActionError = { type: consts.REMOVE_NOTE_ERROR, error }

      expect(actions.removeNoteError(error)).toEqual(removeNoteActionError)
    })
  })
})
