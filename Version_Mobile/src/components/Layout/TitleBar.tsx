import { useState, useEffect } from "react";
import { Search, Trophy } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { getLogo } from "../../api/tauri";

function ClubLogo({ crestAssetId, name }: { crestAssetId?: string; name: string }) {
  const [logo, setLogo] = useState<string | null>(null);
  useEffect(() => {
    if (crestAssetId) {
      getLogo(crestAssetId).then(setLogo).catch(() => {});
    }
  }, [crestAssetId]);

  return (
    <div className="w-20 h-20 rounded-3xl bg-[#161b22] border-2 border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-2xl drop-shadow-2xl">
      {logo
        ? <img src={logo} alt="" className="w-full h-full object-contain p-2" />
        : <span className="font-['Bebas_Neue'] text-4xl text-[var(--accent)]">
            {(name || "?")[0].toUpperCase()}
          </span>
      }
    </div>
  );
}

export function TitleBar() {
  const { activeSession, currentClub, toggleGlobalSearch } = useAppStore();

  return (
    <header
      data-tauri-drag-region=""
      className="h-32 flex items-center justify-between px-8 bg-[#0d1117]/95 backdrop-blur-xl shrink-0 select-none sticky top-0 z-[var(--z-header)] border-b border-white/10 relative w-full shadow-2xl"
    >
      {/* Centered Content with High Visibility */}
      <div className="flex items-center gap-8 flex-1 justify-center pointer-events-none">
        {currentClub ? (
          <>
            <ClubLogo crestAssetId={currentClub.crestAssetId} name={currentClub.name} />
            <div className="flex flex-col min-w-0">
              <div className="text-white font-black text-3xl uppercase tracking-tighter leading-none mb-2 drop-shadow-lg">
                {currentClub.name}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400 font-black uppercase tracking-[0.25em] bg-white/5 px-2 py-0.5 rounded-md">{currentClub.platform}</span>
                {currentClub.skillRating && (
                  <div className="flex items-center gap-2 text-yellow-400 text-base font-black bg-yellow-400/10 px-3 py-1 rounded-xl border-2 border-yellow-400/20 shadow-lg">
                    <Trophy size={16} className="fill-yellow-400/20" /> {currentClub.skillRating} SR
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <span className="font-['Bebas_Neue'] text-4xl tracking-[0.3em] text-white">
            PRO CLUBS STATS
          </span>
        )}

        {activeSession && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500 border-4 border-[#0d1117] text-[10px] text-white font-black animate-pulse shadow-2xl uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-white" />
            Live Session
          </div>
        )}
      </div>

      {/* Large Search Button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleGlobalSearch(); }}
        className="absolute right-6 flex items-center justify-center w-16 h-16 text-white bg-white/5 active:bg-[var(--accent)] active:text-black rounded-3xl transition-all shadow-2xl border border-white/10"
        aria-label="Rechercher"
      >
        <Search size={32} />
      </button>
    </header>
  );
}
