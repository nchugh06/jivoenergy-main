'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfThumbnailProps {
  file: string;
  width?: number;
}

const PdfThumbnail: React.FC<PdfThumbnailProps> = ({ file, width = 300 }) => {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 z-10" /> {/* Block interactions */}
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#062516]"></div>
          </div>
        }
        error={
          <div className="flex items-center justify-center h-full text-red-500 text-sm">
            Failed to load preview
          </div>
        }
        className="flex justify-center"
      >
        <Page 
          pageNumber={1} 
          width={width} 
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
};

export default PdfThumbnail;
