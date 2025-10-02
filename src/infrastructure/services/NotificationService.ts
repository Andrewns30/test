import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';

export class NotificationService {
    private static instance: NotificationService;
    private channelId = 'emtelco-channel';

    private constructor() {
        this.createChannel();
    }

    static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    private async createChannel(): Promise<void> {
        await notifee.createChannel({
            id: this.channelId,
            name: 'Emtelco Notifications',
            importance: AndroidImportance.HIGH,
            vibration: true,
            vibrationPattern: [300, 500],
        });
    }

    async requestPermissions(): Promise<boolean> {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                        {
                            title: 'Permiso de Notificaciones',
                            message: 'Emtelco necesita enviarte notificaciones sobre tu carrito de compras',
                            buttonNeutral: 'Preguntar después',
                            buttonNegative: 'Cancelar',
                            buttonPositive: 'Aceptar',
                        }
                    );

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('✅ Permiso de notificaciones concedido');
                        return true;
                    } else {
                        console.log('❌ Permiso de notificaciones denegado');
                        return false;
                    }
                } catch (err) {
                    console.warn('Error solicitando permisos:', err);
                    return false;
                }
            }
            return true;
        }

        const settings = await notifee.requestPermission();
        return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
    }

    async showSyncSuccessNotification(itemCount: number): Promise<void> {
        await notifee.displayNotification({
            title: '✅ Carrito Sincronizado',
            body: `Se sincronizaron ${itemCount} ${itemCount === 1 ? 'item' : 'items'} exitosamente`,
            android: {
                channelId: this.channelId,
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default',
                },
                vibrationPattern: [300, 500],
            },
            ios: {
                sound: 'default',
            },
        });
    }

    async showItemAddedNotification(pokemonName: string, quantity?: number): Promise<void> {
        const body = quantity && quantity > 1
            ? `${pokemonName} agregado (${quantity} en carrito)`
            : `${pokemonName} ha sido agregado al carrito`;

        await notifee.displayNotification({
            title: '🛒 Agregado al Carrito',
            body,
            android: {
                channelId: this.channelId,
                importance: AndroidImportance.DEFAULT,
                pressAction: {
                    id: 'default',
                },
                smallIcon: 'ic_launcher',
            },
        });
    }

    async showItemRemovedNotification(pokemonName: string): Promise<void> {
        await notifee.displayNotification({
            title: '🗑️ Eliminado del Carrito',
            body: `${pokemonName} ha sido eliminado del carrito`,
            android: {
                channelId: this.channelId,
                importance: AndroidImportance.DEFAULT,
                pressAction: {
                    id: 'default',
                },
                smallIcon: 'ic_launcher',
            },
        });
    }

    async showCartClearedNotification(itemCount: number): Promise<void> {
        const body = itemCount === 1
            ? 'Se eliminó 1 item del carrito'
            : `Se eliminaron ${itemCount} items del carrito`;

        await notifee.displayNotification({
            title: '🗑️ Carrito Vaciado',
            body,
            android: {
                channelId: this.channelId,
                importance: AndroidImportance.DEFAULT,
                pressAction: {
                    id: 'default',
                },
                smallIcon: 'ic_launcher',
            },
        });
    }

    async showPendingSyncNotification(itemCount: number): Promise<void> {
        await notifee.displayNotification({
            title: '🔄 Sincronización Pendiente',
            body: `Tienes ${itemCount} ${itemCount === 1 ? 'cambio pendiente' : 'cambios pendientes'} de sincronizar`,
            android: {
                channelId: this.channelId,
                importance: AndroidImportance.DEFAULT,
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    async cancelAllNotifications(): Promise<void> {
        await notifee.cancelAllNotifications();
    }
}
