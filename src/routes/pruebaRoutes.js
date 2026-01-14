import express from 'express';
import { 
  getPruebas, 
  getPrueba, 
  getFormStructure,
  createPrueba, 
  updatePrueba, 
  deletePrueba,
  addSubPrueba,
  updateSubPrueba,
  deleteSubPrueba,
  addCampoAdicional,
  updateCampoAdicional,
  deleteCampoAdicional
} from '../controllers/pruebaController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getPruebas)
  .post(authorize('admin', 'doctor'), createPrueba);

router.route('/:id')
  .get(getPrueba)
  .put(authorize('admin', 'doctor'), updatePrueba)
  .delete(authorize('admin'), deletePrueba);

router.get('/:id/form-structure', getFormStructure);

// Rutas para sub-pruebas
router.route('/:id/subpruebas')
  .post(authorize('admin', 'doctor'), addSubPrueba);

router.route('/:id/subpruebas/:subPruebaId')
  .put(authorize('admin', 'doctor'), updateSubPrueba)
  .delete(authorize('admin'), deleteSubPrueba);

// Rutas para campos adicionales
router.route('/:id/campos-adicionales')
  .post(authorize('admin', 'doctor'), addCampoAdicional);

router.route('/:id/campos-adicionales/:campoId')
  .put(authorize('admin', 'doctor'), updateCampoAdicional)
  .delete(authorize('admin'), deleteCampoAdicional);

export default router;
