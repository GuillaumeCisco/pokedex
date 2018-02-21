import {reset} from 'redux-form';
import {call, put, select} from 'redux-saga/effects';
import {routerActions} from 'react-router-redux';
import queryString from 'query-string';
import url from 'url';

import {fetchByUrl} from '../../entities/fetchEntities';
import generalActions from '../../app/actions';

// helpers for pagination cache

// TODO: review for pagination offset with pokemon API
export function getUrl(baseUrl, query, page, action = 'next') {
    const queries = queryString.stringify({
        ...query,
        page: page + (action === 'next' ? 1 : -1),
    });
    return baseUrl + (queries ? `?${queries}` : '');
}

export function getNext(baseUrl, query, page) {
    return getUrl(baseUrl, query, page, 'next');
}

export function getPrevious(baseUrl, query, page) {
    return page === 1 ? null : getUrl(baseUrl, query, page, 'previous');
}

export const loadList = (actions, fetchList, action = 'list', q) =>
    function* loadListSaga() {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions;

        // override query if needed, default to current url query
        const query = q || (location && location.search ? queryString.parse(location.search) : {});

        const {error, list} = yield call(fetchList, query);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions[action].failure(error.body));
        }
        else {
            // FIXME special pokemon api with offset pagination
            const page = query && query.offset ? ((query.offset + 20) / 20) : (query && query.page ? query.page : null); // original page
            if (page) {
                yield put(actions.pagination.reset(parseInt(page, 10)));
            }
            else {
                yield put(actions.pagination.reset());
            }

            yield put(actions[action].success(list));
            return list;
        }
    };

export const loadByUrlRef = actions =>
    function* loadByUrlRefSaga(request) {
        const state = yield select();
        const location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        // need to remove page from query, as already in url
        const parsedUrl = url.parse(request.payload),
            parsedUrlQuery = queryString.parse(parsedUrl.query),
            urlToFetch = url.format({
                ...parsedUrl,
                query: {...query, ...parsedUrlQuery}, // get all possible filters set and override page/offset if present
            });

        const {error, list} = yield call(fetchByUrl, urlToFetch, '');

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.list.failure(error.body));
        }
        else {
            // add page in url
            const page = parsedUrlQuery.offset ? ((+parsedUrlQuery.offset + 20) / 20) : (+parsedUrlQuery.page || 1);  // 20 is default limit from pokemon api
            yield put(actions.pagination.set.success(page));

            // update page in url
            if (page > 1) {
                yield put(routerActions.replace({
                    ...location,
                    search: queryString.stringify({...query, page}),
                }));
            }
            else {
                delete query.page;
                yield put(routerActions.replace({
                    ...location,
                    search: queryString.stringify(query),
                }));
            }

            // return list
            yield put(actions.list.success(list));
            return list;
        }
    };

export const loadListFromPath = (actions, fetchList, subreducer) =>
    function* loadListFromPathSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        const {error, list} = yield call(fetchList, query, '', request.payload);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions[subreducer].failure(error.body));
        }
        else {
            return list;
        }
    };

export const loadListNext = (actions, type) =>
    function* loadListNextSaga() {
        const state = yield select(),
            urlToFetch = state.models[type].persistent.next;

        const {error, list} = yield call(fetchByUrl, urlToFetch);

        if (error) {
            if (error.body && error.body.message) {
                console.error(error.body.message);
            }
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            else if (error && error.message) {
                yield put(generalActions.error.set(error.message));
            }
            yield put(actions.persistent.next.failure(error.body));
        }
        else {
            yield put(actions.persistent.next.success(list));

            if (list.next) {
                yield put(actions.persistent.next.request());
            }
        }
    };

export const loadItemFactory = (actions, fetchItem, type) =>
    function* loadItemSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        // if created, no need to ask server and modify state
        if (!query.created) {
            const {error, item} = yield call(fetchItem, query, request.payload);

            if (error) {
                if (error.body && error.body.message) {
                    console.error(error.body.message);
                }
                if (error && [401, 403].includes(error.status)) {
                    yield put(signOutActions.request());
                }
                else if (error && error.message) {
                    yield put(generalActions.error.set(error.message));
                }
                yield put(actions.item.get.failure(error.body));
            }
            else {
                yield put(actions.item.get.success({
                    [request.payload]: item,
                }));
            }
        }
        else {
            yield put(actions.item.get.success({
                [request.payload]: state.models[type].list.item, // cached
            }));
        }
    };

export const createItemFactory = (actions, createItem) =>
    function* createItemSaga(request) {
        const state = yield select(),
            {error, item} = yield call(createItem, '', request.payload);

        if (error) {
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            yield put(actions.item.create.failure(error.body));
        }
        else {
            yield put(actions.modal.create.set(false));
            if (actions.modal.duplicate) {
                yield put(actions.modal.duplicate.set(false));
            }
            yield put(actions.item.create.success(item));
        }

        return item;
    };

export const updateItemFactory = (actions, updateItem) =>
    function* updateItemSaga(request) {
        const state = yield select(),
            {error, item} = yield call(updateItem, request.payload.id, '', request.payload.values);

        if (error) {
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            yield put(actions.item.update.failure(error.body));
        }
        else {
            yield put(actions.item.update.success(item));

            return item;
        }
    };

export const deleteItemFactory = (actions, deleteItem) =>
    function* deleteItemSaga(request) {
        const state = yield select(),
            {error} = yield call(deleteItem, request.payload, '');

        if (error) {
            console.error(error.message);
            if (error && [401, 403].includes(error.status)) {
                yield put(signOutActions.request());
            }
            yield put(actions.item.delete.failure(error.body));
        }
        else {
            yield put(actions.modal.delete.set(false));
            yield put(actions.item.delete.success(request.payload));
        }
    };

export const resetModal = (form, type) =>
    function* resetModalSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        if (type) {
            if (request.payload) {
                query[type] = `${request.payload}`; // stringify it
            }
            else if (query[type]) {
                delete query[type];
            }

            // set query url
            const search = queryString.stringify(query);
            if (search !== location.search.slice(1)) { // note that `location.search` automatically prepends a question mark
                yield put(routerActions.replace({...location, search}));
            }
        }

        yield put(reset(form));
    };

export const setSearch = () =>
    function* setSearchSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        if (request.payload) {
            query.search = `${request.payload}`; // stringify it
        }
        else {
            delete query.search;
        }

        const search = queryString.stringify(query);
        if (search !== location.search.slice(1)) { // note that `location.search` automatically prepends a question mark
            yield put(routerActions.replace({...location, search}));
        }
    };

export const setOrder = () =>
    function* setOrderSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions,
            query = location && location.search ? queryString.parse(location.search) : {};

        if (request.payload.order) {
            query.ordering = `${request.payload.order}`; // affect order in url
        }
        else {
            delete query.ordering;
        }

        const search = queryString.stringify(query);
        if (search !== location.search.slice(1)) { // note that `location.search` automatically prepends a question mark
            yield put(routerActions.replace({...location, search}));
        }
    };

