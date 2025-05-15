import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  pdfUrl: string;
  description?: string;
}

interface CertificationsContextType {
  certifications: Certification[];
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  removeCertification: (id: string) => void;
  selectedCertification: Certification | null;
  setSelectedCertification: (certification: Certification | null) => void;
}

const CertificationsContext = createContext<CertificationsContextType | undefined>(undefined);

export const useCertifications = (): CertificationsContextType => {
  const context = useContext(CertificationsContext);
  if (!context) {
    throw new Error('useCertifications must be used within a CertificationsProvider');
  }
  return context;
};

interface CertificationsProviderProps {
  children: ReactNode;
}

// Sample certifications data
const sampleCertifications: Certification[] = [
  {
    id: '1',
    title: 'Certificação em Desenvolvimento Web',
    issuer: 'FreeCodeCamp',
    issueDate: '2022-05-15',
    pdfUrl: 'https://example.com/sample-cert.pdf',
    description: 'Certificação completa abrangendo HTML, CSS, JavaScript e responsive design.'
  },
  {
    id: '2',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2023-01-20',
    pdfUrl: 'https://example.com/sample-cert.pdf',
    description: 'Certificação para projetar sistemas distribuídos na AWS.'
  }
];

export const CertificationsProvider: React.FC<CertificationsProviderProps> = ({ children }) => {
  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const savedCertifications = localStorage.getItem('certifications');
    return savedCertifications ? JSON.parse(savedCertifications) : sampleCertifications;
  });
  
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  useEffect(() => {
    localStorage.setItem('certifications', JSON.stringify(certifications));
  }, [certifications]);

  const addCertification = (certification: Omit<Certification, 'id'>) => {
    const newCertification = {
      ...certification,
      id: Date.now().toString()
    };
    setCertifications(prev => [...prev, newCertification]);
  };

  const removeCertification = (id: string) => {
    setCertifications(prev => prev.filter(cert => cert.id !== id));
    if (selectedCertification?.id === id) {
      setSelectedCertification(null);
    }
  };

  return (
    <CertificationsContext.Provider value={{ 
      certifications, 
      addCertification, 
      removeCertification, 
      selectedCertification, 
      setSelectedCertification 
    }}>
      {children}
    </CertificationsContext.Provider>
  );
};