import React from 'react';
import { Trophy, Flame, Award, Star, MessageCircle, BookOpen } from 'lucide-react';

const levelTitle = (xp) => {
  if (xp >= 1000) return 'Mentore';
  if (xp >= 500) return 'Guida';
  if (xp >= 250) return 'Esperto';
  if (xp >= 100) return 'Apprendista';
  return 'Nuovo';
};

const ModuleCard = ({ title, status, icon }) => {
  const statusStyles = {
    'Non iniziato': 'bg-gray-100 text-gray-700',
    'In corso': 'bg-blue-50 text-[#0077ff]',
    'Completato': 'bg-green-50 text-green-700',
  };
  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>
            {status}
          </p>
        </div>
      </div>
      <button className="rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200">
        Apri
      </button>
    </div>
  );
};

const DashboardPreview = ({ profile }) => {
  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const name = profile?.name || 'Tu';

  const completion = Math.min(100, Math.round((xp % 200) / 2));

  return (
    <section className="w-full rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Ciao {name} 👋</h3>
          <p className="text-gray-600">Livello attuale: {levelTitle(xp)}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-3 py-2 text-yellow-700">
            <Star size={16} /> {xp} XP
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-orange-700">
            <Flame size={16} /> {streak} giorni di fila
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-[#0077ff]">
            <Award size={16} /> 3 badge
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Completamento percorso</span>
          <span>{completion}%</span>
        </div>
        <div className="mt-2 h-3 w-full rounded-full bg-gray-100">
          <div
            className="h-3 rounded-full"
            style={{ width: `${completion}%`, backgroundColor: '#0077ff' }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              💬 Crescita personale
            </h4>
            <button className="text-sm font-semibold text-[#0077ff]">Vedi tutto</button>
          </div>
          <div className="space-y-3">
            <ModuleCard
              title="Aumenta la fiducia in te stesso"
              status="In corso"
              icon={<Trophy className="text-[#0077ff]" size={20} />}
            />
            <ModuleCard
              title="Comunicazione assertiva"
              status="Non iniziato"
              icon={<MessageCircle className="text-[#0077ff]" size={20} />}
            />
            <ModuleCard
              title="Gestione emotiva quotidiana"
              status="Completato"
              icon={<BookOpen className="text-[#0077ff]" size={20} />}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              💰 Crescita professionale
            </h4>
            <button className="text-sm font-semibold text-[#0077ff]">Vedi tutto</button>
          </div>
          <div className="space-y-3">
            <ModuleCard
              title="Budget personale 101"
              status="In corso"
              icon={<BookOpen className="text-[#0077ff]" size={20} />}
            />
            <ModuleCard
              title="Investimenti base"
              status="Non iniziato"
              icon={<Trophy className="text-[#0077ff]" size={20} />}
            />
            <ModuleCard
              title="Mindset imprenditoriale"
              status="Completato"
              icon={<Star className="text-[#0077ff]" size={20} />}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="rounded-xl px-4 py-2 font-semibold text-white"
          style={{ backgroundColor: '#ff914d' }}
        >
          Lezione del giorno
        </button>
        <button className="rounded-xl px-4 py-2 font-semibold bg-gray-900 text-white">Apri Coach Talkie</button>
      </div>
    </section>
  );
};

export default DashboardPreview;
