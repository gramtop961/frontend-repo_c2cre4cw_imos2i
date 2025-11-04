import React, { useMemo, useState } from 'react';
import { User, Target, ChevronRight } from 'lucide-react';

const goalsOptions = [
  { key: 'personal', label: 'Crescita personale', emoji: '💬' },
  { key: 'professional', label: 'Crescita professionale', emoji: '💰' },
];

const OnboardingFlow = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState([]);

  const canContinue = useMemo(() => {
    if (step === 1) return name.trim().length > 1;
    if (step === 2) return !!age && Number(age) > 0;
    if (step === 3) return goals.length > 0;
    return false;
  }, [step, name, age, goals]);

  const toggleGoal = (key) => {
    setGoals((prev) =>
      prev.includes(key) ? prev.filter((g) => g !== key) : [...prev, key]
    );
  };

  const finish = () => {
    const profile = {
      name: name.trim(),
      age: Number(age),
      goals,
      xp: 120,
      streak: 3,
    };
    onComplete(profile);
  };

  return (
    <section className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span>Passo {step} di 3</span>
        <div className="h-1 w-24 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0077ff] transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User size={20} />
            Come ti chiami?
          </h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. Sara"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077ff]"
          />
          <div className="flex justify-end">
            <button
              disabled={!canContinue}
              onClick={() => setStep(2)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white ${
                canContinue ? '' : 'opacity-60 cursor-not-allowed'
              }`}
              style={{ backgroundColor: '#0077ff' }}
            >
              Continua <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User size={20} />
            Quanti anni hai?
          </h2>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Es. 28"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077ff]"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Indietro
            </button>
            <button
              disabled={!canContinue}
              onClick={() => setStep(3)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white ${
                canContinue ? '' : 'opacity-60 cursor-not-allowed'
              }`}
              style={{ backgroundColor: '#0077ff' }}
            >
              Continua <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target size={20} />
            Quali sono i tuoi obiettivi principali?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goalsOptions.map((g) => (
              <button
                key={g.key}
                onClick={() => toggleGoal(g.key)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                  goals.includes(g.key)
                    ? 'border-[#0077ff] bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold text-gray-800">
                  {g.emoji} {g.label}
                </span>
                <input type="checkbox" readOnly checked={goals.includes(g.key)} />
              </button>
            ))}
          </div>

          {goals.length > 0 && (
            <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
              Percorso suggerito: {goals.includes('personal') ? 'Soft skills e gestione emotiva' : ''}
              {goals.length === 2 ? ' + ' : ''}
              {goals.includes('professional') ? 'Finanza personale e mindset' : ''}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Indietro
            </button>
            <button
              disabled={!canContinue}
              onClick={finish}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white ${
                canContinue ? '' : 'opacity-60 cursor-not-allowed'
              }`}
              style={{ backgroundColor: '#0077ff' }}
            >
              Completa
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OnboardingFlow;
