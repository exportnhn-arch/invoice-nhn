import { useState } from 'react';
import { ArrowLeft, Plus, Search, Upload, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductManagementProps {
  onBack: () => void;
}

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    code: 'IPH-15-PM',
    category: 'Smartphones',
    stock: 45,
    price: 1200,
    currency: 'USD',
    warranty: '12 months',
    description: 'Latest iPhone with titanium design',
    image: 'https://images.unsplash.com/photo-1603732133854-4eb5f41d1fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBzbWFydHBob25lfGVufDF8fHx8MTc2MzMxNDczM3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24',
    code: 'SAM-S24',
    category: 'Smartphones',
    stock: 32,
    price: 950,
    currency: 'USD',
    warranty: '24 months',
    description: 'Flagship Samsung smartphone',
    image: 'https://images.unsplash.com/photo-1691449808001-bb8c157f0094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1zdW5nJTIwcGhvbmV8ZW58MXx8fHwxNzYzMjY4NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'MacBook Pro M3',
    code: 'MBP-M3',
    category: 'Laptops',
    stock: 18,
    price: 2500,
    currency: 'USD',
    warranty: '12 months',
    description: 'Professional laptop with M3 chip',
    image: 'https://images.unsplash.com/photo-1585645982492-639c028b8a10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNib29rJTIwbGFwdG9wfGVufDF8fHx8MTc2MzMzMDY0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const categories = [
  'Smartphones',
  'Laptops',
  'Tablets',
  'Accessories',
  'Smart Watches',
];

export function ProductManagement({ onBack }: ProductManagementProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title={t('productManagement')} />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard')}
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#0057B8] hover:bg-[#0057B8]/90 gap-2">
                <Plus className="h-4 w-4" />
                {t('addProduct')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('addProduct')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('productName')}</Label>
                    <Input placeholder="iPhone 15 Pro Max" />
                  </div>
                  
                  <div>
                    <Label>{t('productCode')}</Label>
                    <Input placeholder="IPH-15-PM" />
                  </div>
                  
                  <div>
                    <Label>{t('category')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('category')} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>{t('stock')}</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  
                  <div>
                    <Label>{t('price')}</Label>
                    <Input type="number" placeholder="0.00" step="0.01" />
                  </div>
                  
                  <div>
                    <Label>{t('defaultCurrency')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('currency')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IRR">IRR</SelectItem>
                        <SelectItem value="AED">AED</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="TRY">TRY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>{t('warranty')}</Label>
                    <Input placeholder="12 months" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>{t('description')}</Label>
                    <Textarea placeholder={t('description')} rows={3} />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label>{t('image')}</Label>
                    <Input type="file" accept="image/*" />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsProductDialogOpen(false)}
                    className="flex-1"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    onClick={() => setIsProductDialogOpen(false)}
                    className="flex-1 bg-[#0057B8] hover:bg-[#0057B8]/90"
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                {t('addCategory')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{t('addCategory')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Name (English)</Label>
                  <Input placeholder="Smartphones" />
                </div>
                <div>
                  <Label>نام (فارسی)</Label>
                  <Input placeholder="گوشی هوشمند" dir="rtl" />
                </div>
                <div>
                  <Label>الاسم (العربية)</Label>
                  <Input placeholder="الهواتف الذكية" dir="rtl" />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCategoryDialogOpen(false)}
                    className="flex-1"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    onClick={() => setIsCategoryDialogOpen(false)}
                    className="flex-1 bg-[#0057B8] hover:bg-[#0057B8]/90"
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            {t('batchUpload')} CSV
          </Button>
        </div>

        {/* Products List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle>{t('products')}</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Thumbnail */}
                    <div className="flex-shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-[#0057B8] mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500">Code: {product.code}</p>
                        </div>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">{t('stock')}:</span>
                          <p>{product.stock} units</p>
                        </div>
                        <div>
                          <span className="text-gray-500">{t('price')}:</span>
                          <p>{product.price} {product.currency}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">{t('warranty')}:</span>
                          <p>{product.warranty}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}