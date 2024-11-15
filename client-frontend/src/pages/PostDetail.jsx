import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePost } from '../services/services';
import { getComments } from '../services/commentServices';
import ButtonIcon from '../components/ButtonIcon';
import CommentForm from '../components/CommentForm';
import useStore from '../store/store';

const PostDetail = () => {
  const { id } = useParams();
  const { token, role } = useStore();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const postRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getOnePost(id);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!id) {
      console.error("Post ID no disponible");
      return;
    }

    const fetchComments = async () => {
      try {
        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Error obteniendo comentarios:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentAdded = () => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Error obteniendo comentarios:', error);
      }
    };

    fetchComments();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-10 h-full"
        ref={postRef}
      >
        <h1 className="text-4xl font-bold text-green-600 mb-6">{post.name}</h1>
        <img src={post.image} alt={post.name} className="w-full h-96 object-cover mb-6" />
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.description}</p>
        <p className="text-sm text-gray-500 mb-4">Publicado por: {post.User?.name || 'Usuario desconocido'}</p>

        <div className="mt-6 flex justify-between items-center">
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-edit"
              onClick={() => navigate(`/editar/${post.id}`)}
              title="Editar"
            />
          )}
          {role === 'admin' && token && (
            <ButtonIcon
              icon="fas fa-trash"
              onClick={() => handleDelete(post.id)}
              title="Eliminar"
            />
          )}
        </div>

        {/* Sección de Comentarios */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Comentarios</h2>

          <div className="mt-4 space-y-4">
            {comments.length === 0 && <p>No hay comentarios aún.</p>}
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border-b border-gray-200">
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-sm text-gray-500">Comentado por: {comment.User?.name || 'Usuario desconocido'}</p>
              </div>
            ))}
          </div>

          {token && (
            <CommentForm
              postId={id}
              token={token}
              onCommentAdded={handleCommentAdded}
            />
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/blog')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;





