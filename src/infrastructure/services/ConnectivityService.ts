import NetInfo from '@react-native-community/netinfo';

export class ConnectivityService {
    static async isConnected(): Promise<boolean> {
        const state = await NetInfo.fetch();
        return state.isConnected ?? false;
    }

    static subscribe(callback: (isConnected: boolean) => void): () => void {
        const unsubscribe = NetInfo.addEventListener(state => {
            callback(state.isConnected ?? false);
        });

        return unsubscribe;
    }
}
