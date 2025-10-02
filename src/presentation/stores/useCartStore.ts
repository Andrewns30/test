import { create } from 'zustand';
import { CartItem } from '../../domain/entities/CartItem';
import { Pokemon } from '../../domain/entities/Pokemon';
import { CartRepository } from '../../data/repositories/CartRepositoryImpl';
import { HapticService } from '../../infrastructure/services/HapticService';
import { NotificationService } from '../../infrastructure/services/NotificationService';

interface CartState {

    items: CartItem[];
    loading: boolean;

    loadCart: () => Promise<void>;
    addToCart: (pokemon: Pokemon) => Promise<void>;
    removeFromCart: (pokemonId: number) => Promise<void>;
    updateQuantity: (pokemonId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;

    getTotalItems: () => number;
    getTotalPrice: () => number;
    getPendingItemsCount: () => number;
}

const cartRepository = new CartRepository();
const notificationService = NotificationService.getInstance();

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    loading: false,

    loadCart: async () => {
        set({ loading: true });
        try {
            const items = await cartRepository.getCartItems();
            set({ items, loading: false });
        } catch (error) {
            console.error('Error loading cart:', error);
            set({ loading: false });
        }
    },

    addToCart: async (pokemon: Pokemon) => {
        const { items } = get();

        const existingItem = items.find(item => item.pokemon.id === pokemon.id);

        let newItems: CartItem[];
        let newQuantity = 1;

        if (existingItem) {
            newQuantity = existingItem.quantity + 1;
            newItems = items.map(item =>
                item.pokemon.id === pokemon.id
                    ? { ...item, quantity: newQuantity, syncStatus: 'pending' as const }
                    : item
            );
        } else {
            const newItem: CartItem = {
                pokemon,
                quantity: 1,
                addedAt: new Date().toISOString(),
                syncStatus: 'pending',
            };
            newItems = [...items, newItem];
        }

        set({ items: newItems });
        await cartRepository.saveCartItems(newItems);

        HapticService.addToCart();

        await notificationService.showItemAddedNotification(
            pokemon.name,
            existingItem ? newQuantity : undefined
        );
    },

    removeFromCart: async (pokemonId: number) => {
        const { items } = get();
        const itemToRemove = items.find(item => item.pokemon.id === pokemonId);
        const newItems = items.filter(item => item.pokemon.id !== pokemonId);

        set({ items: newItems });
        await cartRepository.saveCartItems(newItems);

        HapticService.removeFromCart();

        if (itemToRemove) {
            await notificationService.showItemRemovedNotification(itemToRemove.pokemon.name);
        }
    },

    updateQuantity: async (pokemonId: number, quantity: number) => {
        const { items } = get();

        if (quantity <= 0) {
            await get().removeFromCart(pokemonId);
            return;
        }

        const newItems = items.map(item =>
            item.pokemon.id === pokemonId
                ? { ...item, quantity, syncStatus: 'pending' as const }
                : item
        );

        set({ items: newItems });
        await cartRepository.saveCartItems(newItems);

        HapticService.quantityChange();
    },

    clearCart: async () => {
        const { items } = get();
        const itemCount = items.length;

        set({ items: [] });
        await cartRepository.clearCart();

        HapticService.removeFromCart();

        if (itemCount > 0) {
            await notificationService.showCartClearedNotification(itemCount);
        }
    },

    getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
            (total, item) => total + item.pokemon.price * item.quantity,
            0
        );
    },

    getPendingItemsCount: () => {
        const { items } = get();
        return items.filter(item => item.syncStatus === 'pending').length;
    },
}));
