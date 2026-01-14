import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Paciente from '../models/Paciente.js';
import Prueba from '../models/Prueba.js';
import Reporte from '../models/Reporte.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('🗑️  Limpiando base de datos...');
    await User.deleteMany({});
    await Paciente.deleteMany({});
    await Prueba.deleteMany({});
    await Reporte.deleteMany({});

    console.log('👥 Creando usuarios...');
    const users = await User.create([
      {
        nombre: 'Dr. Eliuth Garcia Cruz',
        email: 'eliuth@lab.com',
        password: 'password123',
        rol: 'admin',
        cedula: '4362774',
        especialidad: 'Medicina General',
        telefono: '7731333631'
      },
      {
        nombre: 'Linn Castillo',
        email: 'linn@lab.com',
        password: 'password123',
        rol: 'laboratorista',
        telefono: '7731333631'
      }
    ]);

    console.log('🧪 Creando pruebas...');
    
    // Prueba de Antidoping
    const antidoping = await Prueba.create({
      nombre: 'Perfil de Drogas de Abuso 6',
      codigo: 'ANTIDOPING',
      descripcion: 'Detección de drogas de abuso en orina',
      categoria: 'toxicologia',
      metodo: 'Inmunocromatografía',
      tecnica: 'RIA',
      precio: 350,
      subPruebas: [
        {
          nombre: 'CANABINOIDES',
          clave: 'canabinoides',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 1
        },
        {
          nombre: 'COCAINA',
          clave: 'cocaina',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 2
        },
        {
          nombre: 'ANFETAMINAS',
          clave: 'anfetaminas',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 3
        },
        {
          nombre: 'METANFETAMINAS',
          clave: 'metanfetaminas',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 4
        },
        {
          nombre: 'MORFINA OPIACEOS',
          clave: 'morfina',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 5
        },
        {
          nombre: 'BENZODIAZEPINAS',
          clave: 'benzodiazepinas',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'NEG: <150 ng/ml\nPOS: ≥150 ng/ml',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 6
        }
      ]
    });

    // Prueba de Alcoholímetro
    const alcoholimetro = await Prueba.create({
      nombre: 'Prueba de Alcohol en Aliento',
      codigo: 'ALCOHOLIMETRO',
      descripcion: 'Detección de alcohol en aliento mediante alcoholímetro digital',
      categoria: 'toxicologia',
      metodo: 'Espectrofotometría',
      tecnica: 'Alcoholímetro Digital Certificado',
      precio: 150,
      subPruebas: [
        {
          nombre: 'Grados de Alcohol',
          clave: 'alcohol',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'POSITIVA: > 0.1 mg/L\nNEGATIVA: ≤ 0.0 mg/L',
            opciones: [
              { valor: 'NEGATIVA', label: 'NEGATIVA', esNormal: true },
              { valor: 'POSITIVA', label: 'POSITIVA', esNormal: false }
            ]
          },
          requerido: true,
          orden: 1
        }
      ],
      camposAdicionales: [
        {
          nombre: 'Grados de Alcohol (mg/L)',
          clave: 'gradosAlcohol',
          tipo: 'number',
          unidad: 'mg/L',
          valorPorDefecto: 0.0,
          placeholder: '0.0',
          descripcion: 'Ingresa el valor específico detectado. Valores > 0.4 mg/L se consideran positivos',
          requerido: false,
          orden: 1
        }
      ]
    });

    // Prueba de VIH
    const vih = await Prueba.create({
      nombre: 'Prueba de VIH',
      codigo: 'VIH',
      descripcion: 'Detección de anticuerpos contra VIH',
      categoria: 'inmunologia',
      metodo: 'ELISA',
      tecnica: 'Inmunoensayo',
      precio: 500,
      subPruebas: [
        {
          nombre: 'Anticuerpos VIH 1/2',
          clave: 'vih',
          tipo: 'positivo_negativo',
          valoresReferencia: {
            texto: 'REACTIVO: Presencia de anticuerpos\nNO REACTIVO: Ausencia de anticuerpos',
            opciones: [
              { valor: 'NO REACTIVO', label: 'NO REACTIVO', esNormal: true },
              { valor: 'REACTIVO', label: 'REACTIVO', esNormal: false }
            ]
          },
          requerido: true,
          orden: 1
        }
      ]
    });

    console.log('👥 Creando pacientes...');
    const pacientes = await Paciente.create([
      {
        nombre: 'Brayam Gilberto Lopez Morales',
        fechaNacimiento: new Date('1990-05-15'),
        edad: 33,
        genero: 'masculino',
        telefono: '7731234567',
        email: 'brayam@email.com',
        direccion: {
          calle: 'Av Principal 123',
          colonia: 'Centro',
          ciudad: 'Atotonilco de Tula',
          estado: 'Hidalgo',
          codigoPostal: '42980'
        }
      },
      {
        nombre: 'Uri',
        fechaNacimiento: new Date('1995-08-20'),
        edad: 28,
        genero: 'masculino',
        telefono: '7739876543',
        direccion: {
          ciudad: 'Atotonilco de Tula',
          estado: 'Hidalgo'
        }
      },
      {
        nombre: 'Arturo Lopez',
        fechaNacimiento: new Date('1988-03-10'),
        edad: 35,
        genero: 'masculino',
        telefono: '7731111111',
        direccion: {
          ciudad: 'Atotonilco de Tula',
          estado: 'Hidalgo'
        }
      }
    ]);

    console.log('📄 Creando reportes de ejemplo...');
    await Reporte.create([
      {
        folio: '#MELITR',
        paciente: pacientes[0]._id,
        datosPaciente: {
          nombre: pacientes[0].nombre,
          edad: pacientes[0].edad,
          genero: pacientes[0].genero,
          telefono: pacientes[0].telefono
        },
        prueba: antidoping._id,
        datosPrueba: {
          nombre: antidoping.nombre,
          codigo: antidoping.codigo,
          metodo: antidoping.metodo,
          tecnica: antidoping.tecnica
        },
        fechaRealizacion: new Date('2026-01-05'),
        resultados: [
          { subPruebaId: antidoping.subPruebas[0]._id, nombre: 'CANABINOIDES', clave: 'canabinoides', valor: 'NEGATIVA', esNormal: true },
          { subPruebaId: antidoping.subPruebas[1]._id, nombre: 'COCAINA', clave: 'cocaina', valor: 'NEGATIVA', esNormal: true },
          { subPruebaId: antidoping.subPruebas[2]._id, nombre: 'ANFETAMINAS', clave: 'anfetaminas', valor: 'NEGATIVA', esNormal: true },
          { subPruebaId: antidoping.subPruebas[3]._id, nombre: 'METANFETAMINAS', clave: 'metanfetaminas', valor: 'NEGATIVA', esNormal: true },
          { subPruebaId: antidoping.subPruebas[4]._id, nombre: 'MORFINA OPIACEOS', clave: 'morfina', valor: 'NEGATIVA', esNormal: true },
          { subPruebaId: antidoping.subPruebas[5]._id, nombre: 'BENZODIAZEPINAS', clave: 'benzodiazepinas', valor: 'NEGATIVA', esNormal: true }
        ],
        realizadoPor: users[1]._id,
        estado: 'completado'
      },
      {
        folio: '#D0ERU6',
        paciente: pacientes[0]._id,
        datosPaciente: {
          nombre: pacientes[0].nombre,
          edad: pacientes[0].edad,
          genero: pacientes[0].genero
        },
        prueba: alcoholimetro._id,
        datosPrueba: {
          nombre: alcoholimetro.nombre,
          codigo: alcoholimetro.codigo,
          metodo: alcoholimetro.metodo,
          tecnica: alcoholimetro.tecnica
        },
        fechaRealizacion: new Date('2026-01-28'),
        resultados: [
          { subPruebaId: alcoholimetro.subPruebas[0]._id, nombre: 'Grados de Alcohol', clave: 'alcohol', valor: 'NEGATIVA', esNormal: true }
        ],
        camposAdicionales: [
          { campoId: alcoholimetro.camposAdicionales[0]._id, nombre: 'Grados de Alcohol (mg/L)', clave: 'gradosAlcohol', valor: 0.0, unidad: 'mg/L' }
        ],
        realizadoPor: users[1]._id,
        estado: 'completado'
      }
    ]);

    console.log('✅ Base de datos poblada exitosamente!');
    console.log('\n📝 Credenciales de prueba:');
    console.log('   Admin:');
    console.log('   Email: eliuth@lab.com');
    console.log('   Password: password123');
    console.log('\n   Laboratorista:');
    console.log('   Email: linn@lab.com');
    console.log('   Password: password123');
    console.log('✅ Base de datos poblada exitosamente!');
    console.log('\n📝 Credenciales de prueba:');
    console.log('   Admin (Arturo Lopez):');
    console.log('   Email: arturdar16@gmail.com');
    console.log('   Password: Prime175');
    console.log('   Rol: Admin - Acceso completo');
    console.log('\n   Laboratorista (Linn Castillo):');
    console.log('   Email: linitomm@gmail.com');
    console.log('   Password: lin123');
    console.log('   Rol: Laboratorista - Creación de reportes');
    console.log('\n🎉 ¡Todo listo! Puedes iniciar el servidor con: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedData();
