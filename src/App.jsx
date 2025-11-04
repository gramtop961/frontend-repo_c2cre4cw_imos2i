import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import OnboardingFlow from './components/OnboardingFlow';
import DashboardPreview from './components/DashboardPreview';
import DailyLessonCard from './components/DailyLessonCard';

function App() {
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('home'); // 'home' | 'onboarding' | 'dashboard'

  const focus = useMemo(() => {
    if (!profile) return 'personal';
    // prioritize last selected or first goal
    if (profile.goals?.includes('personal')) return 'personal';
    if (profile.goals?.includes('professional')) return 'professional';
    return 'personal';
  }, [profile]);

  const handleLessonComplete = ({ xpEarned }) => {
    setProfile((prev) => ({ ...(prev || {}), xp: (prev?.xp || 0) + (xpEarned || 0), streak: (prev?.streak || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-black" style={{ backgroundColor: '#0077ff' }}>T</div>
            <span className="font-extrabold tracking-tight">Talkie</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <button onClick={() => setView('home')} className={`rounded-lg px-3 py-2 font-medium ${view==='home'?'bg-gray-100':''}`}>Home</button>
            <button onClick={() => setView('onboarding')} className={`rounded-lg px-3 py-2 font-medium ${view==='onboarding'?'bg-gray-100':''}`}>Onboarding</button>
            <button onClick={() => setView('dashboard')} className={`rounded-lg px-3 py-2 font-medium ${view==='dashboard'?'bg-gray-100':''}`}>Dashboard</button>
          </nav>
          <div className="flex items-center gap-2">
            {profile ? (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0077ff] to-[#ff914d]" />
                <div className="text-sm">
                  <div className="font-semibold">{profile.name}</div>
                  <div className="text-gray-500">{profile.xp} XP</div>
                </div>
              </div>
            ) : (
              <button onClick={() => setView('onboarding')} className="rounded-xl px-4 py-2 font-semibold text-white" style={{ backgroundColor: '#0077ff' }}>
                Registrati
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:py-10 space-y-8">
        {view === 'home' && (
          <>
            <HeroSection onStartOnboarding={() => setView('onboarding')} onExploreDashboard={() => setView('dashboard')} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyLessonCard focus={focus} onComplete={handleLessonComplete} />
              <DashboardPreview profile={profile || { xp: 80, streak: 1, name: 'Tu' }} />
            </div>
            <section className="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
              <h3 className="text-xl md:text-2xl font-bold">Motivazione del giorno</h3>
              <p className="mt-2 text-gray-600">5 minuti al giorno per cambiare il tuo futuro 🚀 Non fermarti ora!</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-xl px-4 py-2 font-semibold text-white" style={{ backgroundColor: '#ff914d' }}>Completa la lezione</button>
                <button className="rounded-xl px-4 py-2 font-semibold bg-gray-900 text-white">Apri Coach Talkie</button>
              </div>
            </section>
          </>
        )}

        {view === 'onboarding' && (
          <OnboardingFlow onComplete={(p) => { setProfile(p); setView('dashboard'); }} />
        )}

        {view === 'dashboard' && (
          <>
            <DashboardPreview profile={profile || { xp: 120, streak: 3, name: 'Tu' }} />
            <DailyLessonCard focus={focus} onComplete={handleLessonComplete} />
          </>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-500">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Talkie — Crescita personale e professionale</p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Termini</a>
            <a href="#" className="hover:underline">Contatti</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
