import { Pokemon } from './Pokemon';

/**
 * Entidad CartItem
 * Representa un item en el carrito de compras
 */
export interface CartItem {
    pokemon: Pokemon;
    quantity: number;
    addedAt: string; // ISO timestamp
    syncStatus: 'synced' | 'pending' | 'failed';
}
