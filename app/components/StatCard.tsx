import StatCounter from './StatCounter';

interface StatCardProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function StatCard({ end, suffix = "+", label }: StatCardProps) {
  return (
    <div className="bg-white/40 rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/60 hover:-translate-y-1 transition-all duration-500">
      <StatCounter end={end} suffix={suffix} className="text-3xl font-light text-slate-900 mb-1" />
      <div className="text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}
