import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  FlaskConical,
  Leaf,
  Layers,
  Package,
  Recycle,
  ScrollText,
  Shield,
  Sparkles,
  Thermometer,
  Wheat,
} from 'lucide-react';
import type { PageId } from '@/components/Sidebar';

interface DashboardProps {
  onNavigate: (p: PageId) => void;
}

const PROCESS_CARDS = [
  { num: '01', title: 'Food Properties', icon: FlaskConical, desc: 'Moisture, fat, pH, respiration' },
  { num: '02', title: 'Storage Conditions', icon: Thermometer, desc: 'Temperature, humidity, shelf life' },
  { num: '03', title: 'Material Matching', icon: Layers, desc: 'Compare suitable packaging materials' },
  { num: '04', title: 'Barrier Optimization', icon: Shield, desc: 'OTR, WVTR, seal & strength' },
  { num: '05', title: 'Final Guidance', icon: ScrollText, desc: 'FSSAI, sustainability & cost' },
];

const INFO_STRIP = [
  { title: 'Food Compatibility', icon: FlaskConical, desc: 'Match packaging to food properties' },
  { title: 'Barrier Requirements', icon: Shield, desc: 'Oxygen and moisture protection' },
  { title: 'Storage Conditions', icon: Thermometer, desc: 'Temperature and humidity aware' },
  { title: 'Regulatory Guidance', icon: ScrollText, desc: 'FSSAI decision-support context' },
];

const STATS = [
  { value: '12+', title: 'Food profiles', desc: 'Supported categories' },
  { value: '8', title: 'Packaging materials', desc: 'Curated library' },
  { value: '10+', title: 'Decision factors', desc: 'Explainable rules' },
  { value: '6', title: 'Barrier specs', desc: 'OTR · WVTR · MAP' },
];

function AnalysisCard({ type, title, detail, icon: Icon, className }: { type: string; title: string; detail: string; icon: typeof Shield; className: string }) {
  return (
    <div className={`absolute z-20 flex min-w-[145px] items-center gap-2.5 rounded-xl border border-teal-100 bg-white/95 px-3 py-2.5 shadow-[0_12px_30px_rgba(26,100,120,0.12)] backdrop-blur ${className}`}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><Icon size={15} /></div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-navy-900">{type}</p>
        <p className="mt-0.5 truncate text-[9px] text-slate-400">{title} · {detail}</p>
      </div>
      <ChevronRight size={13} className="ml-auto shrink-0 text-slate-400" />
    </div>
  );
}

function ProductVisual() {
  return (
    <div className="relative mx-auto h-[365px] w-full max-w-[590px] sm:h-[420px]">
      <div className="absolute left-1/2 top-1/2 h-[240px] w-[440px] -translate-x-1/2 translate-y-[8px] rounded-[50%] border border-teal-300/30 bg-gradient-to-br from-teal-800 via-teal-700 to-blue-900 shadow-[0_24px_32px_rgba(7,73,92,0.24)] sm:h-[270px] sm:w-[510px]" />
      <div className="absolute left-1/2 top-1/2 h-[190px] w-[370px] -translate-x-1/2 translate-y-[17px] rounded-[50%] border border-teal-300/20 bg-gradient-to-r from-blue-900/70 to-teal-500/50 sm:h-[215px] sm:w-[430px]" />
      <div className="absolute left-[11%] top-[23%] z-10 h-[190px] w-[126px] -rotate-[8deg] rounded-[11px] border-4 border-white/30 bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-800 p-3 shadow-[0_20px_28px_rgba(6,55,85,0.28)] sm:left-[15%] sm:top-[24%] sm:h-[220px] sm:w-[145px]">
        <div className="flex items-center gap-1 text-[7px] font-bold tracking-wide text-white/80"><Package size={10} /> PACKINTEL</div>
        <div className="mt-10 text-[23px] font-black leading-[0.9] tracking-tight text-white sm:text-[26px]">POTATO<br />CHIPS</div>
        <div className="mt-3 text-[8px] text-blue-100">classic salted</div>
        <div className="absolute bottom-5 left-5 flex gap-1"><span className="h-4 w-6 rounded-[50%] bg-amber-300" /><span className="h-4 w-6 rounded-[50%] bg-amber-400" /><span className="h-4 w-6 rounded-[50%] bg-yellow-300" /></div>
      </div>
      <div className="absolute left-1/2 top-[16%] z-20 h-[248px] w-[134px] -translate-x-1/2 rotate-[7deg] rounded-[20px] border-[5px] border-navy-900 bg-white p-1.5 shadow-[0_22px_30px_rgba(8,46,69,0.35)] sm:top-[12%] sm:h-[285px] sm:w-[153px]">
        <div className="h-full overflow-hidden rounded-[14px] bg-slate-50">
          <div className="flex items-center justify-between bg-white px-2 py-2 text-[6px] font-bold text-navy-900"><span>PackIntel AI</span><span className="h-1.5 w-1.5 rounded-full bg-teal-400" /></div>
          <div className="p-2">
            <p className="text-[6px] uppercase tracking-wider text-slate-400">Live analysis</p>
            <p className="mt-1 text-[12px] font-extrabold text-navy-900">Potato Chips</p>
            <div className="mt-3 rounded-md bg-white p-2 shadow-sm"><div className="flex items-end gap-1"><span className="h-5 w-3 rounded-t bg-teal-400" /><span className="h-7 w-3 rounded-t bg-teal-500" /><span className="h-6 w-3 rounded-t bg-teal-400" /><span className="h-8 w-3 rounded-t bg-blue-500" /></div><p className="mt-1 text-[5px] text-slate-400">Barrier fit</p><div className="mt-1 h-1 rounded-full bg-teal-100"><div className="h-1 w-[92%] rounded-full bg-teal-500" /></div></div>
            <div className="mt-2 rounded-md border border-teal-100 bg-teal-50 p-2"><p className="text-[5px] uppercase text-teal-600">Recommended</p><p className="mt-1 text-[7px] font-bold text-teal-800">Metallized PET/PE</p><div className="mt-1 flex justify-end"><CheckCircle2 size={10} className="text-teal-500" /></div></div>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-slate-300"><span className="text-[8px]">⌂　◌　◎</span></div>
        </div>
      </div>
      <AnalysisCard type="Food properties" title="Moisture · pH" detail="Oil" icon={FlaskConical} className="left-[1%] top-[8%] sm:left-[2%] sm:top-[7%]" />
      <AnalysisCard type="Barrier analysis" title="OTR · WVTR" detail="MAP" icon={Shield} className="right-[1%] top-[13%] sm:right-[0%] sm:top-[12%]" />
      <AnalysisCard type="Sustainability" title="78 / 100" detail="Score" icon={Leaf} className="right-[0%] bottom-[23%] sm:right-[2%] sm:bottom-[24%]" />
      <div className="absolute bottom-[21%] left-[6%] rounded-full border border-teal-200 bg-white px-3 py-1.5 text-[9px] font-bold text-teal-700 shadow-sm sm:left-[8%]">● FRESH MANGO</div>
      <div className="absolute bottom-[5%] left-1/2 z-30 -translate-x-1/2 rounded-full bg-navy-900 px-4 py-2 text-[10px] font-semibold text-white shadow-lg"><Sparkles size={12} className="mr-1 inline text-teal-300" /> Intelligent material matching</div>
    </div>
  );
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-9">
      <section className="relative overflow-hidden rounded-[22px] border border-blue-100 bg-gradient-to-br from-[#f3faff] via-[#f5fbfc] to-[#e9faf7] px-6 py-10 md:px-10 lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[520px] rounded-full bg-teal-200/20 blur-3xl" />
        <div className="relative grid items-center gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:min-h-[430px]">
          <div className="relative z-10 max-w-[560px]">
            <div className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.2em] text-teal-700"><span className="h-2 w-2 rounded-full bg-teal-500 ring-4 ring-teal-100" /> AI-POWERED FOOD PACKAGING INTELLIGENCE</div>
            <h1 className="mt-5 text-[42px] font-extrabold leading-[1.03] tracking-[-0.045em] text-navy-900 sm:text-[52px] lg:text-[57px]">Smart packaging<br /><span className="text-teal-600">recommendations</span> with<br />AI.</h1>
            <p className="mt-5 max-w-[470px] text-sm leading-7 text-slate-500 sm:text-[15px]">Analyze food properties, storage conditions and shelf-life requirements to identify suitable packaging materials and specifications.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => onNavigate('new-recommendation')} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">Start recommendation <ArrowRight size={16} /></button>
              <button onClick={() => onNavigate('material-library')} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:border-teal-200 hover:text-teal-700"><Boxes size={16} /> Explore materials</button>
            </div>
            <div className="mt-7 flex items-center gap-3 text-[10px] text-slate-400"><div className="flex -space-x-1"><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-[8px] text-blue-700">F</span><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-[8px] text-amber-700">Q</span><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-teal-100 text-[8px] text-teal-700">R</span><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[8px] text-slate-500">+</span></div><span>Built for food-tech decisions<br /><b className="font-medium text-slate-500">Validation-ready guidance</b></span></div>
          </div>
          <ProductVisual />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => <div key={stat.title} className="flex min-h-[92px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 shadow-card"><div className="text-2xl font-extrabold tracking-tight text-blue-700">{stat.value}</div><div><p className="text-xs font-bold text-navy-900">{stat.title}</p><p className="mt-1 text-[11px] text-slate-400">{stat.desc}</p></div></div>)}
      </section>

      <section>
        <h2 className="text-xl font-bold text-navy-900">From food properties to packaging decisions</h2>
        <p className="mt-1 text-sm text-slate-500">A structured workflow from input parameters to final packaging guidance.</p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PROCESS_CARDS.map((card, index) => { const Icon = card.icon; return <div key={card.num} className="relative h-full"><div className="flex h-full min-h-[142px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card"><div className="flex items-center justify-between"><span className="text-xs font-bold text-blue-600">{card.num}</span><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600"><Icon size={18} /></span></div><h3 className="mt-3 text-sm font-bold text-navy-900">{card.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{card.desc}</p></div>{index < PROCESS_CARDS.length - 1 && <span className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 xl:block"><ArrowRight size={16} /></span>}</div>; })}
        </div>
      </section>

      <section><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">{INFO_STRIP.map((item, index) => { const Icon = item.icon; return <div key={item.title} className={`flex items-start gap-4 p-5 lg:p-6 ${index < INFO_STRIP.length - 1 ? 'border-b border-slate-200 lg:border-b-0 lg:border-r' : ''}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon size={20} /></span><div><h3 className="text-sm font-bold text-navy-900">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p></div></div>; })}</div></div></section>

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 px-6 py-10 text-white md:px-10"><div className="relative"><span className="text-xs font-bold uppercase tracking-widest text-teal-300">Why it matters</span><h2 className="mt-2 text-2xl font-extrabold">Better barrier decisions. Less food waste.</h2><div className="mt-7 grid gap-6 md:grid-cols-3"><div><Wheat size={21} className="text-teal-300" /><h3 className="mt-3 font-bold">Better Shelf Life</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Packaging decisions based on food properties and storage conditions.</p></div><div><Recycle size={21} className="text-teal-300" /><h3 className="mt-3 font-bold">Sustainable Choices</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Compare material performance with sustainability considerations.</p></div><div><ScrollText size={21} className="text-teal-300" /><h3 className="mt-3 font-bold">Regulatory Guidance</h3><p className="mt-1 text-sm leading-relaxed text-slate-300">Keep FSSAI-related packaging guidance visible during decision-making.</p></div></div></div></section>
    </div>
  );
}
