import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface MandatoryListItem {
  category: string;
  items: string[];
  minimumPercentage: number;
  effectiveDate: string;
  notes?: string;
}

const mandatoryListData: MandatoryListItem[] = [
  {
    category: 'المواد الأولية',
    items: [
      'الحديد والصلب',
      'الأسمنت',
      'الخرسانة الجاهزة',
      'المواد الكيميائية الأساسية'
    ],
    minimumPercentage: 40,
    effectiveDate: '2024-01-01',
    notes: 'يجب أن تكون المواد مطابقة للمواصفات السعودية'
  },
  {
    category: 'المعدات والآلات',
    items: [
      'معدات المناولة',
      'أنظمة التحكم',
      'معدات النقل',
      'أنظمة التبريد'
    ],
    minimumPercentage: 25,
    effectiveDate: '2024-01-01',
    notes: 'يشمل قطع الغيار والصيانة'
  },
  {
    category: 'الخدمات اللوجستية',
    items: [
      'خدمات النقل',
      'التخزين',
      'التوزيع',
      'إدارة المستودعات'
    ],
    minimumPercentage: 50,
    effectiveDate: '2024-01-01'
  },
  {
    category: 'التقنية والبرمجيات',
    items: [
      'أنظمة إدارة المستودعات',
      'أنظمة التتبع',
      'برامج المحاسبة',
      'أنظمة الأمن والمراقبة'
    ],
    minimumPercentage: 30,
    effectiveDate: '2024-01-01'
  }
];

export const downloadMandatoryList = async () => {
  try {
    // Create PDF document
    const doc = new jsPDF();
    
    // Add Arabic font support
    doc.setR2L(true);
    doc.setFont('Helvetica');

    // Add header with logo
    doc.addImage('https://lcgpa.gov.sa/Style%20Library/LCGPAImages/logo.png', 'PNG', 20, 10, 40, 20);
    
    doc.setFontSize(24);
    doc.text('القائمة الإلزامية للمحتوى المحلي', doc.internal.pageSize.width / 2, 20, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text('هيئة المحتوى المحلي والمشتريات الحكومية', doc.internal.pageSize.width / 2, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`تاريخ الإصدار: ${format(new Date(), 'PPP', { locale: ar })}`, doc.internal.pageSize.width / 2, 40, { align: 'center' });

    // Add content
    let yPos = 60;
    mandatoryListData.forEach((category, index) => {
      // Add category header
      doc.setFillColor(240, 247, 255);
      doc.rect(20, yPos, doc.internal.pageSize.width - 40, 10, 'F');
      doc.setFont('Helvetica', 'bold');
      doc.text(`${category.category} (${category.minimumPercentage}%)`, 25, yPos + 7);
      yPos += 15;

      // Add items
      doc.setFont('Helvetica', 'normal');
      category.items.forEach(item => {
        doc.text(`• ${item}`, 30, yPos);
        yPos += 7;
      });

      // Add notes if any
      if (category.notes) {
        doc.setTextColor(100, 100, 100);
        doc.text(`ملاحظات: ${category.notes}`, 30, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 10;
      }

      yPos += 10;

      // Add new page if needed
      if (yPos > doc.internal.pageSize.height - 20) {
        doc.addPage();
        yPos = 20;
      }
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `الصفحة ${i} من ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    // Save the PDF
    doc.save(`القائمة_الإلزامية_${format(new Date(), 'yyyy-MM-dd')}.pdf`);

  } catch (error) {
    console.error('Error generating mandatory list PDF:', error);
    throw new Error('فشل في تحميل القائمة الإلزامية');
  }
};