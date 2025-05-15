import React, { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';
import { useCertifications } from '../contexts/CertificationsContext';

interface CertificationFormProps {
  onSubmitSuccess: () => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({ onSubmitSuccess }) => {
  const { addCertification } = useCertifications();
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    pdfUrl: '',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!formData.issuer.trim()) {
      newErrors.issuer = 'A instituição é obrigatória';
    }
    
    if (!formData.issueDate) {
      newErrors.issueDate = 'A data de emissão é obrigatória';
    }
    
    if (!formData.pdfUrl.trim()) {
      newErrors.pdfUrl = 'O URL do PDF é obrigatório';
    } else if (!isValidUrl(formData.pdfUrl)) {
      newErrors.pdfUrl = 'Por favor, insira um URL válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addCertification(formData);
      onSubmitSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Título da Certificação*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-2 bg-white dark:bg-gray-800 border ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200`}
          placeholder="Ex: AWS Certified Solutions Architect"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Instituição Emissora*
        </label>
        <input
          type="text"
          id="issuer"
          name="issuer"
          value={formData.issuer}
          onChange={handleChange}
          className={`w-full p-2 bg-white dark:bg-gray-800 border ${
            errors.issuer ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200`}
          placeholder="Ex: Amazon Web Services"
        />
        {errors.issuer && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.issuer}</p>
        )}
      </div>

      <div>
        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Data de Emissão*
        </label>
        <div className="relative">
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className={`w-full p-2 pl-10 bg-white dark:bg-gray-800 border ${
              errors.issueDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200`}
          />
          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        {errors.issueDate && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.issueDate}</p>
        )}
      </div>

      <div>
        <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          URL do PDF*
        </label>
        <div className="relative">
          <input
            type="url"
            id="pdfUrl"
            name="pdfUrl"
            value={formData.pdfUrl}
            onChange={handleChange}
            className={`w-full p-2 pl-10 bg-white dark:bg-gray-800 border ${
              errors.pdfUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200`}
            placeholder="https://example.com/certificate.pdf"
          />
          <Upload className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        {errors.pdfUrl && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pdfUrl}</p>
        )}
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Cole o URL do arquivo PDF da sua certificação
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
          placeholder="Breve descrição sobre esta certificação e o que ela abrange..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onSubmitSuccess}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200"
        >
          Adicionar Certificação
        </button>
      </div>
    </form>
  );
};

export default CertificationForm;