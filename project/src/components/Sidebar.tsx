import {
  LayoutDashboard,
  Sparkles,
  Layers,
  ScrollText,
  History as HistoryIcon,
  Info,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  CircleHelp,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Logo } from './Logo';

export type PageId =
  | 'dashboard'
  | 'new-recommendation'
  | 'material-library'
  | 'fssai-guidance'
  | 'history'
  | 'about';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'new-recommendation', label: 'New recommendation', icon: Sparkles },
  { id: 'material-library', label: 'Material library', icon: Layers },
  { id: 'fssai-guidance', label: 'FSSAI guidance', icon: ScrollText },
  { id: 'history', label: 'History', icon: HistoryIcon },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  current: PageId;
  onNavigate: (p: PageId) => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  current,
  onNavigate,
}: SidebarProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    onCloseMobile();
  };

  const content = (
    <>
      <div className={`flex items-center border-b border-slate-100 ${collapsed ? 'justify-center px-2' : 'px-6'} h-[76px]`}>
        <Logo size={38} withText={!collapsed} />
      </div>

      {!collapsed && (
        <div className="mx-5 mt-3 flex items-center justify-between rounded-xl border border-teal-100 bg-teal-50/70 px-3 py-2.5 text-[11px]">
          <span className="flex items-center gap-2 font-semibold text-teal-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
            System ready
          </span>
          <span className="text-slate-400">Decision support</span>
        </div>
      )}

      <nav className={`flex-1 overflow-y-auto scrollbar-thin ${collapsed ? 'px-3 py-5' : 'px-4 py-5'}`}>
        <div className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                title={collapsed ? item.label : undefined}
                className={`group flex w-full items-center rounded-xl transition-all ${
                  collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-3'
                } ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-navy-900'
                }`}
              >
                <Icon size={19} className="shrink-0" strokeWidth={active ? 2.3 : 1.9} />
                {!collapsed && <span className="text-sm">{item.label}</span>}
                {active && !collapsed && <ChevronRight size={16} className="ml-auto text-blue-500" />}
              </button>
            );
          })}
        </div>
      </nav>

      {!collapsed && (
        <div className="px-5 pb-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3.5">
            <div className="flex items-start gap-2.5">
              <CircleHelp size={18} className="mt-0.5 shrink-0 text-teal-600" />
              <div>
                <p className="text-xs font-bold text-navy-900">Need a starting point?</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">Load a common food profile to begin.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNav('about')}
            className={`mt-3 flex w-full items-center gap-3 border-b border-slate-100 px-2 py-3 text-left text-xs text-slate-500 transition-colors hover:text-navy-900`}
          >
            <BookOpen size={17} />
            About PackIntel AI
          </button>
          <p className="px-2 pt-3 text-[10px] leading-relaxed text-slate-400">
            Decision support for better shelf life
            <br />
            and less food waste
          </p>
        </div>
      )}

      <div className="border-t border-slate-100 p-3">
        <button
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-navy-900"
        >
          {collapsed ? <PanelLeftOpen size={19} className="mx-auto" /> : <PanelLeftClose size={19} />}
          {!collapsed && <span className="text-xs">Collapse sidebar</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-navy-950/35 backdrop-blur-sm md:hidden" onClick={onCloseMobile} />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-all duration-300 md:z-30 md:flex ${collapsed ? 'md:w-[76px]' : 'md:w-[260px]'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="md:hidden flex h-[76px] items-center justify-between border-b border-slate-100 px-5">
          <Logo size={36} />
          <button onClick={onCloseMobile} className="rounded-lg p-2 text-slate-400 hover:bg-slate-50" aria-label="Close menu">
            <X size={19} />
          </button>
        </div>
        <div className="hidden md:flex h-full flex-col">{content}</div>
        <div className="md:hidden flex h-full flex-col">{content}</div>
      </aside>
    </>
  );
}
