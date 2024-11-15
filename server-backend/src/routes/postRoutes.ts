import express from 'express';
import { getPosts, createPost, deletePost, getPostById, updatePost } from '../controllers/postController';
import { upload } from '../middleware/multer';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Rutas
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, upload.single('image'), createPost);
router.put('/:id', authMiddleware, upload.single('image'), updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;




