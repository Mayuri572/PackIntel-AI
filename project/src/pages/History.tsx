import { Eye, GitCompare, History as HistoryIcon } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

export interface HistoryEntry {
  id: string;
  product: string;
  date: string;
  material: string;
  score: number;
  storage: string;
  status: 'Completed' | 'Viewed';
}

interface HistoryProps {
  entries: HistoryEntry[];
  onViewReport: (id: string) => void;
  onCompare: (id: string) => void;
}

export function History({ entries, onViewReport, onCompare }: HistoryProps) {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          Activity Log
        </span>
        <h1 className="mt-1 text-2xl font-extrabold text-navy-900">Recommendation History</h1>
        <p className="mt-1 text-sm text-slate-500">
          Past packaging recommendations generated through PackIntel AI.
        </p>
      </div>

      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
              <HistoryIcon size={26} className="text-slate-400" />
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-600">No recommendations yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Generate a new recommendation to see it appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Product</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Date</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Recommended Material</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Score</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Storage</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-navy-900">{e.product}</td>
                    <td className="px-4 py-3 text-slate-500">{e.date}</td>
                    <td className="px-4 py-3 text-slate-600">{e.material}</td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-blue-700">{e.score}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{e.storage}</td>
                    <td className="px-4 py-3">
                      <Badge tone={e.status === 'Completed' ? 'green' : 'neutral'}>{e.status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewReport(e.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Eye size={14} /> View Report
                        </button>
                        <button
                          onClick={() => onCompare(e.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <GitCompare size={14} /> Compare
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
