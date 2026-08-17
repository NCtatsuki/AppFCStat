import { useState, useMemo } from "react";
import { Search, Filter, Star, Users } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { useT } from "../../i18n";
import type { Player } from "../../types";
import { PlayerModal, PlayerAvatar, ratingColor } from "../Modals/PlayerModal";
import { useDebounce } from "../../hooks/useDebounce";

function PlayerCard({ player, onClick }: { player: Player; onClick: () => void }) {
  const color = ratingColor(player.rating);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-5 p-5 bg-[#161b22] border border-white/5 rounded-3xl active:scale-[0.98] active:border-white/10 transition-all text-left shadow-xl group hover:bg-white/[0.01]"
    >
      <div className="relative shrink-0">
        <PlayerAvatar name={player.name} size={56} />
        {player.rating >= 8 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#161b22] shadow-lg">
            <Star size={12} className="text-black fill-black" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-white font-bold text-xl truncate uppercase tracking-tight leading-none mb-2 group-active:text-[var(--accent)] transition-colors">
          {player.name}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.1em] bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 shadow-inner">
            {player.position}
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-60">
            {player.gamesPlayed} MATCHS
          </span>
        </div>
      </div>

      <div className="text-right shrink-0 pr-4">
        <div
          className="font-['Bebas_Neue'] text-4xl leading-none mb-1 group-active:scale-110 transition-transform origin-right"
          style={{ color }}
        >
          {player.rating > 0 ? player.rating.toFixed(1) : "—"}
        </div>
        <div className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">
          Note Moy.
        </div>
      </div>
    </button>
  );
}

export function PlayersTab() {
  const players = useAppStore((s) => s.players);
  const t = useT();

  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 200);
  const [selected, setSelected] = useState<Player | null>(null);

  const filtered = useMemo(() => {
    return players
      .filter(p => p.name.toLowerCase().includes(debouncedFilter.toLowerCase()))
      .sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  }, [players, debouncedFilter]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full overflow-hidden w-full px-4 animate-fadeIn">
      <div className="w-full max-w-xl flex flex-col h-full">
        {/* Search Header - Pushed down for air */}
        <div className="pt-10 pb-8 space-y-6 shrink-0">
          <div className="relative group">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="RECHERCHER UN MEMBRE..."
              className="w-full h-16 bg-[#161b22] border border-white/10 rounded-3xl pl-6 pr-16 text-white font-bold text-lg tracking-widest outline-none focus:border-[var(--accent)]/40 focus:bg-white/[0.04] transition-all uppercase placeholder:text-gray-700 shadow-2xl"
            />
            <Search size={22} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[var(--accent)] transition-colors" />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em]">
                {filtered.length} JOUEURS DÉTECTÉS
              </span>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 rounded-full uppercase tracking-widest active:scale-90 transition-all border border-[var(--accent)]/20 shadow-lg shadow-[var(--accent)]/5">
              <Filter size={14} /> FILTRER
            </button>
          </div>
        </div>

        {/* Players List - Scrollable area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-gray-700 bg-[#161b22]/50 border border-dashed border-white/5 rounded-[3rem] animate-pulse">
              <Users size={56} className="mb-6 opacity-10" />
              <p className="font-black text-sm uppercase tracking-[0.5em] opacity-40">Aucun résultat</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(p => (
                <PlayerCard key={p.name} player={p} onClick={() => setSelected(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && <PlayerModal player={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
