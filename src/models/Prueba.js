import mongoose from 'mongoose';

// Sub-schema para sub-pruebas
const subPruebaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  clave: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['select', 'number', 'text', 'boolean', 'positivo_negativo'],
    default: 'positivo_negativo'
  },
  unidad: {
    type: String,
    trim: true
  },
  valoresReferencia: {
    min: Number,
    max: Number,
    texto: String,
    opciones: [{
      valor: String,
      label: String,
      esNormal: Boolean
    }]
  },
  requerido: {
    type: Boolean,
    default: true
  },
  orden: {
    type: Number,
    default: 0
  }
}, { _id: true });

// Sub-schema para campos adicionales (como grados de alcohol)
const campoAdicionalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  clave: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['number', 'text', 'select', 'date'],
    required: true
  },
  unidad: {
    type: String,
    trim: true
  },
  opciones: [{
    valor: String,
    label: String
  }],
  valorPorDefecto: mongoose.Schema.Types.Mixed,
  requerido: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  orden: {
    type: Number,
    default: 0
  }
}, { _id: true });

// Sub-schema para un periodo de precio por horario
const periodoPrecioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  horaInicio: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Formato de hora invalido, usar HH:MM']
  },
  horaFin: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Formato de hora invalido, usar HH:MM']
  },
  precio: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  }
}, { _id: false });

// Sub-schema de precios de la prueba
const preciosSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['fijo', 'por_periodo'],
    default: 'fijo'
  },
  // Usado cuando tipo === 'fijo'
  precioFijo: {
    type: Number,
    min: [0, 'El precio no puede ser negativo'],
    default: null
  },
  // Usado cuando tipo === 'por_periodo'
  periodos: [periodoPrecioSchema]
}, { _id: false });

const pruebaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la prueba es requerido'],
    trim: true,
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'El codigo de la prueba es requerido'],
    trim: true,
    unique: true,
    uppercase: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  categoria: {
    type: String,
    enum: ['toxicologia', 'hematologia', 'quimica_clinica', 'microbiologia', 'inmunologia', 'otro', 'general'],
    default: 'otro'
  },
  subPruebas: [subPruebaSchema],
  camposAdicionales: [campoAdicionalSchema],
  metodo: {
    type: String,
    trim: true
  },
  tecnica: {
    type: String,
    trim: true
  },
  tiempoResultado: {
    valor: Number,
    unidad: {
      type: String,
      enum: ['minutos', 'horas', 'dias'],
      default: 'horas'
    }
  },
  // Campo legado mantenido para compatibilidad con seed existente
  precio: {
    type: Number,
    default: 0
  },
  // Nueva estructura de precios flexible
  precios: {
    type: preciosSchema,
    default: () => ({ tipo: 'fijo', precioFijo: null, periodos: [] })
  },
  activo: {
    type: Boolean,
    default: true
  },
  plantillaReporte: {
    encabezado: String,
    footer: String,
    estilo: {
      colorPrimario: String,
      colorSecundario: String
    }
  }
}, {
  timestamps: true
});

// Indices
pruebaSchema.index({ nombre: 'text', descripcion: 'text' });
pruebaSchema.index({ codigo: 1 });
pruebaSchema.index({ categoria: 1 });

// Metodo para obtener estructura de formulario
pruebaSchema.methods.getFormStructure = function () {
  return {
    id: this._id,
    nombre: this.nombre,
    codigo: this.codigo,
    descripcion: this.descripcion,
    subPruebas: this.subPruebas.sort((a, b) => a.orden - b.orden),
    camposAdicionales: this.camposAdicionales.sort((a, b) => a.orden - b.orden)
  };
};

// Metodo para obtener el precio aplicable segun la hora dada
// Si no hay estructura de precios nueva, cae al campo legado `precio`
pruebaSchema.methods.getPrecioActual = function (fecha = new Date()) {
  const p = this.precios;

  if (!p || (p.tipo === 'fijo' && p.precioFijo === null && !this.precio)) {
    return null;
  }

  if (!p || p.tipo === 'fijo') {
    return p?.precioFijo ?? this.precio ?? null;
  }

  if (p.tipo === 'por_periodo' && p.periodos?.length > 0) {
    const hhmm = `${fecha.getHours().toString().padStart(2, '0')}:${fecha
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    for (const periodo of p.periodos) {
      const { horaInicio, horaFin } = periodo;
      if (!horaInicio || !horaFin) continue;

      // Periodo que cruza medianoche, ej: 22:00 - 06:00
      if (horaInicio > horaFin) {
        if (hhmm >= horaInicio || hhmm < horaFin) return periodo.precio;
      } else {
        if (hhmm >= horaInicio && hhmm < horaFin) return periodo.precio;
      }
    }
  }

  return null;
};

const Prueba = mongoose.model('Prueba', pruebaSchema);

export default Prueba;