import express from 'express';
import { 
  getPacientes, 
  getPaciente, 
  createPaciente, 
  updatePaciente, 
  deletePaciente,
  searchPacientes 
} from '../controllers/pacienteController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getPacientes)
  .post(createPaciente);

router.get('/search/:query', searchPacientes);

router.route('/:id')
  .get(getPaciente)
  .put(updatePaciente)
  .delete(deletePaciente);

export default router;
