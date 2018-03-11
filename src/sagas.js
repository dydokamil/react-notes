import axios from 'axios'
import { all, call, takeEvery, put } from 'redux-saga/effects'
import consts from './actions/consts'

// const ROOT_URL = 'https://note-node.herokuapp.com'
const ROOT_URL = 'http://localhost:3000'

// fetch notes
export const fetchNotes = () => axios.get(`${ROOT_URL}/notes`)

export function * workerFetchNotes () {
  try {
    const notes = yield call(fetchNotes)
    const { data } = notes
    yield put({ type: consts.FETCH_NOTES_SUCCESS, notes: data })
  } catch (error) {
    yield put({ type: consts.FETCH_NOTES_ERROR, error })
  }
}

export function * watcherFetchNotes () {
  yield takeEvery(consts.FETCH_NOTES_REQUEST, workerFetchNotes)
}

// select note
export function * workerSelectNote ({ id }) {
  yield put({ type: consts.SELECT_NOTE, id })
}

export function * watcherSelectNote () {
  yield takeEvery(consts.SELECT_NOTE_REQUEST, workerSelectNote)
}

// fetch single note
export const fetchNote = id => axios.get(`${ROOT_URL}/notes/${id}`)

export function * workerFetchNote ({ id }) {
  try {
    const note = yield call(fetchNote, id)
    yield put({ type: consts.NOTE_FETCH_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.NOTE_FETCH_ERROR, error })
  }
}

export function * watcherFetchNote () {
  yield takeEvery(consts.FETCH_NOTE_REQUEST, workerFetchNote)
}

// create new note
const newNote = () => axios.post(`${ROOT_URL}/notes`)

function * workerNewNote () {
  try {
    const note = yield call(newNote)
    yield put({ type: consts.NEW_NOTE_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.NEW_NOTE_ERROR, error })
  }
}

function * watcherNewNote () {
  yield takeEvery(consts.NEW_NOTE_REQUEST, workerNewNote)
}

// update note
const updateNote = body => axios.put(`${ROOT_URL}/notes/${body._id}`, body)

function * workerUpdateNote ({ body }) {
  try {
    const note = yield call(updateNote, body)
    yield put({ type: consts.UPDATE_NOTE_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.UPDATE_NOTE_ERROR, error })
  }
}

function * watcherUpdateNote () {
  yield takeEvery(consts.UPDATE_NOTE_REQUEST, workerUpdateNote)
}

// remove note
const removeNote = id => axios.delete(`${ROOT_URL}/notes/${id.id}`)

function * workerRemoveNote ({ id }) {
  try {
    yield call(removeNote, id)
    yield put({ type: consts.REMOVE_NOTE_SUCCESS, id })
  } catch (error) {
    yield put({ type: consts.REMOVE_NOTE_ERROR, error })
  }
}

function * watcherRemoveNote () {
  yield takeEvery(consts.REMOVE_NOTE_REQUEST, workerRemoveNote)
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
