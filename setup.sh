#!/bin/bash

# 🎯 Emtelco - Setup Script
# Script de configuración inicial del proyecto

echo "🚀 Iniciando configuración de Emtelco Pokemon Cart..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Por favor instala Node.js >= 20.x desde https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  Advertencia: Se recomienda Node.js >= 20.x"
    echo "Tu versión actual: $(node -v)"
fi

echo "✅ Node.js detectado: $(node -v)"

# Instalar dependencias de npm
echo ""
echo "📦 Instalando dependencias de npm..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias de npm"
    exit 1
fi

echo "✅ Dependencias de npm instaladas"

# Configurar iOS (solo en macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "🍎 Configurando iOS..."
    
    # Verificar CocoaPods
    if ! command -v pod &> /dev/null; then
        echo "⚠️  CocoaPods no está instalado"
        echo "Instalando CocoaPods..."
        sudo gem install cocoapods
    fi
    
    echo "📦 Instalando pods de iOS..."
    cd ios
    pod install
    cd ..
    
    if [ $? -ne 0 ]; then
        echo "❌ Error al instalar pods de iOS"
        exit 1
    fi
    
    echo "✅ Pods de iOS instalados"
else
    echo "⏭️  Saltando configuración de iOS (no estás en macOS)"
fi

# Configurar Android
echo ""
echo "🤖 Verificando configuración de Android..."

if [ -z "$ANDROID_HOME" ]; then
    echo "⚠️  ANDROID_HOME no está configurado"
    echo "Por favor configura la variable de entorno ANDROID_HOME"
    echo "Ejemplo: export ANDROID_HOME=/Users/tu-usuario/Library/Android/sdk"
else
    echo "✅ ANDROID_HOME configurado: $ANDROID_HOME"
fi

# Resumen
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ¡Configuración completada!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Para ejecutar la app:"
echo ""
echo "   iOS:     npm run ios"
echo "   Android: npm run android"
echo ""
echo "🔧 Otros comandos útiles:"
echo ""
echo "   npm start          - Iniciar Metro bundler"
echo "   npm test           - Ejecutar tests"
echo "   npm run lint       - Verificar código"
echo ""
echo "📚 Documentación completa en README.md"
echo ""
echo "🎉 ¡Happy coding!"
echo ""
