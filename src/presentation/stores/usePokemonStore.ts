import { create } from 'zustand';
import { Pokemon } from '../../domain/entities/Pokemon';
import { PokemonRepository } from '../../data/repositories/PokemonRepositoryImpl';
import { PokemonStorageDataSource } from '../../data/datasources/PokemonStorageDataSource';

interface PokemonState {
    pokemon: Pokemon[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    currentPage: number;

    fetchPokemon: (reset?: boolean) => Promise<void>;
    loadCachedPokemon: () => Promise<void>;
    reset: () => void;
}

const ITEMS_PER_PAGE = 20;
const pokemonRepository = new PokemonRepository();
const storageDataSource = new PokemonStorageDataSource();

export const usePokemonStore = create<PokemonState>((set, get) => ({
    pokemon: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 0,

    loadCachedPokemon: async () => {
        try {
            const cached = await storageDataSource.getPokemonList();
            if (cached.length > 0) {
                set({
                    pokemon: cached,
                    currentPage: Math.ceil(cached.length / ITEMS_PER_PAGE),
                    hasMore: cached.length % ITEMS_PER_PAGE === 0,
                });
            }
        } catch (error) {
            console.error('Error loading cached pokemon:', error);
        }
    },

    fetchPokemon: async (reset = false) => {
        const { loading, hasMore, currentPage } = get();

        if (loading || (!hasMore && !reset)) return;

        set({ loading: true, error: null });

        try {
            const page = reset ? 0 : currentPage;
            const offset = page * ITEMS_PER_PAGE;

            const newPokemon = await pokemonRepository.getPokemonList(
                offset,
                ITEMS_PER_PAGE
            );

            set(state => ({
                pokemon: reset ? newPokemon : [...state.pokemon, ...newPokemon],
                currentPage: page + 1,
                hasMore: newPokemon.length === ITEMS_PER_PAGE,
                loading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Error desconocido',
                loading: false,
            });
        }
    },

    reset: () => {
        set({
            pokemon: [],
            loading: false,
            error: null,
            hasMore: true,
            currentPage: 0,
        });
    },
}));
