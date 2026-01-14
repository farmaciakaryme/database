import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Importar configuración y middleware
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import pruebaRoutes from './routes/pruebaRoutes.js';
import reporteRoutes from './routes/reporteRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares de seguridad y utilidad
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/pruebas', pruebaRoutes);
app.use('/api/reportes', reporteRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Sistema de Reportes Médicos',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      pacientes: '/api/pacientes',
      pruebas: '/api/pruebas',
      reportes: '/api/reportes'
    }
  });
});

// Middleware de manejo de errores
app.use(notFound);
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 5000;

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🏥  Sistema de Reportes Médicos - API                   ║
║                                                            ║
║   🚀  Servidor corriendo en puerto ${PORT}                    ║
║   📝  Modo: ${process.env.NODE_ENV || 'development'}                        ║
║   🌍  URL: http://localhost:${PORT}                        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Manejo de promesas no capturadas
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  server.close(() => process.exit(1));
});

// Manejo de terminación
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

export default app;
