import { put, call, takeEvery } from 'redux-saga/effects'
import ActionTypes from '../reducers/globals/types'
import { postJSON, getJSON } from '../../api/fetch'

function* runCheckingCarrierService(action) {
    try {
        const response = yield call( () => getJSON('https://elliot-shopify.herokuapp.com/') );

        if( response.success ) {
            yield put(
                {
                    type: ActionTypes.CHECK_CARRIERSERVICE_SUCCESSED,
                    payload : response
                }
            )
        }
        else {

        }
    } catch (error) {
        yield put(
            {
                type: ActionTypes.CHECK_CARRIERSERVICE_FAILED,
                payload: {},
                error : error
            }
        );
    }
}

const RunGlobalSaga = function*() {
    yield takeEvery( ActionTypes.CHECK_CARRIERSERVICE_REQUEST, runCheckingCarrierService );
}

export default RunGlobalSaga;
