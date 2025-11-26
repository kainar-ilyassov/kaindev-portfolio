import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2, Bot, User } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import AnimeCard from './AnimeCard';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: 'System 9 Online. Ask me about the developer\'s tech stack, experience, or clearance level.',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(input);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <AnimeCard title="Neural Link (AI Chat)" variant="secondary" className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin" ref={scrollRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 
              ${msg.role === 'user' 
                ? 'bg-anime-purple/20 border-anime-purple text-anime-purple' 
                : 'bg-anime-neon/20 border-anime-neon text-anime-neon'}`}
            >
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div 
              className={`max-w-[80%] p-3 text-sm rounded-sm border ${
                msg.role === 'user' 
                  ? 'bg-anime-purple/10 border-anime-purple/30 text-gray-200 clip-corner-inv' 
                  : 'bg-anime-neon/10 border-anime-neon/30 text-anime-neon clip-corner'
              }`}
            >
               {msg.role === 'model' && <span className="block text-[10px] opacity-50 mb-1 font-display">SYSTEM_9</span>}
               {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-anime-neon/50 text-sm animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span>Processing Query...</span>
          </div>
        )}
      </div>

      <div className="relative mt-auto">
        <div className="absolute inset-0 bg-anime-neon/5 skew-x-[-10deg] border border-anime-neon/20 -z-10" />
        <div className="flex items-center gap-2 p-2">
          <Terminal size={18} className="text-anime-neon opacity-70" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20"
          />
          <button
            onClick={() => { playClickSound(); handleSend(); }}
            onMouseEnter={playHoverSound}
            disabled={loading}
            className="p-2 text-anime-dark bg-anime-neon hover:bg-white transition-colors disabled:opacity-50 clip-corner"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </AnimeCard>
  );
};

export default AIChat;
