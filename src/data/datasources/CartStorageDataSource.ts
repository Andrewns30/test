import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../../domain/entities/CartItem';

const CART_STORAGE_KEY = '@emtelco_cart';

export class CartStorageDataSource {
    async saveCart(items: CartItem[]): Promise<void> {
        try {
            const jsonValue = JSON.stringify(items);
            await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving cart to storage:', error);
            throw error;
        }
    }

    async getCart(): Promise<CartItem[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            return [];
        }
    }

    async clearCart(): Promise<void> {
        try {
            await AsyncStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing cart from storage:', error);
            throw error;
        }
    }
}
