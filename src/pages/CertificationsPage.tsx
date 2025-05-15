import React, { useState } from 'react';
import { Plus, X, FileText, Download, Trash2 } from 'lucide-react';
import { useCertifications, Certification } from '../contexts/CertificationsContext';
import CertificationForm from '../components/CertificationForm';
import CertificationViewer from '../components/CertificationViewer';

const CertificationsPage: React.FC = () => {
  const { certifications, removeCertification, selectedCertification, setSelectedCertification } = useCertifications();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCertifications = certifications.filter(cert => 
    cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCertificationView = (certification: Certification) => {
    if (selectedCertification && selectedCertification.id === certification.id) {
      setSelectedCertification(null);
    } else {
      setSelectedCertification(certification);
    }
  };

  const handleDeleteCertification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja remover esta certificação?')) {
      removeCertification(id);
    }
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Minhas Certificações</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Documentos e certificados profissionais obtidos ao longo da carreira
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Certificação
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquisar certificações..."
            className="w-full p-3 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className={`${selectedCertification ? 'w-full md:w-1/2 lg:w-2/5' : 'w-full'} transition-all duration-300`}>
          {filteredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredCertifications.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => toggleCertificationView(cert)}
                  className={`
                    p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 
                    ${selectedCertification?.id === cert.id 
                      ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400' 
                      : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'} 
                    cursor-pointer transition-all duration-200
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-600 dark:text-blue-400 mr-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {cert.issuer} • {new Date(cert.issueDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteCertification(cert.id, e)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      aria-label="Remover certificação"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {cert.description && (
                    <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                      {cert.description}
                    </p>
                  )}
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Clique para {selectedCertification?.id === cert.id ? 'fechar' : 'visualizar'}
                    </span>
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center transition-colors duration-200"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Nenhuma certificação encontrada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm 
                  ? 'Nenhuma certificação corresponde aos termos da pesquisa.' 
                  : 'Você ainda não adicionou nenhuma certificação ao seu portfólio.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Primeira Certificação
                </button>
              )}
            </div>
          )}
        </div>

        {selectedCertification && (
          <div className="w-full md:w-1/2 lg:w-3/5 animate-fadeIn">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visualizando Certificação</h3>
                <button
                  onClick={() => setSelectedCertification(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Fechar visualização"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CertificationViewer pdfUrl={selectedCertification.pdfUrl} />
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Adicionar Nova Certificação
                </h3>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Fechar formulário"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CertificationForm onSubmitSuccess={closeForm} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;