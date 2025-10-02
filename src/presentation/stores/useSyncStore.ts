import { create } from 'zustand';
import { ConnectivityService } from '../../infrastructure/services/ConnectivityService';
import { CartRepository } from '../../data/repositories/CartRepositoryImpl';
import { NotificationService } from '../../infrastructure/services/NotificationService';
import { HapticService } from '../../infrastructure/services/HapticService';
import { useCartStore } from './useCartStore';

interface SyncState {
    isOnline: boolean;
    isSyncing: boolean;
    lastSyncAt: string | null;

    initialize: () => void;
    syncCart: () => Promise<void>;
    setOnlineStatus: (isOnline: boolean) => void;
}

const cartRepository = new CartRepository();
const notificationService = NotificationService.getInstance();

export const useSyncStore = create<SyncState>((set, get) => ({
    isOnline: true,
    isSyncing: false,
    lastSyncAt: null,

    initialize: () => {
        ConnectivityService.isConnected().then(isConnected => {
            set({ isOnline: isConnected });
        });

        ConnectivityService.subscribe(async (isOnline) => {
            const wasOffline = !get().isOnline;
            set({ isOnline });

            if (isOnline && wasOffline) {
                console.log('Conexión restaurada, sincronizando...');
                await get().syncCart();
            }
        });
    },

    syncCart: async () => {
        const { isOnline, isSyncing } = get();

        if (!isOnline || isSyncing) return;

        set({ isSyncing: true });

        try {
            const cartStore = useCartStore.getState();
            const pendingCount = cartStore.getPendingItemsCount();

            if (pendingCount > 0) {
                await cartRepository.syncPendingChanges();

                await cartStore.loadCart();

                set({
                    isSyncing: false,
                    lastSyncAt: new Date().toISOString(),
                });

                notificationService.showSyncSuccessNotification(pendingCount);

                HapticService.sync();

                console.log(`✅ ${pendingCount} items sincronizados exitosamente`);
            } else {
                set({ isSyncing: false });
            }
        } catch (error) {
            console.error('Error al sincronizar:', error);
            set({ isSyncing: false });
            HapticService.error();
        }
    },

    setOnlineStatus: (isOnline: boolean) => {
        set({ isOnline });
    },
}));
