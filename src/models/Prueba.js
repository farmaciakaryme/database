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

const pruebaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la prueba es requerido'],
    trim: true,
    unique: true
  },
  codigo: {
    type: String,
    required: [true, 'El código de la prueba es requerido'],
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
    enum: ['toxicologia', 'hematologia', 'quimica_clinica', 'microbiologia', 'inmunologia', 'otro'],
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
  precio: {
    type: Number,
    default: 0
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

// Índices
pruebaSchema.index({ nombre: 'text', descripcion: 'text' });
pruebaSchema.index({ codigo: 1 });
pruebaSchema.index({ categoria: 1 });

// Método para obtener estructura de formulario
pruebaSchema.methods.getFormStructure = function() {
  return {
    id: this._id,
    nombre: this.nombre,
    codigo: this.codigo,
    descripcion: this.descripcion,
    subPruebas: this.subPruebas.sort((a, b) => a.orden - b.orden),
    camposAdicionales: this.camposAdicionales.sort((a, b) => a.orden - b.orden)
  };
};

const Prueba = mongoose.model('Prueba', pruebaSchema);

export default Prueba;
