import { Vibration } from 'react-native';

export class HapticService {
    static success(): void {
        Vibration.vibrate(50);
    }

    static addToCart(): void {
        Vibration.vibrate([0, 50, 100, 50]);
    }

    static removeFromCart(): void {
        Vibration.vibrate([0, 100]);
    }

    static error(): void {
        Vibration.vibrate([0, 100, 50, 100]);
    }

    static sync(): void {
        Vibration.vibrate([0, 50, 100, 50, 100, 50]);
    }

    static quantityChange(): void {
        Vibration.vibrate(30);
    }
}
