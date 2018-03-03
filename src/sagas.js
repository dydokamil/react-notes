import axios from 'axios'
import { all, call, takeEvery, put } from 'redux-saga/effects'

const ROOT_URL = 'http://localhost:3000'

function * watcherFetchNotes () {
  yield takeEvery('FETCH_NOTES_REQUEST', workerFetchNotes)
}

function * workerFetchNotes () {
  try {
    const notes = yield call(fetchNotes)
    yield put({ type: 'NOTES_FETCH_SUCCESS', notes })
  } catch (error) {
    yield put({ type: 'NOTES_FETCH_ERROR', error })
  }
}

function fetchNotes () {
  return axios.get(`${ROOT_URL}/notes`)
}

export default function * saga () {
  yield all([watcherFetchNotes()])
}
