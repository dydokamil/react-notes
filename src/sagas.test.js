import { runSaga, call } from 'redux-saga'
import saga, {
  watcherFetchNotes,
  workerFetchNotes,
  fetchNotes,
  workerSelectNote,
  workerFetchNote,
  fetchNote,
  workerNewNote,
  newNote,
  workerRemoveNote,
  workerUpdateNote,
  watcherNewNote
} from './sagas'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, all } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import configureStore from 'redux-mock-store'
import consts from './actions/consts'
import reducer from './reducers/notesReducer'

describe('sagas', () => {
  const error = new Error('Not Found')

  describe('when fetching all notes', () => {
    it('should call `fetchNotes` from the worker', () => {
      // works
      return expectSaga(workerFetchNotes) // Testing a worker.
        .call.fn(fetchNotes) // Expect this function to be called.
        .run()
    })

    it('should dispatch `FETCH_NOTES_SUCCESS` action type', () => {
      return expectSaga(workerFetchNotes)
        .put.actionType(consts.FETCH_NOTES_SUCCESS)
        .run()
    })

    it('should execute fetch notes but fail, dispatching `FETCH_NOTES_ERROR` type', () => {
      // works
      return expectSaga(workerFetchNotes)
        .provide({
          call () {
            throw new Error('Not Found') // This error will be added.
          }
        })
        .put.actionType(consts.FETCH_NOTES_ERROR) // Expect this type dispatched.
        .run()
    })

    describe('when using a reducer', () => {
      it('should fetch notes with reducer and succeed', () => {
        // works
        return expectSaga(workerFetchNotes)
          .withReducer(reducer) // Using the reducer,
          .run()
          .then(result => {
            // expect the key `notes` to be present.
            expect(Object.keys(result.storeState.notes)).toBeDefined()
          })
      })

      it('should fetch notes with reducer but fail', () => {
        const error = new Error('Not Found')
        return expectSaga(workerFetchNotes)
          .withReducer(reducer)
          .provide({
            call () {
              throw error
            }
          })
          .run()
          .then(result => {
            // expect the key `error` to be defined
            expect(result.storeState.error).toBeDefined()
          })
      })
    })
  })

  describe('when selecting a note', () => {
    describe('when using a reducer', () => {
      it('should fetch notes with reducer and succeed', () => {
        const id = 50
        return expectSaga(workerSelectNote, { id })
          .withReducer(reducer)
          .run()
          .then(result => {
            expect(result.storeState.selected).toEqual(id)
          })
      })
    })
  })

  describe('when fetching a single note', () => {
    describe('when using a reducer', () => {
      it('should fetch a note with reducer but fail', () => {
        const id = '-1' // this does not exists in the DB

        return expectSaga(workerFetchNote, { id })
          .withReducer(reducer)
          .provide({
            call () {
              throw error
            }
          })
          .run()
          .then(result => {
            expect(result.storeState.error).toBeDefined()
          })
      })
      it('should fetch a note with reducer and succeed', () => {
        const id = '5aa56cdae6547728ec5d922a' // this exists in the database
        return expectSaga(workerFetchNote, { id })
          .withReducer(reducer)
          .run()
          .then(result => {
            expect(result.storeState.notes[id]).toBeDefined()
          })
      })
    })
  })
  describe('when posting', () => {
    let noteId
    let initialState
    describe('when creating a new note', () => {
      describe('when using a reducer', () => {
        it('should create a new note with reducer and succeed', () => {
          return expectSaga(workerNewNote)
            .withReducer(reducer)
            .run()
            .then(result => {
              expect(result.storeState.notes).toBeDefined()
              noteId = Object.keys(result.storeState.notes)[0]
              initialState = result.storeState
            })
        })
        it('should update an existing note with reducer and succeed', () => {
          const expectedUpdatedNote = {
            _id: noteId,
            content: 'sonUNF:8l3nSNteflhiu37j4HNSKITfneo3',
            name: 'Update from test'
          }
          return expectSaga(workerUpdateNote, { body: expectedUpdatedNote })
            .withReducer(reducer, initialState)
            .run()
            .then(result => {
              expect(result.storeState.notes[noteId].content).toEqual(
                expectedUpdatedNote.content
              )
            })
        })
        it('should update an existing note with reducer but fail', () => {
          const expectedUpdatedNote = {
            _id: noteId,
            content: 'sonUNF:8l3nSNteflhiu37j4HNSKITfneo3',
            name: 'Update from test'
          }
          return expectSaga(workerUpdateNote, { body: expectedUpdatedNote })
            .withReducer(reducer, initialState)
            .provide({
              call () {
                throw error
              }
            })
            .run()
            .then(result => {
              expect(result.storeState.error).toBeDefined()
            })
        })
        it('should create a new note with reducer but fail', () => {
          return expectSaga(workerNewNote)
            .withReducer(reducer)
            .provide({
              call () {
                throw error
              }
            })
            .run()
            .then(result => {
              expect(result.storeState.error).toBeDefined()
            })
        })

        describe('when deleting the created note', () => {
          it('should delete a note and succeed', () => {
            return expectSaga(workerRemoveNote, { id: noteId })
              .withReducer(reducer, initialState)
              .run()
              .then(result => {
                expect(result.storeState.notes).not.toHaveProperty(noteId)
              })
          })
          it('should delete a note but fail', () => {
            return expectSaga(workerRemoveNote, { id: noteId })
              .withReducer(reducer, initialState)
              .provide({
                call () {
                  throw error
                }
              })
              .run()
              .then(result => {
                expect(result.storeState.error).toBeDefined()
              })
          })
        })
      })
    })
  })
})
