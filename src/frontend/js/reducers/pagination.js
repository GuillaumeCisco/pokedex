import build_pages from '../utils/pagination';

export const pages = [{number: 1, current: true}]; // memoize, same object

const initialState = {
    page: 1,
    page_size: 20,  // 20 is default limit from api
    pages,
};

export default actionTypes =>
    (state = initialState, action) => {
        switch (action.type) {
        case actionTypes.pagination.RESET:
            return {
                ...state,
                page: action.payload || 1,
                pages,
            };
        case actionTypes.pagination.set.SUCCESS:
            return {
                ...state,
                page: action.payload,
            };
        case actionTypes.pagination.BUILD:
            return {
                ...state,
                pages: build_pages(state.page_size, state.page, action.payload),
            };
        default:
            return state;
        }
    };
