import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            // Solicita el token de recuperación al backend
            const response = await axios.post('http://localhost:5000/api/auth/recuperar-password', {
                email,
            });
            const { token } = response.data;

            // Configura los parámetros para EmailJS
            const templateParams = {
                user_email: email,
                recovery_link: `http://localhost:5173/reset-password/${token}`,
            };

            // Envía el correo usando EmailJS
            emailjs.send(
                'service_nxdu9xm',
                'template_xg2mniu',     // Reemplaza con tu TEMPLATE ID
                templateParams,
                'QAlZWdUKRwGUt9dya'          // Reemplaza con tu USER ID
            ).then(
                () => {
                    console.log('Correo enviado con éxito:', response);
                    setMessage('Correo de recuperación enviado.');
                    setEmail('');
                },
                (error) => {
                    console.error('Error al enviar el correo:', error);
                    setError('Error al enviar el correo de recuperación.');
                }
            );
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Error al generar el token de recuperación');
            } else {
                setError('Error en la solicitud: ' + err.message);
            }
        }
    };

    return (
        <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center text-green-600">Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700" htmlFor="email">Correo Electrónico</label>
                    <input
                        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring focus:ring-green-200"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Introduce tu correo electrónico"
                        required
                    />
                </div>
                <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition" type="submit">
                    Enviar enlace de recuperación
                </button>
            </form>
            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </section>
    );
};

export default RecoverPassword;

