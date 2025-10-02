/**
 * Configuración de Notificaciones para iOS
 * Este archivo debe ser importado en el AppDelegate
 */

#import <UserNotifications/UserNotifications.h>

// Agregar esto al AppDelegate.h si es necesario
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
@end
