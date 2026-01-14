import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true
  },
  fechaNacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es requerida']
  },
  genero: {
    type: String,
    enum: ['masculino', 'femenino', 'otro'],
    required: [true, 'El género es requerido']
  },
  telefono: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email no válido']
  },
  direccion: {
    calle: String,
    colonia: String,
    ciudad: String,
    estado: String,
    codigoPostal: String
  },
  contactoEmergencia: {
    nombre: String,
    telefono: String,
    relacion: String
  },
  alergias: [{
    type: String
  }],
  condicionesMedicas: [{
    type: String
  }],
  medicamentos: [{
    nombre: String,
    dosis: String
  }],
  notas: {
    type: String
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índices para búsquedas eficientes
pacienteSchema.index({ nombre: 'text' });
pacienteSchema.index({ telefono: 1 });
pacienteSchema.index({ email: 1 });

// Virtual para calcular edad automáticamente
pacienteSchema.virtual('edadCalculada').get(function() {
  const hoy = new Date();
  const nacimiento = new Date(this.fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;
