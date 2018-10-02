const initialState ={
    user: {},
}

export default function reducer(state=initialState,action){
    switch(action.type){
        case USER_DATA:
            console.log('payload',action.payload)
            return Object.assign({}, state, {user: action.payload})
        default: return state;
    }
}

//action creators
export const getUserData = user => {
    return {
        type: USER_DATA,
        payload: user
    }
}


const USER_DATA = 'USER_DATA';