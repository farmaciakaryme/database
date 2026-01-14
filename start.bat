@echo off
echo ========================================
echo Sistema de Reportes Medicos - Instalacion
echo ========================================
echo.

echo [1/4] Instalando dependencias...
call npm install
if errorlevel 1 (
    echo Error al instalar dependencias
    pause
    exit /b 1
)
echo.

echo [2/4] Verificando MongoDB Atlas...
echo Asegurate de que tu IP este en Network Access de MongoDB Atlas
echo.

echo [3/4] Poblando base de datos con datos de ejemplo...
call npm run seed
if errorlevel 1 (
    echo Error al poblar la base de datos
    echo Verifica tu conexion a MongoDB Atlas
    pause
    exit /b 1
)
echo.

echo [4/4] Iniciando servidor...
echo.
echo ========================================
echo El servidor esta listo!
echo URL: http://localhost:5000
echo.
echo Credenciales de prueba:
echo Admin - Email: eliuth@lab.com / Password: password123
echo Laboratorista - Email: linn@lab.com / Password: password123
echo ========================================
echo.

call npm run dev
