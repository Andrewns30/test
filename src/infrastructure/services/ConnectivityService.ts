import NetInfo from '@react-native-community/netinfo';

/**
 * Servicio de Conectividad
 * Monitorea el estado de la conexión a internet
 */
export class ConnectivityService {
    /**
     * Verifica si hay conexión a internet
     */
    static async isConnected(): Promise<boolean> {
        const state = await NetInfo.fetch();
        return state.isConnected ?? false;
    }

    /**
     * Suscribe un listener a cambios de conectividad
     */
    static subscribe(callback: (isConnected: boolean) => void): () => void {
        const unsubscribe = NetInfo.addEventListener(state => {
            callback(state.isConnected ?? false);
        });

        return unsubscribe;
    }
}
