const initialState = {
    init: false,
    count: 0,
    next: null,
    previous: null,
    results: [],
    error: null,
    loading: false,
    selected_family: null,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.list.REQUEST:
        case actionTypes.list.RESET:
        case actionTypes.list.REQUEST_ITEM:
        case actionTypes.pagination.set.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.list.SUCCESS:
            return {
                ...state,
                ...payload,
                init: true,
                error: null,
                loading: false,
            };
        case actionTypes.list.FAILURE:
            return {
                ...state,
                count: 0,
                next: null,
                previous: null,
                results: [],
                error: payload,
                loading: false,
            };
        case actionTypes.list.UPDATE:
            return {
                ...state,
                ...payload, // update count, next, previous, results if necessary
            };
        case actionTypes.item.create.SUCCESS:

            return {
                ...state,
                count: state.count + 1,
                results: [...state.results, payload],
            };
        case actionTypes.item.update.SUCCESS:

            return {
                ...state,
                results: Object.keys(state.results).reduce((previous, current) =>
                            [...previous, payload.id === state.results[current].id ? payload : state.results[current]],
                        []),
            };
        case actionTypes.item.delete.SUCCESS:
            return {
                ...state,
                results: state.results.filter(o => o.id !== parseInt(payload, 10)),
                loading: false,
                count: state.count - 1,
            };
        case actionTypes.modal.create.SET:
        case actionTypes.modal.update.SET:
            return {
                ...state,
                selected_family: payload ? state.selected_family : null,
            };
        default:
            return state;
        }
    };

