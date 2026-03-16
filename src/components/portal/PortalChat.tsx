import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  from: "client" | "designer";
  name: string;
  avatar: string;
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  designer: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

// Default fallback conversations
const defaultConversations: Conversation[] = [
  {
    id: "1",
    designer: "Aria Voss",
    avatar: "AV",
    lastMessage: "I've uploaded the final brand kit files.",
    time: "2h ago",
    unread: 2,
    messages: [
      { id: "m1", from: "designer", name: "Aria Voss", avatar: "AV", text: "Hey! I've finalized the color palette and typography for the brand identity. Want to take a look?", time: "Yesterday" },
      { id: "m2", from: "client", name: "You", avatar: "ME", text: "Yes please! Can you also include the secondary palette variants?", time: "Yesterday" },
      { id: "m3", from: "designer", name: "Aria Voss", avatar: "AV", text: "Absolutely. I've uploaded the final brand kit files. The secondary variants are on page 4 of the guidelines doc.", time: "2h ago" },
    ],
  },
  {
    id: "2",
    designer: "Mira Chen",
    avatar: "MC",
    lastMessage: "The dashboard is ready for review!",
    time: "4h ago",
    unread: 1,
    messages: [
      { id: "m5", from: "designer", name: "Mira Chen", avatar: "MC", text: "The dashboard UI kit is complete! I've included light and dark mode variants.", time: "4h ago" },
    ],
  },
  {
    id: "3",
    designer: "Soren Blake",
    avatar: "SB",
    lastMessage: "Working on the hero section now.",
    time: "1d ago",
    unread: 0,
    messages: [
      { id: "m6", from: "client", name: "You", avatar: "ME", text: "How's the landing page coming along?", time: "1d ago" },
      { id: "m7", from: "designer", name: "Soren Blake", avatar: "SB", text: "Going great! Working on the hero section now. Should have a draft by tomorrow.", time: "1d ago" },
    ],
  },
];

const PortalChat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(defaultConversations);
  const [activeConvo, setActiveConvo] = useState<Conversation>(defaultConversations[0]);
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState<Message[]>(defaultConversations[0].messages);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  useEffect(() => {
    const fetchChatData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Fetch user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', user.id)
          .single();

        setProfile(profileData);

        // Try to fetch messages from Supabase
        const { data: messagesData, error } = await supabase
          .from('messages')
          .select('*')
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: true });

        if (error) {
          // Table might not exist yet, use defaults
          console.log('Messages table not available, using defaults');
          setIsLoading(false);
          return;
        }

        if (messagesData && messagesData.length > 0) {
          // Group messages by conversation partner
          const convMap = new Map<string, Message[]>();
          const partnerNames = new Map<string, string>();

          for (const msg of messagesData) {
            const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
            if (!convMap.has(partnerId)) {
              convMap.set(partnerId, []);
            }
            convMap.get(partnerId)!.push({
              id: msg.id,
              from: msg.sender_id === user.id ? 'client' : 'designer',
              name: msg.sender_name || 'Unknown',
              avatar: (msg.sender_name || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
              text: msg.content || msg.text || '',
              time: new Date(msg.created_at).toLocaleString(),
            });
            if (!partnerNames.has(partnerId)) {
              partnerNames.set(partnerId, msg.sender_id === user.id ? (msg.receiver_name || 'Designer') : (msg.sender_name || 'Designer'));
            }
          }

          const convos: Conversation[] = Array.from(convMap.entries()).map(([id, msgs]) => ({
            id,
            designer: partnerNames.get(id) || 'Designer',
            avatar: (partnerNames.get(id) || 'D').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            lastMessage: msgs[msgs.length - 1]?.text || '',
            time: msgs[msgs.length - 1]?.time || '',
            unread: 0,
            messages: msgs,
          }));

          if (convos.length > 0) {
            setConversations(convos);
            setActiveConvo(convos[0]);
            setLocalMessages(convos[0].messages);
          }
        }
      } catch (err) {
        console.error('Error fetching chat data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatData();
  }, [user]);

  const handleConvoSwitch = (convo: Conversation) => {
    setActiveConvo(convo);
    setLocalMessages(convo.messages);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const displayName = profile?.full_name || user?.email?.split('@')[0] || 'You';
    const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      from: "client",
      name: displayName,
      avatar: initials,
      text: input.trim(),
      time: "Just now",
    };
    setLocalMessages((prev) => [...prev, newMsg]);

    // Try to insert into Supabase
    if (user) {
      try {
        await supabase.from('messages').insert({
          sender_id: user.id,
          receiver_id: activeConvo.id,
          content: input.trim(),
          sender_name: displayName,
        });
      } catch (err) {
        // Silently fail if table doesn't exist
        console.log('Could not persist message:', err);
      }
    }

    setInput("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat directly with your assigned designers.</p>
      </div>

      <div className="glass-surface rounded-2xl overflow-hidden flex h-[520px]">
        {/* Conversation list */}
        <div className="w-72 border-r border-white/[0.06] flex-shrink-0">
          <div className="p-4 border-b border-white/[0.06]">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversations</p>
          </div>
          <div className="overflow-y-auto h-[calc(100%-49px)]">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => handleConvoSwitch(convo)}
                className={`w-full p-4 text-left border-b border-white/[0.03] transition-colors ${
                  activeConvo.id === convo.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-xs font-semibold text-accent flex-shrink-0">
                    {convo.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{convo.designer}</p>
                      <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-xs font-semibold text-accent">
              {activeConvo.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{activeConvo.designer}</p>
              <p className="text-[10px] text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {localMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.from === "client" ? "flex-row-reverse" : ""}`}
              >
                <div className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-medium text-foreground flex-shrink-0">
                  {msg.avatar}
                </div>
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.from === "client"
                      ? "bg-accent text-accent-foreground rounded-br-md"
                      : "bg-white/[0.06] text-foreground rounded-bl-md"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === "client" ? "text-accent-foreground/60" : "text-muted-foreground"}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl hover:bg-white/[0.06] flex items-center justify-center transition-colors">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 disabled:opacity-30 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalChat;
