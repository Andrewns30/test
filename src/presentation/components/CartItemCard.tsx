import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartItem } from '../../domain/entities/CartItem';
import { useSyncStore } from '../stores/useSyncStore';

interface CartItemCardProps {
    item: CartItem;
    onRemove: (pokemonId: number) => void;
    onUpdateQuantity: (pokemonId: number, quantity: number) => void;
}

/**
 * Componente de item del carrito
 * Muestra un item del carrito con controles de cantidad
 */
export const CartItemCard: React.FC<CartItemCardProps> = ({
    item,
    onRemove,
    onUpdateQuantity,
}) => {
    const isOnline = useSyncStore(state => state.isOnline);
    const subtotal = item.pokemon.price * item.quantity;

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: item.pokemon.imageUrl }}
                style={styles.image}
            />
            <View style={styles.info}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.pokemon.name}</Text>
                    {item.syncStatus === 'pending' && !isOnline && (
                        <View style={styles.pendingBadge}>
                            <Text style={styles.pendingText}>⏳</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.price}>${item.pokemon.price} c/u</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.pokemon.id, item.quantity - 1)}
                    >
                        <Icon name="remove" size={18} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => onUpdateQuantity(item.pokemon.id, item.quantity + 1)}
                    >
                        <Icon name="add" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtotal}>Subtotal: ${subtotal}</Text>
            </View>

            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item.pokemon.id)}
            >
                <Icon name="trash-outline" size={24} color="#E74C3C" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
    },
    pendingBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    pendingText: {
        fontSize: 12,
    },
    price: {
        fontSize: 14,
        color: '#7F8C8D',
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 16,
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        minWidth: 30,
        textAlign: 'center',
    },
    subtotal: {
        fontSize: 16,
        fontWeight: '700',
        color: '#27AE60',
        marginTop: 4,
    },
    removeButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
