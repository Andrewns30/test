import { IPokemonRepository } from '../../domain/repositories/IPokemonRepository';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonApiDataSource } from '../datasources/PokemonApiDataSource';
import { PokemonStorageDataSource } from '../datasources/PokemonStorageDataSource';

/**
 * Implementación del repositorio de Pokémon
 * Actúa como intermediario entre el DataSource y la lógica de negocio
 * Implementa estrategia offline-first: intenta API, si falla usa caché
 */
export class PokemonRepository implements IPokemonRepository {
    private apiDataSource: PokemonApiDataSource;
    private storageDataSource: PokemonStorageDataSource;

    constructor() {
        this.apiDataSource = new PokemonApiDataSource();
        this.storageDataSource = new PokemonStorageDataSource();
    }

    /**
     * Obtiene Pokémon con estrategia offline-first:
     * 1. Intenta cargar desde la API
     * 2. Si tiene éxito, guarda en caché y retorna
     * 3. Si falla (sin internet), carga desde caché
     */
    async getPokemonList(offset: number, limit: number): Promise<Pokemon[]> {
        try {
            // Intentar cargar desde API
            const pokemon = await this.apiDataSource.fetchPokemonList(offset, limit);

            // Si tuvo éxito, guardar en caché
            if (offset === 0) {
                // Si es la primera página, reemplazar todo el caché
                await this.storageDataSource.savePokemonList(pokemon);
            } else {
                // Si es paginación, agregar al caché existente
                await this.storageDataSource.appendPokemonList(pokemon);
            }

            return pokemon;
        } catch (error) {
            console.log('API no disponible, cargando desde caché...', error);

            // Si falla la API, intentar cargar desde caché
            const cachedPokemon = await this.storageDataSource.getPokemonList();

            if (cachedPokemon.length === 0) {
                throw new Error('No hay conexión y no hay datos en caché');
            }

            // Simular paginación del caché
            const start = offset;
            const end = offset + limit;
            const page = cachedPokemon.slice(start, end);

            return page;
        }
    }

    async getPokemonById(id: number): Promise<Pokemon> {
        try {
            // Intentar desde API
            const pokemon = await this.apiDataSource.fetchPokemonDetail(id);
            return pokemon;
        } catch (error) {
            // Si falla, buscar en caché
            const cachedPokemon = await this.storageDataSource.getPokemonList();
            const found = cachedPokemon.find(p => p.id === id);

            if (!found) {
                throw new Error(`Pokémon ${id} no encontrado en caché`);
            }

            return found;
        }
    }
}
