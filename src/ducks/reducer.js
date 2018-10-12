const initialState = {
	user: {},
	books: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case USER_DATA:
        return Object.assign({}, state, { user: action.payload });
		case ALL_BOOKS:
        console.log('payload', action.payload);
			return Object.assign({}, state, { books: action.payload });
		default:
			return state;
	}
}

//action creators
export const getUserData = (user) => {
	return {
		type: USER_DATA,
		payload: user
	};
};
export const getBooks = (books) => {
	return {
		type: ALL_BOOKS,
		payload: books
	};
};

const USER_DATA = 'USER_DATA';
const ALL_BOOKS = 'ALL_BOOKS';
