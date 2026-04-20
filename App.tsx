import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/genai";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContentStream(input);
      
      let assistantText = "";
      setMessages(prev => [...prev, { role: 'assistant', text: '' }]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        assistantText += chunkText;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = assistantText;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0f] text-white font-sans">
      <header className="p-6 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          anaiai.co
        </h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              m.role === 'user' 
              ? 'bg-blue-600 rounded-tr-none' 
              : 'bg-white/5 border border-white/10 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-white/40 animate-pulse">Architecting response...</div>}
        <div ref={scrollRef} />
      </main>

      <footer className="p-4 border-t border-white/10 bg-[#0a0a0f] pb-10">
        <div className="relative flex items-center">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your vision..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 pr-16 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button onClick={handleSend} className="absolute right-2 p-2 bg-white text-black rounded-full hover:bg-blue-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;

