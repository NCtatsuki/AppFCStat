import { useState, useEffect, useMemo } from "react";
import { Swords, Calendar, Clock, Trophy, Zap, TrendingUp, ChevronRight, Star } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from "recharts";
import { useAppStore } from "../../store/useAppStore";
import { useMatchData } from "../../hooks/useMatchData";
import { getLogo } from "../../api/tauri";
import { MatchModal } from "../Modals/MatchModal";
import type { Match } from "../../types";

const CARD_BG = "bg-[#11141a]";

function MatchClubLogo({ crestId, fallback }: { crestId?: string | number; fallback: string }) {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    if (crestId && crestId !== "0") {
      getLogo(String(crestId))
        .then(setLogo)
        .catch(() => setLogo(null));
    } else {
      setLogo(null);
    }
  }, [crestId]);

  return (
    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
      {logo ? (
        <img src={logo} alt="" className="w-full h-full object-contain p-2" />
      ) : (
        <span className="font-['Bebas_Neue'] text-3xl text-gray-500">{fallback?.[0]?.toUpperCase() || '?'}</span>
      )}
    </div>
  );
}

function MatchCard({ match, clubId, clubName, currentCrestId, onClick }: { match: Match; clubId: string; clubName: string; currentCrestId?: string; onClick: () => void }) {
  const myClub = match.clubs[clubId] as Record<string, any>;
  const oppId = Object.keys(match.clubs).find(id => id !== clubId);
  const oppClub = oppId ? match.clubs[oppId] as Record<string, any> : null;

  const isWin = Number(myClub?.wins) > 0;
  const isLoss = Number(myClub?.losses) > 0;
  const resultText = isWin ? "VICTOIRE" : isLoss ? "DÉFAITE" : "NUL";
  const resColor = isWin ? "text-emerald-400" : isLoss ? "text-rose-500" : "text-yellow-500";

  const date = new Date(Number(match.timestamp) > 1e12 ? Number(match.timestamp) : Number(match.timestamp) * 1000);
  const dateStr = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }).toUpperCase();
  const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const getCrestId = (c: any, id?: string) => {
    if (!c) return id || null;
    return c.crestAssetId && c.crestAssetId !== "0" ? c.crestAssetId :
           c.details?.crestAssetId && c.details?.crestAssetId !== "0" ? c.details.crestAssetId :
           c.teamId && c.teamId !== "0" ? c.teamId :
           c.details?.teamId && c.details?.teamId !== "0" ? c.details.teamId :
           id || c.clubId;
  };

  const myCrest = getCrestId(myClub, clubId) || currentCrestId;
  const oppCrest = getCrestId(oppClub, oppId);

  return (
    <div
      onClick={onClick}
      className={`${CARD_BG} border border-white/5 rounded-[2.5rem] p-6 shadow-2xl active:scale-[0.98] transition-all w-full cursor-pointer relative overflow-hidden`}
    >
      <div className="flex items-center justify-center gap-4 mb-8 px-1 text-[11px] font-black text-gray-500 tracking-widest whitespace-nowrap">
         <div className="flex items-center gap-1.5"><Calendar size={13} className="text-gray-600" /> {dateStr}</div>
         <span className="opacity-20 text-white">|</span>
         <div className="flex items-center gap-1.5"><Clock size={13} className="text-gray-600" /> {timeStr}</div>
      </div>

      <div className="grid grid-cols-3 items-center gap-4 mb-4">
        <div className="flex justify-center">
          <MatchClubLogo crestId={myCrest} fallback={clubName} />
        </div>

        <div className="flex flex-col items-center">
           <div className="font-['Bebas_Neue'] text-5xl text-white tracking-widest flex items-center gap-4">
              <span>{myClub?.goals}</span>
              <span className="text-white/10 text-2xl">-</span>
              <span>{oppClub?.goals || 0}</span>
           </div>
        </div>

        <div className="flex justify-center">
          <MatchClubLogo crestId={oppCrest} fallback={oppClub?.details?.name || 'ADVERSAIRE'} />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center text-center">
         <span className="text-[10px] font-black text-white uppercase tracking-tighter truncate px-1">{clubName}</span>

         <div className="flex flex-col items-center gap-1">
            <div className={`px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase border border-white/5 ${match.match_type === 'leagueMatch' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {match.match_type === 'leagueMatch' ? 'LIGUE' : 'AMICAL'}
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.4em] ${resColor}`}>{resultText}</span>
         </div>

         <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter truncate px-1">{oppClub?.details?.name || 'ADVERSAIRE'}</span>
      </div>
    </div>
  );
}

export function MatchesTab() {
  const currentClub = useAppStore(s => s.currentClub);
  const { allList: matches } = useMatchData();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const sorted = useMemo(() => [...matches].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)), [matches]);
  const lastMatch = sorted[0];

  const formData = useMemo(() => {
    if (!currentClub) return [];
    return [...sorted].slice(0, 10).reverse().map((m, i) => {
      const c = m.clubs[currentClub.id] as Record<string, any>;
      const res = !c ? 0 : Number(c.wins) > 0 ? 3 : Number(c.ties) > 0 ? 1 : 0;
      return { n: i + 1, v: res, r: res === 3 ? 'W' : res === 1 ? 'D' : 'L' };
    });
  }, [sorted, currentClub]);

  if (!currentClub) return null;

  const myLast = lastMatch ? lastMatch.clubs[currentClub.id] as Record<string, any> : null;
  const oppLastId = lastMatch ? Object.keys(lastMatch.clubs).find(id => id !== currentClub.id) : null;
  const oppLast = (lastMatch && oppLastId) ? lastMatch.clubs[oppLastId] as Record<string, any> : null;
  const isWinLast = Number(myLast?.wins) > 0;
  const isLossLast = Number(myLast?.losses) > 0;
  const lastResText = isWinLast ? "VICTOIRE" : isLossLast ? "DÉFAITE" : "NUL";
  const lastResColor = isWinLast ? "text-emerald-400" : isLossLast ? "text-rose-500" : "text-yellow-500";

  return (
    <div className="flex flex-col w-full gap-10 py-6 pb-40">
       {/* 1. Résumé du Dernier Match (Restauré) */}
       {lastMatch && (
         <div className="bg-[#11141a] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Trophy size={120} />
            </div>
            <div className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] mb-10">DERNIER MATCH</div>

            <div className="flex flex-col items-center gap-6 w-full">
                <div className="font-['Bebas_Neue'] text-[120px] text-white leading-none tracking-tighter drop-shadow-2xl">
                  {myLast?.goals}<span className="text-white/10 mx-4">-</span>{oppLast?.goals || 0}
                </div>

                <div className="space-y-2">
                  <div className={`font-['Bebas_Neue'] text-6xl leading-none ${lastResColor} tracking-widest`}>
                    {lastResText}
                  </div>
                  <div className="text-gray-300 text-xl font-black uppercase tracking-tight">vs {oppLast?.details?.name || 'ADVERSAIRE'}</div>
                  <div className="text-gray-600 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 pt-2">
                     <Calendar size={14} /> {new Date(Number(lastMatch.timestamp) > 1e12 ? Number(lastMatch.timestamp) : Number(lastMatch.timestamp) * 1000).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                </div>
            </div>

            <button
              onClick={() => setSelectedMatch(lastMatch)}
              className="mt-12 flex items-center justify-center gap-3 text-[11px] font-black text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-6 py-3 rounded-2xl uppercase tracking-[0.25em] active:scale-95 transition-all shadow-lg"
            >
               <Zap size={14} className="fill-emerald-400" />
               VOIR RAPPORT COMPLET
               <ChevronRight size={14} />
            </button>
         </div>
       )}

       {/* 2. Forme Graphique */}
       <div className="bg-[#11141a] border border-white/5 rounded-[2.5rem] p-6 shadow-xl relative">
          <div className="flex items-center justify-between mb-8">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em] flex items-center gap-2">
              <TrendingUp size={14} /> FORME — 10 MATCHS
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/10">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[9px] font-black text-emerald-500 uppercase">En Progression</span>
            </div>
          </div>

          <div className="flex gap-2.5 justify-between w-full mb-8 h-10 items-end">
             {formData.map((d, i) => (
               <div key={i} className={`flex-1 rounded-lg shadow-inner transition-all duration-500 ${
                 d.r === 'W' ? 'bg-emerald-500' : d.r === 'D' ? 'bg-yellow-500' : d.r === 'L' ? 'bg-rose-500' : 'bg-white/5'
               } ${i === formData.length - 1 ? 'h-full opacity-100' : 'h-2/3 opacity-30 hover:opacity-60'}`} />
             ))}
          </div>

          <div className="h-24 w-full opacity-40">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData}>
                   <Line
                    type="step"
                    dataKey="v"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    dot={(props: any) => (
                      <circle cx={props.cx} cy={props.cy} r={5} fill={props.payload.v === 3 ? '#10b981' : props.payload.v === 1 ? '#eab308' : '#ef4444'} stroke="#11141a" strokeWidth={3} />
                    )}
                   />
                </LineChart>
             </ResponsiveContainer>
          </div>
       </div>

       {/* 3. Liste de tous les matchs */}
       <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
             <div className="flex items-center gap-3">
               <Swords size={18} className="text-[var(--accent)]" />
               <span className="text-[12px] font-black text-white uppercase tracking-[0.3em]">Historique des matchs</span>
             </div>
             <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">{sorted.length} TOTAL</span>
          </div>

          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 opacity-10 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
               <Swords size={64} />
               <p className="font-['Bebas_Neue'] text-3xl mt-4 uppercase">Aucun match</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {sorted.map(m => (
                <MatchCard
                  key={m.match_id}
                  match={m}
                  clubId={currentClub.id}
                  clubName={currentClub.name}
                  currentCrestId={currentClub.crestAssetId}
                  onClick={() => setSelectedMatch(m)}
                />
              ))}
            </div>
          )}
       </div>

       {selectedMatch && (
         <MatchModal
           match={selectedMatch}
           clubId={currentClub.id}
           onClose={() => setSelectedMatch(null)}
         />
       )}
    </div>
  );
}
