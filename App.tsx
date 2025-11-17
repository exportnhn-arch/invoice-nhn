import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ProformaCreation } from './components/ProformaCreation';
import { InventoryModule } from './components/InventoryModule';
import { ProductManagement } from './components/ProductManagement';
import { PdfPriceList } from './components/PdfPriceList';
import { Settings } from './components/Settings';
import { LanguageProvider, useLanguage } from './components/LanguageContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'proforma' | 'inventory' | 'products' | 'pricelist' | 'settings'>('dashboard');
  const { dir } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50" dir={dir}>
      {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
      {currentView === 'proforma' && <ProformaCreation onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'inventory' && <InventoryModule onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'products' && <ProductManagement onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'pricelist' && <PdfPriceList onBack={() => setCurrentView('dashboard')} />}
      {currentView === 'settings' && <Settings onBack={() => setCurrentView('dashboard')} />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
