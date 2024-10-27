import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes'; 
import postRoutes from './routes/postRoutes'; 
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el directorio "uploads" que está dentro de "src"
const uploadPath = path.join(__dirname, 'uploads'); 
console.log('Upload path:', uploadPath); 
app.use('/uploads', express.static(uploadPath)); 

// Rutas
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







