import request from 'supertest';
import { app } from '../app'; 
import { db } from '../database/db';

/* describe('Post Controller', () => {
  beforeAll(async () => {
    await db.query('DELETE FROM posts'); // para limpiar la tabla de posts
  });

  afterAll(async () => {
    await db.end(); // Cierra la conexión después de las pruebas
  }); */

  //===========================
  // Prueba para crear un post
  //===========================
/*  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          name: 'Sample Post',
          kindOfPost: 'Blog',
          description: 'This is a test description',
          image: 'http://localhost:5000/uploads/sample.jpg'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Post creado con éxito');
    });

    it('should return 400 if fields are missing', async () => {
      const response = await request(app).post('/posts').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Todos los campos son obligatorios');
    });
  });  */

  //===========================
  // Prueba para obtener un post
  //===========================
  /* describe('GET /posts/:id', () => {
    it('should get a post by ID', async () => {
      await db.query('INSERT INTO posts (id, name, kindOfPost, description, image) VALUES (?, ?, ?, ?, ?)', 
        ['1', 'Sample Post', 'Blog', 'Description', 'image.jpg']
      );
      const response = await request(app).get(`/posts/1`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Sample Post');
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app).get('/posts/non-existing-id');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post no encontrado');
    });
  });
 */
  //===============================
  // Prueba para actualizar un post
  //===============================
  /* describe('PUT /posts/:id', () => {
    it('should update an existing post', async () => {
      const response = await request(app)
        .put(`/posts/1`)
        .send({
          name: 'Updated Post',
          kindOfPost: 'Article',
          description: 'Updated description',
          image: 'http://localhost:5000/uploads/updated.jpg'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Post actualizado con éxito');
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app).put('/posts/non-existing-id').send({
        name: 'Updated Post',
        kindOfPost: 'Article',
        description: 'Updated description',
      });
      
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post no encontrado');
    });
  }); */

  //===============================
  // Prueba para eliminar un post
  //===============================
  /* describe('DELETE /posts/:id', () => {
    it('should delete a post by ID', async () => {
      const response = await request(app).delete('/posts/1');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Post eliminado con éxito');
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app).delete('/posts/non-existing-id');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Post no encontrado');
    });
  }); */

  //===============================
  // Prueba para obtener todos los posts
  //===============================
/*   describe('GET /posts', () => {
    it('should get all posts', async () => {
      const response = await request(app).get('/posts');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  }); */
/* }); */