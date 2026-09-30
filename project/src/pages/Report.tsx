import { FileText, Download, Printer, ArrowLeft } from 'lucide-react';
import type { RecommendationInput, RecommendationResult } from '@/lib/types';
import { Logo } from '@/components/Logo';
import { Card, SectionTitle, SpecRow } from '@/components/ui';

interface ReportProps {
  input: RecommendationInput;
  result: RecommendationResult;
  onBack: () => void;
}

export function Report({ input, result, onBack }: ReportProps) {
  const handlePrint = () => window.print();

  const handleDownload = () => {
    const lines = [
      'PACKINTEL AI — PACKAGING RECOMMENDATION REPORT',
      '',
      `Product: ${input.commodityName}`,
      `Food Category: ${input.foodCategory}`,
      `Date: ${new Date().toLocaleString()}`,
      '',
      '--- Input Parameters ---',
      `Moisture Content (%): ${input.moisture}`,
      `Oil / Fat Content (%): ${input.fatContent}`,
      `pH: ${input.pH}`,
      `Respiration Rate: ${input.respirationRate || 'N/A'}`,
      `Desired Shelf Life (days): ${input.shelfLife}`,
      `Storage Type: ${input.storageType}`,
      `Storage Temperature (°C): ${input.storageTemp}`,
      `Relative Humidity (%): ${input.humidity}`,
      `Transportation: ${input.transportation}`,
      `Packaging Format: ${input.packagingFormat}`,
      `Priorities: ${input.priorities.join(', ')}`,
      '',
      '--- Recommended Material ---',
      `Material: ${result.materialName}`,
      `Structure: ${result.structure}`,
      `Recommendation Score: ${result.compatibilityScore}/100`,
      `Shelf-Life Target: ${result.shelfLifeTarget}`,
      `Storage Conditions: ${result.storageConditions}`,
      `Packaging Format: ${result.packagingFormat}`,
      '',
      '--- Barrier Specifications ---',
      `OTR: ${result.otr}`,
      `WVTR: ${result.wvtr}`,
      `Thickness: ${result.thickness}`,
      `Sealability: ${result.sealability}`,
      `Mechanical Strength: ${result.mechanicalStrength}`,
      '',
      '--- MAP Recommendation ---',
      `MAP Suitability: ${result.mapSuitability}`,
      result.mapO2 ? `O2 Target: ${result.mapO2}` : '',
      result.mapCO2 ? `CO2 Target: ${result.mapCO2}` : '',
      result.mapNote ? `Note: ${result.mapNote}` : '',
      '',
      '--- FSSAI Guidance ---',
      result.fssaiGuidance,
      '',
      '--- Sustainability ---',
      result.sustainability,
      '',
      '--- Cost Category ---',
      result.costCategory,
      '',
      '--- Alternative Material ---',
      `${result.alternative.name} (${result.alternative.structure})`,
      result.alternative.note,
      '',
      '--- Why This Material? ---',
      result.whyThisMaterial,
      '',
      '--- Disclaimer ---',
      'PackIntel AI provides decision-support guidance and does not constitute official FSSAI certification. Final compliance should be verified against applicable regulations, standards and testing requirements.',
    ].filter(Boolean);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PackIntelAI-Report-${input.commodityName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy-900"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Download size={16} /> Download Report
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Printer size={16} /> Print Report
          </button>
        </div>
      </div>

      <Card className="p-6 md:p-8" id="report-content">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <Logo size={40} />
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase">Recommendation Report</div>
            <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Product */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />
            <h1 className="text-lg font-extrabold text-navy-900">{input.commodityName}</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">{input.foodCategory}</p>
        </div>

        {/* Input Parameters */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Input Parameters</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <SpecRow label="Moisture Content (%)" value={String(input.moisture)} />
            <SpecRow label="Oil / Fat Content (%)" value={String(input.fatContent)} />
            <SpecRow label="pH" value={String(input.pH)} />
            <SpecRow label="Respiration Rate" value={input.respirationRate || 'N/A'} />
            <SpecRow label="Desired Shelf Life" value={`${input.shelfLife} days`} />
            <SpecRow label="Storage Type" value={input.storageType} />
            <SpecRow label="Storage Temperature" value={`${input.storageTemp} °C`} />
            <SpecRow label="Relative Humidity" value={`${input.humidity}%`} />
            <SpecRow label="Transportation" value={input.transportation} />
            <SpecRow label="Packaging Format" value={input.packagingFormat} />
            <SpecRow label="Priorities" value={input.priorities.join(', ')} />
          </div>
        </div>

        {/* Recommended Material */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Recommended Material</SectionTitle>
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 p-5">
            <div className="text-lg font-extrabold text-navy-900">{result.materialName}</div>
            <div className="text-sm text-slate-600">Packaging Structure: {result.structure}</div>
            <div className="mt-2 text-sm">
              <span className="text-slate-500">Recommendation Score: </span>
              <span className="font-bold text-blue-700">{result.compatibilityScore}/100</span>
            </div>
          </div>
        </div>

        {/* Barrier Specifications */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Barrier Specifications</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <SpecRow label="OTR" value={result.otr} />
            <SpecRow label="WVTR" value={result.wvtr} />
            <SpecRow label="Thickness" value={result.thickness} />
            <SpecRow label="Sealability" value={result.sealability} />
            <SpecRow label="Mechanical Strength" value={result.mechanicalStrength} />
          </div>
        </div>

        {/* MAP */}
        <div className="mt-6">
          <SectionTitle className="mb-3">MAP Recommendation</SectionTitle>
          <p className="text-sm text-slate-600">{result.mapSuitability}</p>
          {result.mapO2 && <p className="text-sm text-slate-600 mt-1">O₂ Target: {result.mapO2}</p>}
          {result.mapCO2 && <p className="text-sm text-slate-600">CO₂ Target: {result.mapCO2}</p>}
          {result.mapNote && (
            <p className="text-xs text-amber-600 mt-2">{result.mapNote}</p>
          )}
        </div>

        {/* FSSAI */}
        <div className="mt-6">
          <SectionTitle className="mb-3">FSSAI Guidance</SectionTitle>
          <p className="text-sm text-slate-600 leading-relaxed">{result.fssaiGuidance}</p>
        </div>

        {/* Sustainability */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Sustainability</SectionTitle>
          <p className="text-sm text-slate-600 leading-relaxed">{result.sustainability}</p>
        </div>

        {/* Cost */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Cost Category</SectionTitle>
          <p className="text-sm text-slate-600">{result.costCategory}</p>
        </div>

        {/* Alternative */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Alternative Material</SectionTitle>
          <p className="text-sm font-semibold text-navy-900">{result.alternative.name}</p>
          <p className="text-xs text-slate-500">{result.alternative.structure}</p>
          <p className="text-sm text-slate-600 mt-1">{result.alternative.note}</p>
        </div>

        {/* Why */}
        <div className="mt-6">
          <SectionTitle className="mb-3">Why This Material?</SectionTitle>
          <p className="text-sm text-slate-600 leading-relaxed">{result.whyThisMaterial}</p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-slate-200 pt-5">
          <p className="text-xs text-slate-400 leading-relaxed">
            PackIntel AI provides decision-support guidance and does not constitute official FSSAI
            certification. Final compliance should be verified against applicable regulations,
            standards and testing requirements.
          </p>
        </div>
      </Card>
    </div>
  );
}
