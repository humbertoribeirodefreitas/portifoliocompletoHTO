import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      <div className="absolute bg-blue-600 px-2 py-1 text-sm rounded rotate-12 text-white">
        Página não encontrada
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Você se perdeu.
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md transition-colors duration-200 inline-flex items-center"
        >
          <Home className="w-5 h-5 mr-2" />
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;