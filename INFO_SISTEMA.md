# 👥 Información de Usuarios y Configuración

## 🔐 Usuarios del Sistema

### 1. Administrador - Arturo Lopez
```
Nombre: Arturo Lopez
Email: arturdar16@gmail.com
Password: Prime175
Rol: admin
Cédula: 000000
Especialidad: Desarrollo de Software
Teléfono: 5510157876
```

**Permisos:**
- ✅ Acceso completo al sistema
- ✅ Crear, modificar y eliminar usuarios
- ✅ Crear, modificar y eliminar pruebas médicas
- ✅ Crear, modificar y autorizar reportes
- ✅ Gestionar pacientes
- ✅ Ver estadísticas completas
- ✅ Configurar sistema

### 2. Laboratorista - Linn Castillo
```
Nombre: Linn Castillo
Email: linitomm@gmail.com
Password: lin123
Rol: laboratorista
Teléfono: 7731333631
```

**Permisos:**
- ✅ Crear y modificar reportes
- ✅ Gestionar pacientes (crear, modificar, ver)
- ✅ Ver pruebas disponibles
- ✅ Buscar y consultar reportes
- ⛔ No puede crear/modificar pruebas
- ⛔ No puede autorizar reportes
- ⛔ No puede gestionar usuarios

---

## 🧪 Pruebas Médicas Predefinidas

### 1. Antidoping - Perfil de Drogas de Abuso 6
```
Código: ANTIDOPING
Categoría: Toxicología
Método: Inmunocromatografía
Técnica: RIA
Precio: $350.00
```

**Sub-pruebas incluidas:**
1. CANABINOIDES
2. COCAINA
3. ANFETAMINAS
4. METANFETAMINAS
5. MORFINA OPIACEOS
6. BENZODIAZEPINAS

**Valores de referencia:**
- NEGATIVA: < 150 ng/ml
- POSITIVA: ≥ 150 ng/ml

### 2. Alcoholímetro - Prueba de Alcohol en Aliento
```
Código: ALCOHOLIMETRO
Categoría: Toxicología
Método: Espectrofotometría
Técnica: Alcoholímetro Digital Certificado
Precio: $150.00
```

**Sub-pruebas incluidas:**
1. Grados de Alcohol

**Campos adicionales:**
- Grados de Alcohol (mg/L) - Valor numérico

**Valores de referencia:**
- NEGATIVA: ≤ 0.0 mg/L
- POSITIVA: > 0.1 mg/L

### 3. VIH - Detección de Anticuerpos
```
Código: VIH
Categoría: Inmunología
Método: ELISA
Técnica: Inmunoensayo
Precio: $500.00
```

**Sub-pruebas incluidas:**
1. Anticuerpos VIH 1/2

**Valores de referencia:**
- NO REACTIVO: Ausencia de anticuerpos
- REACTIVO: Presencia de anticuerpos

---

## 👥 Pacientes de Ejemplo

### 1. Brayam Gilberto Lopez Morales
```
Fecha de Nacimiento: 15/05/1990 (33 años)
Género: Masculino
Teléfono: 7731234567
Email: brayam@email.com
Ciudad: Atotonilco de Tula, Hidalgo
```

### 2. Uri
```
Fecha de Nacimiento: 20/08/1995 (28 años)
Género: Masculino
Teléfono: 7739876543
Ciudad: Atotonilco de Tula, Hidalgo
```

### 3. Arturo Lopez
```
Fecha de Nacimiento: 10/03/1988 (35 años)
Género: Masculino
Teléfono: 7731111111
Ciudad: Atotonilco de Tula, Hidalgo
```

---

## 📄 Reportes de Ejemplo

### Reporte 1
```
Folio: #MELITR
Paciente: Brayam Gilberto Lopez Morales
Prueba: Antidoping
Fecha: 05/01/2026
Estado: Completado
Realizado por: Linn Castillo
```

**Resultados:** Todos NEGATIVOS

### Reporte 2
```
Folio: #D0ERU6
Paciente: Brayam Gilberto Lopez Morales
Prueba: Alcoholímetro
Fecha: 28/01/2026
Estado: Completado
Realizado por: Linn Castillo
Grados de Alcohol: 0.0 mg/L
```

**Resultado:** NEGATIVO

---

## 🔒 Roles y Permisos Detallados

### Admin
- **Usuarios:** CRUD completo
- **Pacientes:** CRUD completo
- **Pruebas:** CRUD completo
- **Reportes:** CRUD completo + Autorizar
- **Estadísticas:** Ver todas

### Doctor
- **Usuarios:** Solo lectura
- **Pacientes:** CRUD completo
- **Pruebas:** CRUD completo
- **Reportes:** CRUD completo + Autorizar
- **Estadísticas:** Ver todas

### Laboratorista
- **Usuarios:** Solo lectura de su perfil
- **Pacientes:** CRUD completo
- **Pruebas:** Solo lectura
- **Reportes:** CRUD (sin autorizar)
- **Estadísticas:** Ver básicas

### Recepcionista
- **Usuarios:** Solo lectura de su perfil
- **Pacientes:** Solo lectura
- **Pruebas:** Solo lectura
- **Reportes:** Solo lectura
- **Estadísticas:** Ver básicas

---

## 🗄️ Base de Datos

### Información de Conexión
```
Host: MongoDB Atlas
Database: medical_reports
Connection String: (ver archivo .env)
```

### Colecciones Principales
1. **users** - Usuarios del sistema
2. **pacientes** - Pacientes registrados
3. **pruebas** - Pruebas médicas disponibles
4. **reportes** - Reportes generados

---

## 🚀 Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario (admin only)
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/change-password` - Cambiar contraseña

### Pacientes
- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Crear paciente
- `GET /api/pacientes/:id` - Ver paciente
- `PUT /api/pacientes/:id` - Actualizar paciente
- `DELETE /api/pacientes/:id` - Desactivar paciente

### Pruebas
- `GET /api/pruebas` - Listar pruebas
- `POST /api/pruebas` - Crear prueba (admin/doctor)
- `GET /api/pruebas/:id` - Ver prueba
- `GET /api/pruebas/:id/form-structure` - Estructura de formulario
- `PUT /api/pruebas/:id` - Actualizar prueba (admin/doctor)
- `DELETE /api/pruebas/:id` - Desactivar prueba (admin)

### Reportes
- `GET /api/reportes` - Listar reportes
- `POST /api/reportes` - Crear reporte
- `GET /api/reportes/:id` - Ver reporte
- `GET /api/reportes/folio/:folio` - Buscar por folio
- `PUT /api/reportes/:id` - Actualizar reporte
- `PUT /api/reportes/:id/autorizar` - Autorizar reporte (admin/doctor)
- `GET /api/reportes/stats` - Estadísticas

---

## 📊 Flujo de Trabajo Típico

### 1. Crear un Paciente
```
POST /api/pacientes
{
  "nombre": "Juan Pérez",
  "fechaNacimiento": "1990-01-15",
  "edad": 34,
  "genero": "masculino",
  "telefono": "7731234567"
}
```

### 2. Seleccionar Prueba
```
GET /api/pruebas
GET /api/pruebas/:id/form-structure
```

### 3. Crear Reporte
```
POST /api/reportes
{
  "pacienteId": "...",
  "pruebaId": "...",
  "resultados": [...],
  "camposAdicionales": [...]
}
```

### 4. Autorizar Reporte (Doctor/Admin)
```
PUT /api/reportes/:id/autorizar
```

### 5. Consultar Reporte
```
GET /api/reportes/folio/:folio
GET /api/reportes/paciente/:pacienteId
```

---

## 🔧 Configuración del Sistema

### Variables de Entorno (.env)
```env
MONGODB_URI=mongodb+srv://farmaciakaryme_db_user:farmacia123@databasekaryme.4k0fwnc.mongodb.net/medical_reports?retryWrites=true&w=majority&appName=DatabaseKaryme
PORT=5000
NODE_ENV=development
JWT_SECRET=medical_reports_secret_key_2024_karyme_lab_secure
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Puerto del Servidor
- **Desarrollo:** http://localhost:5000
- **Producción:** Configurar según hosting

### Tiempo de Expiración de Token
- Por defecto: 7 días
- Configurable en JWT_EXPIRES_IN

---

## 📝 Notas Importantes

1. **Seguridad:**
   - Las contraseñas están encriptadas con bcrypt
   - Los tokens JWT expiran según configuración
   - CORS configurado para dominios permitidos

2. **Base de Datos:**
   - Soft delete (no se eliminan registros, solo se desactivan)
   - Timestamps automáticos en todos los documentos
   - Índices optimizados para búsquedas

3. **Validación:**
   - Todos los campos requeridos se validan
   - Formatos de email y fechas verificados
   - Valores numéricos validados según rangos

4. **Respaldo:**
   - Datos del paciente se copian al reporte (histórico)
   - Datos de la prueba se copian al reporte (histórico)
   - Permite consultar reportes aunque se modifiquen pruebas o pacientes

---

## 🆘 Soporte y Ayuda

- **Documentación completa:** README.md
- **Ejemplos de API:** API_EXAMPLES.md
- **Instalación:** INSTRUCCIONES.md
- **Inicio rápido:** INICIO_RAPIDO.md

---

Última actualización: Enero 2026
Sistema: Medical Reports Backend v1.0.0
