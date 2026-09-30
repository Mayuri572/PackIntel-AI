import { Shield, Info, AlertTriangle, FileCheck2, ScrollText } from 'lucide-react';
import { Card, SectionTitle, Badge } from '@/components/ui';

const REGULATORY_AREAS = [
  {
    title: 'Food Contact Safety',
    desc: 'Packaging materials must comply with FSSAI Packaging Regulation (2024) migration limits for their intended food type and storage conditions.',
  },
  {
    title: 'Migration Limits',
    desc: 'Overall and specific migration limits apply to plastics, multilayer laminates, and coatings used in food contact applications.',
  },
  {
    title: 'Labeling & Declaration',
    desc: 'Food packages must carry FSSAI-mandated labelling including food category, manufacturer, nutritional information and vegetarian/non-vegetarian marks.',
  },
  {
    title: 'Recycled Plastics',
    desc: 'Use of recycled plastics in food contact is restricted and subject to FSSAI/FSS conditions and specific approval requirements.',
  },
];

export function FSSAIGuidance() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          Regulatory Guidance
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-navy-900">FSSAI Compliance Guidance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Decision-support guidance for food packaging regulatory considerations.
        </p>
      </div>

      <Card className="p-5 bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            PackIntel AI provides decision-support guidance and does not constitute official FSSAI
            certification. Final compliance should be verified against applicable regulations,
            standards and testing requirements.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {REGULATORY_AREAS.map((area) => (
          <Card key={area.title} className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-blue-600" />
              <SectionTitle>{area.title}</SectionTitle>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{area.desc}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ScrollText size={18} className="text-teal-600" />
          <SectionTitle>How PackIntel AI Uses This Guidance</SectionTitle>
        </div>
        <ul className="space-y-3">
          {[
            'Each recommendation includes an FSSAI guidance note tailored to the recommended material class.',
            'Barrier and material choices are flagged against food type and storage conditions.',
            'Verification-required items are highlighted so users can follow up with laboratory testing.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
              <FileCheck2 size={16} className="text-teal-600 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5 flex items-start gap-3">
        <Info size={20} className="text-slate-400 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600 leading-relaxed">
          For official regulatory texts and updates, refer to the Food Safety and Standards
          Authority of India (FSSAI) published regulations and relevant Bureau of Indian Standards
          (BIS) packaging standards.
        </p>
      </Card>

      <div className="flex justify-center">
        <Badge tone="amber">Verification Required</Badge>
      </div>
    </div>
  );
}
