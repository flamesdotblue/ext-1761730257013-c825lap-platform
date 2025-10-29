import { Trash2 } from 'lucide-react';

function formatTime(iso) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(d);
}

function formatCurrency(n) {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

const categoryColors = {
  Food: 'bg-amber-500/20 text-amber-200',
  Transport: 'bg-sky-500/20 text-sky-200',
  Bills: 'bg-violet-500/20 text-violet-200',
  Shopping: 'bg-pink-500/20 text-pink-200',
  Health: 'bg-emerald-500/20 text-emerald-200',
  Salary: 'bg-emerald-500/20 text-emerald-200',
  Other: 'bg-slate-500/20 text-slate-200',
};

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/60">
        No transactions for today yet.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {transactions.map((t) => (
        <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 shrink-0 rounded-full ${categoryColors[t.category] || 'bg-slate-500/20 text-slate-200'} grid place-items-center text-xs font-medium`}>
              {t.category?.[0] || '•'}
            </div>
            <div>
              <div className="text-sm font-medium">{t.note || t.category}</div>
              <div className="text-xs text-white/60">{formatTime(t.date)} · {t.category} · {t.type}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-sm font-semibold ${t.type === 'expense' ? 'text-rose-300' : 'text-emerald-300'}`}>
              {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
            </div>
            <button
              aria-label="Delete"
              onClick={() => onDelete(t.id)}
              className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
