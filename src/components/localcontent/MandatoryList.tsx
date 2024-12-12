import React, { useState } from 'react';
import { downloadMandatoryList } from '../../utils/localContent/mandatoryListDownloader';
import { notificationManager } from '../../utils/notifications';
import MandatoryListHeader from './MandatoryListHeader';
import MandatoryListInfo from './MandatoryListInfo';
import MandatoryListCategories from './MandatoryListCategories';
import MandatoryListPenalties from './MandatoryListPenalties';

const mandatoryCategories = [
  {
    title: 'المواد الأولية',
    target: 40,
    items: [
      { name: 'الحديد والصلب', details: 'يشمل المنتجات المسطحة والطولية والمقاطع الإنشائية' },
      { name: 'الأسمنت', details: 'جميع أنواع الأسمنت المطابقة للمواصفات السعودية' },
      { name: 'الخرسانة الجاهزة', details: 'الخرسانة الجاهزة بجميع أنواعها وتصنيفاتها' },
      { name: 'المواد الكيميائية الأساسية', details: 'المواد الكيميائية المستخدمة في الصناعات الأساسية والتحويلية' }
    ],
    regulations: [
      'الالتزام بالمواصفات القياسية السعودية',
      'الحصول على شهادات الجودة المطلوبة',
      'توثيق مصادر التوريد المحلية',
      'تقديم تقارير دورية عن نسب المحتوى المحلي'
    ]
  },
  {
    title: 'المعدات والآلات',
    target: 25,
    items: [
      { name: 'معدات المناولة', details: 'الرافعات الشوكية ومعدات النقل الداخلي والرافعات الجسرية' },
      { name: 'أنظمة التحكم', details: 'أنظمة الأتمتة والمراقبة والأمن' },
      { name: 'معدات النقل', details: 'الشاحنات والمقطورات ومعدات النقل المتخصصة' },
      { name: 'أنظمة التبريد', details: 'وحدات التبريد والتكييف الصناعية' }
    ],
    regulations: [
      'الالتزام بمعايير السلامة والأمان',
      'توفير خدمات ما بعد البيع',
      'توفير قطع الغيار الأصلية',
      'تدريب الكوادر المحلية على التشغيل والصيانة'
    ]
  },
  {
    title: 'الخدمات اللوجستية',
    target: 50,
    items: [
      { name: 'خدمات النقل', details: 'النقل البري والبحري والجوي للبضائع' },
      { name: 'التخزين', details: 'خدمات التخزين المتخصصة والمستودعات' },
      { name: 'التوزيع', details: 'شبكات التوزيع المحلية والإقليمية' },
      { name: 'إدارة المستودعات', details: 'خدمات إدارة وتشغيل المستودعات' }
    ],
    regulations: [
      'الالتزام بمعايير الجودة في الخدمات اللوجستية',
      'توظيف وتدريب الكوادر المحلية',
      'استخدام أنظمة إدارة متطورة',
      'الالتزام بمعايير الاستدامة البيئية'
    ]
  }
];

const penalties = [
  {
    violation: 'عدم الالتزام بالشراء من الموردين المحليين',
    penalty: 'غرامة تصل إلى 10% من قيمة المشتريات المخالفة',
    details: 'تطبق على كل عملية شراء مخالفة بشكل منفصل'
  },
  {
    violation: 'تقديم معلومات غير صحيحة',
    penalty: 'غرامة مالية وتعليق التعامل',
    details: 'تعليق التعامل لمدة تصل إلى 6 أشهر'
  },
  {
    violation: 'عدم الإفصاح عن المعلومات المطلوبة',
    penalty: 'إنذار وغرامة مالية',
    details: 'غرامة تصل إلى 100,000 ريال'
  },
  {
    violation: 'تكرار المخالفات',
    penalty: 'مضاعفة الغرامات وإيقاف التراخيص',
    details: 'إيقاف الترخيص لمدة تصل إلى سنة'
  }
];

export default function MandatoryList() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([mandatoryCategories[0].title]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadMandatoryList();
      notificationManager.success('تم تحميل القائمة الإلزامية بنجاح');
    } catch (error) {
      console.error('Download error:', error);
      notificationManager.error('فشل في تحميل القائمة الإلزامية. يرجى المحاولة مرة أخرى');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenLCGPA = () => {
    window.open('https://lcgpa.gov.sa/ar/Regulations/DocumentsLibrary/Pages/default.aspx', '_blank');
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-6">
      <MandatoryListHeader 
        onDownload={handleDownload}
        onOpenLCGPA={handleOpenLCGPA}
        isDownloading={isDownloading}
      />

      <MandatoryListInfo />

      <MandatoryListCategories 
        categories={mandatoryCategories}
        expandedCategories={expandedCategories}
        onToggleCategory={toggleCategory}
      />

      <MandatoryListPenalties penalties={penalties} />
    </div>
  );
}