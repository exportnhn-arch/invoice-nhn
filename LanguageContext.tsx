import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fa' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  fa: {
    // Navigation & Common
    dashboard: 'داشبورد',
    newProforma: 'پیش‌فاکتور جدید',
    addProduct: 'افزودن محصول',
    inventoryEntryExit: 'ورود/خروج انبار',
    syncSepidar: 'همگام‌سازی با سپیدار',
    inventory: 'انبار',
    products: 'محصولات',
    priceList: 'لیست قیمت',
    settings: 'تنظیمات',
    save: 'ذخیره',
    cancel: 'لغو',
    edit: 'ویرایش',
    delete: 'حذف',
    search: 'جستجو',
    filter: 'فیلتر',
    export: 'خروجی',
    import: 'ورودی',
    
    // Dashboard
    totalPendingProformas: 'پیش‌فاکتورهای در انتظار',
    inventoryAlerts: 'هشدارهای انبار',
    monthlySales: 'فروش ماهانه',
    lowStockWarnings: 'هشدار موجودی کم',
    recentActivity: 'فعالیت‌های اخیر',
    
    // Proforma
    proformaCreation: 'ایجاد پیش‌فاکتور',
    selectProfile: 'انتخاب پروفایل',
    iranProfile: 'پروفایل ایران',
    dubaiProfile: 'پروفایل دبی',
    customer: 'مشتری',
    addNewCustomer: 'افزودن مشتری جدید',
    lineItems: 'اقلام',
    product: 'محصول',
    quantity: 'تعداد',
    unitPrice: 'قیمت واحد',
    warranty: 'گارانتی',
    currency: 'ارز',
    taxMode: 'نوع مالیات',
    noTax: 'بدون مالیات',
    vat: 'مالیات بر ارزش افزوده',
    iranianVat: 'مالیات ایران',
    deliveryTerms: 'شرایط تحویل',
    notesAndTerms: 'یادداشت‌ها و شرایط',
    dateField: 'تاریخ',
    saveDraft: 'ذخیره پیش‌نویس',
    previewPdf: 'پیش‌نمایش PDF',
    saveAndSend: 'ذخیره و ارسال',
    
    // Inventory
    inventoryOverview: 'نمای کلی انبار',
    productName: 'نام محصول',
    category: 'دسته‌بندی',
    stock: 'موجودی',
    lastModified: 'آخرین تغییر',
    addAdjustment: 'افزودن تعدیل',
    operation: 'عملیات',
    entry: 'ورود',
    exit: 'خروج',
    reason: 'دلیل',
    sale: 'فروش',
    correction: 'اصلاح',
    return: 'برگشت',
    stocktakeDifference: 'اختلاف موجودی‌گیری',
    performedBy: 'انجام شده توسط',
    auditTrail: 'سابقه تغییرات',
    oldStock: 'موجودی قبلی',
    newStock: 'موجودی جدید',
    
    // Products
    productManagement: 'مدیریت محصولات',
    productCode: 'کد محصول',
    description: 'توضیحات',
    price: 'قیمت',
    image: 'تصویر',
    defaultCurrency: 'ارز پیش‌فرض',
    addCategory: 'افزودن دسته‌بندی',
    batchUpload: 'بارگذاری دسته‌ای',
    
    // Price List
    generatePriceList: 'ایجاد لیست قیمت',
    selectCategories: 'انتخاب دسته‌بندی‌ها',
    downloadPdf: 'دانلود PDF',
    shareWhatsapp: 'اشتراک در واتساپ',
    
    // Settings
    companyProfiles: 'پروفایل‌های شرکت',
    logo: 'لوگو',
    address: 'آدرس',
    phone: 'تلفن',
    email: 'ایمیل',
    currencyConversion: 'تبدیل ارز',
    manual: 'دستی',
    apiBased: 'بر اساس API',
    sepidarIntegration: 'یکپارچه‌سازی سپیدار',
    syncCustomers: 'همگام‌سازی مشتریان',
    syncProductStock: 'همگام‌سازی موجودی محصولات',
    pushInvoice: 'ارسال فاکتور',
    taxRateCustomization: 'تنظیم نرخ مالیات',
  },
  en: {
    // Navigation & Common
    dashboard: 'Dashboard',
    newProforma: 'New Proforma',
    addProduct: 'Add Product',
    inventoryEntryExit: 'Inventory Entry/Exit',
    syncSepidar: 'Sync with Sepidar',
    inventory: 'Inventory',
    products: 'Products',
    priceList: 'Price List',
    settings: 'Settings',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    
    // Dashboard
    totalPendingProformas: 'Pending Proformas',
    inventoryAlerts: 'Inventory Alerts',
    monthlySales: 'Monthly Sales',
    lowStockWarnings: 'Low Stock Warnings',
    recentActivity: 'Recent Activity',
    
    // Proforma
    proformaCreation: 'Proforma Creation',
    selectProfile: 'Select Profile',
    iranProfile: 'Iran Profile',
    dubaiProfile: 'Dubai Profile',
    customer: 'Customer',
    addNewCustomer: 'Add New Customer',
    lineItems: 'Line Items',
    product: 'Product',
    quantity: 'Quantity',
    unitPrice: 'Unit Price',
    warranty: 'Warranty',
    currency: 'Currency',
    taxMode: 'Tax Mode',
    noTax: 'No Tax',
    vat: 'VAT',
    iranianVat: 'Iranian VAT',
    deliveryTerms: 'Delivery Terms',
    notesAndTerms: 'Notes & Terms',
    dateField: 'Date',
    saveDraft: 'Save Draft',
    previewPdf: 'Preview PDF',
    saveAndSend: 'Save & Send',
    
    // Inventory
    inventoryOverview: 'Inventory Overview',
    productName: 'Product Name',
    category: 'Category',
    stock: 'Stock',
    lastModified: 'Last Modified',
    addAdjustment: 'Add Adjustment',
    operation: 'Operation',
    entry: 'Entry',
    exit: 'Exit',
    reason: 'Reason',
    sale: 'Sale',
    correction: 'Correction',
    return: 'Return',
    stocktakeDifference: 'Stocktake Difference',
    performedBy: 'Performed By',
    auditTrail: 'Audit Trail',
    oldStock: 'Old Stock',
    newStock: 'New Stock',
    
    // Products
    productManagement: 'Product Management',
    productCode: 'Product Code',
    description: 'Description',
    price: 'Price',
    image: 'Image',
    defaultCurrency: 'Default Currency',
    addCategory: 'Add Category',
    batchUpload: 'Batch Upload',
    
    // Price List
    generatePriceList: 'Generate Price List',
    selectCategories: 'Select Categories',
    downloadPdf: 'Download PDF',
    shareWhatsapp: 'Share via WhatsApp',
    
    // Settings
    companyProfiles: 'Company Profiles',
    logo: 'Logo',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    currencyConversion: 'Currency Conversion',
    manual: 'Manual',
    apiBased: 'API-based',
    sepidarIntegration: 'Sepidar Integration',
    syncCustomers: 'Sync Customers',
    syncProductStock: 'Sync Product Stock',
    pushInvoice: 'Push Invoice',
    taxRateCustomization: 'Tax Rate Customization',
  },
  ar: {
    // Navigation & Common
    dashboard: 'لوحة التحكم',
    newProforma: 'فاتورة أولية جديدة',
    addProduct: 'إضافة منتج',
    inventoryEntryExit: 'دخول/خروج المخزون',
    syncSepidar: 'مزامنة مع سبيدار',
    inventory: 'المخزون',
    products: 'المنتجات',
    priceList: 'قائمة الأسعار',
    settings: 'الإعدادات',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    
    // Dashboard
    totalPendingProformas: 'الفواتير المعلقة',
    inventoryAlerts: 'تنبيهات المخزون',
    monthlySales: 'المبيعات الشهرية',
    lowStockWarnings: 'تحذيرات المخزون المنخفض',
    recentActivity: 'النشاط الأخير',
    
    // Proforma
    proformaCreation: 'إنشاء فاتورة أولية',
    selectProfile: 'اختر الملف الشخصي',
    iranProfile: 'ملف إيران',
    dubaiProfile: 'ملف دبي',
    customer: 'العميل',
    addNewCustomer: 'إضافة عميل جديد',
    lineItems: 'بنود الفاتورة',
    product: 'المنتج',
    quantity: 'الكمية',
    unitPrice: 'سعر الوحدة',
    warranty: 'الضمان',
    currency: 'العملة',
    taxMode: 'نوع الضريبة',
    noTax: 'بدون ضريبة',
    vat: 'ضريبة القيمة المضافة',
    iranianVat: 'ضريبة إيران',
    deliveryTerms: 'شروط التسليم',
    notesAndTerms: 'الملاحظات والشروط',
    dateField: 'التاريخ',
    saveDraft: 'حفظ كمسودة',
    previewPdf: 'معاينة PDF',
    saveAndSend: 'حفظ وإرسال',
    
    // Inventory
    inventoryOverview: 'نظرة عامة على المخزون',
    productName: 'اسم المنتج',
    category: 'الفئة',
    stock: 'المخزون',
    lastModified: 'آخر تعديل',
    addAdjustment: 'إضافة تعديل',
    operation: 'العملية',
    entry: 'دخول',
    exit: 'خروج',
    reason: 'السبب',
    sale: 'بيع',
    correction: 'تصحيح',
    return: 'إرجاع',
    stocktakeDifference: 'فرق الجرد',
    performedBy: 'تم بواسطة',
    auditTrail: 'سجل التدقيق',
    oldStock: 'المخزون القديم',
    newStock: 'المخزون الجديد',
    
    // Products
    productManagement: 'إدارة المنتجات',
    productCode: 'رمز المنتج',
    description: 'الوصف',
    price: 'السعر',
    image: 'الصورة',
    defaultCurrency: 'العملة الافتراضية',
    addCategory: 'إضافة فئة',
    batchUpload: 'تحميل مجمع',
    
    // Price List
    generatePriceList: 'إنشاء قائمة الأسعار',
    selectCategories: 'اختر الفئات',
    downloadPdf: 'تنزيل PDF',
    shareWhatsapp: 'مشاركة عبر واتساب',
    
    // Settings
    companyProfiles: 'ملفات الشركة',
    logo: 'الشعار',
    address: 'العنوان',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    currencyConversion: 'تحويل العملات',
    manual: 'يدوي',
    apiBased: 'قائم على API',
    sepidarIntegration: 'التكامل مع سبيدار',
    syncCustomers: 'مزامنة العملاء',
    syncProductStock: 'مزامنة مخزون المنتجات',
    pushInvoice: 'إرسال الفاتورة',
    taxRateCustomization: 'تخصيص معدل الضريبة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const dir = language === 'en' ? 'ltr' : 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
