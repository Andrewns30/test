import { Pokemon } from '../entities/Pokemon';

/**
 * Interface del repositorio de Pokémon
 * Define el contrato para acceder a datos de Pokémon
 */
export interface IPokemonRepository {
    /**
     * Obtiene una lista paginada de Pokémon
     * @param offset - Posición inicial
     * @param limit - Cantidad de items a obtener
     */
    getPokemonList(offset: number, limit: number): Promise<Pokemon[]>;

    /**
     * Obtiene los detalles de un Pokémon específico
     * @param id - ID del Pokémon
     */
    getPokemonById(id: number): Promise<Pokemon>;
}
