import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

const HeroSection = ({ onStartOnboarding, onExploreDashboard }) => {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left - Copy */}
        <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-[#0077ff] w-fit">
            <Sparkles size={16} />
            Nuovo: Coach Talkie + Lezione giornaliera
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Talkie — Cresci ogni giorno con un percorso su misura
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Migliora soft skills, comunicazione, gestione emotiva e finanza personale con lezioni brevi, quiz, badge e un coach AI amichevole.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartOnboarding}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-white font-semibold shadow-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#0077ff' }}
            >
              <Rocket size={18} />
              Inizia ora
            </button>
            <button
              onClick={onExploreDashboard}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Esplora la dashboard
            </button>
          </div>
        </div>

        {/* Right - Spline 3D */}
        <div className="relative h-[360px] md:h-auto min-h-[320px]">
          <Spline
            scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          {/* Soft gradient overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
