# 🛒 Emtelco - Pokémon [**React Native**](https://reactnative.dev) proyecto  usando [`@react-native-community/cli`](https://github.com/react-native-community/cli).



Aplicación móvil React Native de catálogo de Pokémon con carrito de compras, soporte offline completo y notificaciones nativas.# Getting Started





## 📱 Características Principales## Step 1: Start Metro



- ✅ **Catálogo de Pokémon** con scroll infinito y paginaciónFirst, you will need to run **Metro**, the JavaScript build tool for React Native.

- ✅ **Carrito de compras** con gestión de cantidades

- ✅ **Modo Offline Completo** - persistencia local con AsyncStorageTo start the Metro dev server, run the following command from the root of your React Native project:

- ✅ **Sincronización Automática** cuando se recupera la conexión

- ✅ **Notificaciones Push Locales** con @notifee/react-native```sh

- ✅ **Feedback Háptico** diferenciado por acción (vibración)# Using npm

- ✅ **Iconografía con Vector Icons** (Ionicons)npm start

- ✅ **Indicador de Conectividad** en tiempo real

# OR using Yarn

---yarn start

```

## 🚀 Instrucciones para Correr el Proyecto

## Step 2: Build and run your app

### Prerrequisitos

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

- **Node.js** >= 18.x

- **React Native CLI** instalado globalmente### Android

- **Android Studio** con SDK 33+ (para Android)

- **Xcode** 14+ (para iOS - solo macOS)```sh

- **JDK** 17+# Using npm

npm run android

### Instalación

# OR using Yarn

1. **Clonar el repositorio:**yarn android

   ```bash```

   git clone <repository-url>

   cd Emtelco### iOS

   ```

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

2. **Instalar dependencias:**

   ```bashThe first time you create a new project, run the Ruby bundler to install CocoaPods itself:

   npm install

   ``````sh

bundle install

3. **Instalar pods de iOS (solo macOS):**```

   ```bash

   cd ios && pod install && cd ..Then, and every time you update your native dependencies, run:

   ```

```sh

### Ejecuciónbundle exec pod install

```

#### Android:

```bashFor more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

npm run android

``````sh

# Using npm

#### iOS (solo macOS):npm run ios

```bash

npm run ios# OR using Yarn

```yarn ios

```

#### Modo desarrollo con Metro:

```bashIf everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

npm start

```This is one way to run your app — you can also build it directly from Android Studio or Xcode.



### Build de Producción## Step 3: Modify your app



#### Android APK:Now that you have successfully run the app, let's make changes!

```bash

cd androidOpen `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

./gradlew assembleRelease

# APK ubicado en: android/app/build/outputs/apk/release/app-release.apkWhen you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

```

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).

#### iOS (requiere cuenta de desarrollador):- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

```bash

cd ios## Congratulations! :tada:

xcodebuild -workspace Emtelco.xcworkspace -scheme Emtelco -configuration Release

```You've successfully run and modified your React Native App. :partying_face:



---### Now what?



## 🏗️ Arquitectura y Decisiones Técnicas- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).

- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

### Arquitectura Clean Architecture

# 🎯 Emtelco - Pokémon Shopping Cart

El proyecto sigue los principios de **Clean Architecture** adaptados para React Native:

Aplicación móvil de catálogo de Pokémon con carrito de compras, desarrollada con **React Native** y **TypeScript**, implementando funcionalidades offline-first y características nativas del dispositivo.

```

src/## 📋 Tabla de Contenidos

├── domain/              # Capa de dominio (entidades, casos de uso)

│   └── entities/        # Pokemon, CartItem- [Características](#-características)

├── data/                # Capa de datos (repositorios, datasources)- [Requisitos Previos](#-requisitos-previos)

│   ├── datasources/     # API, Storage- [Instalación](#-instalación)

│   └── repositories/    # Implementación de repositorios- [Ejecución](#-ejecución)

├── infrastructure/      # Servicios de infraestructura- [Arquitectura](#-arquitectura)

│   └── services/        # Conectividad, Notificaciones, Hápticos- [Decisiones Técnicas](#-decisiones-técnicas)

└── presentation/        # Capa de presentación (UI)- [Funcionalidades Nativas](#-funcionalidades-nativas)

    ├── components/      # Componentes reutilizables- [Diseño Visual](#-diseño-visual)

    ├── screens/         # Pantallas principales- [Estructura del Proyecto](#-estructura-del-proyecto)

    ├── stores/          # Estado global (Zustand)

    └── navigation/      # Navegación (React Navigation)---

```

## ✨ Características

### Decisiones Técnicas Clave

### Funcionalidades Core

#### 1. **Estado Global con Zustand**

- ✅ **Por qué:** Más ligero que Redux, API simple, sin boilerplate- ✅ **Catálogo de Pokémon**: Lista paginada desde [PokeAPI](https://pokeapi.co/)

- ✅ **Ventaja:** Menos de 1KB, excelente para apps pequeñas/medianas- ✅ **Scroll Infinito**: Carga automática de más Pokémon al hacer scroll

- ✅ **Uso:** `useCartStore`, `usePokemonStore`, `useSyncStore`- ✅ **Carrito de Compras**: Agregar, eliminar y modificar cantidades

- ✅ **Precios Simulados**: Cada Pokémon tiene un precio aleatorio ($10-$100)

#### 2. **Persistencia Offline con AsyncStorage**- ✅ **Persistencia Offline**: AsyncStorage para funcionar sin conexión

- ✅ **Por qué:** Nativo de React Native, key-value store simple- ✅ **Caché del Catálogo**: Los Pokémon cargados se guardan automáticamente

- ✅ **Implementación:** `PokemonStorageDataSource` para catálogo, `CartRepository` para carrito- ✅ **Sincronización Automática**: Se sincroniza al recuperar conexión

- ✅ **Estrategia:** Offline-first - intenta API → falla → carga desde cache

### 🔌 Modo Offline Completo

```typescript

// Ejemplo de estrategia offline-firstLa aplicación **funciona completamente offline** con las siguientes características:

async fetchPokemon(offset: number, limit: number): Promise<Pokemon[]> {

    try {1. **Caché Automático del Catálogo**

        // Intenta cargar desde API   - Cada vez que cargas Pokémon (con internet), se guardan en AsyncStorage

        const pokemons = await this.apiDataSource.fetchPokemonList(offset, limit);   - Al abrir la app sin internet, se muestran instantáneamente desde el caché

        await this.storageDataSource.savePokemonList(pokemons);   - La paginación funciona incluso sin conexión usando datos cacheados

        return pokemons;

    } catch (error) {2. **Carrito Persistente**

        // Si falla, carga desde cache local   - Todos los items del carrito se guardan localmente

        return await this.storageDataSource.getPokemonList(offset, limit);   - Sobreviven cierres de la app

    }   - Marcados con estado de sincronización (synced/pending/failed)

}

```3. **Estrategia Offline-First**

   ```

#### 3. **Sincronización Automática**   1. Intenta cargar desde API (con internet)

- ✅ **Por qué:** Mejor UX - el usuario no tiene que hacer nada   2. Si tiene éxito → Guarda en caché y muestra

- ✅ **Implementación:** `ConnectivityService` con NetInfo escucha cambios de red   3. Si falla (sin internet) → Carga desde caché

- ✅ **Flujo:**   4. Si no hay caché → Muestra mensaje apropiado

  1. Usuario agrega items sin internet → se marcan como `syncStatus: 'pending'`   ```

  2. Se recupera conexión → `useSyncStore` detecta cambio automáticamente

  3. Se sincronizan items pendientes en segundo plano### Funcionalidades Nativas

  4. Se muestra notificación + vibración de éxito

1. **📳 Vibración Háptica**

```typescript   - Feedback táctil al agregar items

// Auto-sync cuando se recupera internet   - Vibración diferente al eliminar

ConnectivityService.subscribe(async (isOnline) => {   - Vibración especial al sincronizar

    const wasOffline = !get().isOnline;

    if (isOnline && wasOffline) {2. **🔔 Notificaciones Locales**

        await get().syncCart(); // Sincronización automática   - Notificación al sincronizar exitosamente

    }   - Muestra cantidad de items sincronizados

});

```3. **🌐 Detección de Conectividad**

   - Indicador visual del estado de conexión

#### 4. **React Navigation Bottom Tabs**   - Sincronización automática al reconectarse

- ✅ **Por qué:** Patrón estándar en apps móviles, fácil navegación

- ✅ **Implementación:** 2 tabs - Catálogo y Carrito---

- ✅ **Ventaja:** Navegación intuitiva, badges dinámicos para items en carrito

## 📦 Requisitos Previos

---

- **Node.js**: >= 20.x

## 📳 Justificación de Funcionalidad Nativa Elegida- **npm** o **yarn**

- **React Native CLI**: `npm install -g react-native-cli`

### 1. **Notificaciones Push Locales (@notifee/react-native)**- **Xcode** (para iOS): >= 14.0

- **Android Studio** (para Android): >= 2023.1

#### ¿Por qué se eligió?- **JDK**: 17

- ✅ **Experiencia nativa completa:** Notificaciones reales en la barra del sistema

- ✅ **Persistencia:** El usuario puede revisar notificaciones después### Configuración de Entorno

- ✅ **Mejor que Toast:** Toast desaparece rápido, las notificaciones quedan registradas

- ✅ **Multicanal:** Soporte para diferentes canales de notificaciones (alta/baja prioridad)```bash

# Verificar versiones

#### Casos de uso en la app:node --version

1. **Agregar al carrito:** `🛒 Agregado al Carrito - Pikachu ha sido agregado (3 en carrito)`npm --version

2. **Eliminar item:** `🗑️ Eliminado del Carrito - Charizard ha sido eliminado`react-native --version

3. **Vaciar carrito:** `🗑️ Carrito Vaciado - Se eliminaron 5 items````

4. **Sincronización exitosa:** `✅ Carrito Sincronizado - Se sincronizaron 5 items exitosamente`

---

#### Implementación:

```typescript## 🚀 Instalación

// Solicitud de permisos en App.tsx

const notificationService = NotificationService.getInstance();### 1. Clonar el repositorio

await notificationService.requestPermissions();

```bash

// Mostrar notificacióngit clone <repository-url>

await notificationService.showItemAddedNotification('Pikachu', 3);cd Emtelco

``````



#### Ventaja sobre alternativas:### 2. Instalar dependencias

- **vs Toast (ToastAndroid):** Toast solo funciona en Android, desaparece en 2-3 segundos, no persiste

- **vs Alert:** Alert es bloqueante, interrumpe el flujo del usuario```bash

- **vs Notifee:** Multiplataforma, configurable, mejor UXnpm install

```

---

### 3. Instalar pods de iOS

### 2. **Feedback Háptico (React Native Vibration API)**

```bash

#### ¿Por qué se eligió?cd ios && pod install && cd ..

- ✅ **Feedback táctil inmediato:** Confirma acciones sin ver la pantalla```

- ✅ **Accesibilidad:** Útil para usuarios con dificultades visuales

- ✅ **Diferenciación:** Cada acción tiene un patrón único de vibración---

- ✅ **Nativo y ligero:** API integrada en React Native, sin dependencias externas

## ▶️ Ejecución

#### Patrones de Vibración Implementados:

### iOS

| Acción                  | Patrón              | Duración | Sensación         |

|-------------------------|---------------------|----------|-------------------|```bash

| Agregar al carrito      | `[0, 50, 100, 50]`  | 200ms    | ▂▂ (doble corta)  |npm run ios

| Cambiar cantidad (+/-)  | `30ms`              | 30ms     | ▁ (muy corta)     |# o

| Eliminar item           | `[0, 100]`          | 100ms    | ▃ (larga)         |react-native run-ios

| Pago exitoso            | `50ms`              | 50ms     | ▁ (corta)         |```

| Vaciar carrito          | `[0, 100]`          | 100ms    | ▃ (larga)         |

| Sincronización exitosa  | `[0, 50, 100, 50, 100, 50]` | 400ms | ▁▁▁ (triple) |### Android



#### Implementación:```bash

```typescriptnpm run android

export class HapticService {# o

    static addToCart(): void {react-native run-android

        Vibration.vibrate([0, 50, 100, 50]); // Doble vibración corta```

    }

    ### Modo de Desarrollo

    static removeFromCart(): void {

        Vibration.vibrate([0, 100]); // Vibración larga```bash

    }# Iniciar el bundler de Metro

}npm start

```

// Uso en el carrito

await cartRepository.saveCartItems(newItems);---

HapticService.addToCart(); // ▂▂ bzz-bzz

```## 🏗️ Arquitectura



#### Ventaja UX:Este proyecto implementa **Clean Architecture** combinada con **MVVM** para garantizar escalabilidad, mantenibilidad y testabilidad.

- **Confirmación instantánea:** El usuario sabe que la acción se completó

- **Sin mirar la pantalla:** Puedes agregar items mientras caminas### Capas de la Arquitectura

- **Diferenciación clara:** Cada acción "se siente" diferente

```

---┌─────────────────────────────────────────┐

│         PRESENTATION LAYER              │

### 3. **Vector Icons (react-native-vector-icons)**│  (UI, Components, Screens, Stores)      │

└─────────────────┬───────────────────────┘

#### ¿Por qué se eligió?                  │

- ✅ **Iconografía profesional:** Biblioteca completa de Ionicons┌─────────────────▼───────────────────────┐

- ✅ **Escalable:** Vectores SVG, no pierden calidad│          DOMAIN LAYER                   │

- ✅ **Ligero:** Fuentes embebidas, mejor rendimiento que imágenes PNG│   (Entities, Repository Interfaces)     │

- ✅ **Consistencia:** Estilo unificado en toda la app└─────────────────┬───────────────────────┘

                  │

#### Iconos Implementados:┌─────────────────▼───────────────────────┐

│           DATA LAYER                    │

| Componente              | Icono              | Uso                          |│  (Repositories, DataSources, Models)    │

|-------------------------|--------------------|------------------------------|└─────────────────┬───────────────────────┘

| PokemonCard             | `cart-outline`     | Botón "Agregar"              |                  │

| CartItemCard            | `add`              | Incrementar cantidad         |┌─────────────────▼───────────────────────┐

| CartItemCard            | `remove`           | Decrementar cantidad         |│      INFRASTRUCTURE LAYER               │

| CartItemCard            | `trash-outline`    | Eliminar item                |│  (Services, Storage, External APIs)     │

| CartScreen              | `trash-outline`    | Vaciar carrito               |└─────────────────────────────────────────┘

| CartScreen              | `card-outline`     | Proceder al pago             |```

| ConnectivityIndicator   | `cloud-offline`    | Sin internet                 |

| ConnectivityIndicator   | `sync`             | Sincronizando                |### 1. **Domain Layer** (Entidades y Contratos)

| AppNavigator (tabs)     | `list`             | Tab Catálogo                 |

| AppNavigator (tabs)     | `cart`             | Tab Carrito                  |Define las **entidades de negocio** y las **interfaces de repositorios**:



---- `Pokemon`: Entidad principal con id, nombre, imagen y precio

- `CartItem`: Item del carrito con Pokémon, cantidad y estado de sincronización

## 🎨 Diseño Visual

### Paleta de Colores

```typescript
const colors = {
  primary: '#3498DB',    // Azul principal (botones, header)
  success: '#27AE60',    // Verde (precios, confirmaciones)
  warning: '#F39C12',    // Naranja (pendiente)
  danger: '#E74C3C',     // Rojo (sin conexión, eliminar)
  text: '#2C3E50',       // Texto principal
  textSecondary: '#7F8C8D', // Texto secundario
  background: '#F5F6FA', // Fondo de pantallas
  card: '#FFFFFF',       // Fondo de tarjetas
};
```

### Principios de Diseño

1. **Minimalismo**: Interfaz limpia sin elementos innecesarios
2. **Consistencia**: Mismo estilo de botones y tarjetas
3. **Feedback Visual**: Indicadores claros de estado
4. **Accesibilidad**: Tamaños de fuente legibles, contraste adecuado
5. **Responsive**: Diseño adaptable a diferentes tamaños de pantalla

### Componentes Visuales

- **Cards elevadas**: Sombras sutiles para profundidad
- **Botones con estados**: Feedback visual al presionar
- **Badges**: Para indicar items en carrito y pendientes
- **Emojis**: Para mejorar la comunicación visual

---

## 📁 Estructura del Proyecto

```
Emtelco/
├── src/
│   ├── domain/                    # 🎯 DOMAIN LAYER
│   │   ├── entities/              # Entidades de negocio
│   │   │   ├── Pokemon.ts
│   │   │   └── CartItem.ts
│   │   └── repositories/          # Interfaces de repositorios
│   │       ├── IPokemonRepository.ts
│   │       └── ICartRepository.ts
│   │
│   ├── data/                      # 💾 DATA LAYER
│   │   ├── datasources/           # Fuentes de datos
│   │   │   ├── PokemonApiDataSource.ts
│   │   │   └── CartStorageDataSource.ts
│   │   ├── repositories/          # Implementaciones de repositorios
│   │   │   ├── PokemonRepositoryImpl.ts
│   │   │   └── CartRepositoryImpl.ts
│   │   └── models/                # Modelos de API
│   │       └── PokemonApiModel.ts
│   │
│   ├── infrastructure/            # 🔧 INFRASTRUCTURE LAYER
│   │   ├── services/              # Servicios externos
│   │   │   ├── NotificationService.ts
│   │   │   ├── HapticService.ts
│   │   │   └── ConnectivityService.ts
│   │   └── storage/               # Configuración de storage
│   │
│   └── presentation/              # 🎨 PRESENTATION LAYER
│       ├── stores/                # Estado global (Zustand)
│       │   ├── usePokemonStore.ts
│       │   ├── useCartStore.ts
│       │   └── useSyncStore.ts
│       ├── screens/               # Pantallas
│       │   ├── CatalogScreen.tsx
│       │   └── CartScreen.tsx
│       ├── components/            # Componentes reutilizables
│       │   ├── PokemonCard.tsx
│       │   ├── CartItemCard.tsx
│       │   └── ConnectivityIndicator.tsx
│       └── navigation/            # Navegación
│           └── AppNavigator.tsx
│
├── android/                       # 🤖 Configuración Android
├── ios/                           # 🍎 Configuración iOS
├── App.tsx                        # 🚀 Punto de entrada
├── package.json
└── README.md
```

---

## 🧪 Testing

### Ejecutar Tests

```bash
npm test
```

### Estrategia de Testing

- **Unit Tests**: Stores, repositorios y servicios
- **Integration Tests**: Flujos completos
- **E2E Tests**: Con Detox (opcional)

---

## 📝 Scripts Disponibles

```bash
npm start          # Iniciar Metro bundler
npm run ios        # Ejecutar en iOS
npm run android    # Ejecutar en Android
npm test           # Ejecutar tests
npm run lint       # Verificar código
```

---

## 🔮 Próximas Mejoras

- [ ] Búsqueda y filtrado de Pokémon
- [ ] Favoritos
- [ ] Autenticación biométrica
- [ ] Animaciones con Reanimated
- [ ] Tests unitarios completos
- [ ] CI/CD con GitHub Actions

---

## 👨‍💻 Autor

**Desarrollado para Emtelco**

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para evaluación técnica.

---

## 🙏 Agradecimientos

- [PokeAPI](https://pokeapi.co/) - API pública de Pokémon
- [React Native](https://reactnative.dev/) - Framework
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

**¡Gracias por revisar este proyecto! 🚀**

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
