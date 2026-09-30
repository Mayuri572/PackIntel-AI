import { Package } from 'lucide-react';

export function Logo({ size = 36, withText = true }: { size?: number; withText?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 shadow-md shrink-0"
        style={{ width: size, height: size }}
      >
        <Package size={size * 0.5} className="text-white" strokeWidth={2.2} />
        <span
          className="absolute -bottom-0.5 -right-0.5 rounded-full bg-emerald-400 ring-2 ring-white"
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      </div>
      {withText && (
        <div className="leading-tight">
          <div className="font-bold text-navy-900 tracking-tight text-[15px]">PackIntel AI</div>
          <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
            Packaging Intelligence
          </div>
        </div>
      )}
    </div>
  );
}
