import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import roleRoutes from './routes/roleRoutes';
import likeRoutes from './routes/likeRoutes';
import commentRoutes from './routes/commentRoutes';
import path from 'path';

// Importamos los modelos para que se carguen y se definan las asociaciones
import User from './models/userModel';
import Post from './models/postModel';
import recoverPassRoutes from './routes/recoverPassRoutes';
import resetPassRoutes from './routes/resetPassRoutes';
import Comment from './models/commentModel';
import Like from './models/likeModel';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Llamamos a los métodos `associate` para definir las asociaciones
User.associate();
Post.associate();

// Middleware
app.use(cors());
app.use(express.json());

// Se sirven archivos estáticos desde el directorio "uploads"
const uploadPath = path.join(__dirname, 'uploads');
console.log('Upload path:', uploadPath);
app.use('/uploads', express.static(uploadPath));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/auth', recoverPassRoutes);
app.use('/api/auth', resetPassRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;








