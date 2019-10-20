const USER_SET = 'USER_SET'
const USER_SET_LOADING = 'USER_SET_LOADING'
const USER_SET_CREATE_ACCOUNT_LOADING = 'USER_SET_CREATE_ACCOUNT_LOADING'

const initialState = {
    loading: false,
    user: {},
    loadingCreateAccount: false

}

export default function user(state = initialState, action = {}) {
    switch (action.type) {
        case USER_SET:
            return { ...state, user: action.payload };

        case USER_SET_LOADING:
            return { ...state, loading: action.payload };
        case USER_SET_CREATE_ACCOUNT_LOADING:
            return { ...state, loadingCreateAccount: action.payload };

        default:
            return state
    }
}
