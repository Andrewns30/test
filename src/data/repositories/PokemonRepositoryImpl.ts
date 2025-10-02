import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonApiDataSource } from '../datasources/PokemonApiDataSource';
import { PokemonStorageDataSource } from '../datasources/PokemonStorageDataSource';

export class PokemonRepository implements IPokemonRepository {
    private apiDataSource: PokemonApiDataSource;
    private storageDataSource: PokemonStorageDataSource;

    constructor() {
        this.apiDataSource = new PokemonApiDataSource();
        this.storageDataSource = new PokemonStorageDataSource();
    }

    async getPokemonList(offset: number, limit: number): Promise<Pokemon[]> {
        try {
            const pokemon = await this.apiDataSource.fetchPokemonList(offset, limit);

            if (offset === 0) {
                await this.storageDataSource.savePokemonList(pokemon);
            } else {
                await this.storageDataSource.appendPokemonList(pokemon);
            }

            return pokemon;
        } catch (error) {
            console.log('API no disponible, cargando desde caché...', error);

            const cachedPokemon = await this.storageDataSource.getPokemonList();

            if (cachedPokemon.length === 0) {
                throw new Error('No hay conexión y no hay datos en caché');
            }

            const start = offset;
            const end = offset + limit;
            const page = cachedPokemon.slice(start, end);

            return page;
        }
    }

    async getPokemonById(id: number): Promise<Pokemon> {
        try {
            const pokemon = await this.apiDataSource.fetchPokemonDetail(id);
            return pokemon;
        } catch (error) {
            const cachedPokemon = await this.storageDataSource.getPokemonList();
            const found = cachedPokemon.find(p => p.id === id);

            if (!found) {
                throw new Error(`Pokémon ${id} no encontrado en caché`);
            }

            return found;
        }
    }
}
