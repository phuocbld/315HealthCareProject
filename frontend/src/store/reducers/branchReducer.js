

const initialState = {
    data:[]
}


const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_BRANCH':
            return{...state,data:action.payload};
        default:
            return state

    }
}

export default branchReducer