import { Vibration } from 'react-native';

/**
 * Servicio de Feedback Háptico
 * Proporciona retroalimentación táctil diferenciada al usuario
 */
export class HapticService {
    /**
     * Vibración corta para acciones exitosas (50ms)
     * Uso: confirmación de pago, acciones completadas
     */
    static success(): void {
        Vibration.vibrate(50);
    }

    /**
     * Vibración doble para agregar item al carrito
     * Patrón: [pausa inicial, vibra 50ms, pausa 100ms, vibra 50ms]
     * Feedback: "Se agregó algo" - ▂▂
     */
    static addToCart(): void {
        Vibration.vibrate([0, 50, 100, 50]);
    }

    /**
     * Vibración simple para eliminar item del carrito
     * Patrón: [pausa inicial, vibra 100ms]
     * Feedback: "Se eliminó algo" - ▃
     */
    static removeFromCart(): void {
        Vibration.vibrate([0, 100]);
    }

    /**
     * Vibración de error/advertencia
     * Patrón: [vibra 100ms, pausa 50ms, vibra 100ms]
     * Feedback: "Algo salió mal" - ▃ ▃
     */
    static error(): void {
        Vibration.vibrate([0, 100, 50, 100]);
    }

    /**
     * Vibración triple para sincronización exitosa
     * Patrón: [vibra 50ms, pausa 100ms, vibra 50ms, pausa 100ms, vibra 50ms]
     * Feedback: "Sincronización completa" - ▁ ▁ ▁
     */
    static sync(): void {
        Vibration.vibrate([0, 50, 100, 50, 100, 50]);
    }

    /**
     * Vibración suave para cambios de cantidad
     * Patrón: [vibra 30ms]
     * Feedback: "Cantidad actualizada" - ▁
     */
    static quantityChange(): void {
        Vibration.vibrate(30);
    }
}

/**
 * Patrones de vibración por acción:
 * 
 * - Agregar al carrito: ▂▂ (doble corta)
 * - Eliminar: ▃ (simple larga)
 * - Cambiar cantidad: ▁ (muy corta)
 * - Pago exitoso: ▁ (corta)
 * - Vaciar carrito: ▃ (simple larga)
 * - Sincronización: ▁ ▁ ▁ (triple corta)
 * - Error: ▃ ▃ (doble larga)
 */
