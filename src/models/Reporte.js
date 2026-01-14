import mongoose from 'mongoose';

// Sub-schema para resultados de sub-pruebas
const resultadoSubPruebaSchema = new mongoose.Schema({
  subPruebaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  valor: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  unidad: String,
  esNormal: Boolean,
  observaciones: String
}, { _id: false });

// Sub-schema para valores de campos adicionales
const valorCampoAdicionalSchema = new mongoose.Schema({
  campoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  valor: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  unidad: String
}, { _id: false });

const reporteSchema = new mongoose.Schema({
  folio: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: [true, 'El paciente es requerido']
  },
  // Datos del paciente al momento del reporte (por si se modifican después)
  datosPaciente: {
    nombre: String,
    edad: Number,
    genero: String,
    telefono: String
  },
  prueba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prueba',
    required: [true, 'La prueba es requerida']
  },
  // Datos de la prueba al momento del reporte
  datosPrueba: {
    nombre: String,
    codigo: String,
    metodo: String,
    tecnica: String
  },
  fechaRealizacion: {
    type: Date,
    required: true,
    default: Date.now
  },
  fechaEntrega: {
    type: Date
  },
  resultados: [resultadoSubPruebaSchema],
  camposAdicionales: [valorCampoAdicionalSchema],
  observaciones: {
    type: String,
    trim: true
  },
  interpretacion: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'completado', 'entregado', 'cancelado'],
    default: 'completado'
  },
  solicitadoPor: {
    type: String,
    default: 'A QUIEN CORRESPONDA',
    trim: true
  },
  realizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  autorizadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  firmaDigital: {
    type: String
  },
  archivoPDF: {
    type: String
  },
  etiquetas: [{
    type: String
  }],
  urgente: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
reporteSchema.index({ folio: 1 });
reporteSchema.index({ paciente: 1, fechaRealizacion: -1 });
reporteSchema.index({ prueba: 1 });
reporteSchema.index({ estado: 1 });
reporteSchema.index({ fechaRealizacion: -1 });

// Método estático para generar folio único
reporteSchema.statics.generarFolio = async function() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let folio;
  let exists = true;
  
  while (exists) {
    folio = '#';
    for (let i = 0; i < 6; i++) {
      folio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    const reporteExistente = await this.findOne({ folio });
    exists = !!reporteExistente;
  }
  
  return folio;
};

// Método para obtener resultado resumido
reporteSchema.methods.getResumen = function() {
  return {
    folio: this.folio,
    paciente: this.datosPaciente.nombre,
    prueba: this.datosPrueba.nombre,
    fecha: this.fechaRealizacion,
    estado: this.estado
  };
};

// Virtual para determinar si hay resultados anormales
reporteSchema.virtual('tieneResultadosAnormales').get(function() {
  return this.resultados.some(resultado => resultado.esNormal === false);
});

const Reporte = mongoose.model('Reporte', reporteSchema);

export default Reporte;
