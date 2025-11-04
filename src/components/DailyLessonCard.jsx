import React, { useMemo } from 'react';
import { Play, Headphones, CheckCircle } from 'lucide-react';

const lessons = {
  personal: {
    title: 'Come aumentare la fiducia in te stesso',
    text: 'Scegli un’azione piccola che puoi completare oggi e rispettala. Le micro-promesse costruiscono fiducia.',
    quiz: {
      question: 'Qual è il primo passo per aumentare la fiducia?',
      options: [
        'Fare grandi cambiamenti subito',
        'Scegliere un’azione piccola e mantenerla',
        'Ignorare gli errori',
      ],
      answerIndex: 1,
    },
  },
  professional: {
    title: 'Le 3 regole base per gestire il budget',
    text: 'Applica il 50/30/20: bisogni 50%, desideri 30%, risparmio/investimenti 20%.',
    quiz: {
      question: 'Nella regola 50/30/20, quanto va al risparmio?',
      options: ['10%', '20%', '30%'],
      answerIndex: 1,
    },
  },
};

const DailyLessonCard = ({ focus = 'personal', onComplete }) => {
  const data = useMemo(() => lessons[focus] || lessons.personal, [focus]);

  const speak = () => {
    const utter = new SpeechSynthesisUtterance(`${data.title}. ${data.text}`);
    utter.lang = 'it-IT';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  return (
    <section className="w-full rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Lezione del giorno</h3>
          <p className="text-sm text-gray-600">Durata ~5 minuti • Testo + Audio + Mini quiz</p>
        </div>
        <button
          onClick={speak}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white font-semibold"
          style={{ backgroundColor: '#0077ff' }}
        >
          <Headphones size={18} /> Ascolta
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">{data.title}</h4>
        <p className="text-gray-700">{data.text}</p>

        <div className="mt-4 rounded-2xl bg-gray-50 p-4">
          <p className="font-semibold text-gray-900">Quiz: {data.quiz.question}</p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.quiz.options.map((opt, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
              >
                <input type="radio" name="quiz" className="accent-[#0077ff]" />
                <span className="text-sm text-gray-800">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white font-semibold"
            style={{ backgroundColor: '#ff914d' }}
            onClick={() => onComplete?.({ xpEarned: 20, badge: 'Lezione completata' })}
          >
            <CheckCircle size={18} /> Completa e guadagna XP
          </button>
          <button className="rounded-xl px-4 py-2 bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200">
            Salva per dopo
          </button>
        </div>
      </div>
    </section>
  );
};

export default DailyLessonCard;
