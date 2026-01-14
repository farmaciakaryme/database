# 🏥 Sistema de Reportes Médicos - Backend

Backend completo en Node.js con Express y MongoDB Atlas para sistema de generación de reportes médicos dinámicos.

## 📋 Características

- ✅ **Sistema totalmente dinámico** para crear y gestionar pruebas médicas
- ✅ **Sub-pruebas configurables** con valores de referencia personalizables
- ✅ **Campos adicionales** para información específica de cada prueba
- ✅ **Gestión completa de pacientes** con historial médico
- ✅ **Generación de reportes** con folio único
- ✅ **Autenticación JWT** con roles de usuario
- ✅ **API RESTful** completamente documentada
- ✅ **Validación de datos** con Mongoose
- ✅ **Manejo de errores** centralizado

## 🚀 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB Atlas** - Base de datos en la nube
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - Logger de peticiones HTTP

## 📦 Instalación

### 1. Clonar el repositorio o copiar los archivos

```bash
cd medical-reports-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/medical_reports?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=tu_clave_secreta_super_segura_cambiala_en_produccion

# JWT Expiration
JWT_EXPIRES_IN=7d

# CORS Origins
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### 4. Conectar a MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo cluster (puedes usar el tier gratuito)
4. Crea un usuario de base de datos
5. Configura Network Access (agrega tu IP o 0.0.0.0/0 para desarrollo)
6. Obtén tu connection string y reemplázalo en `MONGODB_URI`

### 5. Poblar la base de datos con datos de ejemplo

```bash
npm run seed
```

Este comando creará:
- 2 usuarios de prueba (admin y laboratorista)
- 3 pruebas médicas (Antidoping, Alcoholímetro, VIH)
- 3 pacientes de ejemplo
- 2 reportes de ejemplo

### 6. Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:5000`

## 📚 Estructura del Proyecto

```
medical-reports-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── controllers/
│   │   ├── authController.js    # Controlador de autenticación
│   │   ├── pacienteController.js
│   │   ├── pruebaController.js
│   │   └── reporteController.js
│   ├── middleware/
│   │   ├── auth.js              # Middleware de autenticación JWT
│   │   └── errorHandler.js      # Manejo de errores
│   ├── models/
│   │   ├── User.js              # Modelo de usuario
│   │   ├── Paciente.js          # Modelo de paciente
│   │   ├── Prueba.js            # Modelo de prueba (dinámico)
│   │   └── Reporte.js           # Modelo de reporte
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── pacienteRoutes.js
│   │   ├── pruebaRoutes.js
│   │   └── reporteRoutes.js
│   ├── scripts/
│   │   └── seed.js              # Script para poblar la BD
│   └── server.js                # Punto de entrada
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) para autenticación.

### Credenciales de prueba:

**Administrador:**
- Email: `eliuth@lab.com`
- Password: `password123`

**Laboratorista:**
- Email: `linn@lab.com`
- Password: `password123`

### Roles disponibles:
- `admin` - Acceso completo
- `doctor` - Puede crear/modificar pruebas y autorizar reportes
- `laboratorista` - Puede crear reportes y ver pacientes
- `recepcionista` - Solo lectura

## 📡 API Endpoints

### Autenticación

#### POST `/api/auth/register`
Registrar nuevo usuario
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123",
  "rol": "laboratorista",
  "cedula": "1234567",
  "telefono": "7731234567"
}
```

#### POST `/api/auth/login`
Iniciar sesión
```json
{
  "email": "eliuth@lab.com",
  "password": "password123"
}
```

Respuesta:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "nombre": "Dr. Eliuth Garcia Cruz",
    "email": "eliuth@lab.com",
    "rol": "admin"
  }
}
```

#### GET `/api/auth/me`
Obtener usuario actual (requiere token)

Headers:
```
Authorization: Bearer <token>
```

### Pacientes

#### GET `/api/pacientes`
Obtener todos los pacientes (con paginación y búsqueda)

Query params:
- `page` - Número de página (default: 1)
- `limit` - Resultados por página (default: 10)
- `search` - Búsqueda por nombre, teléfono o email
- `activo` - Filtrar por activo/inactivo (true/false/all)

#### POST `/api/pacientes`
Crear nuevo paciente
```json
{
  "nombre": "María González",
  "fechaNacimiento": "1990-05-15",
  "edad": 33,
  "genero": "femenino",
  "telefono": "7731234567",
  "email": "maria@email.com",
  "direccion": {
    "calle": "Calle Principal 123",
    "colonia": "Centro",
    "ciudad": "Atotonilco de Tula",
    "estado": "Hidalgo"
  }
}
```

#### GET `/api/pacientes/:id`
Obtener un paciente específico

#### PUT `/api/pacientes/:id`
Actualizar paciente

#### DELETE `/api/pacientes/:id`
Desactivar paciente (soft delete)

### Pruebas

#### GET `/api/pruebas`
Obtener todas las pruebas

Query params:
- `categoria` - Filtrar por categoría
- `search` - Buscar por nombre o código

#### POST `/api/pruebas`
Crear nueva prueba (requiere rol admin o doctor)
```json
{
  "nombre": "Biometría Hemática",
  "codigo": "BH",
  "descripcion": "Conteo completo de células sanguíneas",
  "categoria": "hematologia",
  "metodo": "Citometría de flujo",
  "tecnica": "Analizador automático",
  "precio": 250,
  "subPruebas": [
    {
      "nombre": "Hemoglobina",
      "clave": "hemoglobina",
      "tipo": "number",
      "unidad": "g/dL",
      "valoresReferencia": {
        "min": 12,
        "max": 16,
        "texto": "Hombres: 13-17 g/dL\nMujeres: 12-16 g/dL"
      },
      "requerido": true,
      "orden": 1
    },
    {
      "nombre": "Leucocitos",
      "clave": "leucocitos",
      "tipo": "number",
      "unidad": "x10³/μL",
      "valoresReferencia": {
        "min": 4.5,
        "max": 11.0,
        "texto": "4.5 - 11.0 x10³/μL"
      },
      "requerido": true,
      "orden": 2
    }
  ],
  "camposAdicionales": [
    {
      "nombre": "Ayuno",
      "clave": "ayuno",
      "tipo": "select",
      "opciones": [
        { "valor": "si", "label": "Sí" },
        { "valor": "no", "label": "No" }
      ],
      "valorPorDefecto": "no",
      "orden": 1
    }
  ]
}
```

#### GET `/api/pruebas/:id/form-structure`
Obtener estructura del formulario de una prueba (útil para renderizar formularios dinámicos)

#### POST `/api/pruebas/:id/subpruebas`
Agregar sub-prueba a una prueba existente

#### POST `/api/pruebas/:id/campos-adicionales`
Agregar campo adicional a una prueba

### Reportes

#### GET `/api/reportes`
Obtener todos los reportes (con filtros)

Query params:
- `page`, `limit` - Paginación
- `search` - Buscar por folio
- `estado` - Filtrar por estado
- `fechaDesde`, `fechaHasta` - Rango de fechas
- `pacienteId` - Reportes de un paciente específico
- `pruebaId` - Reportes de una prueba específica

#### POST `/api/reportes`
Crear nuevo reporte
```json
{
  "pacienteId": "64abc...",
  "pruebaId": "64def...",
  "fechaRealizacion": "2026-01-13",
  "resultados": [
    {
      "subPruebaId": "64ghi...",
      "nombre": "Hemoglobina",
      "clave": "hemoglobina",
      "valor": 14.5,
      "unidad": "g/dL",
      "esNormal": true
    }
  ],
  "camposAdicionales": [
    {
      "campoId": "64jkl...",
      "nombre": "Ayuno",
      "clave": "ayuno",
      "valor": "si"
    }
  ],
  "observaciones": "Paciente en ayuno de 8 horas",
  "solicitadoPor": "Dr. Martinez"
}
```

Respuesta incluye el folio generado automáticamente.

#### GET `/api/reportes/:id`
Obtener un reporte específico con toda la información

#### GET `/api/reportes/folio/:folio`
Buscar reporte por folio (ej: `/api/reportes/folio/MELITR`)

#### GET `/api/reportes/paciente/:pacienteId`
Obtener todos los reportes de un paciente

#### PUT `/api/reportes/:id`
Actualizar reporte

#### PUT `/api/reportes/:id/autorizar`
Autorizar reporte (requiere rol doctor o admin)

#### GET `/api/reportes/stats`
Obtener estadísticas de reportes

## 🎨 Modelo de Datos Dinámico

### Prueba
El modelo de prueba es completamente dinámico y permite:

1. **Sub-pruebas** con diferentes tipos:
   - `positivo_negativo` - Para resultados binarios
   - `number` - Para valores numéricos
   - `text` - Para texto libre
   - `select` - Para opciones predefinidas
   - `boolean` - Para sí/no

2. **Campos adicionales** para información extra:
   - Grados de alcohol en alcoholímetro
   - Condiciones de ayuno
   - Método de recolección
   - Cualquier dato adicional específico

3. **Valores de referencia personalizables**:
   - Rangos numéricos (min/max)
   - Texto descriptivo
   - Opciones con indicador de normalidad

### Ejemplo: Crear prueba de VIH

```json
{
  "nombre": "Prueba de VIH",
  "codigo": "VIH",
  "categoria": "inmunologia",
  "metodo": "ELISA",
  "tecnica": "Inmunoensayo",
  "precio": 500,
  "subPruebas": [
    {
      "nombre": "Anticuerpos VIH 1/2",
      "clave": "vih",
      "tipo": "positivo_negativo",
      "valoresReferencia": {
        "texto": "REACTIVO: Presencia de anticuerpos\nNO REACTIVO: Ausencia de anticuerpos",
        "opciones": [
          { "valor": "NO REACTIVO", "label": "NO REACTIVO", "esNormal": true },
          { "valor": "REACTIVO", "label": "REACTIVO", "esNormal": false }
        ]
      },
      "requerido": true
    }
  ]
}
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT con expiración configurable
- Validación de datos con Mongoose
- Helmet para headers de seguridad
- CORS configurado
- Rate limiting (implementar con express-rate-limit si es necesario)

## 📈 Siguientes Pasos

- [ ] Implementar generación de PDFs
- [ ] Agregar firma digital
- [ ] Sistema de notificaciones
- [ ] Dashboard con estadísticas
- [ ] Exportación de datos (Excel, CSV)
- [ ] Integración con servicios de email
- [ ] Backup automático de base de datos
- [ ] Rate limiting
- [ ] Caché con Redis

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
```
Error: Could not connect to MongoDB
```
Verifica que:
1. Tu IP esté en la lista de acceso de MongoDB Atlas
2. Las credenciales en MONGODB_URI sean correctas
3. El cluster esté activo

### Error de autenticación
```
401 Unauthorized
```
Asegúrate de:
1. Incluir el token en el header: `Authorization: Bearer <token>`
2. El token no haya expirado
3. El usuario esté activo

## 📞 Soporte

Para preguntas o problemas, por favor abre un issue en el repositorio.

## 📄 Licencia

ISC

---

Desarrollado con ❤️ para optimizar la generación de reportes médicos
