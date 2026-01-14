# 🚀 INICIO RÁPIDO - 5 MINUTOS

## ⚡ Opción 1: Inicio Automático

### Windows:
1. Abre la carpeta del proyecto
2. Haz doble clic en `start.bat`
3. ¡Listo! El servidor se instalará y arrancará automáticamente

### Mac/Linux:
1. Abre la terminal en la carpeta del proyecto
2. Dale permisos al script: `chmod +x start.sh`
3. Ejecuta: `./start.sh`
4. ¡Listo!

---

## 📝 Opción 2: Inicio Manual (3 comandos)

```bash
# 1. Instalar dependencias
npm install

# 2. Poblar base de datos
npm run seed

# 3. Iniciar servidor
npm run dev
```

---

## ⚠️ IMPORTANTE: Configurar MongoDB Atlas

**Antes de ejecutar, debes configurar el acceso a tu base de datos:**

### 1. Ir a MongoDB Atlas
Ve a: https://cloud.mongodb.com

### 2. Configurar Network Access
1. Click en "Network Access" (menú izquierdo)
2. Click en "Add IP Address"
3. Click en "Allow Access from Anywhere"
4. Confirma con IP: `0.0.0.0/0`
5. Click en "Confirm"

**Nota:** Ya tienes configurado tu connection string en el archivo `.env`

---

## ✅ Verificar que Funciona

### 1. Abre tu navegador:
```
http://localhost:5000
```

Deberías ver:
```json
{
  "success": true,
  "message": "API de Sistema de Reportes Médicos",
  "version": "1.0.0"
}
```

### 2. Probar Login (con Postman o Thunder Client):
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "arturdar16@gmail.com",
  "password": "Prime175"
}
```

Deberías recibir un token.

---

## 🎯 Siguientes Pasos

1. **Ver las pruebas disponibles:**
   ```
   GET http://localhost:5000/api/pruebas
   Authorization: Bearer TU_TOKEN_AQUI
   ```

2. **Ver pacientes:**
   ```
   GET http://localhost:5000/api/pacientes
   Authorization: Bearer TU_TOKEN_AQUI
   ```

3. **Ver reportes existentes:**
   ```
   GET http://localhost:5000/api/reportes
   Authorization: Bearer TU_TOKEN_AQUI
   ```

---

## 📚 Documentación Completa

- **INSTRUCCIONES.md** - Guía detallada paso a paso
- **README.md** - Documentación completa del proyecto
- **API_EXAMPLES.md** - 40+ ejemplos de uso de todos los endpoints

---

## 🔑 Credenciales de Prueba

**Administrador (Arturo Lopez):**
- Email: `arturdar16@gmail.com`
- Password: `Prime175`
- Rol: Admin - Acceso completo al sistema
- Cédula: 000000

**Laboratorista (Linn Castillo):**
- Email: `linitomm@gmail.com`
- Password: `lin123`
- Rol: Laboratorista - Creación de reportes y gestión de pacientes
- Teléfono: 7731333631

---

## 🐛 ¿Problemas?

### Error: "Cannot connect to MongoDB"
✅ Ve a MongoDB Atlas → Network Access → Agrega tu IP (0.0.0.0/0)

### Error: "Port 5000 already in use"
✅ Edita `.env` y cambia `PORT=5000` a `PORT=5001`

### Error: "Module not found"
✅ Ejecuta: `npm install`

---

## 💡 Conectar con tu Frontend

En tu aplicación React, usa esta URL base:
```javascript
const API_URL = 'http://localhost:5000';

// Ejemplo de login
const login = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  return data.token;
};
```

---

## 🎉 ¡Listo para Usar!

Tu backend está 100% funcional con:
- ✅ 3 Pruebas de ejemplo (Antidoping, Alcoholímetro, VIH)
- ✅ 3 Pacientes de ejemplo
- ✅ 2 Reportes de ejemplo
- ✅ Sistema de autenticación completo
- ✅ API totalmente dinámica para crear nuevas pruebas

**¡Comienza a crear reportes ahora mismo!** 🚀
