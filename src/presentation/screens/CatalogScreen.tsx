import React, { useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
    RefreshControl,
} from 'react-native';
import { usePokemonStore } from '../stores/usePokemonStore';
import { useCartStore } from '../stores/useCartStore';
import { PokemonCard } from '../components/PokemonCard';
import { ConnectivityIndicator } from '../components/ConnectivityIndicator';
import { Pokemon } from '../../domain/entities/Pokemon';

/**
 * Pantalla del Catálogo de Pokémon
 * Lista paginada con scroll infinito y soporte offline
 */
export const CatalogScreen: React.FC = () => {
    const pokemon = usePokemonStore(state => state.pokemon);
    const loading = usePokemonStore(state => state.loading);
    const error = usePokemonStore(state => state.error);
    const hasMore = usePokemonStore(state => state.hasMore);
    const fetchPokemon = usePokemonStore(state => state.fetchPokemon);

    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        // Inicializar datos: fetchPokemon manejará automáticamente
        // el fallback a caché si no hay internet
        fetchPokemon(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoadMore = () => {
        if (hasMore && !loading) {
            fetchPokemon();
        }
    };

    const handleRefresh = () => {
        fetchPokemon(true);
    };

    const handleAddToCart = async (selectedPokemon: Pokemon) => {
        await addToCart(selectedPokemon);
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#3498DB" />
            </View>
        );
    };

    const renderEmpty = () => {
        if (loading && pokemon.length === 0) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3498DB" />
                    <Text style={styles.loadingText}>Cargando Pokémon...</Text>
                </View>
            );
        }

        if (error && pokemon.length === 0) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>❌ {error}</Text>
                    <Text style={styles.errorHint}>
                        No hay datos en caché. Verifica tu conexión.
                    </Text>
                </View>
            );
        }

        return null;
    };

    return (
        <View style={styles.container}>
            <ConnectivityIndicator />

            <FlatList
                data={pokemon}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} onAddToCart={handleAddToCart} />
                )}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                refreshControl={
                    <RefreshControl
                        refreshing={loading && pokemon.length > 0}
                        onRefresh={handleRefresh}
                        colors={['#3498DB']}
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
    },
    listContent: {
        padding: 16,
    },
    row: {
        justifyContent: 'space-between',
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        minHeight: 400,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#7F8C8D',
    },
    errorText: {
        fontSize: 18,
        color: '#E74C3C',
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    errorHint: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
    },
});
