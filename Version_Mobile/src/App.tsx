import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { TitleBar } from "./components/Layout/TitleBar";
import { Sidebar } from "./components/Layout/Sidebar";
import { MainPanel } from "./components/Layout/MainPanel";
import { DevPanel } from "./components/DevPanel/DevPanel";
import { SearchModal } from "./components/Modals/SearchModal";
import { GlobalSearchModal } from "./components/Modals/GlobalSearchModal";
import { Onboarding } from "./components/Modals/Onboarding";
import { ToastContainer, RecordAlertContainer } from "./components/UI/Toast";
import { UpdateModal } from "./components/Modals/UpdateModal";
import { useAppStore } from "./store/useAppStore";
import { checkProxy } from "./api/tauri";
import { useAutoLoad } from "./hooks/useAutoLoad";
import { useOffline } from "./hooks/useOffline";

function App() {
  const {
    loadSettings, theme, palettePreset, showGrid, showAnimations, darkMode, fontSize,
    addRawLog, showDevPanel, setProxyInfo,
    onboarded, settingsLoaded,
  } = useAppStore();

  useAutoLoad();
  const isOffline = useOffline();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (palettePreset) root.setAttribute("data-palette", palettePreset);
    document.documentElement.style.setProperty("--fs", `${fontSize}px`);
    root.toggleAttribute("data-no-grid", !showGrid);
    root.toggleAttribute("data-no-anim", !showAnimations);
    root.toggleAttribute("data-light", !darkMode);
    loadSettings();
    checkProxy().then((p) => setProxyInfo(p)).catch(() => {});
  }, []);

  useEffect(() => {
    const unlistenLog = listen<string>("api_log", (event) => {
      addRawLog(event.payload);
    });
    return () => { 
      unlistenLog.then(fn => fn());
    };
  }, [addRawLog]);

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--bg)] relative overflow-hidden select-none">
      {/* Status Bar Space (Android) */}
      <div className="h-8 shrink-0 w-full" />

      {/* Universal Header */}
      <TitleBar />

      {/* Main Container - Full height flex */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {isOffline && (
          <div className="bg-[var(--gold)] text-black py-1 px-4 text-[10px] font-black text-center tracking-widest uppercase z-[100] mx-4 rounded-lg shadow-xl mt-2 animate-bounce">
            Connexion Perdue — Cache Actif
          </div>
        )}

        <MainPanel />
      </div>

      {/* Bottom Navigation Area */}
      <div className="h-20 shrink-0 bg-[#0d1117]/95 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <Sidebar mobile />
      </div>

      {showDevPanel && <DevPanel />}
      <SearchModal />
      <GlobalSearchModal />
      {settingsLoaded && !onboarded && <Onboarding />}
      <UpdateModal />
      <RecordAlertContainer />
      <ToastContainer />
    </div>
  );
}

export default App;
