import { useState } from 'react';
import { ArrowLeft, Building2, DollarSign, Plug } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { t } = useLanguage();
  const [apiMode, setApiMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title={t('settings')} />
      
      <main className="p-4 md:p-6 max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard')}
        </Button>

        <Tabs defaultValue="profiles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profiles" className="gap-2">
              <Building2 className="h-4 w-4" />
              {t('companyProfiles')}
            </TabsTrigger>
            <TabsTrigger value="currency" className="gap-2">
              <DollarSign className="h-4 w-4" />
              {t('currencyConversion')}
            </TabsTrigger>
            <TabsTrigger value="integration" className="gap-2">
              <Plug className="h-4 w-4" />
              {t('sepidarIntegration')}
            </TabsTrigger>
          </TabsList>

          {/* Company Profiles */}
          <TabsContent value="profiles" className="space-y-6">
            {/* Iran Profile */}
            <Card>
              <CardHeader>
                <CardTitle>{t('iranProfile')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('logo')}</Label>
                  <Input type="file" accept="image/*" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>نام شرکت (فارسی)</Label>
                    <Input defaultValue="شرکت کبریچی" dir="rtl" />
                  </div>
                  <div>
                    <Label>Company Name (English)</Label>
                    <Input defaultValue="Kebritchi Company" />
                  </div>
                </div>
                
                <div>
                  <Label>آدرس (فارسی)</Label>
                  <Textarea defaultValue="تهران، میدان ونک، خیابان ملاصدرا" dir="rtl" rows={2} />
                </div>
                
                <div>
                  <Label>Address (English)</Label>
                  <Textarea defaultValue="Tehran, Vanak Square, Molla Sadra St" rows={2} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('phone')}</Label>
                    <Input defaultValue="+98 21 1234 5678" />
                  </div>
                  <div>
                    <Label>{t('email')}</Label>
                    <Input type="email" defaultValue="info@kebritchi.ir" />
                  </div>
                </div>
                
                <Button className="bg-[#0057B8] hover:bg-[#0057B8]/90">
                  {t('save')}
                </Button>
              </CardContent>
            </Card>

            {/* Dubai Profile */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dubaiProfile')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{t('logo')}</Label>
                  <Input type="file" accept="image/*" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name (English)</Label>
                    <Input defaultValue="Kebritchi Trading LLC" />
                  </div>
                  <div>
                    <Label>اسم الشركة (العربية)</Label>
                    <Input defaultValue="شركة كبريتشي للتجارة" dir="rtl" />
                  </div>
                </div>
                
                <div>
                  <Label>Address (English)</Label>
                  <Textarea defaultValue="Dubai, Deira, Al Maktoum Street" rows={2} />
                </div>
                
                <div>
                  <Label>العنوان (العربية)</Label>
                  <Textarea defaultValue="دبي، ديرة، شارع المكتوم" dir="rtl" rows={2} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('phone')}</Label>
                    <Input defaultValue="+971 4 123 4567" />
                  </div>
                  <div>
                    <Label>{t('email')}</Label>
                    <Input type="email" defaultValue="info@kebritchi.ae" />
                  </div>
                </div>
                
                <Button className="bg-[#0057B8] hover:bg-[#0057B8]/90">
                  {t('save')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Currency Conversion */}
          <TabsContent value="currency">
            <Card>
              <CardHeader>
                <CardTitle>{t('currencyConversion')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{t('apiBased')} {t('currencyConversion')}</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Enable automatic currency conversion using live exchange rates
                    </p>
                  </div>
                  <Switch checked={apiMode} onCheckedChange={setApiMode} />
                </div>

                {apiMode && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label>API Key</Label>
                      <Input type="password" placeholder="Enter your API key" />
                    </div>
                    <p className="text-sm text-gray-500">
                      Get your API key from exchangerate-api.com or similar service
                    </p>
                  </div>
                )}

                {!apiMode && (
                  <div className="space-y-4">
                    <h3 className="text-sm">Manual Exchange Rates</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>USD to IRR</Label>
                        <Input type="number" defaultValue="42000" />
                      </div>
                      <div>
                        <Label>USD to AED</Label>
                        <Input type="number" defaultValue="3.67" step="0.01" />
                      </div>
                      <div>
                        <Label>USD to EUR</Label>
                        <Input type="number" defaultValue="0.92" step="0.01" />
                      </div>
                      <div>
                        <Label>USD to TRY</Label>
                        <Input type="number" defaultValue="28.5" step="0.01" />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label>{t('taxRateCustomization')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label className="text-sm">Iran VAT (%)</Label>
                      <Input type="number" defaultValue="9" step="0.1" />
                    </div>
                    <div>
                      <Label className="text-sm">UAE VAT (%)</Label>
                      <Input type="number" defaultValue="5" step="0.1" />
                    </div>
                  </div>
                </div>

                <Button className="bg-[#0057B8] hover:bg-[#0057B8]/90">
                  {t('save')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sepidar Integration */}
          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle>{t('sepidarIntegration')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Connect your Sepidar accounting system to sync customers, products, and invoices automatically.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Sepidar API URL</Label>
                    <Input placeholder="https://api.sepidar.com/v1" />
                  </div>
                  
                  <div>
                    <Label>API Key</Label>
                    <Input type="password" placeholder="Enter your Sepidar API key" />
                  </div>
                  
                  <div>
                    <Label>Company Code</Label>
                    <Input placeholder="Enter your company code" />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <h3 className="text-sm">Sync Options</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{t('syncCustomers')}</span>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{t('syncProductStock')}</span>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{t('pushInvoice')}</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Test Connection
                  </Button>
                  <Button className="flex-1 bg-[#0057B8] hover:bg-[#0057B8]/90">
                    {t('save')} & Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
