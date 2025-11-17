import { FileText, Package, AlertTriangle, TrendingUp, Plus, Upload, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  onNavigate: (view: 'dashboard' | 'proforma' | 'inventory' | 'products' | 'pricelist' | 'settings') => void;
}

const salesData = [
  { month: 'Jan', sales: 45000 },
  { month: 'Feb', sales: 52000 },
  { month: 'Mar', sales: 48000 },
  { month: 'Apr', sales: 61000 },
  { month: 'May', sales: 55000 },
  { month: 'Jun', sales: 67000 },
];

const lowStockProducts = [
  { name: 'iPhone 15 Pro Max', stock: 3, category: 'Smartphones' },
  { name: 'Samsung Galaxy S24', stock: 5, category: 'Smartphones' },
  { name: 'MacBook Pro M3', stock: 2, category: 'Laptops' },
  { name: 'AirPods Pro 2', stock: 8, category: 'Accessories' },
];

const recentActivities = [
  { action: 'Proforma #1234 created', user: 'Ahmad Kebritchi', time: '2 hours ago' },
  { action: 'Product "iPhone 15" added', user: 'Sara Mohammadi', time: '5 hours ago' },
  { action: 'Stock adjustment: +50 units', user: 'Ali Rezaei', time: '1 day ago' },
  { action: 'Synced with Sepidar', user: 'System', time: '2 days ago' },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Kebritchi Proforma & Inventory" />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Button
            onClick={() => onNavigate('proforma')}
            className="h-auto py-4 flex-col gap-2 bg-[#0057B8] hover:bg-[#0057B8]/90"
          >
            <Plus className="h-5 w-5" />
            <span className="text-sm">{t('newProforma')}</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('products')}
            variant="outline"
            className="h-auto py-4 flex-col gap-2 border-[#0057B8] text-[#0057B8] hover:bg-[#0057B8]/10"
          >
            <Package className="h-5 w-5" />
            <span className="text-sm">{t('addProduct')}</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('inventory')}
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
          >
            <Upload className="h-5 w-5" />
            <span className="text-sm">{t('inventoryEntryExit')}</span>
          </Button>
          
          <Button
            onClick={() => onNavigate('settings')}
            variant="outline"
            className="h-auto py-4 flex-col gap-2"
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="text-sm">{t('syncSepidar')}</span>
          </Button>
        </div>

        {/* Summary Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">{t('totalPendingProformas')}</CardTitle>
              <FileText className="h-5 w-5 text-[#0057B8]" />
            </CardHeader>
            <CardContent>
              <div className="text-[#0057B8]">24</div>
              <p className="text-xs text-gray-500 mt-1">+3 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">{t('inventoryAlerts')}</CardTitle>
              <AlertTriangle className="h-5 w-5 text-[#F7B500]" />
            </CardHeader>
            <CardContent>
              <div className="text-[#F7B500]">{lowStockProducts.length}</div>
              <p className="text-xs text-gray-500 mt-1">{t('lowStockWarnings')}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">{t('monthlySales')}</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-green-500">$67,000</div>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{t('monthlySales')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#0057B8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Low Stock Warnings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('lowStockWarnings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockProducts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F7B500]">{item.stock} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-[#0057B8] mt-2"></div>
                    <div className="flex-1">
                      <p>{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user} · {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
