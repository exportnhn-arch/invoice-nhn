import { useState } from 'react';
import { ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { TopNav } from './TopNav';
import { useLanguage } from './LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface InventoryModuleProps {
  onBack: () => void;
}

const inventoryData = [
  { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphones', stock: 45, price: 1200, currency: 'USD', lastModified: '2024-11-15' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'Smartphones', stock: 32, price: 950, currency: 'USD', lastModified: '2024-11-14' },
  { id: 3, name: 'MacBook Pro M3', category: 'Laptops', stock: 18, price: 2500, currency: 'USD', lastModified: '2024-11-13' },
  { id: 4, name: 'AirPods Pro 2', category: 'Accessories', stock: 120, price: 249, currency: 'USD', lastModified: '2024-11-12' },
  { id: 5, name: 'iPad Air', category: 'Tablets', stock: 28, price: 599, currency: 'USD', lastModified: '2024-11-10' },
];

const auditLog = [
  { id: 1, user: 'Ahmad Kebritchi', date: '2024-11-15', time: '14:30', product: 'iPhone 15 Pro Max', operation: 'Entry', oldStock: 40, newStock: 45, reason: 'New shipment' },
  { id: 2, user: 'Sara Mohammadi', date: '2024-11-14', time: '10:15', product: 'Samsung Galaxy S24', operation: 'Exit', oldStock: 35, newStock: 32, reason: 'Sale' },
  { id: 3, user: 'Ali Rezaei', date: '2024-11-13', time: '16:45', product: 'MacBook Pro M3', operation: 'Correction', oldStock: 17, newStock: 18, reason: 'Stocktake adjustment' },
];

export function InventoryModule({ onBack }: InventoryModuleProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);

  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title={t('inventory')} />
      
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('dashboard')}
        </Button>

        {/* Inventory Overview */}
        <Card className="mb-6">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <CardTitle>{t('inventoryOverview')}</CardTitle>
            
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#0057B8] hover:bg-[#0057B8]/90 gap-2">
                    <Plus className="h-4 w-4" />
                    {t('addAdjustment')}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t('addAdjustment')}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label>{t('product')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('product')} />
                        </SelectTrigger>
                        <SelectContent>
                          {inventoryData.map(item => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{t('operation')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('operation')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">{t('entry')}</SelectItem>
                          <SelectItem value="exit">{t('exit')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{t('quantity')}</Label>
                      <Input type="number" min="1" defaultValue="1" />
                    </div>
                    
                    <div>
                      <Label>{t('reason')}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t('reason')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">{t('sale')}</SelectItem>
                          <SelectItem value="correction">{t('correction')}</SelectItem>
                          <SelectItem value="return">{t('return')}</SelectItem>
                          <SelectItem value="stocktake">{t('stocktakeDifference')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>{t('performedBy')}</Label>
                      <Input defaultValue="Ahmad Kebritchi" disabled />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAdjustmentOpen(false)}
                        className="flex-1"
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        onClick={() => setIsAdjustmentOpen(false)}
                        className="flex-1 bg-[#0057B8] hover:bg-[#0057B8]/90"
                      >
                        {t('save')}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('productName')}</TableHead>
                    <TableHead>{t('category')}</TableHead>
                    <TableHead>{t('stock')}</TableHead>
                    <TableHead>{t('price')}</TableHead>
                    <TableHead>{t('lastModified')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className={item.stock < 10 ? 'text-[#F7B500]' : ''}>
                          {item.stock} units
                        </span>
                      </TableCell>
                      <TableCell>
                        {item.price} {item.currency}
                      </TableCell>
                      <TableCell className="text-gray-500 text-sm">{item.lastModified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail */}
        <Card>
          <CardHeader>
            <CardTitle>{t('auditTrail')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('performedBy')}</TableHead>
                    <TableHead>{t('dateField')}</TableHead>
                    <TableHead>{t('product')}</TableHead>
                    <TableHead>{t('operation')}</TableHead>
                    <TableHead>{t('oldStock')}</TableHead>
                    <TableHead>{t('newStock')}</TableHead>
                    <TableHead>{t('reason')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="text-sm">
                        {log.date} {log.time}
                      </TableCell>
                      <TableCell>{log.product}</TableCell>
                      <TableCell>
                        <Badge variant={log.operation === 'Entry' ? 'default' : 'secondary'}>
                          {log.operation}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.oldStock}</TableCell>
                      <TableCell>{log.newStock}</TableCell>
                      <TableCell className="text-sm text-gray-600">{log.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
