import { CartItem } from '../entities/CartItem';

/**
 * Interface del repositorio de Carrito
 * Define el contrato para gestionar el carrito de compras
 */
export interface ICartRepository {
    /**
     * Obtiene todos los items del carrito
     */
    getCartItems(): Promise<CartItem[]>;

    /**
     * Guarda los items del carrito
     * @param items - Lista de items a guardar
     */
    saveCartItems(items: CartItem[]): Promise<void>;

    /**
     * Limpia el carrito
     */
    clearCart(): Promise<void>;

    /**
     * Sincroniza los cambios pendientes
     */
    syncPendingChanges(): Promise<void>;
}
