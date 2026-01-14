import express from 'express';
import { 
  getReportes, 
  getReporte,
  getReporteByFolio, 
  createReporte, 
  updateReporte, 
  autorizarReporte,
  deleteReporte,
  getReportesByPaciente,
  getEstadisticas
} from '../controllers/reporteController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getReportes)
  .post(createReporte);

router.get('/stats', getEstadisticas);
router.get('/folio/:folio', getReporteByFolio);
router.get('/paciente/:pacienteId', getReportesByPaciente);

router.route('/:id')
  .get(getReporte)
  .put(updateReporte)
  .delete(authorize('admin'), deleteReporte);

router.put('/:id/autorizar', authorize('admin', 'doctor'), autorizarReporte);

export default router;
