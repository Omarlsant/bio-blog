// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {
    const [username, setUsername] = useState(localStorage.getItem('name') || '');

    return (
        <>
            <Navbar username={username} />
            <Outlet context={{ setUsername }} />
            <Footer />
            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                className="toast-container"
                toastClassName="bg-gray-800 text-white font-medium rounded-lg shadow-lg p-6 text-lg"
            />
        </>
    );
};

export default Layout;


