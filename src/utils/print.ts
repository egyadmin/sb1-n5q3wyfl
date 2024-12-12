export const printReport = (title: string, data: any[], columns: string[]) => {
  // Store current title
  const originalTitle = document.title;
  
  // Update page title for printing
  document.title = title;

  // Add print-specific styles
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      @page {
        size: A4;
        margin: 2cm;
      }
      
      body {
        font-family: 'Noto Sans Arabic', Arial, sans-serif;
        color: #000;
        background: #fff;
      }
      
      .no-print {
        display: none !important;
      }
      
      .print-only {
        display: block !important;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        page-break-inside: auto;
      }
      
      tr {
        page-break-inside: avoid;
        page-break-after: auto;
      }
      
      th, td {
        padding: 8px;
        text-align: right;
        border: 1px solid #ddd;
      }
      
      thead {
        display: table-header-group;
      }
      
      tfoot {
        display: table-footer-group;
      }
    }
  `;
  document.head.appendChild(style);

  // Print
  window.print();

  // Cleanup
  document.head.removeChild(style);
  document.title = originalTitle;
};