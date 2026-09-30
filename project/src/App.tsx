import { useState, useEffect } from 'react';
import { Sidebar, type PageId } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/pages/Dashboard';
import { NewRecommendation } from '@/pages/NewRecommendation';
import { Result } from '@/pages/Result';
import { MaterialLibrary } from '@/pages/MaterialLibrary';
import { FSSAIGuidance } from '@/pages/FSSAIGuidance';
import { History, type HistoryEntry } from '@/pages/History';
import { About } from '@/pages/About';
import { Report } from '@/pages/Report';
import type { RecommendationInput, RecommendationResult } from '@/lib/types';

type View =
  | { page: PageId }
  | { page: 'result'; input: RecommendationInput; result: RecommendationResult }
  | { page: 'report'; input: RecommendationInput; result: RecommendationResult };

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<View>({ page: 'dashboard' });
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Auto-collapse on tablet
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setCollapsed(true);
      }
    };
    handler();
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const currentNav: PageId =
    view.page === 'result' || view.page === 'report' ? 'new-recommendation' : view.page;

  const navigate = (p: PageId) => {
    setView({ page: p });
    window.scrollTo({ top: 0 });
  };

  const handleResult = (input: RecommendationInput, result: RecommendationResult) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}`,
      product: input.commodityName || 'Untitled',
      date: new Date().toLocaleDateString(),
      material: result.materialName,
      score: result.compatibilityScore,
      storage: `${input.storageType} · ${input.storageTemp}°C`,
      status: 'Completed',
    };
    setHistory((prev) => [entry, ...prev]);
    setView({ page: 'result', input, result });
    window.scrollTo({ top: 0 });
  };

  const handleGenerateReport = () => {
    if (view.page === 'result') {
      setView({ page: 'report', input: view.input, result: view.result });
      window.scrollTo({ top: 0 });
    }
  };

  const handleViewReportFromHistory = (id: string) => {
    const entry = history.find((h) => h.id === id);
    if (entry) {
      navigate('history');
    }
  };

  const mainMargin = collapsed ? 'md:ml-[76px]' : 'md:ml-64';

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        current={currentNav}
        onNavigate={navigate}
      />

      <div className={`transition-all duration-300 ${mainMargin}`}>
        <Header onOpenMobile={() => setMobileOpen(true)} onNavigate={navigate} />

        <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
          {view.page === 'dashboard' && <Dashboard onNavigate={navigate} />}

          {view.page === 'new-recommendation' && (
            <NewRecommendation onResult={handleResult} />
          )}

          {view.page === 'result' && (
            <Result
              input={view.input}
              result={view.result}
              onGenerateReport={handleGenerateReport}
              onNewRecommendation={() => navigate('new-recommendation')}
            />
          )}

          {view.page === 'report' && (
            <Report
              input={view.input}
              result={view.result}
              onBack={() => setView({ page: 'result', input: view.input, result: view.result })}
            />
          )}

          {view.page === 'material-library' && <MaterialLibrary />}

          {view.page === 'fssai-guidance' && <FSSAIGuidance />}

          {view.page === 'history' && (
            <History
              entries={history}
              onViewReport={handleViewReportFromHistory}
              onCompare={() => navigate('new-recommendation')}
            />
          )}

          {view.page === 'about' && <About />}
        </main>
      </div>
    </div>
  );
}

export default App;
