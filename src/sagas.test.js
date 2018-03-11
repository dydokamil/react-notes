import { runSaga, call } from 'redux-saga'
import {
  watcherFetchNotes,
  workerFetchNotes,
  fetchNotes,
  workerSelectNote,
  workerFetchNote,
  fetchNote
} from './sagas'
import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import configureStore from 'redux-mock-store'
import consts from './actions/consts'
import reducer from './reducers/notesReducer'

describe('sagas', () => {
  // it('should execute fetch notes saga using snapshots', () => {
  //   return expectSaga(workerFetchNotes) // also try with watcher
  //     .run()
  //     .then(result => {
  //       expect(result.toJSON()).toMatchSnapshot()
  //     })
  // })

  // it('should execute fetch notes using effect creator assertions', () => {
  //   return expectSaga(workerFetchNotes)
  //     .returns({ notes: {} })
  //     .run(1000)
  // })

  describe('when fetching all notes', () => {
    // it('should call a worker on watcher call', () => {
    //   // doesn't work
    //   return expectSaga(workerFetchNotes) // Testing a watcher.
    //     .put.actionType(consts.FETCH_NOTES_SUCCESS) // Expect this action type,
    //     .dispatch({ type: consts.FETCH_NOTES_REQUEST }) // when dispatching this.
    //     .run()
    // })

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

    it('should execute fetch notes and fail, dispatching `FETCH_NOTES_ERROR` type', () => {
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

      it('should fetch notes with reducer and fail', () => {
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
      it('should fetch a note with reducer and succeed', () => {
        const id = '5a9aba9c4f5ba060a73f6c4d'
        return expectSaga(workerFetchNote, { id })
          .withReducer(reducer)
          .run()
          .then(result => {
            expect(result.storeState.notes[id]).toBeDefined()
          })
      })

      it('should fetch a note with reducer and fail', () => {
        const id = 'This id does not exist'

        return expectSaga(workerFetchNote, { id })
          .withReducer(reducer)
          .run()
          .then(result => {
            expect(result.storeState.error).toBeDefined()
          })
      })
    })
  })
})
