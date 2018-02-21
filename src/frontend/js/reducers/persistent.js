const initialState = {
    init: false,
    next: null,
    results: [], // whole (concatenated and static)
    error: null,
    loading: false,
};

export default actionTypes =>
    (state = initialState, {type, payload}) => {
        switch (type) {
        case actionTypes.persistent.REQUEST:
        case actionTypes.persistent.next.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.persistent.SUCCESS:
            return {
                ...state,
                ...payload,
                init: true,
                error: null,
                loading: false,
            };
        case actionTypes.persistent.FAILURE:
        case actionTypes.persistent.next.FAILURE:
            return {
                ...state,
                count: 0,
                next: null,
                results: [],
                error: payload,
                loading: false,
            };
        case actionTypes.persistent.next.SUCCESS:
            return {
                ...state,
                next: payload ? (payload.next || null) : null,
                results: payload ? [...state.results, ...payload.results] : state.results, // let's concatenate
                init: true,
                error: null,
                loading: false,
            };
        case actionTypes.item.create.SUCCESS:

            return {
                ...state,
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
            };
        default:
            return state;
        }
    };

