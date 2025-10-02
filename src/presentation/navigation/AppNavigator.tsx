import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CatalogScreen } from '../screens/CatalogScreen';
import { CartScreen } from '../screens/CartScreen';
import { useCartStore } from '../stores/useCartStore';

export type RootTabParamList = {
    Catalog: undefined;
    Cart: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const CatalogIcon = ({ color, size }: { color: string; size: number }) => (
    <Icon name="list" size={size} color={color} />
);

const CartIcon = ({ color, size }: { color: string; size: number }) => (
    <Icon name="cart" size={size} color={color} />
);

export const AppNavigator: React.FC = () => {
    const getTotalItems = useCartStore(state => state.getTotalItems);
    const totalItems = getTotalItems();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#3498DB',
                tabBarInactiveTintColor: '#7F8C8D',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E8E8E8',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerStyle: {
                    backgroundColor: '#3498DB',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 20,
                },
            }}
        >
            <Tab.Screen
                name="Catalog"
                component={CatalogScreen}
                options={{
                    title: 'Catálogo',
                    tabBarLabel: 'Catálogo',
                    tabBarIcon: CatalogIcon,
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: 'Carrito',
                    tabBarLabel: 'Carrito',
                    tabBarBadge: totalItems > 0 ? totalItems : undefined,
                    tabBarIcon: CartIcon,
                }}
            />
        </Tab.Navigator>
    );
};
