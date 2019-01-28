import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

function* helloSaga() {
  console.log('Hello Sagas!')
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    const userIds = yield [1, 2, 3]
    yield put({ type: 'USER_FETCH_SUCCEEDED', payload: { userIds } })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* userSaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}

/**
 * root saga combines all sagas (i.e., generators) into one generator fn that
 * will run all child generators concurrently
 */
export default function* rootSaga() {
  yield all([
    helloSaga(),
    userSaga()
  ])
}
