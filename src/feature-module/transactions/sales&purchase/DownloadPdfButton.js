/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PdfDocument } from './PdfViewModal';


const DownloadPdfButton = ({ data, paramId, companyDetails }) => {
  const getFileName = () => {
    let prefix = 'Details';
    if (paramId === "1") {
      prefix = 'Quotation';
    } else if (paramId === "2") {
      prefix = 'Purchase_Order';
    } else if (paramId === "3") {
      prefix = 'Purchase_Invoice';
    }else if (paramId === "4") {
      prefix = 'Sale_Invoice';
    }
    return `${prefix}_${data.VchNo || 'Details'}.pdf`;
  };
    return (
      <PDFDownloadLink
        document={<PdfDocument data={data} paramId={paramId} companyDetails={companyDetails}/>}
        fileName={getFileName()}
      >
        {({ loading }) => (
          <span className="dropdown-item" style={{ width: "100%", padding: "10px", cursor:'pointer' }}>
            {loading ? 'Preparing document...' : 'Download PDF'}
          </span>
        )}
      </PDFDownloadLink>
    );
  };

export default DownloadPdfButton;
