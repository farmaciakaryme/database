# 🚀 Instrucciones de Instalación y Configuración

## Pasos Rápidos para Comenzar

### 1️⃣ Descargar y Descomprimir
Descarga todos los archivos y colócalos en una carpeta llamada `medical-reports-backend`

### 2️⃣ Abrir Terminal en la Carpeta
```bash
cd medical-reports-backend
```

### 3️⃣ Instalar Dependencias
```bash
npm install
```

### 4️⃣ Configurar MongoDB Atlas

#### A. Crear cuenta en MongoDB Atlas
1. Ve a https://www.mongodb.com/cloud/atlas/register
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto (ej: "Medical Reports")

#### B. Crear un Cluster
1. Click en "Build a Database"
2. Selecciona el plan **FREE** (M0)
3. Elige la región más cercana a ti
4. Click en "Create Cluster"

#### C. Configurar Acceso
1. **Crear Usuario de Base de Datos:**
   - Ve a "Database Access" en el menú izquierdo
   - Click en "Add New Database User"
   - Username: `medicaluser` (o el que prefieras)
   - Password: Genera una contraseña segura y **guárdala**
   - Rol: `Atlas admin`
   - Click en "Add User"

2. **Configurar IP de Acceso:**
   - Ve a "Network Access" en el menú izquierdo
   - Click en "Add IP Address"
   - Click en "Allow Access from Anywhere" (para desarrollo)
   - Confirma con "0.0.0.0/0"
   - Click en "Confirm"

#### D. Obtener Connection String
1. Ve a "Database" y click en "Connect" en tu cluster
2. Selecciona "Drivers"
3. Copia el connection string, se ve así:
   ```
   mongodb+srv://medicaluser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 5️⃣ Crear Archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto con este contenido:

```env
# Reemplaza con tu connection string de MongoDB Atlas
MONGODB_URI=mongodb+srv://medicaluser:TU_PASSWORD_AQUI@cluster0.xxxxx.mongodb.net/medical_reports?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development

# Genera una clave secreta aleatoria o usa esta
JWT_SECRET=mi_clave_super_secreta_2024_cambiarla_en_produccion

JWT_EXPIRES_IN=7d

# Si tu frontend está en otro puerto, agrégalo aquí
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

**IMPORTANTE:** 
- Reemplaza `TU_PASSWORD_AQUI` con la contraseña que creaste
- Reemplaza `xxxxx` con tu cluster ID de MongoDB Atlas

### 6️⃣ Poblar la Base de Datos

Este comando creará usuarios, pacientes, pruebas y reportes de ejemplo:

```bash
npm run seed
```

Verás algo como:
```
✅ Base de datos poblada exitosamente!

📝 Credenciales de prueba:
   Admin (Arturo Lopez):
   Email: arturdar16@gmail.com
   Password: Prime175

   Laboratorista (Linn Castillo):
   Email: linitomm@gmail.com
   Password: lin123
```

### 7️⃣ Iniciar el Servidor

**Para desarrollo (con auto-reload):**
```bash
npm run dev
```

**Para producción:**
```bash
npm start
```

Deberías ver:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🏥  Sistema de Reportes Médicos - API                   ║
║                                                            ║
║   🚀  Servidor corriendo en puerto 5000                    ║
║   📝  Modo: development                                    ║
║   🌍  URL: http://localhost:5000                           ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### 8️⃣ Probar la API

#### Opción A: Desde el Navegador
Abre tu navegador y ve a: http://localhost:5000

Deberías ver:
```json
{
  "success": true,
  "message": "API de Sistema de Reportes Médicos",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "pacientes": "/api/pacientes",
    "pruebas": "/api/pruebas",
    "reportes": "/api/reportes"
  }
}
```

#### Opción B: Usando Postman
1. Descarga Postman: https://www.postman.com/downloads/
2. Importa los ejemplos del archivo `API_EXAMPLES.md`
3. Primero haz login para obtener el token

#### Opción C: Usando Thunder Client (VS Code)
1. Instala la extensión "Thunder Client" en VS Code
2. Crea una nueva request
3. Prueba el login:
   - Método: POST
   - URL: http://localhost:5000/api/auth/login
   - Body (JSON):
     ```json
     {
       "email": "arturdar16@gmail.com",
       "password": "Prime175"
     }
     ```

### 9️⃣ Obtener Token de Autenticación

1. Haz una petición POST a `/api/auth/login`:
```json
{
  "email": "arturdar16@gmail.com",
  "password": "Prime175"
}
```

2. Copia el `token` de la respuesta

3. Úsalo en todas las demás peticiones agregando este header:
```
Authorization: Bearer TU_TOKEN_AQUI
```

---

## 🎯 Primeros Pasos Recomendados

### 1. Explora las Pruebas Disponibles
```
GET http://localhost:5000/api/pruebas
Authorization: Bearer TU_TOKEN
```

### 2. Ver Pacientes
```
GET http://localhost:5000/api/pacientes
Authorization: Bearer TU_TOKEN
```

### 3. Ver Reportes Existentes
```
GET http://localhost:5000/api/reportes
Authorization: Bearer TU_TOKEN
```

### 4. Crear una Nueva Prueba
Lee el archivo `API_EXAMPLES.md` para ver ejemplos completos de cómo crear:
- Biometría Hemática
- Química Sanguínea
- Prueba de VIH
- Cualquier otra prueba personalizada

### 5. Generar un Nuevo Reporte
Usa los IDs de pacientes y pruebas existentes para crear un reporte nuevo.

---

## 📁 Estructura de Archivos

```
medical-reports-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Conexión a MongoDB
│   ├── controllers/             # Lógica de negocio
│   ├── middleware/              # Autenticación y errores
│   ├── models/                  # Esquemas de MongoDB
│   ├── routes/                  # Rutas de la API
│   ├── scripts/
│   │   └── seed.js              # Datos de ejemplo
│   └── server.js                # Servidor principal
├── .env                         # Variables de entorno (CRÉALO)
├── .env.example                 # Ejemplo de .env
├── package.json                 # Dependencias
├── README.md                    # Documentación completa
├── API_EXAMPLES.md              # Ejemplos de uso
└── INSTRUCCIONES.md             # Este archivo
```

---

## ⚠️ Solución de Problemas Comunes

### Error: "Cannot connect to MongoDB"
- ✅ Verifica que tu IP esté en Network Access
- ✅ Verifica que la contraseña en el .env sea correcta
- ✅ Asegúrate de que el cluster esté activo

### Error: "Port 5000 already in use"
- Cambia el puerto en el archivo `.env`:
  ```
  PORT=5001
  ```

### Error: "Module not found"
- Ejecuta nuevamente:
  ```bash
  npm install
  ```

### La API no responde
- Verifica que el servidor esté corriendo
- Revisa la consola por errores
- Prueba con `http://localhost:5000/health`

---

## 📞 Próximos Pasos

1. **Conectar con tu Frontend**: Usa la API URL `http://localhost:5000` en tu aplicación React
2. **Crear Pruebas Personalizadas**: Usa los endpoints de pruebas para crear las tuyas
3. **Generar Reportes**: Conecta con tu frontend para generar reportes dinámicamente
4. **Personalizar**: Modifica los modelos según tus necesidades específicas

---

## 📚 Documentación Adicional

- `README.md` - Documentación completa del proyecto
- `API_EXAMPLES.md` - Ejemplos detallados de cada endpoint
- Consulta los comentarios en el código para más detalles

---

## ✅ Checklist de Instalación

- [ ] Node.js instalado (v14 o superior)
- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster de MongoDB creado
- [ ] Usuario de base de datos creado
- [ ] IP agregada a Network Access
- [ ] Connection string copiado
- [ ] Archivo .env creado con los datos correctos
- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos poblada (`npm run seed`)
- [ ] Servidor corriendo (`npm run dev`)
- [ ] Login exitoso con credenciales de prueba
- [ ] Token obtenido y funcionando

¡Felicidades! 🎉 Tu backend está listo para usar.
