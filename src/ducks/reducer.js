const initialState = {
	user: {},
	books: [],
	cart: []
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case USER_DATA:
			return Object.assign({}, state, { user: action.payload });
		case ALL_BOOKS:
			return Object.assign({}, state, { books: action.payload });
		case UPDATE_BOOKS:
			console.log('payload', action.payload);
			return Object.assign({}, state, { books: action.payload });
		case BOOKS_IN_CART:
			return Object.assign({}, state, {cart: action.payload})
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
export const updateBooks = (books)=> {
	return {
		type: UPDATE_BOOKS,
		payload: books
	}
}
export const booksInCart = (books) => {
	return {
		type: BOOKS_IN_CART,
		payload: books
	}
}
const USER_DATA = 'USER_DATA';
const ALL_BOOKS = 'ALL_BOOKS';
const UPDATE_BOOKS = 'UPDATE_BOOKS';
const BOOKS_IN_CART = 'BOOKS_IN_CART';
