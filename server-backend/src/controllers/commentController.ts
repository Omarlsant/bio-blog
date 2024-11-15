import { Request, Response } from 'express';
import Comment from '../models/commentModel';
import { CustomRequest } from '../middleware/authMiddleware';
import { validate as isValidUUID } from 'uuid';
import User from '../models/userModel'; 

//=====================
// Crear un comentario
//=====================
export const createComment = async (req: CustomRequest, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.userId;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Creamos el comentario
    const newComment = await Comment.create({ userId, postId, content });

    // Obtenemos el comentario con la información del usuario
    const commentWithUser = await Comment.findOne({
      where: { id: newComment.id },
      include: [{ model: User, attributes: ['name'] }]
    });

    res.status(201).json(commentWithUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creando comentario', error });
  }
};
//===============================
// Obtener comentarios por postId
//===============================
export const getCommentsByPostId = async (req: CustomRequest, res: Response) => {
  try {
    const { postId } = req.params;

    if (!isValidUUID(postId)) {
      return res.status(400).json({ message: 'Post ID inválido' });
    }

    // Obtenemos los comentarios con la información del usuario
    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['name'] }],
      order: [['created_at', 'DESC']]
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios para este post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo comentarios', error });
  }
};