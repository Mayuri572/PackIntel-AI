import { useState } from 'react';
import { Sparkles, Loader2, Leaf, Shield, Clock, DollarSign, Boxes } from 'lucide-react';
import type { RecommendationInput, RecommendationResult } from '@/lib/types';
import { EMPTY_INPUT } from '@/lib/types';
import { generateRecommendation, PROCESSING_STEPS } from '@/lib/recommendation';

const FOOD_CATEGORIES: RecommendationInput['foodCategory'][] = [
  'Packaged Snack',
  'Fresh Fruit',
  'Fresh Vegetable',
  'Dairy',
  'Bakery',
  'Processed Food',
  'Beverage',
  'Frozen Food',
  'Meat & Seafood',
];

const STORAGE_TYPES: RecommendationInput['storageType'][] = ['Ambient', 'Chilled', 'Frozen'];
const TRANSPORT_OPTIONS: RecommendationInput['transportation'][] = ['Local', 'Regional', 'Long Distance'];
const PACKAGING_FORMATS: RecommendationInput['packagingFormat'][] = [
  'Flexible Pouch',
  'Rigid Container',
  'Tray + Film',
  'Perforated / Ventilated Produce Pack',
  'Carton',
];

const PRIORITIES = [
  { label: 'Shelf Life', icon: Clock },
  { label: 'Food Safety', icon: Shield },
  { label: 'Cost', icon: DollarSign },
  { label: 'Sustainability', icon: Leaf },
  { label: 'Barrier Protection', icon: Boxes },
];

interface NewRecommendationProps {
  onResult: (input: RecommendationInput, result: RecommendationResult) => void;
}

export function NewRecommendation({ onResult }: NewRecommendationProps) {
  const [input, setInput] = useState<RecommendationInput>(EMPTY_INPUT);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof RecommendationInput>(key: K, value: RecommendationInput[K]) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const togglePriority = (p: string) => {
    setInput((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(p)
        ? prev.priorities.filter((x) => x !== p)
        : [...prev.priorities, p],
    }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!input.commodityName.trim()) e.commodityName = 'Required';
    if (input.moisture === '' || isNaN(Number(input.moisture))) e.moisture = 'Required';
    if (input.fatContent === '' || isNaN(Number(input.fatContent))) e.fatContent = 'Required';
    if (input.pH === '' || isNaN(Number(input.pH))) e.pH = 'Required';
    if (input.shelfLife === '' || isNaN(Number(input.shelfLife))) e.shelfLife = 'Required';
    if (input.storageTemp === '' || isNaN(Number(input.storageTemp))) e.storageTemp = 'Required';
    if (input.humidity === '' || isNaN(Number(input.humidity))) e.humidity = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAnalyze = () => {
    if (!validate()) return;
    setStatus('processing');
    setStepIdx(0);
    let idx = 0;
    const interval = setInterval(() => {
      idx += 1;
      if (idx < PROCESSING_STEPS.length) {
        setStepIdx(idx);
      } else {
        clearInterval(interval);
        const result = generateRecommendation(input);
        setStatus('done');
        setTimeout(() => onResult(input, result), 600);
      }
    }, 700);
  };

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg">
          <Loader2 size={32} className="text-white animate-spin" />
        </div>
        <h2 className="mt-6 text-lg font-bold text-navy-900">Analyzing with PackIntel AI</h2>
        <div className="mt-6 w-full max-w-md space-y-3">
          {PROCESSING_STEPS.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                i < stepIdx
                  ? 'border-teal-200 bg-teal-50 text-teal-700'
                  : i === stepIdx
                  ? 'border-blue-300 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              {i < stepIdx ? (
                <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs">✓</span>
              ) : i === stepIdx ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <span className="w-5 h-5 rounded-full border-2 border-slate-300" />
              )}
              <span className="text-sm font-medium">{step}</span>
            </div>
          ))}
        </div>
        {stepIdx >= PROCESSING_STEPS.length - 1 && (
          <div className="mt-6 text-sm font-semibold text-teal-600 animate-fade-in-up">
            Recommendation Ready
          </div>
        )}
      </div>
    );
  }

  const inputCls = (field: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none ${
      errors[field]
        ? 'border-red-400 focus:border-red-500'
        : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
    }`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          Recommendation Workspace
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-navy-900">Tell us about the food</h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter the food properties and storage conditions to generate a packaging recommendation.
        </p>
      </div>

      {/* 01 Food Information */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-blue-600">01</span>
          <h2 className="text-base font-bold text-navy-900">Food Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Commodity Name" required error={errors.commodityName}>
            <input
              type="text"
              value={input.commodityName}
              onChange={(e) => update('commodityName', e.target.value)}
              placeholder="e.g. Potato Chips"
              className={inputCls('commodityName')}
            />
          </Field>
          <Field label="Food Category" required>
            <select
              value={input.foodCategory}
              onChange={(e) => update('foodCategory', e.target.value as RecommendationInput['foodCategory'])}
              className={inputCls('foodCategory')}
            >
              {FOOD_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Moisture Content (%)" required error={errors.moisture}>
            <input
              type="number"
              value={input.moisture}
              onChange={(e) => update('moisture', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 2"
              className={inputCls('moisture')}
            />
          </Field>
          <Field label="Oil / Fat Content (%)" required error={errors.fatContent}>
            <input
              type="number"
              value={input.fatContent}
              onChange={(e) => update('fatContent', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 35"
              className={inputCls('fatContent')}
            />
          </Field>
          <Field label="pH" required error={errors.pH}>
            <input
              type="number"
              step="0.1"
              value={input.pH}
              onChange={(e) => update('pH', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 6.0"
              className={inputCls('pH')}
            />
          </Field>
          <Field label="Respiration Rate">
            <input
              type="text"
              value={input.respirationRate}
              onChange={(e) => update('respirationRate', e.target.value)}
              placeholder="e.g. High / Low / Not Applicable"
              className={inputCls('respirationRate')}
            />
          </Field>
        </div>
      </section>

      {/* 02 Storage Requirements */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-blue-600">02</span>
          <h2 className="text-base font-bold text-navy-900">Storage Requirements</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Desired Shelf Life (days)" required error={errors.shelfLife}>
            <input
              type="number"
              value={input.shelfLife}
              onChange={(e) => update('shelfLife', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 180"
              className={inputCls('shelfLife')}
            />
          </Field>
          <Field label="Storage Type">
            <select
              value={input.storageType}
              onChange={(e) => update('storageType', e.target.value as RecommendationInput['storageType'])}
              className={inputCls('storageType')}
            >
              {STORAGE_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Storage Temperature (°C)" required error={errors.storageTemp}>
            <input
              type="number"
              value={input.storageTemp}
              onChange={(e) => update('storageTemp', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 25"
              className={inputCls('storageTemp')}
            />
          </Field>
          <Field label="Relative Humidity (%)" required error={errors.humidity}>
            <input
              type="number"
              value={input.humidity}
              onChange={(e) => update('humidity', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 50"
              className={inputCls('humidity')}
            />
          </Field>
          <Field label="Transportation">
            <select
              value={input.transportation}
              onChange={(e) => update('transportation', e.target.value as RecommendationInput['transportation'])}
              className={inputCls('transportation')}
            >
              {TRANSPORT_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Packaging Format">
            <select
              value={input.packagingFormat}
              onChange={(e) => update('packagingFormat', e.target.value as RecommendationInput['packagingFormat'])}
              className={inputCls('packagingFormat')}
            >
              {PACKAGING_FORMATS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* 03 Priorities */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-blue-600">03</span>
          <h2 className="text-base font-bold text-navy-900">Priorities</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {PRIORITIES.map((p) => {
            const Icon = p.icon;
            const active = input.priorities.includes(p.label);
            return (
              <button
                key={p.label}
                onClick={() => togglePriority(p.label)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                <Icon size={16} />
                {p.label}
              </button>
            );
          })}
        </div>
      </section>

      <button
        onClick={handleAnalyze}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white text-base font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
      >
        <Sparkles size={20} />
        Analyze with PackIntel AI
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
