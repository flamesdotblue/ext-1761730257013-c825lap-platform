import { useMemo, useState } from 'react';
import { Wallet, Calendar } from 'lucide-react';

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export default function DailySummary({ date, income, expense, net, dailyBudget, onBudgetChange }) {
  const [editing, setEditing] = useState(false);
  const remaining = useMemo(() => Math.max(dailyBudget - expense, 0), [dailyBudget, expense]);
  const progress = useMemo(() => {
    if (dailyBudget <= 0) return 0;
    return Math.min(expense / dailyBudget, 1);
  }, [expense, dailyBudget]);

  const dateLabel = useMemo(() => {
    return new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  }, [date]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80">
          <Calendar size={18} />
          <span className="text-sm">{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Wallet size={18} />
          <button
            onClick={() => setEditing((v) => !v)}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/15"
          >
            {editing ? 'Done' : 'Budget'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Income" value={formatCurrency(income)} tone="green" />
        <StatCard label="Spent" value={formatCurrency(expense)} tone="red" />
        <StatCard label="Net" value={formatCurrency(net)} tone={net >= 0 ? 'green' : 'red'} />
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-white/70">
          <span>Daily Budget</span>
          <span>{formatCurrency(dailyBudget)}</span>
        </div>
        <div className="relative h-2 w-full rounded-full bg-white/10">
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-white/70">Remaining: {formatCurrency(remaining)}</div>
      </div>

      {editing && (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            value={dailyBudget}
            onChange={(e) => onBudgetChange(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-0 focus:border-white/20"
            placeholder="Set daily budget"
          />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, tone = 'neutral' }) {
  const colors = {
    green: 'from-emerald-400 to-emerald-600',
    red: 'from-rose-400 to-rose-600',
    neutral: 'from-slate-300 to-slate-500',
  };
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-[11px] uppercase tracking-wide text-white/60">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
      <div className={`mt-2 h-1.5 w-full rounded-full bg-gradient-to-r ${colors[tone]}`} />
    </div>
  );
}
