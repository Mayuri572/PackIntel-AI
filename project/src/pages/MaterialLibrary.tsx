import { Layers, Recycle, DollarSign, Shield, Wrench, FlaskConical } from 'lucide-react';
import { MATERIALS } from '@/lib/materials';
import { Card, Badge } from '@/components/ui';

export function MaterialLibrary() {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          Reference Library
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-navy-900">Material Library</h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse common food packaging materials with key properties and performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {MATERIALS.map((m) => (
          <Card key={m.id} className="p-5 hover:shadow-card-hover transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-navy-900">{m.name}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{m.structure}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Layers size={18} className="text-teal-600" />
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5">
              <FlaskConical size={15} className="text-slate-400 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">{m.applications}</p>
            </div>

            <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
              <Row icon={Shield} label="Barrier Level" value={m.barrierLevel} />
              <Row icon={Wrench} label="Strength" value={m.strength} />
              <Row icon={Wrench} label="Sealability" value={m.sealability} />
              <Row icon={Recycle} label="Sustainability" value={m.sustainability} />
              <Row icon={DollarSign} label="Relative Cost" value={m.cost} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="blue">OTR: {m.otr}</Badge>
              <Badge tone="teal">WVTR: {m.wvtr}</Badge>
              <Badge tone="neutral">{m.thickness}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Shield;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-xs text-slate-500">
        <Icon size={14} className="text-slate-400" />
        {label}
      </span>
      <span className="text-xs font-semibold text-navy-900 text-right">{value}</span>
    </div>
  );
}
