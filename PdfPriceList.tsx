import { useState } from 'react';
import { ArrowLeft, Download, Share2, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PdfPriceListProps {
  onBack: () => void;
}

const categories = [
  { id: 'smartphones', name: 'Smartphones', count: 15 },
  { id: 'laptops', name: 'Laptops', count: 8 },
  { id: 'tablets', name: 'Tablets', count: 6 },
  { id: 'accessories', name: 'Accessories', count: 25 },
  { id: 'smartwatches', name: 'Smart Watches', count: 10 },
];

const products = [
  { name: 'iPhone 15 Pro Max', description: '256GB, Titanium Blue', price: 1200, currency: 'USD' },
  { name: 'Samsung Galaxy S24 Ultra', description: '512GB, Phantom Black', price: 1100, currency: 'USD' },
  { name: 'MacBook Pro M3', description: '16" 512GB Space Gray', price: 2500, currency: 'USD' },
  { name: 'iPad Air M2', description: '128GB WiFi, Starlight', price: 599, currency: 'USD' },
];

export function PdfPriceList({ onBack }: PdfPriceListProps) {
  const { t, language } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [profile, setProfile] = useState('iran');
  const [currency, setCurrency] = useState('USD');
  const [includeImages, setIncludeImages] = useState(true);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title={t('generatePriceList')} />
      
      <main className="p-4 md:p-6 max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard')}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('settings')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('selectProfile')}</Label>
                  <Select value={profile} onValueChange={setProfile}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iran">{t('iranProfile')}</SelectItem>
                      <SelectItem value="dubai">{t('dubaiProfile')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>{t('currency')}</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IRR">IRR - ریال</SelectItem>
                      <SelectItem value="AED">AED - درهم</SelectItem>
                      <SelectItem value="USD">USD - Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="images"
                    checked={includeImages}
                    onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
                  />
                  <Label htmlFor="images" className="cursor-pointer">
                    Include product images
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('selectCategories')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <Label htmlFor={category.id} className="cursor-pointer">
                          {category.name}
                        </Label>
                      </div>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-[#0057B8] hover:bg-[#0057B8]/90 gap-2">
                <Download className="h-4 w-4" />
                {t('downloadPdf')}
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <Share2 className="h-4 w-4" />
                {t('shareWhatsapp')}
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('previewPdf')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 md:p-8 shadow-sm">
                  {/* Header */}
                  <div className="text-center mb-8 pb-6 border-b">
                    <h1 className="text-[#0057B8] mb-2">
                      {profile === 'iran' ? 'شرکت کبریچی' : 'Kebritchi Trading LLC'}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {profile === 'iran' 
                        ? 'تهران، میدان ونک، خیابان ملاصدرا'
                        : 'Dubai, Deira, Al Maktoum Street'
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      {profile === 'iran' ? '+98 21 1234 5678' : '+971 4 123 4567'}
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="text-center text-[#0057B8] mb-6">
                    {language === 'fa' ? 'لیست قیمت' : language === 'ar' ? 'قائمة الأسعار' : 'Price List'}
                  </h2>

                  {/* Products Table */}
                  <div className="space-y-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-[#0057B8]">
                          <th className="text-left py-3 px-2">
                            {language === 'fa' ? 'محصول' : language === 'ar' ? 'المنتج' : 'Product'}
                          </th>
                          <th className="text-left py-3 px-2">
                            {language === 'fa' ? 'توضیحات' : language === 'ar' ? 'الوصف' : 'Description'}
                          </th>
                          <th className="text-right py-3 px-2">
                            {language === 'fa' ? 'قیمت' : language === 'ar' ? 'السعر' : 'Price'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-2">{product.name}</td>
                            <td className="py-3 px-2 text-sm text-gray-600">{product.description}</td>
                            <td className="py-3 px-2 text-right text-[#0057B8]">
                              {product.price} {currency}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
                    <p>
                      {language === 'fa' 
                        ? 'قیمت‌ها ممکن است بدون اطلاع قبلی تغییر کنند'
                        : language === 'ar'
                        ? 'الأسعار قابلة للتغيير دون إشعار مسبق'
                        : 'Prices are subject to change without prior notice'
                      }
                    </p>
                    <p className="mt-2">
                      {new Date().toLocaleDateString(
                        language === 'fa' ? 'fa-IR' : language === 'ar' ? 'ar-AE' : 'en-US'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
