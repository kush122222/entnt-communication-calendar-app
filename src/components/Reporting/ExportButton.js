import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';

const ExportButton = ({ data }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Report', 20, 10);
    doc.autoTable({
      head: [['Field1', 'Field2', 'Field3']],
      body: data.map((item) => [item.field1, item.field2, item.field3]),
    });
    doc.save('report.pdf');
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        onClick={exportToPDF}
      >
        Export to PDF
      </button>
      <CSVLink
        data={data}
        className="bg-green-500 text-white px-4 py-2 rounded"
        filename="report.csv"
      >
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default ExportButton;
