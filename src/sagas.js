import axios from 'axios'
import { all, call, takeEvery, put } from 'redux-saga/effects'
import * as actions from './actions/actions'

// const ROOT_URL = 'https://note-node.herokuapp.com';
const ROOT_URL = 'http://localhost:3000'

// fetch notes
const fetchNotes = () => axios.get(`${ROOT_URL}/notes`)

function * workerFetchNotes () {
  try {
    const notes = yield call(fetchNotes)
    yield put(actions.fetchNotesSuccess(notes))
  } catch (error) {
    yield put(actions.fetchNotesError(error))
  }
}

function * watcherFetchNotes () {
  yield takeEvery(actions.fetchNotesRequest().type, workerFetchNotes)
}

// select note
function * workerSelectNote (id) {
  console.log(id)
  yield put(actions.selectNote(id))
}

function * watcherSelectNote () {
  yield takeEvery(actions.selectNoteRequest().type, workerSelectNote)
}

// fetch single note
const fetchNote = id => axios.get(`${ROOT_URL}/notes/${id}`)

function * workerFetchNote ({ selected }) {
  try {
    const note = yield call(fetchNote, selected)
    yield put(actions.fetchNoteSuccess(note))
    // yield put({ type: consts.NOTE_FETCH_SUCCESS, note })
  } catch (error) {
    yield put(actions.fetchNoteError(error))
    // yield put({ type: consts.NOTE_FETCH_ERROR, error })
  }
}

function * watcherFetchNote () {
  yield takeEvery(actions.fetchNoteRequest().type, workerFetchNote)
}

// create new note
const newNote = () => axios.post(`${ROOT_URL}/notes`)

function * workerNewNote () {
  try {
    const note = yield call(newNote)
    yield put(actions.newNoteSuccess(note))
    // yield put({ type: consts.NEW_NOTE_SUCCESS, note })
  } catch (error) {
    yield put(actions.newNoteError(error))
    // yield put({ type: consts.NEW_NOTE_ERROR, error })
  }
}

function * watcherNewNote () {
  // yield takeEvery(consts.NEW_NOTE_REQUEST, workerNewNote)
  yield takeEvery(actions.newNoteRequest().type, workerNewNote)
}

// update note
const updateNote = body => axios.put(`${ROOT_URL}/notes/${body._id}`, body)

function * workerUpdateNote ({ body }) {
  try {
    const note = yield call(updateNote, body)
    // yield put({ type: consts.UPDATE_NOTE_SUCCESS, note })
    yield put(actions.updateNoteSuccess(note))
  } catch (error) {
    // yield put({ type: consts.UPDATE_NOTE_ERROR, error })
    yield put(actions.updateNoteError(error))
  }
}

function * watcherUpdateNote () {
  // yield takeEvery(consts.UPDATE_NOTE_REQUEST, workerUpdateNote)
  yield takeEvery(actions.updateNoteRequest().type, workerUpdateNote)
}

// remove note
const removeNote = id => axios.delete(`${ROOT_URL}/notes/${id.id}`)

function * workerRemoveNote ({ id }) {
  try {
    yield call(removeNote, id)
    yield put(actions.removeNoteSuccess(id))
    // yield put({ type: consts.REMOVE_NOTE_SUCCESS, id })
  } catch (error) {
    yield put(actions.removeNoteError(error))
    // yield put({ type: consts.REMOVE_NOTE_ERROR, error })
  }
}

function * watcherRemoveNote () {
  // yield takeEvery(consts.REMOVE_NOTE_REQUEST, workerRemoveNote)
  yield takeEvery(actions.removeNoteRequest().type, workerRemoveNote)
}

// combine sagas
export default function * saga () {
  yield all([
    watcherFetchNotes(),
    watcherSelectNote(),
    watcherFetchNote(),
    watcherNewNote(),
    watcherUpdateNote(),
    watcherRemoveNote()
  ])
}
