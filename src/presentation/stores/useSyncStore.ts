import { create } from 'zustand';
import { ConnectivityService } from '../../infrastructure/services/ConnectivityService';
import { CartRepository } from '../../data/repositories/CartRepositoryImpl';
import { NotificationService } from '../../infrastructure/services/NotificationService';
import { HapticService } from '../../infrastructure/services/HapticService';
import { useCartStore } from './useCartStore';

interface SyncState {
    // Estado
    isOnline: boolean;
    isSyncing: boolean;
    lastSyncAt: string | null;

    // Acciones
    initialize: () => void;
    syncCart: () => Promise<void>;
    setOnlineStatus: (isOnline: boolean) => void;
}

const cartRepository = new CartRepository();
const notificationService = NotificationService.getInstance();

/**
 * Store de Sincronización usando Zustand
 * Maneja el estado de conectividad y sincronización automática
 */
export const useSyncStore = create<SyncState>((set, get) => ({
    isOnline: true,
    isSyncing: false,
    lastSyncAt: null,

    initialize: () => {
        // Verificar estado inicial
        ConnectivityService.isConnected().then(isConnected => {
            set({ isOnline: isConnected });
        });

        // Suscribirse a cambios de conectividad
        ConnectivityService.subscribe(async (isOnline) => {
            const wasOffline = !get().isOnline;
            set({ isOnline });

            // Si se recupera la conexión, sincronizar automáticamente
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
            // Obtener items pendientes
            const cartStore = useCartStore.getState();
            const pendingCount = cartStore.getPendingItemsCount();

            if (pendingCount > 0) {
                // Sincronizar cambios
                await cartRepository.syncPendingChanges();

                // Recargar el carrito
                await cartStore.loadCart();

                set({
                    isSyncing: false,
                    lastSyncAt: new Date().toISOString(),
                });

                // Notificación de éxito
                notificationService.showSyncSuccessNotification(pendingCount);

                // Feedback háptico
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
