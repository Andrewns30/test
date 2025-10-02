import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCartStore } from '../stores/useCartStore';
import { useSyncStore } from '../stores/useSyncStore';
import { CartItemCard } from '../components/CartItemCard';
import { ConnectivityIndicator } from '../components/ConnectivityIndicator';
import { HapticService } from '../../infrastructure/services/HapticService';

export const CartScreen: React.FC = () => {
    const items = useCartStore(state => state.items);
    const loading = useCartStore(state => state.loading);
    const loadCart = useCartStore(state => state.loadCart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const clearCart = useCartStore(state => state.clearCart);
    const getTotalItems = useCartStore(state => state.getTotalItems);
    const getTotalPrice = useCartStore(state => state.getTotalPrice);
    const getPendingItemsCount = useCartStore(state => state.getPendingItemsCount);

    const isOnline = useSyncStore(state => state.isOnline);

    useEffect(() => {
        loadCart();
    }, []);

    const handleClearCart = async () => {
        await clearCart();
    };

    const handleCheckout = () => {
        HapticService.success();

        const totalItemsCount = totalItems;
        const totalPriceAmount = totalPrice;

        Alert.alert(
            '✅ Pago Exitoso',
            `¡Felicidades! Has comprado ${totalItemsCount} Pokémon${totalItemsCount > 1 ? 's' : ''} por un total de $${totalPriceAmount}`,
            [
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        await clearCart();
                    },
                },
            ]
        );
    };

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const pendingCount = getPendingItemsCount();

    const renderEmpty = () => {
        if (loading) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3498DB" />
                </View>
            );
        }

        return (
            <View style={styles.centerContainer}>
                <Text style={styles.emptyIcon}>🛒</Text>
                <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                <Text style={styles.emptyHint}>
                    Explora el catálogo y agrega tus Pokémon favoritos
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ConnectivityIndicator />

            {items.length > 0 && (
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </Text>
                        {pendingCount > 0 && !isOnline && (
                            <View style={styles.pendingBadge}>
                                <Text style={styles.pendingText}>
                                    {pendingCount} pendiente{pendingCount > 1 ? 's' : ''}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            )}

            <FlatList
                data={items}
                keyExtractor={item => item.pokemon.id.toString()}
                renderItem={({ item }) => (
                    <CartItemCard
                        item={item}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                    />
                )}
                contentContainerStyle={[
                    styles.listContent,
                    items.length === 0 && styles.listContentEmpty,
                ]}
                ListEmptyComponent={renderEmpty}
            />

            {items.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalPrice}>${totalPrice}</Text>
                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClearCart}
                        >
                            <Icon name="trash-outline" size={20} color="#E74C3C" />
                            <Text style={styles.clearButtonText}>Vaciar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                        >
                            <Icon name="card-outline" size={20} color="#FFFFFF" />
                            <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    header: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
    },
    pendingBadge: {
        backgroundColor: '#F39C12',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pendingText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
    },
    listContentEmpty: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 400,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    emptyHint: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: '#27AE60',
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    clearButton: {
        flex: 1,
        backgroundColor: '#FFE8E8',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    clearButtonText: {
        color: '#E74C3C',
        fontSize: 16,
        fontWeight: '600',
    },
    checkoutButton: {
        flex: 2,
        backgroundColor: '#27AE60',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
