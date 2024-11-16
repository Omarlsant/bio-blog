import React, { Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import LoadingSpinner from '../components/LoadingSpinner';
// Lazy loading de componentes
const Home = React.lazy(() => import('../pages/Home.jsx'));
const AboutUs = React.lazy(() => import('../pages/AboutUs.jsx'));
const Blog = React.lazy(() => import('../pages/Blog.jsx'));
const GetInTouch = React.lazy(() => import('../pages/GetInTouch.jsx'));
const Register = React.lazy(() => import('../pages/Register.jsx'));
const Login = React.lazy(() => import('../pages/Login.jsx'));
const RecoverPassword = React.lazy(() => import('../pages/RecoverPassword.jsx'));
const ResetPassword = React.lazy(() => import('../pages/ResetPassword.jsx'));
const UnderConstruction = React.lazy(() => import('../pages/UnderConstruction.jsx'));
const EditPost = React.lazy(() => import('../pages/EditPost.jsx'));
const PostDetail = React.lazy(() => import('../pages/PostDetail.jsx'));
const Profile = React.lazy(() => import('../pages/Profile.jsx'));
const AdminPage = React.lazy(() => import('../pages/AdminPage.jsx'));


const userEmail = 'proyectoBioBlog@gmail.com';

// Simulación de autenticación (cámbialo por tu lógica real)
const isAuthenticated = !!localStorage.getItem('token');

// Configuración de las rutas con `Suspense`
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "nosotros",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <AboutUs />
                    </Suspense>
                ),
            },
            {
                path: "blog",
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ProtectedRoute element={<Blog />} isAuthenticated={isAuthenticated} />
                    </Suspense>
                ),
            },
            {
                path: "contacto",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <GetInTouch />
                    </Suspense>
                ),
            },
            {
                path: "registro",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "acceso",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "construccion",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <UnderConstruction />
                    </Suspense>
                ),
            },
            {
                path: "recuperar-password",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <RecoverPassword />
                    </Suspense>
                ),
            },
            {
                path: "reset-password/:token",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <ResetPassword />
                    </Suspense>
                ),
            },
            {
                path: "editar/:id",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <EditPost />
                    </Suspense>
                ),
            },
            {
                path: "post/:id",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <PostDetail />
                    </Suspense>
                ),
            },
            {
                path: "perfil",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        <Profile />
                    </Suspense>
                ),
            },
            {
                path: "admin",
                element: (
                    <Suspense fallback={<div>Cargando...</div>}>
                        {userEmail === 'proyectoBioBlog@gmail.com' ? <AdminPage /> : <Navigate to="/" />}
                    </Suspense>
                ),
            },
        ],
    },
]);