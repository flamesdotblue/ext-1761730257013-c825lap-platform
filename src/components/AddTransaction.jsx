import { useState } from 'react';
import { Plus, X } from 'lucide-react';

const defaultForm = {
  type: 'expense',
  category: 'Food',
  amount: '',
  note: '',
};

const expenseCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Health', 'Other'];
const incomeCategories = ['Salary', 'Other'];

export default function AddTransaction({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);

  function reset() {
    setForm(defaultForm);
  }

  function submit(e) {
    e.preventDefault();
    const amountNum = Number(form.amount);
    if (!amountNum || amountNum <= 0) return;
    const tx = {
      type: form.type,
      category: form.category,
      amount: amountNum,
      note: form.note.trim(),
      date: new Date().toISOString(),
    };
    onAdd(tx);
    reset();
    setOpen(false);
  }

  const categories = form.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-20 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-white text-neutral-900 px-4 py-3 shadow-lg shadow-black/40"
        >
          <Plus size={18} />
          <span className="text-sm font-semibold">Add Transaction</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-30">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-neutral-900 p-4 shadow-2xl">
            <div className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
            <div className="mt-3 mb-2 flex items-center justify-between">
              <h3 className="text-base font-semibold">New Transaction</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: 'expense', category: expenseCategories[0] }))}
                  className={`rounded-xl border px-3 py-2 text-sm ${form.type === 'expense' ? 'border-rose-300/40 bg-rose-300/10 text-rose-200' : 'border-white/10 bg-white/5 text-white/80'}`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, type: 'income', category: incomeCategories[0] }))}
                  className={`rounded-xl border px-3 py-2 text-sm ${form.type === 'income' ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/80'}`}
                >
                  Income
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <label className="mb-1 block text-xs text-white/60">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <label className="mb-1 block text-xs text-white/60">Amount</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={form.amount}
                    onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-white/60">Note</label>
                <input
                  type="text"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder="e.g., Lunch, Uber, Gym membership"
                  className="w-full rounded-xl border border-white/10 bg-neutral-800 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-white/20"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!form.amount || Number(form.amount) <= 0}
              >
                Save Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
