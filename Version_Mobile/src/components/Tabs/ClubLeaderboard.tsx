import { useState, useMemo } from "react";
import { Trophy, Target, Award, Star, TrendingUp, Swords } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n";
import type { Player } from "../../types";
import { PlayerAvatar, ratingColor } from "../Modals/PlayerModal";

type LeaderboardTab = "goals" | "assists" | "rating" | "gamesPlayed";

const TABS: { id: LeaderboardTab; label: string; icon: any; color: string }[] = [
  { id: "goals",       label: "Buteurs",   icon: Target,     color: "#00f2ff" },
  { id: "assists",     label: "Passeurs",  icon: Award,      color: "#7000ff" },
  { id: "rating",      label: "Notes",     icon: Star,       color: "#ffd700" },
  { id: "gamesPlayed", label: "Matchs",    icon: Swords,     color: "#00ff87" },
];

export function ClubLeaderboard() {
  const players = useAppStore((s) => s.players);
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("goals");

  const filteredPlayers = useMemo(() => {
    let list = [...players].filter(p => {
      if (activeTab === 'rating') return p.gamesPlayed >= 3 && p.rating > 0;
      return Number(p[activeTab]) > 0;
    });

    return list.sort((a, b) => Number(b[activeTab]) - Number(a[activeTab]));
  }, [players, activeTab]);

  const activeInfo = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pb-32 animate-fadeIn">
      <div className="w-full max-w-xl flex flex-col h-full">
        {/* Horizontal Tabs Filter */}
        <div className="flex items-center gap-2 py-6 mb-4 overflow-x-auto no-scrollbar shrink-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl shrink-0 transition-all border whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/30 scale-105'
                    : 'bg-[#161b22] border-white/5 text-gray-400 active:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : ''} style={{ color: isActive ? '' : tab.color }} />
                <span className="font-black text-[11px] uppercase tracking-widest">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Ranked List */}
        <div className="flex-1 overflow-y-auto py-2 no-scrollbar">
          {filteredPlayers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 bg-[#161b22]/50 border border-dashed border-white/5 rounded-[2.5rem] opacity-30">
              <Trophy size={48} className="text-gray-500 mb-6" />
              <p className="font-black text-xs uppercase tracking-[0.3em]">Aucune donnée disponible</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredPlayers.map((p, i) => {
                const rank = i + 1;
                const isTop3 = rank <= 3;
                const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
                const val = activeTab === 'rating' ? p.rating.toFixed(1) : p[activeTab];
                const rColor = activeTab === 'rating' ? ratingColor(p.rating) : activeInfo.color;

                return (
                  <div
                    key={p.name}
                    className="flex items-center gap-5 p-5 bg-[#161b22] border border-white/5 rounded-3xl active:scale-[0.98] transition-all shadow-xl group"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[40px]">
                      {medal ? (
                        <span className="text-4xl drop-shadow-md">{medal}</span>
                      ) : (
                        <span className="font-['Bebas_Neue'] text-2xl text-gray-700">{rank}</span>
                      )}
                    </div>

                    <div className="relative shrink-0">
                      <PlayerAvatar name={p.name} size={52} />
                      {isTop3 && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full border-4 border-[#161b22] flex items-center justify-center shadow-lg">
                            <Star size={10} className="text-black fill-black" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-white font-black text-lg truncate uppercase tracking-tight leading-none mb-1.5 group-active:text-[var(--accent)] transition-colors">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2.5">
                        <span className="bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{p.position}</span>
                        <span className="opacity-20 text-white">|</span>
                        <span>{p.gamesPlayed} MATCHS</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-['Bebas_Neue'] text-4xl leading-none mb-1" style={{ color: rColor }}>
                        {val}
                      </div>
                      <div className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">
                        {activeInfo.label.slice(0, -1).toUpperCase()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}
