import express from 'express';
import { generateRecoveryToken } from '../controllers/recoverPassController';

const router = express.Router();

// Ruta para generar el token de recuperación
router.post('/recuperar-password', generateRecoveryToken);

export default router;

