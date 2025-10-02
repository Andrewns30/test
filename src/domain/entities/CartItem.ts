import { Pokemon } from './Pokemon';

export interface CartItem {
    pokemon: Pokemon;
    quantity: number;
    addedAt: string;
    syncStatus: 'synced' | 'pending' | 'failed';
}
