import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams(); 
    console.log('Token capturado:', token);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
                token,
                password,
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Error al restablecer la contraseña.');
            } else {
                setError('Error en la solicitud: ' + err.message);
            }
        }
    };

    return (
        <section className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center text-green-600">Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-700" htmlFor="password">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce tu nueva contraseña"
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700" htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma tu nueva contraseña"
                        required
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition" type="submit">
                    Restablecer Contraseña
                </button>
            </form>
            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </section>
    );
};

export default ResetPassword;
