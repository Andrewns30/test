import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '../../domain/entities/Pokemon';

const STORAGE_KEY = '@emtelco:pokemon_cache';

/**
 * DataSource para persistir Pokémon en AsyncStorage
 * Implementa caché offline para el catálogo
 */
export class PokemonStorageDataSource {
    /**
     * Guarda la lista de Pokémon en el almacenamiento local
     */
    async savePokemonList(pokemon: Pokemon[]): Promise<void> {
        try {
            const jsonValue = JSON.stringify(pokemon);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving pokemon to storage:', error);
            throw error;
        }
    }

    /**
     * Obtiene la lista de Pokémon del almacenamiento local
     */
    async getPokemonList(): Promise<Pokemon[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Error loading pokemon from storage:', error);
            return [];
        }
    }

    /**
     * Agrega nuevos Pokémon a la lista existente
     */
    async appendPokemonList(newPokemon: Pokemon[]): Promise<void> {
        try {
            const existing = await this.getPokemonList();

            // Evitar duplicados basándose en el ID
            const existingIds = new Set(existing.map(p => p.id));
            const uniqueNewPokemon = newPokemon.filter(p => !existingIds.has(p.id));

            const combined = [...existing, ...uniqueNewPokemon];
            await this.savePokemonList(combined);
        } catch (error) {
            console.error('Error appending pokemon to storage:', error);
            throw error;
        }
    }

    /**
     * Limpia el caché de Pokémon
     */
    async clearCache(): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing pokemon cache:', error);
            throw error;
        }
    }
}
