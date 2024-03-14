import {call,delay,fork,put,take,takeEvery,takeLatest} from "redux-saga/effects";



export function* branchSaga () {
    yield takeLatest('ACTION_DATA_BRANCH',function* fetchBranch({type, payload }){
        try {
            yield put({
                type: 'FETCH_DATA_BRANCH'
            })
        } catch (error) {
            console.log(error);
        }
    })

    yield takeLatest('DEMO_MODAL',function* changeModal({type,payload}){
        // yield console.log(payload);
        yield put({
            type:"TRUE_MODAL"
        })
    } )
}