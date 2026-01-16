# Colección de Ejemplos - API Reportes Médicos

# render: https://render.com/docs/web-services#port-binding

## Variables globales
```
BASE_URL =https://render.com/docs/web-services#port-binding
TOKEN = (se obtiene después del login)
```

---

## 1. AUTENTICACIÓN

### 1.1 Registrar Usuario
```http
POST {{BASE_URL}}/api/auth/register
Content-Type: application/json

{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@lab.com",
  "password": "password123",
  "rol": "laboratorista",
  "telefono": "7731234567"
}
```

### 1.2 Login
```http
POST {{BASE_URL}}/api/auth/login
Content-Type: application/json

{
  "email": "arturdar16@gmail.com",
  "password": "Prime175"
}
```

**Credenciales disponibles:**
- Admin: `arturdar16@gmail.com` / `Prime175`
- Laboratorista: `linitomm@gmail.com` / `lin123`

**Guardar el token de la respuesta para usarlo en las siguientes peticiones**

### 1.3 Obtener Perfil
```http
GET {{BASE_URL}}/api/auth/me
Authorization: Bearer {{TOKEN}}
```

### 1.4 Actualizar Perfil
```http
PUT {{BASE_URL}}/api/auth/profile
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Nombre Actualizado",
  "telefono": "7739999999"
}
```

### 1.5 Cambiar Contraseña
```http
PUT {{BASE_URL}}/api/auth/change-password
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

---

## 2. PACIENTES

### 2.1 Obtener Todos los Pacientes
```http
GET {{BASE_URL}}/api/pacientes?page=1&limit=10
Authorization: Bearer {{TOKEN}}
```

### 2.2 Buscar Pacientes
```http
GET {{BASE_URL}}/api/pacientes?search=Brayam
Authorization: Bearer {{TOKEN}}
```

### 2.3 Obtener Paciente por ID
```http
GET {{BASE_URL}}/api/pacientes/:id
Authorization: Bearer {{TOKEN}}
```

### 2.4 Crear Paciente
```http
POST {{BASE_URL}}/api/pacientes
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Ana María Rodríguez",
  "fechaNacimiento": "1992-07-20",
  "edad": 31,
  "genero": "femenino",
  "telefono": "7731234567",
  "email": "ana@email.com",
  "direccion": {
    "calle": "Av Juárez 456",
    "colonia": "Centro",
    "ciudad": "Atotonilco de Tula",
    "estado": "Hidalgo",
    "codigoPostal": "42980"
  },
  "contactoEmergencia": {
    "nombre": "Juan Rodríguez",
    "telefono": "7739876543",
    "relacion": "Esposo"
  },
  "alergias": ["Penicilina"],
  "condicionesMedicas": ["Hipertensión"],
  "medicamentos": [
    {
      "nombre": "Losartán",
      "dosis": "50mg al día"
    }
  ]
}
```

### 2.5 Actualizar Paciente
```http
PUT {{BASE_URL}}/api/pacientes/:id
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "telefono": "7731111111",
  "email": "nuevoemail@email.com"
}
```

### 2.6 Desactivar Paciente
```http
DELETE {{BASE_URL}}/api/pacientes/:id
Authorization: Bearer {{TOKEN}}
```

### 2.7 Búsqueda Rápida
```http
GET {{BASE_URL}}/api/pacientes/search/Ana
Authorization: Bearer {{TOKEN}}
```

---

## 3. PRUEBAS

### 3.1 Obtener Todas las Pruebas
```http
GET {{BASE_URL}}/api/pruebas
Authorization: Bearer {{TOKEN}}
```

### 3.2 Filtrar por Categoría
```http
GET {{BASE_URL}}/api/pruebas?categoria=toxicologia
Authorization: Bearer {{TOKEN}}
```

### 3.3 Obtener Prueba por ID
```http
GET {{BASE_URL}}/api/pruebas/:id
Authorization: Bearer {{TOKEN}}
```

### 3.4 Obtener Estructura del Formulario
```http
GET {{BASE_URL}}/api/pruebas/:id/form-structure
Authorization: Bearer {{TOKEN}}
```

### 3.5 Crear Prueba - Biometría Hemática
```http
POST {{BASE_URL}}/api/pruebas
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Biometría Hemática Completa",
  "codigo": "BH",
  "descripcion": "Conteo completo de células sanguíneas",
  "categoria": "hematologia",
  "metodo": "Citometría de flujo",
  "tecnica": "Analizador automático",
  "precio": 250,
  "tiempoResultado": {
    "valor": 2,
    "unidad": "horas"
  },
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
      "nombre": "Hematocrito",
      "clave": "hematocrito",
      "tipo": "number",
      "unidad": "%",
      "valoresReferencia": {
        "min": 36,
        "max": 46,
        "texto": "Hombres: 40-50%\nMujeres: 36-46%"
      },
      "requerido": true,
      "orden": 2
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
      "orden": 3
    },
    {
      "nombre": "Plaquetas",
      "clave": "plaquetas",
      "tipo": "number",
      "unidad": "x10³/μL",
      "valoresReferencia": {
        "min": 150,
        "max": 400,
        "texto": "150 - 400 x10³/μL"
      },
      "requerido": true,
      "orden": 4
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
      "descripcion": "¿El paciente estuvo en ayuno?",
      "requerido": false,
      "orden": 1
    },
    {
      "nombre": "Hora de toma",
      "clave": "horaToma",
      "tipo": "text",
      "placeholder": "08:00",
      "descripcion": "Hora en que se tomó la muestra",
      "orden": 2
    }
  ]
}
```

### 3.6 Crear Prueba - Química Sanguínea
```http
POST {{BASE_URL}}/api/pruebas
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Química Sanguínea 6 Elementos",
  "codigo": "QS6",
  "descripcion": "Panel básico de química sanguínea",
  "categoria": "quimica_clinica",
  "metodo": "Espectrofotometría",
  "tecnica": "Química seca",
  "precio": 300,
  "subPruebas": [
    {
      "nombre": "Glucosa",
      "clave": "glucosa",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "min": 70,
        "max": 100,
        "texto": "Ayuno: 70-100 mg/dL\nPostprandial: <140 mg/dL"
      },
      "requerido": true,
      "orden": 1
    },
    {
      "nombre": "Urea",
      "clave": "urea",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "min": 15,
        "max": 40,
        "texto": "15-40 mg/dL"
      },
      "requerido": true,
      "orden": 2
    },
    {
      "nombre": "Creatinina",
      "clave": "creatinina",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "min": 0.7,
        "max": 1.3,
        "texto": "Hombres: 0.7-1.3 mg/dL\nMujeres: 0.6-1.1 mg/dL"
      },
      "requerido": true,
      "orden": 3
    },
    {
      "nombre": "Ácido Úrico",
      "clave": "acidoUrico",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "min": 3.5,
        "max": 7.2,
        "texto": "Hombres: 3.5-7.2 mg/dL\nMujeres: 2.6-6.0 mg/dL"
      },
      "requerido": true,
      "orden": 4
    },
    {
      "nombre": "Colesterol Total",
      "clave": "colesterol",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "max": 200,
        "texto": "Deseable: <200 mg/dL\nLímite alto: 200-239 mg/dL\nAlto: ≥240 mg/dL"
      },
      "requerido": true,
      "orden": 5
    },
    {
      "nombre": "Triglicéridos",
      "clave": "trigliceridos",
      "tipo": "number",
      "unidad": "mg/dL",
      "valoresReferencia": {
        "max": 150,
        "texto": "Normal: <150 mg/dL\nLímite alto: 150-199 mg/dL\nAlto: ≥200 mg/dL"
      },
      "requerido": true,
      "orden": 6
    }
  ],
  "camposAdicionales": [
    {
      "nombre": "Horas de ayuno",
      "clave": "horasAyuno",
      "tipo": "number",
      "unidad": "horas",
      "valorPorDefecto": 8,
      "descripcion": "Número de horas en ayuno",
      "orden": 1
    }
  ]
}
```

### 3.7 Agregar Sub-prueba
```http
POST {{BASE_URL}}/api/pruebas/:id/subpruebas
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Nueva Sub-prueba",
  "clave": "nueva_subprueba",
  "tipo": "number",
  "unidad": "mg/dL",
  "valoresReferencia": {
    "min": 0,
    "max": 100,
    "texto": "0-100 mg/dL"
  },
  "orden": 7
}
```

### 3.8 Agregar Campo Adicional
```http
POST {{BASE_URL}}/api/pruebas/:id/campos-adicionales
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "nombre": "Observaciones",
  "clave": "observaciones",
  "tipo": "text",
  "placeholder": "Ingrese observaciones",
  "orden": 10
}
```

---

## 4. REPORTES

### 4.1 Obtener Todos los Reportes
```http
GET {{BASE_URL}}/api/reportes?page=1&limit=10
Authorization: Bearer {{TOKEN}}
```

### 4.2 Filtrar Reportes
```http
GET {{BASE_URL}}/api/reportes?estado=completado&fechaDesde=2026-01-01
Authorization: Bearer {{TOKEN}}
```

### 4.3 Obtener Reporte por ID
```http
GET {{BASE_URL}}/api/reportes/:id
Authorization: Bearer {{TOKEN}}
```

### 4.4 Buscar por Folio
```http
GET {{BASE_URL}}/api/reportes/folio/MELITR
Authorization: Bearer {{TOKEN}}
```

### 4.5 Crear Reporte - Antidoping
```http
POST {{BASE_URL}}/api/reportes
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "pacienteId": "REEMPLAZAR_CON_ID_PACIENTE",
  "pruebaId": "REEMPLAZAR_CON_ID_PRUEBA_ANTIDOPING",
  "fechaRealizacion": "2026-01-13",
  "resultados": [
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "CANABINOIDES",
      "clave": "canabinoides",
      "valor": "NEGATIVA",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "COCAINA",
      "clave": "cocaina",
      "valor": "NEGATIVA",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "ANFETAMINAS",
      "clave": "anfetaminas",
      "valor": "NEGATIVA",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "METANFETAMINAS",
      "clave": "metanfetaminas",
      "valor": "NEGATIVA",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "MORFINA OPIACEOS",
      "clave": "morfina",
      "valor": "NEGATIVA",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "BENZODIAZEPINAS",
      "clave": "benzodiazepinas",
      "valor": "NEGATIVA",
      "esNormal": true
    }
  ],
  "observaciones": "Prueba realizada en condiciones normales",
  "solicitadoPor": "Empresa XYZ"
}
```

### 4.6 Crear Reporte - Alcoholímetro
```http
POST {{BASE_URL}}/api/reportes
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "pacienteId": "REEMPLAZAR_CON_ID_PACIENTE",
  "pruebaId": "REEMPLAZAR_CON_ID_PRUEBA_ALCOHOLIMETRO",
  "fechaRealizacion": "2026-01-13",
  "resultados": [
    {
      "subPruebaId": "REEMPLAZAR_CON_ID_SUBPRUEBA",
      "nombre": "Grados de Alcohol",
      "clave": "alcohol",
      "valor": "NEGATIVA",
      "esNormal": true
    }
  ],
  "camposAdicionales": [
    {
      "campoId": "REEMPLAZAR_CON_ID_CAMPO",
      "nombre": "Grados de Alcohol (mg/L)",
      "clave": "gradosAlcohol",
      "valor": 0.0,
      "unidad": "mg/L"
    }
  ]
}
```

### 4.7 Crear Reporte - Biometría Hemática
```http
POST {{BASE_URL}}/api/reportes
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "pacienteId": "REEMPLAZAR_CON_ID_PACIENTE",
  "pruebaId": "REEMPLAZAR_CON_ID_PRUEBA_BH",
  "fechaRealizacion": "2026-01-13",
  "resultados": [
    {
      "subPruebaId": "REEMPLAZAR",
      "nombre": "Hemoglobina",
      "clave": "hemoglobina",
      "valor": 14.5,
      "unidad": "g/dL",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR",
      "nombre": "Hematocrito",
      "clave": "hematocrito",
      "valor": 43,
      "unidad": "%",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR",
      "nombre": "Leucocitos",
      "clave": "leucocitos",
      "valor": 7.5,
      "unidad": "x10³/μL",
      "esNormal": true
    },
    {
      "subPruebaId": "REEMPLAZAR",
      "nombre": "Plaquetas",
      "clave": "plaquetas",
      "valor": 250,
      "unidad": "x10³/μL",
      "esNormal": true
    }
  ],
  "camposAdicionales": [
    {
      "campoId": "REEMPLAZAR",
      "nombre": "Ayuno",
      "clave": "ayuno",
      "valor": "si"
    },
    {
      "campoId": "REEMPLAZAR",
      "nombre": "Hora de toma",
      "clave": "horaToma",
      "valor": "08:00"
    }
  ],
  "observaciones": "Valores dentro de parámetros normales"
}
```

### 4.8 Actualizar Reporte
```http
PUT {{BASE_URL}}/api/reportes/:id
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "estado": "entregado",
  "observaciones": "Reporte entregado al paciente",
  "fechaEntrega": "2026-01-13"
}
```

### 4.9 Autorizar Reporte
```http
PUT {{BASE_URL}}/api/reportes/:id/autorizar
Authorization: Bearer {{TOKEN}}
```

### 4.10 Obtener Reportes de un Paciente
```http
GET {{BASE_URL}}/api/reportes/paciente/:pacienteId
Authorization: Bearer {{TOKEN}}
```

### 4.11 Estadísticas
```http
GET {{BASE_URL}}/api/reportes/stats
Authorization: Bearer {{TOKEN}}
```

### 4.12 Estadísticas por Rango de Fechas
```http
GET {{BASE_URL}}/api/reportes/stats?fechaDesde=2026-01-01&fechaHasta=2026-01-31
Authorization: Bearer {{TOKEN}}
```

---

## NOTAS IMPORTANTES

1. **Reemplazar los IDs**: En los ejemplos que dicen "REEMPLAZAR_CON_ID", debes usar los IDs reales de tu base de datos que obtienes al crear o listar los recursos.

2. **Token de autenticación**: Después de hacer login, copia el token y úsalo en el header `Authorization: Bearer <TOKEN>` para todas las peticiones protegidas.

3. **Roles y permisos**:
   - `admin`: Acceso completo
   - `doctor`: Puede crear/modificar pruebas y autorizar reportes
   - `laboratorista`: Puede crear reportes y gestionar pacientes
   - `recepcionista`: Solo lectura

4. **Para Postman**: Importa estos requests y configura variables de entorno para `BASE_URL` y `TOKEN`.

5. **Para Thunder Client (VS Code)**: Crea una nueva colección y agrega estos requests.
