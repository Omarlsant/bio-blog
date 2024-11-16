import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;
    console.log('Token recibido en el backend:', token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};
