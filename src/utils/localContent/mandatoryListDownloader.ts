import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import QRCode from 'qrcode';
import { notificationManager } from '../notifications';
import { translations } from './translations';
import type { MandatoryCategory, QRCodeData } from './types';

export const downloadMandatoryList = async () => {
  try {
    // Create PDF document
    const doc = new jsPDF();
    
    // Add header
    await addHeader(doc);
    
    // Add content
    await addContent(doc);
    
    // Add footer
    addFooter(doc);

    // Save the PDF
    doc.save(`LCGPA_Mandatory_List_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    
    notificationManager.success('تم تحميل القائمة الإلزامية بنجاح');
  } catch (error) {
    console.error('Error generating mandatory list PDF:', error);
    notificationManager.error('فشل في تحميل القائمة الإلزامية');
    throw error;
  }
};

const addHeader = async (doc: jsPDF) => {
  try {
    // Set font size and add title
    doc.setFontSize(24);
    doc.text('Mandatory List for Local Content', doc.internal.pageSize.width / 2, 20, { align: 'center' });
    
    // Add subtitle
    doc.setFontSize(16);
    doc.text('Local Content and Government Procurement Authority', doc.internal.pageSize.width / 2, 30, { align: 'center' });
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Issue Date: ${format(new Date(), 'PPP')}`, doc.internal.pageSize.width / 2, 40, { align: 'center' });

    // Generate and add QR code
    const qrData: QRCodeData = {
      type: 'mandatory_list',
      date: new Date().toISOString(),
      issuer: 'LCGPA',
      version: '1.0'
    };
    
    const qrImage = await generateQR(qrData);
    doc.addImage(qrImage, 'PNG', doc.internal.pageSize.width - 50, 10, 30, 30);

  } catch (error) {
    console.error('Error adding header:', error);
    throw error;
  }
};

const generateQR = async (data: QRCodeData): Promise<string> => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data), {
      width: 100,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

const addContent = async (doc: jsPDF) => {
  let yPos = 60;

  for (const category of mandatoryCategories) {
    // Add category header with styling
    doc.setFillColor(0, 87, 183); // LCGPA Blue
    doc.rect(20, yPos, doc.internal.pageSize.width - 40, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`${category.titleEn} (${category.percentage}%)`, 25, yPos + 7);
    yPos += 15;

    // Add items table
    doc.autoTable({
      startY: yPos,
      head: [['Item', 'Details', 'Requirements']],
      body: category.items.map(item => [
        item.nameEn,
        item.detailsEn,
        item.requirementsEn
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 5
      },
      headStyles: {
        fillColor: [240, 247, 255],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      },
      margin: { left: 20, right: 20 }
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;

    // Add page break if needed
    if (yPos > doc.internal.pageSize.height - 20) {
      doc.addPage();
      yPos = 20;
    }
  }
};

const addFooter = (doc: jsPDF) => {
  const pageCount = doc.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    
    // Add page numbers
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    
    // Add footer text
    doc.text(
      'Local Content and Government Procurement Authority',
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 20,
      { align: 'center' }
    );
  }
};

// Mock data
const mandatoryCategories: MandatoryCategory[] = [
  {
    titleAr: 'المواد الأولية',
    titleEn: 'Raw Materials',
    percentage: 40,
    items: [
      {
        nameEn: 'Iron and Steel',
        detailsEn: 'Includes flat products, long products and structural sections',
        requirementsEn: 'Must comply with Saudi standards'
      },
      {
        nameEn: 'Cement',
        detailsEn: 'All types of cement compliant with Saudi specifications',
        requirementsEn: 'Must have quality certifications'
      }
    ]
  },
  {
    titleAr: 'المعدات والآلات',
    titleEn: 'Equipment and Machinery',
    percentage: 25,
    items: [
      {
        nameEn: 'Material Handling Equipment',
        detailsEn: 'Forklifts, internal transport equipment and bridge cranes',
        requirementsEn: 'Must meet safety standards'
      },
      {
        nameEn: 'Control Systems',
        detailsEn: 'Automation, monitoring and security systems',
        requirementsEn: 'Must be certified by authorized bodies'
      }
    ]
  }
];