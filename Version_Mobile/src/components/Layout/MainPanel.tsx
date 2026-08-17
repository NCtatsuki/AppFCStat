import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, Sparkles, Settings, X, Trophy, Star, LayoutDashboard } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { ClubOverview } from "../Tabs/ClubOverview";
import { PlayersTab } from "../Tabs/PlayersTab";
import { MatchesTab } from "../Tabs/MatchesTab";
import { ChartsTab } from "../Tabs/ChartsTab";
import { SessionTab } from "../Tabs/SessionTab";
import { SettingsTab } from "../Sidebar/SettingsTab";
import { ProfilePanel } from "../Modals/ProfilePanel";
import { Spinner } from "../UI/Spinner";
import { getLogo, searchClub as apiSearchClub } from "../../api/tauri";
import { useClub } from "../../hooks/useClub";
import { useT } from "../../i18n";
import type { Club } from "../../types";

// ─── Settings overlay modal ───────────────────────────────────────────────────

function SettingsOverlay({ onClose, t }: { onClose: () => void; t: (k: string) => string }) {
  return (
    <div
      role="dialog" aria-modal="true" aria-label={t("settings.title")}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex flex-col pt-12 animate-fadeIn"
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <Settings size={20} className="text-[var(--accent)]" />
          <span className="font-['Bebas_Neue'] text-xl text-white tracking-widest uppercase">{t("settings.title")}</span>
        </div>
        <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-gray-400 active:text-white active:bg-white/5 rounded-full transition-all">
          <X size={28} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SettingsTab />
      </div>
    </div>
  );
}

// ─── Favorite Club Card ──────────────────────────────────────────────────────

function FavClubCard({ club, onClick }: { club: Club; onClick: () => void }) {
  const [logo, setLogo] = useState<string | null>(null);
  useEffect(() => {
    if (club.crestAssetId) {
      getLogo(club.crestAssetId).then(setLogo).catch(() => {});
    }
  }, [club.crestAssetId]);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 bg-[#161b22] border border-white/5 rounded-2xl active:scale-[0.98] active:border-white/10 transition-all text-left shadow-lg group"
    >
      <div className="w-12 h-12 rounded-xl bg-[var(--surface)] border border-white/5 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
        {logo ? <img src={logo} alt="" className="w-full h-full object-contain p-1.5" /> : <span className="font-['Bebas_Neue'] text-xl text-[var(--accent)]">{(club.name || "?")[0].toUpperCase()}</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-bold text-base truncate uppercase tracking-tight mb-0.5 group-active:text-[var(--accent)]">{club.name}</div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] text-[var(--accent)] font-black uppercase tracking-widest bg-[var(--accent)]/10 px-2 py-0.5 rounded">{club.platform}</span>
          {club.skillRating && <span className="text-[9px] text-yellow-500 font-bold flex items-center gap-1"><Trophy size={10} /> {club.skillRating} SR</span>}
        </div>
      </div>
      <div className="text-gray-600 opacity-20 group-active:opacity-100 group-active:text-[var(--accent)] transition-all">
        <Trophy size={18} />
      </div>
    </button>
  );
}

// ─── Main Panel Component ─────────────────────────────────────────────────────

export function MainPanel() {
  const currentClub       = useAppStore((s) => s.currentClub);
  const favs              = useAppStore((s) => s.favs);
  const history           = useAppStore((s) => s.history);
  const activeTab         = useAppStore((s) => s.activeTab);
  const isLoading         = useAppStore((s) => s.isLoading);
  const error             = useAppStore((s) => s.error);
  const sidebarTab        = useAppStore((s) => s.sidebarTab);
  const setSidebarTab     = useAppStore((s) => s.setSidebarTab);
  const setSearchResults  = useAppStore((s) => s.setSearchResults);
  const addLog            = useAppStore((s) => s.addLog);
  const t = useT();
  const { load } = useClub();

  const [searchQuery, setSearchQuery] = useState("");

  const showSettingsModal = sidebarTab === "settings";
  const closeSettings = useCallback(() => setSidebarTab("search"), [setSidebarTab]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    addLog(`Recherche: "${searchQuery}"…`);
    try {
      const clubs = await apiSearchClub(searchQuery.trim());
      setSearchResults(clubs, true);
    } catch (e) { addLog(`Erreur: ${String(e)}`); }
  };

  const recentClubs = useMemo(() => {
    const all = [...favs];
    for (const c of history) { if (!all.some(f => f.id === c.id)) all.push(c); }
    return all.slice(0, 6);
  }, [favs, history]);

  // ── Profile settings page ─────────────────────────────────────────
  if (sidebarTab === "profile") {
    return (
      <div className="flex-1 flex flex-col h-full bg-[var(--main-bg)] overflow-hidden">
        {/* Dynamic StatusBar Spacer for Mobile Accessibility */}
        <div className="h-12 shrink-0 w-full" />

        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0 bg-[#0d1117]/80 backdrop-blur-md">
          <span className="font-['Bebas_Neue'] text-xl text-white tracking-widest uppercase">Mon Profil</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ProfilePanel />
        </div>
        {showSettingsModal && <SettingsOverlay onClose={closeSettings} t={t} />}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden">

      {isLoading && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-lg" role="status">
          <div className="flex flex-col items-center gap-5">
            <Spinner size={56} />
            <span className="font-['Bebas_Neue'] text-2xl tracking-[0.3em] text-[var(--accent)] animate-pulse">CHARGEMENT...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-6 left-6 right-6 z-[110] bg-red-500/95 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl animate-bounce" role="alert">
          <X size={20} className="shrink-0" />
          <span className="text-sm font-bold truncate leading-none">{error}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {!currentClub && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 h-full overflow-y-auto no-scrollbar">
            <div className="w-full max-w-sm flex flex-col items-center justify-center animate-fadeInScale min-h-full">
              {/* Logo / Hero */}
              <div className="flex flex-col items-center gap-10 text-center mb-16 w-full">
                <div className="w-28 h-28 rounded-[2.5rem] bg-[#161b22] border border-white/10 flex items-center justify-center shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Sparkles size={56} className="text-[var(--accent)] opacity-90 animate-pulse" />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-xl border-4 border-[#0d1117]">
                    <Trophy size={20} className="text-black" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-['Bebas_Neue'] text-7xl text-white tracking-tighter uppercase leading-none drop-shadow-lg">ProStatsClub</h3>
                  <div className="h-1 w-32 bg-[var(--accent)] mx-auto rounded-full opacity-50" />
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] opacity-80">Mobile Performance Engine</p>
                </div>

                <div className="w-full space-y-6 my-10">
                  <div className="relative group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="RECHERCHER UN CLUB..."
                      className="w-full h-16 bg-[#161b22] border border-white/10 rounded-2xl pl-6 pr-16 text-white font-bold text-lg tracking-widest outline-none focus:border-[var(--accent)]/50 focus:bg-white/[0.04] transition-all uppercase placeholder:text-gray-700 shadow-2xl"
                    />
                    <Search size={22} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[var(--accent)] transition-colors z-10" />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="w-full h-16 bg-[var(--accent)] text-black font-['Bebas_Neue'] text-2xl tracking-[0.3em] rounded-2xl active:scale-[0.96] transition-all shadow-xl shadow-[var(--accent)]/20 uppercase"
                  >
                    DÉMARRER
                  </button>
                </div>
              </div>

              {/* Favorites Section */}
              {recentClubs.length > 0 && (
                <div className="w-full space-y-8 pt-10 border-t-2 border-white/5">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2.5">
                      <Star size={18} className="text-yellow-500 fill-yellow-500/20" />
                      <h4 className="font-['Bebas_Neue'] text-2xl text-white tracking-widest uppercase">Favoris</h4>
                    </div>
                    <div className="h-px flex-1 bg-white/5 mx-4" />
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{recentClubs.length}</span>
                  </div>
                  <div className="flex flex-col gap-5">
                    {recentClubs.map(club => (
                      <FavClubCard key={club.id} club={club} onClick={() => load(club.id, club.platform)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col animate-fadeIn w-full h-full overflow-y-auto no-scrollbar">
            <div className="w-full max-w-xl mx-auto flex flex-col min-h-full">
              {activeTab === "club"        && <ClubOverview />}
              {activeTab === "players"     && <PlayersTab />}
              {activeTab === "matches"     && <MatchesTab />}
              {activeTab === "charts"      && <ChartsTab />}
              {activeTab === "session"     && <SessionTab />}
            </div>
          </div>
        )}
      </div>

      {showSettingsModal && <SettingsOverlay onClose={closeSettings} t={t} />}
    </div>
  );
}
