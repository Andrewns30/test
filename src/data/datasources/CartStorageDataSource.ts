import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../../domain/entities/CartItem';

const CART_STORAGE_KEY = '@emtelco_cart';

/**
 * DataSource para el almacenamiento local del carrito
 * Maneja la persistencia del carrito usando AsyncStorage
 */
export class CartStorageDataSource {
    /**
     * Guarda los items del carrito en AsyncStorage
     */
    async saveCart(items: CartItem[]): Promise<void> {
        try {
            const jsonValue = JSON.stringify(items);
            await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving cart to storage:', error);
            throw error;
        }
    }

    /**
     * Obtiene los items del carrito desde AsyncStorage
     */
    async getCart(): Promise<CartItem[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    /**
     * Limpia el carrito del almacenamiento
     */
    async clearCart(): Promise<void> {
        try {
            await AsyncStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing cart from storage:', error);
            throw error;
        }
    }
}
