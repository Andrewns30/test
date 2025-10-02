import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSyncStore } from '../stores/useSyncStore';

/**
 * Componente de indicador de conectividad
 * Muestra el estado de conexión a internet
 */
export const ConnectivityIndicator: React.FC = () => {
    const isOnline = useSyncStore(state => state.isOnline);
    const isSyncing = useSyncStore(state => state.isSyncing);

    if (isOnline && !isSyncing) return null;

    return (
        <View style={[
            styles.container,
            !isOnline && styles.offline,
            isSyncing && styles.syncing,
        ]}>
            <Icon
                name={isSyncing ? 'sync' : 'cloud-offline'}
                size={16}
                color="#FFFFFF"
            />
            <Text style={styles.text}>
                {isSyncing ? 'Sincronizando...' : 'Sin conexión'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    offline: {
        backgroundColor: '#E74C3C',
    },
    syncing: {
        backgroundColor: '#F39C12',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
