import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ChevronLeft, ChevronRight, Download, Loader2, FileWarning } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface CertificationViewerProps {
  pdfUrl: string;
}

const CertificationViewer: React.FC<CertificationViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  };

  const onDocumentLoadError = () => {
    setLoading(false);
    setError(true);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return numPages ? Math.min(Math.max(1, newPageNumber), numPages) : 1;
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Carregando documento...</p>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center py-16">
            <FileWarning className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Erro ao carregar o documento
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">
              Não foi possível carregar o PDF. Verifique se o URL está correto e tente novamente.
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors duration-200 inline-flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar PDF
            </a>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
        >
          {!loading && !error && (
            <Page 
              pageNumber={pageNumber} 
              renderAnnotationLayer={true}
              renderTextLayer={true}
              className="flex justify-center"
              scale={1.2}
            />
          )}
        </Document>
      </div>
      
      {!loading && !error && numPages && (
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-2">
            <button
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className={`p-2 rounded-full ${
                pageNumber <= 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } transition-colors duration-200`}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className={`p-2 rounded-full ${
                pageNumber >= numPages
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              } transition-colors duration-200`}
              aria-label="Próxima página"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Página <span className="font-medium">{pageNumber}</span> de{' '}
            <span className="font-medium">{numPages}</span>
          </p>
          
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center transition-colors duration-200"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificationViewer;