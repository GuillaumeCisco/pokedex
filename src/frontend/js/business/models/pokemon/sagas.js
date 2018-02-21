/* globals API_URL */

import {routerActions} from 'react-router-redux';
import {call, put, select, takeLatest, takeEvery} from 'redux-saga/effects';
import {isEmpty} from 'lodash';
import queryString from 'query-string';

import actions, {actionTypes} from './actions';
import {
    fetchPokemons as fetchPokemonsApi,
    fetchPokemon as fetchPokemonApi,
    deletePokemon as deletePokemonApi,
    updatePokemon as updatePokemonApi,
    createPokemon as createPokemonApi,

} from './api';
import {
    loadItemFactory,
    createItemFactory,
    updateItemFactory,
    deleteItemFactory,
    resetModal,
    loadList,
    loadByUrlRef,
    getNext,
    getPrevious,
    loadListNext,
    setOrder,
} from '../sagas';

const setItem = () =>
    function* setItemPokemonSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions;

        if (isEmpty(state.models.pokemon.item.results[request.payload]) && !state.models.pokemon.item.loading) {
            yield put(actions.item.get.request(request.payload));
        }

        if (location && location.pathname !== `/pokemon/${request.payload}`) {
            yield put(routerActions.replace(`/pokemon/${request.payload}${location && location.search ? location.search : ''}`));
        }
    };

const loadItem = (list, id = null) =>
    function* loadItemSaga() {
        // need to load first item of new list
        if (list.results && list.results.length) {
            let item = list.results[0];
            if (id) {
                item = list.results.find(o => +o.url.split('/').slice(-2)[0] === id);
                item = item || list.results[0];
            }
            yield put(actions.item.set(+item.url.split('/').slice(-2)[0])); // put for populating store
        }
    };

export const loadListAndItem = () =>
    function* loadListAndItemPokemonSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions;

        let query = location && location.search ? queryString.parse(location.search) : {};
        // need to update query if we use offset pagination
        // FIXME specific to pokemon api with offset pagination, you can avoid passing obj.query to loadList
        if (query && query.page) {
            query = {
                ...query,
                offset: (+query.page - 1) * 20, // 20 is default limit from pokemon api
            };
            delete query.page;
        }
        const list = yield call(loadList(actions, fetchPokemonsApi, 'list', query), request);

        if (list) {
            // handle pagination
            yield put(actions.pagination.build({
                count: list.count,
                next: list.next,
                previous: list.previous,
            }));

            // load first item with payload
            yield call(loadItem(list, request.payload), request);
        }
    };

export const loadListAndReset = () =>
    function* loadListAndResetPokemonSaga(request) {
        const state = yield select(),
            location = state.routing.locationBeforeTransitions;

        // let remove page from url browser if present
        const query = location && location.search ? queryString.parse(location.search) : {};
        if (query && query.page) {
            delete query.page;
            yield put(routerActions.replace({...location, search: queryString.stringify(query)}));
        }

        const list = yield call(loadList(actions, fetchPokemonsApi, 'list'), request);

        // handle pagination
        if (list) {
            yield put(actions.pagination.build({
                count: list.count,
                next: list.next,
                previous: list.previous,
            }));

            // load first item
            yield call(loadItem(list), request);
        }
    };

export const createItem = () =>
    function* createItemPokemonSaga(request) {
        const state = yield select();
        const item = yield call(createItemFactory(actions, createPokemonApi), request);

        if (item) {
            // do we need to update pagination ?
            if (state.models.pokemon.list.results.length >= state.models.pokemon.pagination.page_size) {
                const location = state.routing.locationBeforeTransitions,
                    query = location && location.search ? queryString.parse(location.search) : {},
                    next = getNext(`${API_URL}/pokemon/`, query, state.models.pokemon.pagination.page),
                    previous = getPrevious(`${API_URL}/pokemon/`, query, state.models.pokemon.pagination.page);

                // / update next, previous, count in list reducer
                yield put(actions.list.update({
                    next,
                    previous,
                }));

                // rebuild pagination if necessary
                if (next !== state.models.pokemon.list.next || previous !== state.models.pokemon.list.previous) {
                    // rebuild pagination if necessary
                    yield put(actions.pagination.build({
                        next,
                        previous,
                        count: state.models.pokemon.list.count + 1,
                    }));
                }
            }
            else {
                // select it
                yield put(actions.item.set(item.id));
            }
        }
    };

export const updateItem = () =>
    function* updateItemPokemonSaga(request) {
        const item = yield call(updateItemFactory(actions, updatePokemonApi), request);

        if (item && actions.modal.update) {
            yield put(actions.modal.update.set(false));
        }
    };

export const deleteItem = () =>
    function* deleteItemPokemonSaga(request) {
        const state = yield select();

        yield call(deleteItemFactory(actions, deletePokemonApi), request);

        // we need to load (maybe cached) the first result of the new list if the list is not empty
        const l = state.models.pokemon.list.results.reduce((p, c) => {
            const id = +c.url.split('/').slice(-2)[0];
            return [
                ...p,
                ...(id !== request.payload ? [{...c, id}] : [])
            ];
        }, []);
        if (l.length) {
            yield put(actions.item.set(l[0].id));
        }
        else if (state.models.pokemon.pagination.page > 1) {
            const location = state.routing.locationBeforeTransitions,
                query = location && location.search ? queryString.parse(location.search) : {},
                previous_url = getPrevious(`${API_URL}/pokemon/`, query, state.models.pokemon.pagination.page);
            yield put(actions.pagination.set.request(previous_url));
        }
    };

export const setPage = () =>
    function* setPagePokemonSaga(request) {
        const list = yield call(loadByUrlRef(actions), request);

        // handle pagination
        if (list) {
            yield put(actions.pagination.build({
                count: list.count,
                next: list.next,
                previous: list.previous,
            }));

            // load first item
            yield call(loadItem(list), request);
        }
    };

export const loadListPersistent = () =>
    function* loadListPersistentFamilySaga(request) {
        const list = yield call(loadList(actions, fetchPokemonsApi, 'persistent', {}), request);

        if (list && list.next) {
            yield put(actions.persistent.next.request());
        }
    };

/* istanbul ignore next */
const pokemonSagas = function* pokemonSagas() {
    yield [
        /** ***********/
        /* Pokemon */
        /** ***********/
        // CRUD
        takeLatest(actionTypes.list.REQUEST, loadList(actions, fetchPokemonsApi, 'list')),
        takeLatest(actionTypes.list.RESET, loadListAndReset()),
        takeLatest(actionTypes.list.REQUEST_ITEM, loadListAndItem()),

        takeLatest(actionTypes.item.get.REQUEST, loadItemFactory(actions, fetchPokemonApi, 'pokemon')),
        takeLatest(actionTypes.item.SET, setItem()),
        takeLatest(actionTypes.item.create.REQUEST, createItem()),
        takeLatest(actionTypes.item.update.REQUEST, updateItem()),
        takeLatest(actionTypes.item.delete.REQUEST, deleteItem()),

        // pagination handling
        takeLatest(actionTypes.pagination.set.REQUEST, setPage()),

        // order
        takeLatest(actionTypes.ordering.SET, setOrder()),

        // modals
        takeLatest(actionTypes.modal.update.SET, resetModal('UpdatePokemon', 'update')),
        takeLatest(actionTypes.modal.create.SET, resetModal('CreatePokemon', 'create')),

        // persistent
        takeLatest(actionTypes.persistent.REQUEST, loadListPersistent()),
        takeEvery(actionTypes.persistent.next.REQUEST, loadListNext(actions, 'pokemon')),
    ];
};


export default pokemonSagas;
