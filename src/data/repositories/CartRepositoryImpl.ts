import { ICartRepository } from '../../domain/repositories/ICartRepository';
import { CartItem } from '../../domain/entities/CartItem';
import { CartStorageDataSource } from '../datasources/CartStorageDataSource';

/**
 * Implementación del repositorio de Carrito
 * Maneja la lógica de negocio del carrito y la sincronización
 */
export class CartRepository implements ICartRepository {
    private storageDataSource: CartStorageDataSource;

    constructor() {
        this.storageDataSource = new CartStorageDataSource();
    }

    async getCartItems(): Promise<CartItem[]> {
        return this.storageDataSource.getCart();
    }

    async saveCartItems(items: CartItem[]): Promise<void> {
        return this.storageDataSource.saveCart(items);
    }

    async clearCart(): Promise<void> {
        return this.storageDataSource.clearCart();
    }

    async syncPendingChanges(): Promise<void> {
        // Aquí iría la lógica de sincronización con un backend
        // Por ahora solo marcamos todos los items como sincronizados
        const items = await this.getCartItems();
        const syncedItems = items.map(item => ({
            ...item,
            syncStatus: 'synced' as const,
        }));
        await this.saveCartItems(syncedItems);
    }
}
