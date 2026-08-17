import { useState } from "react";
import { X, Trophy, Users, Star } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n";
import type { Match } from "../../types";
import { PlayerAvatar } from "./PlayerModal";

export function formatDate(ts: string | number, locale: string) {
  const n = Number(ts) * 1000 || Number(ts);
  const d = new Date(isNaN(n) ? ts : n);
  if (isNaN(d.getTime())) return String(ts);
  return d.toLocaleDateString(locale, { day: "2-digit", month: "long" });
}

export function MatchModal({ match, clubId, onClose }: { match: Match; clubId: string; onClose: () => void }) {
  const t = useT();
  const lang = useAppStore((s) => s.language);
  const locale = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : lang === "de" ? "de-DE" : lang === "pt" ? "pt-BR" : "en-US";

  const myData   = match.clubs[clubId] as Record<string, unknown> | undefined;
  const oppEntry = Object.entries(match.clubs).find(([k]) => k !== clubId);
  const oppData  = oppEntry?.[1] as Record<string, unknown> | undefined;
  const oppName  = String(oppData?.["details"]?.["name"] ?? oppData?.["name"] ?? "Adversaire");

  const myPlayers = Object.entries((match.players[clubId] ?? {}) as Record<string, Record<string, unknown>>).map(([, p]) => ({
    name: String(p["name"] ?? p["playername"] ?? "—"),
    goals: Number(p["goals"] ?? 0),
    assists: Number(p["assists"] ?? 0),
    rating: Number(p["rating"] ?? p["ratingAve"] ?? 0),
    position: String(p["position"] ?? "ST"),
    motm: p["mom"] === "1" || p["manofthematch"] === "1",
  })).sort((a, b) => b.rating - a.rating);

  const isWin = myData?.["wins"] === "1";
  const resText = isWin ? "VICTOIRE" : myData?.["losses"] === "1" ? "DÉFAITE" : "NUL";
  const resColor = isWin ? "text-emerald-400" : myData?.["losses"] === "1" ? "text-rose-500" : "text-yellow-500";

  const getRatingColor = (r: number) => r >= 7.5 ? "#00ff87" : r >= 6.5 ? "#eab308" : r > 0 ? "#ff2d55" : "#6b7280";

  return (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[82vh] bg-[#0d1117] border border-white/10 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl mx-2"
        onClick={e => e.stopPropagation()}
      >
        {/* Header: Titre Centré avec plus de padding */}
        <div className="relative flex items-center justify-center px-8 h-20 border-b border-white/5 bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3 text-white">
             <Trophy size={18} className="text-gray-500" />
             <span className="font-['Bebas_Neue'] text-xl tracking-[0.2em] uppercase">Rapport de match</span>
          </div>
          <button onClick={onClose} className="absolute right-5 w-11 h-11 flex items-center justify-center text-gray-500 active:text-white bg-white/5 rounded-full transition-all">
            <X size={22} />
          </button>
        </div>

        {/* Content: Augmentation du padding horizontal global */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-7 py-8 space-y-10">

          {/* Score & Meta */}
          <div className="text-center space-y-5 py-2">
            <div className="font-['Bebas_Neue'] text-8xl text-white tracking-widest flex items-center justify-center gap-6">
              <span>{myData?.["goals"] ?? 0}</span>
              <span className="text-white/10 text-5xl">-</span>
              <span>{oppData?.["goals"] ?? 0}</span>
            </div>
            <div className="space-y-2">
               <div className={`font-['Bebas_Neue'] text-4xl tracking-widest ${resColor}`}>{resText}</div>
               <div className="text-gray-400 text-base font-black uppercase">vs {oppName}</div>
               <div className="text-gray-600 text-[11px] font-bold uppercase tracking-[0.2em] opacity-60">
                 {formatDate(match.timestamp, locale)}
               </div>
            </div>
          </div>

          {/* Joueurs */}
          <div className="space-y-6">
             <div className="flex items-center justify-center gap-3 text-gray-500 mb-2">
               <div className="h-px flex-1 bg-white/5" />
               <div className="flex items-center gap-2">
                 <Users size={14} />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Stats individuelles</span>
               </div>
               <div className="h-px flex-1 bg-white/5" />
             </div>

             <div className="flex flex-col gap-4">
               {myPlayers.map((p) => (
                 <div key={p.name} className="flex items-center gap-5 px-6 py-5 bg-[#161b22] border border-white/5 rounded-3xl shadow-xl relative group">
                    <div className="relative shrink-0">
                      <PlayerAvatar name={p.name} size={42} />
                      {p.motm && isWin && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-[#161b22] shadow-lg">
                          <Star size={10} className="text-black fill-black" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-white font-bold text-lg truncate uppercase tracking-tight leading-none mb-2 group-active:text-[var(--accent)]">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.1em] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                          {p.position}
                        </span>
                        {(p.goals > 0 || p.assists > 0) && (
                          <div className="flex gap-2 text-[10px] font-black uppercase text-emerald-400">
                             {p.goals > 0 && <span>⚽ {p.goals}</span>}
                             {p.assists > 0 && <span className="text-cyan-400">🎯 {p.assists}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating: Eloigné du bord droit par un padding interne plus grand */}
                    <div className="text-right shrink-0 ml-2 pr-4">
                      <div className="font-['Bebas_Neue'] text-3xl leading-none mb-1" style={{ color: getRatingColor(p.rating) }}>
                        {p.rating > 0 ? p.rating.toFixed(1) : "—"}
                      </div>
                      <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Note</div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
