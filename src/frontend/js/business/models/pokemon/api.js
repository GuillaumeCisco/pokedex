import {
    fetchEntitiesFactory,
    fetchEntityFactory,
    deleteEntityFactory,
    updateEntityFactory,
    createEntityFactory,
} from '../../../entities/fetchEntities';

export const fetchPokemons = fetchEntitiesFactory('pokemon');
export const fetchPokemon = fetchEntityFactory('pokemon');
export const deletePokemon = deleteEntityFactory('pokemon');
export const updatePokemon = updateEntityFactory('pokemon');
export const createPokemon = createEntityFactory('pokemon');

