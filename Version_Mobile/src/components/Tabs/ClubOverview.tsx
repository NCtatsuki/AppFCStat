import { useMemo } from "react";
import { BarChart2, Swords, Target, TrendingUp, Trophy, Users, Zap, Activity, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAppStore } from "../../store/useAppStore";
import { useMatchData } from "../../hooks/useMatchData";
import { useT } from "../../i18n";
import type { Match, Player } from "../../types";
import { PlayerAvatar } from "../Modals/PlayerModal";

function compositeScore(p: Player) {
  return p.goals * 3 + p.assists * 2 + p.motm * 5 + Math.round(p.rating * 10);
}

const CARD_CLASS = "bg-[#161b22] border border-white/5 rounded-3xl p-6 flex flex-col gap-5 shadow-2xl relative overflow-hidden";
const TITLE_CLASS = "font-['Bebas_Neue'] text-xs tracking-[0.2em] text-gray-500 uppercase font-black flex items-center gap-2.5 opacity-80";

export function ClubOverview() {
  const { currentClub, players } = useAppStore();
  const { allList: leagueMatches } = useMatchData();

  const getResult = (m: Match): "W" | "D" | "L" => {
    const c = m.clubs[currentClub?.id ?? ""] as Record<string, any>;
    if (c?.["wins"] === "1") return "W";
    if (c?.["losses"] === "1") return "L";
    return "D";
  };

  const sortedMatches = useMemo(() => [...leagueMatches].sort((a, b) => Number(a.timestamp) - Number(b.timestamp)), [leagueMatches]);
  const formData = useMemo(() => sortedMatches.slice(-10).map((m, i) => ({ n: i + 1, v: getResult(m) === "W" ? 3 : getResult(m) === "D" ? 1 : 0, r: getResult(m) })), [sortedMatches]);

  const stats = useMemo(() => {
    const total = (currentClub?.wins ?? 0) + (currentClub?.losses ?? 0) + (currentClub?.ties ?? 0);
    return { total, winPct: total > 0 ? Math.round(((currentClub?.wins ?? 0) / total) * 100) : 0 };
  }, [currentClub]);

  const topPlayers = useMemo(() => [...players].filter(p => p.gamesPlayed >= 1).sort((a, b) => compositeScore(b) - compositeScore(a)).slice(0, 3), [players]);
  const dotColor = (v: number) => v === 3 ? "#00ff87" : v === 1 ? "#eab308" : "#ff2d55";

  if (!currentClub) return null;

  return (
    <div className="flex flex-col min-h-full items-center justify-center w-full py-10 px-4 no-scrollbar animate-fadeIn">
      <div className="w-full max-w-xl flex flex-col gap-8 pb-32">
        {/* 1. Hero Widget: Forme */}
        <div className={CARD_CLASS}>
          <div className="flex items-center justify-between mb-2">
            <div className={TITLE_CLASS}><TrendingUp size={16} /> Évolution de Forme</div>
            <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest animate-pulse">↑ En Progression</div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <Line type="step" dataKey="v" stroke="var(--accent)" strokeWidth={4} strokeLinecap="round" dot={(props: any) => <circle cx={props.cx} cy={props.cy} r={6} fill={dotColor(props.payload.v)} stroke="#161b22" strokeWidth={3} />} />
                </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-2 justify-between w-full pt-4 border-t border-white/5">
            {formData.map((d, i) => <div key={i} className="h-2 flex-1 rounded-full shadow-inner transition-all hover:opacity-100" style={{ background: dotColor(d.v), opacity: 0.5 }} />)}
          </div>
        </div>

        {/* 2. KPIs Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Victoires", value: currentClub.wins, color: "text-emerald-400", icon: <Trophy size={16} /> },
            { label: "Buts Total", value: currentClub.goals, color: "text-yellow-400", icon: <Target size={16} /> },
            { label: "Win Rate", value: `${stats.winPct}%`, color: "text-cyan-400", icon: <BarChart2 size={16} /> },
            { label: "Matchs", value: stats.total, color: "text-white", icon: <Activity size={16} /> },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-[#161b22] border border-white/5 rounded-3xl p-6 flex flex-col gap-2 shadow-xl hover:bg-white/[0.02] transition-colors">
              <div className="text-gray-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">{kpi.icon} {kpi.label}</div>
              <div className={`font-['Bebas_Neue'] text-4xl ${kpi.color} leading-none tracking-widest mt-1`}>{kpi.value}</div>
            </div>
          ))}
        </div>

        {/* 3. Top Performers */}
        <div className={CARD_CLASS}>
          <div className={TITLE_CLASS}><Users size={16} /> Top Performeurs</div>
          <div className="flex flex-col gap-4 mt-2">
            {topPlayers.map((p, i) => (
              <div key={p.name} className="flex items-center gap-5 p-4 bg-white/[0.03] border border-white/5 rounded-2xl shadow-inner active:bg-white/[0.06] transition-all">
                <div className="font-['Bebas_Neue'] text-2xl text-gray-700 w-6 text-center">{i + 1}</div>
                <div className="relative shrink-0">
                  <PlayerAvatar name={p.name} size={48} />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full border-2 border-[#161b22] flex items-center justify-center">
                      <Star size={10} className="text-black fill-black" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-lg truncate uppercase tracking-tight leading-none mb-1.5">{p.name}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.15em] flex items-center gap-2">
                      <span className="bg-white/5 px-2 py-0.5 rounded-md">{p.position}</span>
                      <span className="opacity-30">|</span>
                      <span>{p.gamesPlayed} MJ</span>
                    </div>
                </div>
                <div className="text-right shrink-0 pr-4">
                    <div className="font-['Bebas_Neue'] text-3xl text-[var(--green)] leading-none mb-0.5">{p.rating.toFixed(1)}</div>
                    <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Note Moy.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
