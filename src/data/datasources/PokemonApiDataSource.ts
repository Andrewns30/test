import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonApiResponse, PokemonDetailResponse } from '../models/PokemonApiModel';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * DataSource para la PokeAPI
 * Maneja todas las llamadas HTTP a la API de Pokémon
 */
export class PokemonApiDataSource {
    /**
     * Obtiene una lista paginada de Pokémon
     */
    async fetchPokemonList(offset: number, limit: number): Promise<Pokemon[]> {
        try {
            const response = await fetch(
                `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: PokemonApiResponse = await response.json();

            // Obtener detalles de cada Pokémon en paralelo
            const pokemonPromises = data.results.map(async (item) => {
                const id = this.extractIdFromUrl(item.url);
                return this.fetchPokemonDetail(id);
            });

            return Promise.all(pokemonPromises);
        } catch (error) {
            console.error('Error fetching pokemon list:', error);
            throw error;
        }
    }

    /**
     * Obtiene los detalles de un Pokémon específico
     */
    async fetchPokemonDetail(id: number): Promise<Pokemon> {
        try {
            const response = await fetch(`${BASE_URL}/pokemon/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: PokemonDetailResponse = await response.json();

            return {
                id: data.id,
                name: this.capitalizeFirstLetter(data.name),
                imageUrl: data.sprites.other['official-artwork'].front_default ||
                    data.sprites.front_default,
                price: this.generateRandomPrice(),
            };
        } catch (error) {
            console.error(`Error fetching pokemon ${id}:`, error);
            throw error;
        }
    }

    /**
     * Extrae el ID del Pokémon de la URL
     */
    private extractIdFromUrl(url: string): number {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 2], 10);
    }

    /**
     * Genera un precio aleatorio entre 10 y 100
     */
    private generateRandomPrice(): number {
        return Math.floor(Math.random() * 90) + 10;
    }

    /**
     * Capitaliza la primera letra del nombre
     */
    private capitalizeFirstLetter(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}
