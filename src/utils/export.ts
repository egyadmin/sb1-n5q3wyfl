import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { saveAs } from 'file-saver';

// Load Arabic fonts
const loadArabicFonts = async () => {
  try {
    const [amiriBoldResponse, amiriItalicResponse] = await Promise.all([
      fetch('https://nsajco.com/Amiri-Bold.ttf'),
      fetch('https://nsajco.com/Amiri-Italic.ttf')
    ]);

    const [amiriBoldFont, amiriItalicFont] = await Promise.all([
      amiriBoldResponse.arrayBuffer(),
      amiriItalicResponse.arrayBuffer()
    ]);

    return {
      amiriBold: amiriBoldFont,
      amiriItalic: amiriItalicFont
    };
  } catch (error) {
    console.error('Error loading fonts:', error);
    throw new Error('فشل في تحميل الخطوط العربية');
  }
};

export const exportToPDF = async (data: any[], columns: string[], title: string) => {
  try {
    // Load fonts
    const fonts = await loadArabicFonts();
    
    // Create PDF
    const doc = new jsPDF();
    
    // Add fonts
    doc.addFileToVFS('Amiri-Bold.ttf', fonts.amiriBold);
    doc.addFileToVFS('Amiri-Italic.ttf', fonts.amiriItalic);
    doc.addFont('Amiri-Bold.ttf', 'Amiri', 'bold');
    doc.addFont('Amiri-Italic.ttf', 'Amiri', 'normal');
    
    // Set default font
    doc.setFont('Amiri');
    doc.setR2L(true);

    // Add title
    doc.setFontSize(18);
    doc.text(title, doc.internal.pageSize.width / 2, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(12);
    const date = format(new Date(), 'PPP', { locale: ar });
    doc.text(`تاريخ التقرير: ${date}`, 20, 30);

    // Add table
    doc.autoTable({
      head: [columns],
      body: data.map(item => columns.map(col => item[col])),
      startY: 40,
      theme: 'grid',
      styles: {
        font: 'Amiri',
        fontSize: 10,
        halign: 'right',
        textColor: [0, 0, 0],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });

    // Save file
    const fileName = `${title}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    doc.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('فشل في إنشاء ملف PDF. الرجاء المحاولة مرة أخرى.');
  }
};

export const exportToExcel = (data: any[], title: string) => {
  try {
    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Set RTL
    ws['!dir'] = 'rtl';
    
    // Auto-size columns
    const colWidths = data.reduce((widths: { [key: string]: number }, row) => {
      Object.entries(row).forEach(([key, value]) => {
        const width = Math.max(
          key.toString().length,
          value?.toString().length || 0
        );
        widths[key] = Math.max(widths[key] || 0, width);
      });
      return widths;
    }, {});

    ws['!cols'] = Object.values(colWidths).map(width => ({ width }));
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, title);
    
    // Generate filename
    const fileName = `${title}-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    
    // Save file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, fileName);

  } catch (error) {
    console.error('Error generating Excel:', error);
    throw new Error('فشل في إنشاء ملف Excel. الرجاء المحاولة مرة أخرى.');
  }
};