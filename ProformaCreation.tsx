import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';

interface ProformaCreationProps {
  onBack: () => void;
}

interface LineItem {
  id: string;
  product: string;
  quantity: number;
  unitPrice: number;
  warranty: string;
}

export function ProformaCreation({ onBack }: ProformaCreationProps) {
  const { t } = useLanguage();
  const [profile, setProfile] = useState('iran');
  const [currency, setCurrency] = useState('IRR');
  const [taxMode, setTaxMode] = useState('noTax');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', product: '', quantity: 1, unitPrice: 0, warranty: '' }
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, {
      id: Date.now().toString(),
      product: '',
      quantity: 1,
      unitPrice: 0,
      warranty: ''
    }]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title={t('proformaCreation')} />
      
      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard')}
        </Button>

        <div className="space-y-6">
          {/* Profile Selection */}
          <Card>
            <CardHeader>
              <CardTitle>{t('selectProfile')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setProfile('iran')}
                  className={`p-6 border-2 rounded-lg text-left transition-all ${
                    profile === 'iran'
                      ? 'border-[#0057B8] bg-[#0057B8]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="text-[#0057B8] mb-2">{t('iranProfile')}</h3>
                  <p className="text-sm text-gray-600">شرکت کبریچی - تهران</p>
                </button>
                
                <button
                  onClick={() => setProfile('dubai')}
                  className={`p-6 border-2 rounded-lg text-left transition-all ${
                    profile === 'dubai'
                      ? 'border-[#0057B8] bg-[#0057B8]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="text-[#0057B8] mb-2">{t('dubaiProfile')}</h3>
                  <p className="text-sm text-gray-600">Kebritchi Trading - Dubai</p>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('customer')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t('customer')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('customer')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer1">محمد احمدی</SelectItem>
                    <SelectItem value="customer2">Sara Technologies</SelectItem>
                    <SelectItem value="customer3">Ali Trading Co.</SelectItem>
                    <SelectItem value="new">{t('addNewCustomer')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Line Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('lineItems')}</CardTitle>
              <Button onClick={addLineItem} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                {t('addProduct')}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                      {lineItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLineItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label>{t('product')}</Label>
                        <Select
                          value={item.product}
                          onValueChange={(value) => updateLineItem(item.id, 'product', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('product')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iphone15">iPhone 15 Pro Max</SelectItem>
                            <SelectItem value="samsung24">Samsung Galaxy S24</SelectItem>
                            <SelectItem value="macbook">MacBook Pro M3</SelectItem>
                            <SelectItem value="airpods">AirPods Pro 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>{t('warranty')}</Label>
                        <Input
                          value={item.warranty}
                          onChange={(e) => updateLineItem(item.id, 'warranty', e.target.value)}
                          placeholder="12 months"
                        />
                      </div>
                      
                      <div>
                        <Label>{t('quantity')}</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label>{t('unitPrice')}</Label>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-500">
                        {t('price')}: <span className="text-[#0057B8]">
                          {(item.quantity * item.unitPrice).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('currency')} & {t('taxMode')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{t('currency')}</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IRR">IRR - ریال ایران</SelectItem>
                      <SelectItem value="AED">AED - درهم امارات</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="TRY">TRY - Turkish Lira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>{t('taxMode')}</Label>
                  <Select value={taxMode} onValueChange={setTaxMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noTax">{t('noTax')}</SelectItem>
                      <SelectItem value="vat">{t('vat')} (5%)</SelectItem>
                      <SelectItem value="iranianVat">{t('iranianVat')} (9%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span>{calculateTotal().toLocaleString()} {currency}</span>
                  </div>
                  {taxMode !== 'noTax' && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax:</span>
                      <span>
                        {(calculateTotal() * (taxMode === 'vat' ? 0.05 : 0.09)).toLocaleString()} {currency}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-[#0057B8]">
                      {(calculateTotal() * (taxMode === 'noTax' ? 1 : taxMode === 'vat' ? 1.05 : 1.09)).toLocaleString()} {currency}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('notesAndTerms')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t('deliveryTerms')}</Label>
                <Input placeholder="FOB Dubai, CIF Tehran, etc." />
              </div>
              
              <div>
                <Label>{t('notesAndTerms')}</Label>
                <Textarea
                  placeholder={t('notesAndTerms')}
                  rows={4}
                />
              </div>
              
              <div>
                <Label>{t('dateField')}</Label>
                <Input type="date" />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              {t('saveDraft')}
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              {t('previewPdf')}
            </Button>
            <Button className="flex-1 bg-[#0057B8] hover:bg-[#0057B8]/90">
              {t('saveAndSend')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
