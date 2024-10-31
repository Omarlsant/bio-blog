import React, { useEffect, useState, useRef } from 'react'; // Importa useRef
import { useParams, useNavigate } from 'react-router-dom';
import { getOnePost } from '../services/services';
import ButtonIcon from '../components/ButtonIcon'; 

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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

  // Handles click out of post
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        navigate('/blog'); 
      }
    };

    // Add the click event to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleaning up the event
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div 
        className="bg-white shadow-md rounded-lg overflow-hidden max-w-md w-full p-6"
        ref={postRef} 
      >
        <h1 className="text-2xl font-bold text-green-600 mb-2">{post.name}</h1>
        <img src={post.image} alt={post.name} className="w-full h-48 object-cover mb-4" />
        <p className="text-gray-700">{post.description}</p>
        {/* Reusing ButtonIcon for Edit and Return */}
        <div className="mt-4 flex justify-between">
          <ButtonIcon
            icon="fas fa-edit"
            onClick={() => navigate(`/editar/${post.id}`)}
            title="Editar"
          />
          <ButtonIcon
            icon="fas fa-trash"
            onClick={() => navigate('/blog')}
            title="Volver"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;



