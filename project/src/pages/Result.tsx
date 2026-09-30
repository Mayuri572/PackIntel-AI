import {
  Shield,
  Leaf,
  DollarSign,
  FileText,
  Layers3,
  Sparkles,
  ArrowRight,
  Info,
  Gauge,
  Boxes,
} from 'lucide-react';
import type { RecommendationInput, RecommendationResult } from '@/lib/types';
import { Card, SectionTitle, SpecRow, Badge } from '@/components/ui';

interface ResultProps {
  input: RecommendationInput;
  result: RecommendationResult;
  onGenerateReport: () => void;
  onNewRecommendation: () => void;
}

export function Result({ input, result, onGenerateReport, onNewRecommendation }: ResultProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
      {/* Top banner */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="text-xs font-bold tracking-widest text-teal-600 uppercase">
            Recommendation Ready
          </span>
          <h1 className="mt-1 text-2xl font-extrabold text-navy-900">Packaging Recommendation</h1>
          <p className="text-sm text-slate-500">
            {input.commodityName} · {input.foodCategory}
          </p>
        </div>
        <button
          onClick={onNewRecommendation}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Sparkles size={16} /> New Recommendation
        </button>
      </div>

      {/* Recommended material + score */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Recommended Material
            </span>
            <h2 className="mt-1 text-xl font-extrabold text-navy-900">{result.materialName}</h2>
            <p className="mt-1 text-sm text-slate-500">Structure: {result.structure}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone="blue">{result.packagingFormat}</Badge>
              <Badge tone="teal">{result.shelfLifeTarget} shelf life</Badge>
              <Badge tone="neutral">{result.storageConditions}</Badge>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-5 min-w-[160px]">
            <span className="text-xs font-semibold text-slate-500 uppercase">Compatibility</span>
            <span className="mt-1 text-4xl font-extrabold text-blue-700">
              {result.compatibilityScore}
            </span>
            <span className="text-xs text-slate-400">out of 100</span>
            <div className="mt-2 w-full h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"
                style={{ width: `${result.compatibilityScore}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Barrier Specifications */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gauge size={18} className="text-teal-600" />
          <SectionTitle>Barrier Specifications</SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
          <SpecRow label="OTR (Oxygen Transmission Rate)" value={result.otr} />
          <SpecRow label="WVTR (Water Vapor Transmission Rate)" value={result.wvtr} />
          <SpecRow label="Thickness" value={result.thickness} />
          <SpecRow label="Sealability" value={result.sealability} />
          <SpecRow label="Mechanical Strength" value={result.mechanicalStrength} />
          <SpecRow label="Shelf-Life Target" value={result.shelfLifeTarget} />
        </div>
      </Card>

      {/* MAP Suitability */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Boxes size={18} className="text-blue-600" />
          <SectionTitle>MAP Suitability</SectionTitle>
        </div>
        <p className="text-sm text-slate-600">{result.mapSuitability}</p>
        {result.mapO2 && result.mapCO2 && (
          <div className="mt-3 flex flex-wrap gap-4">
            <div className="rounded-lg bg-blue-50 px-4 py-2">
              <span className="text-xs text-slate-500">O₂ Target</span>
              <div className="text-sm font-bold text-blue-700">{result.mapO2}</div>
            </div>
            <div className="rounded-lg bg-teal-50 px-4 py-2">
              <span className="text-xs text-slate-500">CO₂ Target</span>
              <div className="text-sm font-bold text-teal-700">{result.mapCO2}</div>
            </div>
          </div>
        )}
        {result.mapNote && (
          <p className="mt-3 flex items-start gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg p-3">
            <Info size={14} className="shrink-0 mt-0.5" />
            {result.mapNote}
          </p>
        )}
      </Card>

      {/* Why this material */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Info size={18} className="text-navy-700" />
          <SectionTitle>Why This Material?</SectionTitle>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{result.whyThisMaterial}</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FSSAI */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-blue-600" />
            <SectionTitle>FSSAI Compliance Guidance</SectionTitle>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{result.fssaiGuidance}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
            <Info size={14} /> Verification Required
          </div>
        </Card>

        {/* Sustainability */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={18} className="text-emerald-600" />
            <SectionTitle>Sustainability</SectionTitle>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{result.sustainability}</p>
        </Card>
      </div>

      {/* Cost + Alternative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-amber-600" />
            <SectionTitle>Cost Category</SectionTitle>
          </div>
          <p className="text-sm text-slate-600">{result.costCategory}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers3 size={18} className="text-slate-600" />
            <SectionTitle>Alternative Material</SectionTitle>
          </div>
          <p className="text-sm font-semibold text-navy-900">{result.alternative.name}</p>
          <p className="text-xs text-slate-500">{result.alternative.structure}</p>
          <p className="mt-2 text-sm text-slate-600">{result.alternative.note}</p>
        </Card>
      </div>

      {/* Report */}
      <Card className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileText size={20} className="text-blue-600" />
          <div>
            <p className="text-sm font-bold text-navy-900">Generate a detailed report</p>
            <p className="text-xs text-slate-500">
              Full packaging recommendation report with all specifications and guidance.
            </p>
          </div>
        </div>
        <button
          onClick={onGenerateReport}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Generate Report <ArrowRight size={16} />
        </button>
      </Card>
    </div>
  );
}
