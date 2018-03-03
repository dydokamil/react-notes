import axios from 'axios'
import { all, call, takeEvery, put } from 'redux-saga/effects'
import consts from './consts'

const ROOT_URL = 'http://localhost:3000'

// fetch notes
function * watcherFetchNotes () {
  yield takeEvery(consts.FETCH_NOTES_REQUEST, workerFetchNotes)
}

function * workerFetchNotes () {
  try {
    const notes = yield call(fetchNotes)
    yield put({ type: consts.NOTES_FETCH_SUCCESS, notes })
  } catch (error) {
    yield put({ type: consts.NOTES_FETCH_ERROR, error })
  }
}

const fetchNotes = () => {
  return axios.get(`${ROOT_URL}/notes`)
}

// select note
function * watcherSelectNote () {
  yield takeEvery(consts.SELECT_NOTE_REQUEST, workerSelectNote)
}

function * workerSelectNote ({ selected }) {
  yield put({ type: consts.SELECT_NOTE, selected })
}

// fetch single note
function * watcherFetchNote () {
  yield takeEvery(consts.FETCH_NOTE_REQUEST, workerFetchNote)
}

function * workerFetchNote ({ selected }) {
  try {
    const note = yield call(fetchNote, selected)
    yield put({ type: consts.NOTE_FETCH_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.NOTE_FETCH_ERROR, error })
  }
}

const fetchNote = id => {
  console.log('fetching...', `${ROOT_URL}/notes/${id}`)

  return axios.get(`${ROOT_URL}/notes/${id}`)
}

// create new note
function * watcherNewNote () {
  yield takeEvery(consts.NEW_NOTE_REQUEST, workerNewNote)
}

function * workerNewNote () {
  try {
    const note = yield call(newNote)
    yield put({ type: consts.NEW_NOTE_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.NEW_NOTE_ERROR, error })
  }
}

const newNote = () => {
  return axios.post(`${ROOT_URL}/notes`)
}

// update note
function * watcherUpdateNote () {
  yield takeEvery(consts.UPDATE_NOTE_REQUEST, workerUpdateNote)
}

function * workerUpdateNote ({ body }) {
  try {
    const note = yield call(updateNote, body)
    yield put({ type: consts.UPDATE_NOTE_SUCCESS, note })
  } catch (error) {
    yield put({ type: consts.UPDATE_NOTE_ERROR, error })
  }
}

const updateNote = body => {
  return axios.put(`${ROOT_URL}/notes/${body._id}`, body)
}

// remove note
function * watcherRemoveNote () {
  yield takeEvery(consts.REMOVE_NOTE_REQUEST, workerRemoveNote)
}

function * workerRemoveNote ({ id }) {
  try {
    yield call(removeNote, id)
    yield put({ type: consts.REMOVE_NOTE_SUCCESS, id })
  } catch (error) {
    yield put({ type: consts.REMOVE_NOTE_ERROR, error })
  }
}

const removeNote = id => {
  return axios.delete(`${ROOT_URL}/notes/${id.id}`)
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
