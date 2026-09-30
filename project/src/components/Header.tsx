import { Menu, UserCircle, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import type { PageId } from './Sidebar';

interface HeaderProps {
  onOpenMobile: () => void;
  onNavigate: (p: PageId) => void;
}

export function Header({ onOpenMobile, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-100 bg-white px-5 md:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onOpenMobile} className="rounded-lg p-2 text-slate-500 hover:bg-slate-50 md:hidden" aria-label="Open menu">
          <Menu size={21} />
        </button>
        <div className="md:hidden"><Logo size={31} withText={false} /></div>
        <div className="hidden items-center gap-2.5 md:flex">
          <Logo size={25} withText={false} />
          <span className="text-sm font-bold tracking-tight text-navy-900">PackIntel AI</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button title="Account" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200">
          <UserCircle size={20} />
        </button>
        <button onClick={() => onNavigate('new-recommendation')} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700 sm:text-sm">
          <Sparkles size={15} />
          <span className="hidden sm:inline">New recommendation</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </header>
  );
}
