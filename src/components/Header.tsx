import React from 'react';
import { School, Shield, BookOpen, Award } from 'lucide-react';
import { ExamSettings } from '../types';

interface HeaderProps {
  settings: ExamSettings;
  onOpenTeacherPanel: () => void;
  stage: 'identity' | 'exam' | 'result';
}

export const Header: React.FC<HeaderProps> = ({ settings, onOpenTeacherPanel, stage }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* School & Brand Info */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-sm shrink-0">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {settings.className}
                </span>
                <span className="hidden sm:inline text-xs font-medium text-slate-500">
                  {settings.subject}
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-tight">
                {settings.schoolName}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                {settings.topic} • KKTP: {settings.kktp}
              </p>
            </div>
          </div>

          {/* Right Header Navigation */}
          <div className="flex items-center gap-2">
            {stage === 'exam' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Ujian Aktif</span>
              </div>
            )}

            <button
              id="btn-open-teacher-panel"
              onClick={onOpenTeacherPanel}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Akses Panel Guru & Rekap Nilai"
            >
              <Shield className="w-4 h-4 text-blue-700" />
              <span className="hidden xs:inline">Panel Guru</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
