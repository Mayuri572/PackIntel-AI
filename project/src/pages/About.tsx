import { Sparkles, Target, Layers, Shield, Leaf, ScrollText, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Card, SectionTitle } from '@/components/ui';

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">About</span>
        <h1 className="mt-1 text-2xl font-extrabold text-navy-900">About PackIntel AI</h1>
      </div>

      <Card className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <Logo size={56} />
          <div>
            <h2 className="text-lg font-bold text-navy-900">AI-Based Intelligent Food Packaging Material Recommendation System</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              PackIntel AI helps users select suitable food packaging materials by considering food
              properties, storage conditions, barrier requirements, sustainability, cost and
              FSSAI-related regulatory guidance — all in one decision-support workflow.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-blue-600" />
            <SectionTitle>What It Does</SectionTitle>
          </div>
          <ul className="space-y-2.5">
            {[
              'Analyzes food properties such as moisture, fat, pH and respiration.',
              'Factors in storage temperature, humidity and shelf-life requirements.',
              'Matches these inputs against suitable packaging materials.',
              'Produces barrier, sustainability, cost and FSSAI guidance in one report.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={18} className="text-teal-600" />
            <SectionTitle>Key Capabilities</SectionTitle>
          </div>
          <ul className="space-y-2.5">
            {[
              'Material library with OTR, WVTR, strength and sealability.',
              'Compatibility scoring and alternative material suggestions.',
              'MAP suitability evaluation for fresh produce.',
              'Report generation with full recommendation details.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Shield, title: 'Decision-Support', desc: 'Guidance, not certification.' },
          { icon: Leaf, title: 'Sustainability-Aware', desc: 'Material end-of-life considered.' },
          { icon: ScrollText, title: 'FSSAI Context', desc: 'Regulatory guidance included.' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-5 text-center">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center mx-auto">
                <Icon size={22} className="text-teal-600" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-navy-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 bg-slate-50">
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600 leading-relaxed">
            PackIntel AI is a presentation-ready decision-support tool. It does not replace
            laboratory testing, official regulatory certification, or professional packaging
            engineering judgement.
          </p>
        </div>
      </Card>
    </div>
  );
}
