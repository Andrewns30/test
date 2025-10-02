import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pokemon } from '../../domain/entities/Pokemon';

interface PokemonCardProps {
    pokemon: Pokemon;
    onAddToCart: (pokemon: Pokemon) => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const PokemonCard: React.FC<PokemonCardProps> = ({
    pokemon,
    onAddToCart,
}) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Text style={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</Text>
                <Text style={styles.price}>${pokemon.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onAddToCart(pokemon)}
                activeOpacity={0.7}
            >
                <Icon name="cart-outline" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH - 24,
        resizeMode: 'contain',
    },
    info: {
        marginTop: 8,
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 2,
    },
    id: {
        fontSize: 12,
        color: '#7F8C8D',
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: '700',
        color: '#27AE60',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#3498DB',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
