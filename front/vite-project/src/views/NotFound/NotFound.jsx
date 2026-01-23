import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-600 mb-8">Página No Encontrada</h2>
            <p className="text-lg text-gray-500 mb-8 text-center">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link 
                to="/" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
                Ir a la página de inicio
            </Link>
        </div>
    );
};

export default NotFound;