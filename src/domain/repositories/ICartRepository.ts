import { CartItem } from '../entities/CartItem';

export interface ICartRepository {
    getCartItems(): Promise<CartItem[]>;
    saveCartItems(items: CartItem[]): Promise<void>;
    clearCart(): Promise<void>;
    syncPendingChanges(): Promise<void>;
}
