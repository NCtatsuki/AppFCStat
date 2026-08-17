import { useState, useEffect } from "react";
import { RefreshCw, Download, Palette, Check, EyeOff } from "lucide-react";
import { check as checkUpdate } from "@tauri-apps/plugin-updater";
import { getVersion } from "@tauri-apps/api/app";
import { invoke } from "@tauri-apps/api/core";
import { useAppStore } from "../../store/useAppStore";
import { setPendingUpdate, setPendingManualUrl } from "../../utils/pendingUpdate";
import { THEMES, PALETTE_PRESETS } from "../../types";
import { useT, LANGUAGES } from "../../i18n";
import type { Lang } from "../../i18n";

// ─── Shared tile styles ───────────────────────────────────────────────────────

const TILE: React.CSSProperties = {
  background: "var(--tile-bg)",
  border: "1px solid var(--border-glass)",
  borderRadius: 12,
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  backdropFilter: "blur(8px)",
  marginBottom: "12px",
};

const TILE_TITLE: React.CSSProperties = {
  fontSize: 11, color: "var(--muted)", letterSpacing: "0.15em",
  fontFamily: "'Bebas Neue', sans-serif",
  display: "flex", alignItems: "center", gap: 6,
  marginBottom: 4,
  textTransform: "uppercase",
  fontWeight: "bold",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Toggle({ label, value, onChange, sublabel }: {
  label: string; value: boolean; onChange: (v: boolean) => void; sublabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-1"
      onClick={() => onChange(!value)}
      role="switch" aria-checked={value} aria-label={label} tabIndex={0}>
      <div className="flex-1">
        <div className="text-sm text-white font-bold">{label}</div>
        {sublabel && <div className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">{sublabel}</div>}
      </div>
      <div className={`w-11 h-6 rounded-full flex-shrink-0 cursor-pointer relative transition-colors duration-200 ${value ? 'bg-[var(--accent)]' : 'bg-white/10'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${value ? 'left-6' : 'left-1'}`} />
      </div>
    </div>
  );
}

function TileLabel({ children }: { children: React.ReactNode }) {
  return <div style={TILE_TITLE}>{children}</div>;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SettingsTab() {
  const {
    theme, darkMode, showAnimations, showLogs, showIdSearch,
    customAccent, customBg, customSurface, customCard,
    language, setTheme, setDarkMode, setShowAnimations, setShowLogs,
    setShowIdSearch, setCustomAccent,
    setCustomBg, setCustomSurface, setCustomCard, setLanguage,
    autoUpdate, setAutoUpdate, setUpdateAvailable, setUpdateInfo,
    streamingMode, setStreamingMode,
    palettePreset, setPalettePreset,
    persistSettings,
  } = useAppStore();
  const t = useT();

  const [updateStatus, setUpdateStatus] = useState<"idle" | "checking" | "downloading" | "up-to-date" | "error">("idle");
  const [updateVersion, setUpdateVersionLocal] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [appVersion, setAppVersion] = useState("…");

  useEffect(() => { getVersion().then(setAppVersion).catch(() => {}); }, []);
  useEffect(() => { if (autoUpdate) handleCheckUpdate(); }, []);

  const apply = (fn: () => void) => { fn(); persistSettings(); };

  const handleCheckUpdate = async () => {
    setUpdateStatus("checking");
    setUpdateVersionLocal(null);
    setUpdateError(null);
    try {
      const update = await checkUpdate();
      if (update?.available) {
        setPendingUpdate(update);
        setUpdateInfo(update.version ?? null, update.body ?? null);
        setUpdateAvailable(true);
        setUpdateVersionLocal(update.version ?? null);
        setUpdateStatus("idle");
      } else {
        setUpdateAvailable(false);
        setPendingUpdate(null);
        setUpdateStatus("up-to-date");
        setTimeout(() => setUpdateStatus("idle"), 3000);
      }
    } catch (pluginErr) {
      console.warn("[updater] plugin failed, trying manual check...", pluginErr);
      try {
        const result = await invoke<{ available: boolean; version: string; notes: string; url: string }>(
          "check_for_update", { currentVersion: appVersion }
        );
        if (result.available) {
          const url = `https://github.com/NCtatsuki/AppFCStat/releases/latest`;
          setPendingManualUrl(url);
          setUpdateInfo(result.version ?? null, result.notes ?? null);
          setUpdateAvailable(true);
          setUpdateVersionLocal(result.version ?? null);
          setUpdateStatus("idle");
        } else {
          setUpdateAvailable(false);
          setPendingUpdate(null);
          setUpdateStatus("up-to-date");
          setTimeout(() => setUpdateStatus("idle"), 3000);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setUpdateError(msg);
        setUpdateStatus("error");
        setTimeout(() => { setUpdateStatus("idle"); setUpdateError(null); }, 10000);
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">

      {/* ── TILE 1: Apparence & Thèmes ── */}
      <div style={TILE}>
        <TileLabel>{t("settings.appearance")}</TileLabel>

        <Toggle label={t("settings.darkMode")} value={darkMode} onChange={(v) => apply(() => setDarkMode(v))} />
        <Toggle label={t("settings.animations")} value={showAnimations} onChange={(v) => apply(() => setShowAnimations(v))} />

        {/* Palettes Presets */}
        <div className="mt-2">
          <div className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3">Palettes de Couleurs</div>
          <div className="grid grid-cols-2 gap-2">
            {PALETTE_PRESETS.map((p) => {
              const active = palettePreset === p.id;
              return (
                <button key={p.id}
                  onClick={() => { setPalettePreset(active ? null : p.id); persistSettings(); }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                    active ? 'bg-[var(--accent)]/10 border-[var(--accent)]' : 'bg-white/[0.03] border-white/5'
                  }`}>
                  <div className="flex gap-1">
                    {p.preview.map((c, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ background: c }} />
                    ))}
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-[var(--accent)]' : 'text-gray-500'}`}>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual Accent Colors */}
        <div className="mt-2">
          <div className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3">Couleur d'accentuation</div>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((th) => {
              const active = theme === th.id;
              return (
                <button key={th.id} onClick={() => apply(() => setTheme(th.id))}
                  className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${active ? 'border-white' : 'border-transparent'}`}
                  style={{ background: th.color, boxShadow: active ? `0 0 10px ${th.color}aa` : 'none' }}
                />
              );
            })}
            <button onClick={() => document.getElementById("custom-color-picker")?.click()}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 ${theme === "custom" ? 'border-white' : 'border-transparent'}`}>
              <Palette size={14} className="text-white" />
            </button>
            <input id="custom-color-picker" type="color" value={customAccent || "#00d4ff"} className="hidden"
              onChange={(e) => { setCustomAccent(e.target.value); persistSettings(); }} />
          </div>
        </div>
      </div>

      {/* ── TILE 2: Langue & Localisation ── */}
      <div style={TILE}>
        <TileLabel>{t("settings.language")}</TileLabel>
        <div className="grid grid-cols-3 gap-2">
          {LANGUAGES.map((l) => {
            const active = language === l.id;
            return (
              <button key={l.id} onClick={() => apply(() => setLanguage(l.id as Lang))}
                className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all ${
                  active ? 'bg-[var(--accent)]/10 border-[var(--accent)]' : 'bg-white/[0.03] border-white/5'
                }`}>
                <span className="text-lg">{l.flag}</span>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'text-[var(--accent)]' : 'text-gray-500'}`}>{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TILE 3: Mode Streaming & Sécurité ── */}
      <div style={TILE}>
        <TileLabel><EyeOff size={12} className="mr-1" /> Sécurité & Streaming</TileLabel>
        <Toggle
          label="Mode Streaming"
          sublabel="Masque les identifiants, webhooks et pseudos sensibles."
          value={streamingMode}
          onChange={(v) => { setStreamingMode(v); persistSettings(); }}
        />
        <Toggle label="Activer Logs Debug" value={showLogs} onChange={(v) => apply(() => setShowLogs(v))} />
        <Toggle label="Recherche par ID" value={showIdSearch} onChange={(v) => apply(() => setShowIdSearch(v))} />
      </div>

      {/* ── TILE 4: Mises à jour ── */}
      <div style={TILE}>
        <TileLabel>Système</TileLabel>
        <Toggle label="Auto-Update" value={autoUpdate} onChange={(v) => { setAutoUpdate(v); persistSettings(); }} />

        <button onClick={handleCheckUpdate}
          disabled={updateStatus === "checking"}
          className={`w-full h-12 rounded-xl flex items-center justify-center gap-3 font-['Bebas_Neue'] tracking-[0.1em] transition-all active:scale-95 border ${
            updateStatus === "up-to-date" ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
            updateStatus === "error" ? 'bg-red-500/10 border-red-500/30 text-red-400' :
            'bg-white/5 border-white/10 text-white'
          }`}>
          {updateStatus === "checking" ? <RefreshCw size={16} className="animate-spin" /> :
           updateStatus === "up-to-date" ? <Check size={16} /> : <RefreshCw size={16} />}
          {updateStatus === "checking" ? "VÉRIFICATION..." :
           updateStatus === "up-to-date" ? "À JOUR" : "VÉRIFIER LES MÀJ"}
        </button>

        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <div className="text-[10px] text-gray-500 font-black tracking-widest uppercase">PRO CLUBS STATS MOBILE</div>
          <div className="text-[9px] text-gray-600 mt-1 font-bold">v{appVersion} • TAURI 2.0 • RUST ENGINE</div>
        </div>
      </div>

      {/* Bottom padding for navigation */}
      <div className="h-20" />
    </div>
  );
}
