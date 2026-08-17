import { startTransition } from "react";
import { Users, Swords, BarChart3, Timer, ShieldCheck, Settings, Trophy } from "lucide-react";
import { useAppStore, type ActiveTab } from "../../store/useAppStore";
import { useT } from "../../i18n";
import type { ReactNode } from "react";

function useNavItems(): { id: ActiveTab; icon: ReactNode; label: string }[] {
  const t = useT();
  return [
    { id: "club",        icon: <ShieldCheck size={22} />, label: "Club" },
    { id: "players",     icon: <Users size={22} />,       label: "Membres" },
    { id: "matches",     icon: <Swords size={22} />,      label: "Matchs" },
    { id: "session",     icon: <Timer size={22} />,       label: "Live" },
  ];
}

/**
 * Universal Mobile Navigation Bar.
 * Used on all devices as the primary navigation system.
 */
export function Sidebar({ mobile = true }: { mobile?: boolean }) {
  const { activeTab, setActiveTab, activeSession, setSidebarTab } = useAppStore();
  const NAV_ITEMS = useNavItems();

  return (
    <nav className="flex items-center justify-around w-full h-full px-1">
      {NAV_ITEMS.map((item) => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              startTransition(() => setActiveTab(item.id));
              setSidebarTab("search");
            }}
            className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 gap-1 transition-all active:scale-90 ${
              active ? "text-[var(--accent)]" : "text-gray-500"
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.id === "session" && activeSession && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse border-2 border-[#0d1117]" />
              )}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tight ${active ? "opacity-100" : "opacity-40"}`}>
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Settings / Admin shortcut */}
      <button
        onClick={() => setSidebarTab("settings")}
        className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 gap-1 text-gray-500 active:scale-90"
      >
        <Settings size={22} className="opacity-80" />
        <span className="text-[9px] font-black uppercase tracking-tight opacity-40">Admin</span>
      </button>
    </nav>
  );
}
