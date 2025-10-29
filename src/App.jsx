import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import DailySummary from './components/DailySummary';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';

const STORAGE_KEY = 'fintrack.transactions.v1';

function isSameDay(d1, d2) {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [dailyBudget, setDailyBudget] = useState(() => {
    const v = localStorage.getItem('fintrack.dailyBudget');
    return v ? Number(v) : 100;
  });

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(data)) setTransactions(data);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fintrack.dailyBudget', String(dailyBudget));
  }, [dailyBudget]);

  const today = new Date();

  const todaysTransactions = useMemo(
    () => transactions.filter((t) => isSameDay(t.date, today)),
    [transactions]
  );

  const totals = useMemo(() => {
    const income = todaysTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = todaysTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const net = income - expense;
    return { income, expense, net };
  }, [todaysTransactions]);

  function addTransaction(tx) {
    setTransactions((prev) => [
      { id: crypto.randomUUID(), ...tx },
      ...prev,
    ]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <HeroCover />

      <main className="relative z-10 -mt-8 rounded-t-2xl bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55">
        <section className="px-4 pt-6 pb-2">
          <DailySummary
            date={today}
            income={totals.income}
            expense={totals.expense}
            net={totals.net}
            dailyBudget={dailyBudget}
            onBudgetChange={setDailyBudget}
          />
        </section>

        <section className="px-4 pb-28">
          <TransactionList
            transactions={todaysTransactions}
            onDelete={deleteTransaction}
          />
        </section>
      </main>

      <AddTransaction onAdd={addTransaction} />
    </div>
  );
}
