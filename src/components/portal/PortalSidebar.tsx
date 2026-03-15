import { LayoutDashboard, Users, FolderKanban, MessageCircle, MessageSquareWarning, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { PortalView } from "@/pages/PortalDashboard";

interface Props {
  activeView: PortalView;
  onNavigate: (view: PortalView) => void;
}

const navItems: { id: PortalView; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "designers", label: "My Designers", icon: Users },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "chat", label: "Messages", icon: MessageCircle },
  { id: "feedback", label: "Feedback", icon: MessageSquareWarning },
];

const PortalSidebar = ({ activeView, onNavigate }: Props) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen border-r border-border flex flex-col bg-card">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-lg font-bold text-foreground tracking-tight">
          DOMINANCE<span className="text-accent">.</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Client Portal</p>
      </div>

      {/* Client info */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-xs font-semibold text-accent">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-[11px] text-muted-foreground">Dominance Pro</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              {item.label}
              {item.id === "chat" && (
                <span className="ml-auto w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={() => navigate("/portal")}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;
