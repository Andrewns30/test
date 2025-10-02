import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '../../domain/entities/Pokemon';

const STORAGE_KEY = '@emtelco:pokemon_cache';

export class PokemonStorageDataSource {
    async savePokemonList(pokemon: Pokemon[]): Promise<void> {
        try {
            const jsonValue = JSON.stringify(pokemon);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving pokemon to storage:', error);
            throw error;
        }
    }

    async getPokemonList(): Promise<Pokemon[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Error loading pokemon from storage:', error);
            return [];
        }
    }

    async appendPokemonList(newPokemon: Pokemon[]): Promise<void> {
        try {
            const existing = await this.getPokemonList();

            const existingIds = new Set(existing.map(p => p.id));
            const uniqueNewPokemon = newPokemon.filter(p => !existingIds.has(p.id));

            const combined = [...existing, ...uniqueNewPokemon];
            await this.savePokemonList(combined);
        } catch (error) {
            console.error('Error appending pokemon to storage:', error);
            throw error;
        }
    }

    async clearCache(): Promise<void> {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing pokemon cache:', error);
            throw error;
        }
    }
}
