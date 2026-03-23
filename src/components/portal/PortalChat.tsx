import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Circle, Paperclip, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string; from: "client" | "designer"; name: string; avatar: string; text: string; time: string;
}
interface Conversation {
  id: string; designer: string; initials: string; gradientFrom: string; gradientTo: string;
  lastMessage: string; time: string; unread: number; online: boolean; messages: Message[];
}

const CONVOS: Conversation[] = [
  {
    id: "1", designer: "Aria Voss", initials: "AV", gradientFrom: "#fa2a65", gradientTo: "#ff6b9d",
    lastMessage: "I've uploaded the final brand kit files.", time: "2h ago", unread: 2, online: true,
    messages: [
      { id: "m1", from: "designer", name: "Aria Voss", avatar: "AV", text: "Hey! I've finalized the color palette and typography for the brand identity. Want to check it out?", time: "Yesterday 3:12 PM" },
      { id: "m2", from: "client",   name: "You",       avatar: "ME", text: "Yes please! Can you also include the secondary palette variants?", time: "Yesterday 3:45 PM" },
      { id: "m3", from: "designer", name: "Aria Voss", avatar: "AV", text: "Done! The brand kit is uploaded. Secondary variants are on page 4 of the guidelines doc.", time: "2h ago" },
    ],
  },
  {
    id: "2", designer: "Mira Chen", initials: "MC", gradientFrom: "#6366f1", gradientTo: "#a78bfa",
    lastMessage: "The dashboard UI kit is ready for review!", time: "4h ago", unread: 1, online: true,
    messages: [
      { id: "m4", from: "designer", name: "Mira Chen", avatar: "MC", text: "Great news! The dashboard UI kit is complete — light and dark mode, fully tokenized.", time: "4h ago" },
    ],
  },
  {
    id: "3", designer: "Soren Blake", initials: "SB", gradientFrom: "#0ea5e9", gradientTo: "#38bdf8",
    lastMessage: "Working on the hero section right now.", time: "1d ago", unread: 0, online: false,
    messages: [
      { id: "m5", from: "client",   name: "You",         avatar: "ME", text: "How is the landing page coming along?",                                                time: "1d ago" },
      { id: "m6", from: "designer", name: "Soren Blake", avatar: "SB", text: "Going great! Working on the hero section now. Draft ready by tomorrow morning.",      time: "1d ago" },
    ],
  },
];

const PortalChat = () => {
  const { user } = useAuth();
  const [convos, setConvos] = useState<Conversation[]>(CONVOS);
  const [active, setActive] = useState<Conversation | null>(null);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => {
    const demo = sessionStorage.getItem('demo_auth');
    if (demo) { setProfile({ full_name: JSON.parse(demo).full_name }); return; }
    if (!user) return;
    supabase.from('profiles').select('full_name').eq('id', user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  const openConvo = (c: Conversation) => {
    setActive(c); setMsgs(c.messages);
    setConvos(prev => prev.map(x => x.id === c.id ? { ...x, unread: 0 } : x));
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    const displayName = profile?.full_name || "You";
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const newMsg: Message = { id: `m-${Date.now()}`, from: "client", name: displayName, avatar: initials, text: input.trim(), time: "Just now" };
    const updated = [...msgs, newMsg];
    setMsgs(updated);
    if (active) setConvos(prev => prev.map(c => c.id === active.id ? { ...c, lastMessage: input.trim(), time: "Just now" } : c));
    setInput("");
  };

  const totalUnread = convos.reduce((s, c) => s + c.unread, 0);

  const ChatPane = ({ convo }: { convo: Conversation }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={() => setActive(null)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/[0.06] transition-colors flex-shrink-0">
          <ArrowLeft className="w-4 h-4 text-white/50" />
        </button>
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
            style={{ background: `linear-gradient(135deg, ${convo.gradientFrom}, ${convo.gradientTo})` }}>
            {convo.initials}
          </div>
          {convo.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#10101a]" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">{convo.designer}</p>
          <div className="flex items-center gap-1.5">
            {convo.online
              ? <><motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}><Circle className="w-2 h-2 text-emerald-400 fill-emerald-400" /></motion.div><span className="text-[10px] text-emerald-400 font-medium">Online now</span></>
              : <span className="text-[10px] text-white/25">Offline</span>
            }
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence initial={false}>
          {msgs.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${msg.from === "client" ? "flex-row-reverse" : ""}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-white flex-shrink-0"
                style={{ background: msg.from === "client" ? "linear-gradient(135deg,#fa2a65,#ff6b9d)" : "rgba(255,255,255,0.08)" }}>
                {msg.avatar}
              </div>
              <div className="max-w-[72%] px-4 py-3 rounded-2xl text-sm"
                style={msg.from === "client"
                  ? { background: "linear-gradient(135deg,#fa2a65,#c91952)", borderBottomRightRadius: 4, boxShadow: "0 4px 24px rgba(250,42,101,0.25)", color: "white" }
                  : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)", borderBottomLeftRadius: 4, color: "white" }
                }>
                <p className="leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1.5 ${msg.from === "client" ? "text-white/50" : "text-white/30"}`}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-white/[0.06] transition-colors">
            <Paperclip className="w-4 h-4 text-white/25" />
          </button>
          <input
            value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder={`Message ${convo.designer.split(' ')[0]}...`}
            className="flex-1 h-10 rounded-xl px-4 text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            onFocus={e => e.target.style.borderColor = "rgba(250,42,101,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
          <motion.button whileTap={{ scale: 0.92 }} onClick={sendMsg} disabled={!input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-25 flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#fa2a65,#d41e55)", boxShadow: input.trim() ? "0 0 18px rgba(250,42,101,0.4)" : "none" }}>
            <Send className="w-4 h-4 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );

  const ConvoList = () => (
    <div>
      {convos.map(c => (
        <button key={c.id} onClick={() => openConvo(c)}
          className="w-full flex items-center gap-3 p-4 text-left border-b last:border-0 transition-colors hover:bg-white/[0.02]"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black text-white"
              style={{ background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})` }}>{c.initials}</div>
            {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0d0d14]" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-sm font-bold text-white">{c.designer}</p>
              <span className="text-[10px] text-white/25">{c.time}</span>
            </div>
            <p className="text-xs text-white/35 truncate">{c.lastMessage}</p>
          </div>
          {c.unread > 0 && (
            <span className="w-6 h-6 rounded-full bg-accent text-white text-[11px] flex items-center justify-center font-black flex-shrink-0"
              style={{ boxShadow: "0 0 8px rgba(250,42,101,0.5)" }}>{c.unread}</span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center relative" style={{ background: "rgba(96,165,250,0.12)" }}>
            <MessageCircle className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
            {totalUnread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-white text-[9px] flex items-center justify-center font-black"
                style={{ boxShadow: "0 0 6px rgba(250,42,101,0.6)" }}>{totalUnread}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Messages</h1>
        </div>
        <p className="text-white/35 text-sm">Communicate directly with your designers</p>
      </div>

      <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
        {/* Mobile */}
        <div className="md:hidden">
          {active ? (
            <div style={{ height: "calc(100dvh - 230px)", minHeight: 400 }} className="flex flex-col">
              <ChatPane convo={active} />
            </div>
          ) : <ConvoList />}
        </div>

        {/* Desktop split */}
        <div className="hidden md:flex" style={{ height: 560 }}>
          <div className="w-64 flex-shrink-0 flex flex-col" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-[10px] font-black text-white/25 uppercase tracking-[0.2em]">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {convos.map(c => (
                <button key={c.id} onClick={() => openConvo(c)}
                  className="w-full p-3.5 text-left border-b transition-colors relative"
                  style={{ borderColor: "rgba(255,255,255,0.04)", background: active?.id === c.id ? "rgba(250,42,101,0.07)" : "transparent" }}>
                  {active?.id === c.id && <motion.div layoutId="chatBar" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-accent rounded-full" style={{ boxShadow: "0 0 8px rgba(250,42,101,0.8)" }} />}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: `linear-gradient(135deg,${c.gradientFrom},${c.gradientTo})` }}>{c.initials}</div>
                      {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0d0d14]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between"><p className="text-xs font-bold text-white">{c.designer}</p><span className="text-[9px] text-white/25">{c.time}</span></div>
                      <p className="text-[11px] text-white/35 truncate mt-0.5">{c.lastMessage}</p>
                    </div>
                    {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] flex items-center justify-center font-black flex-shrink-0">{c.unread}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            {(active ?? convos[0]) && <ChatPane convo={active ?? convos[0]} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalChat;
