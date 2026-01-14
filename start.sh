#!/bin/bash

echo "========================================"
echo "Sistema de Reportes Médicos - Instalación"
echo "========================================"
echo ""

echo "[1/4] Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    echo "Error al instalar dependencias"
    exit 1
fi
echo ""

echo "[2/4] Verificando MongoDB Atlas..."
echo "Asegúrate de que tu IP esté en Network Access de MongoDB Atlas"
echo ""

echo "[3/4] Poblando base de datos con datos de ejemplo..."
npm run seed
if [ $? -ne 0 ]; then
    echo "Error al poblar la base de datos"
    echo "Verifica tu conexión a MongoDB Atlas"
    exit 1
fi
echo ""

echo "[4/4] Iniciando servidor..."
echo ""
echo "========================================"
echo "El servidor está listo!"
echo "URL: http://localhost:5000"
echo ""
echo "Credenciales de prueba:"
echo "Admin - Email: eliuth@lab.com / Password: password123"
echo "Laboratorista - Email: linn@lab.com / Password: password123"
echo "========================================"
echo ""

npm run dev
