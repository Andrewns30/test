/**
 * Emtelco Pokemon Cart App
 * Aplicación de catálogo de Pokémon con carrito de compras
 * 
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { useSyncStore } from './src/presentation/stores/useSyncStore';
import { NotificationService } from './src/infrastructure/services/NotificationService';

function App() {
  const initialize = useSyncStore(state => state.initialize);

  useEffect(() => {
    // Inicializar el servicio de sincronización y conectividad
    initialize();

    // Solicitar permisos de notificaciones
    const requestNotificationPermissions = async () => {
      const notificationService = NotificationService.getInstance();
      const granted = await notificationService.requestPermissions();

      if (granted) {
        console.log('✅ Notificaciones habilitadas');
      } else {
        console.log('⚠️ Usuario rechazó permisos de notificaciones');
      }
    };

    requestNotificationPermissions();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#3498DB" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
