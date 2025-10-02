import { Pokemon } from '../entities/Pokemon';

export interface IPokemonRepository {
    getPokemonList(offset: number, limit: number): Promise<Pokemon[]>;
    getPokemonById(id: number): Promise<Pokemon>;
}
