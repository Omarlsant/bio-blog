import express from 'express';
import { resetPassword } from '../controllers/resetPassController';

const router = express.Router();

// Ruta para restablecer la contraseña
router.post('/reset-password', resetPassword);

export default router;
