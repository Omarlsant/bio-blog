import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const generateRecoveryToken = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Genera un token JWT de recuperación
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
        
        // Devuelve el token para que el frontend lo use en el correo
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al generar el token de recuperación:', error);
        res.status(500).json({ message: 'Error al generar el token de recuperación.' });
    }
};

