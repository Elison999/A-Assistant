
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UISettings } from './types.ts';
import { SettingsModal } from './components/SettingsModal.tsx';
import { ExampleModal } from './components/ExampleModal.tsx';
import { generateRobloxUILibrary } from './services/gemini.ts';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGeneratedCode, setHasGeneratedCode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExampleOpen, setIsExampleOpen] = useState(false);
  const [settings, setSettings] = useState<UISettings>({
    libraryName: 'MyRobloxUI',
    addTopbar: true,
    addCloseButton: true,
    animatedTopbar: true,
    addKeySystem: false,
    maxLines: 2500,
    selectedElements: ['Button', 'Toggle', 'Slider']
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateRobloxUILibrary(userMessage.content, settings);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Aqui estÃ¡ o cÃ³digo gerado para a sua biblioteca Roblox UI:",
        code: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setHasGeneratedCode(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('CÃ³digo copiado para a Ã¡rea de transferÃªncia!');
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto border-x border-white/5 shadow-2xl overflow-hidden bg-slate-950">
      <header className="glass px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="fas fa-cubes text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Roblox UI Architect</h1>
            <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Advanced Luau Generation AI</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => hasGeneratedCode && setIsExampleOpen(true)}
            disabled={!hasGeneratedCode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all border ${
              hasGeneratedCode 
                ? 'bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border-blue-500/20 cursor-pointer' 
                : 'bg-slate-900 text-slate-600 border-white/5 cursor-not-allowed opacity-50'
            }`}
          >
            <i className={`fas ${hasGeneratedCode ? 'fa-eye' : 'fa-lock'}`}></i>
            <span className="text-xs font-semibold hidden sm:inline">Ver Exemplo</span>
          </button>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/5"
          >
            <i className="fas fa-cog text-xl"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <i className="fas fa-robot text-4xl text-blue-500/50"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-200">Como posso ajudar?</h2>
            <p className="text-slate-400 max-w-md">Especialista em criar bibliotecas de interface para Roblox.</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[85%] space-y-2">
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'glass text-slate-200'}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
              {msg.code && (
                <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                  <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-white/5">
                    <span className="text-[10px] font-mono text-slate-400">luau-script.lua</span>
                    <button onClick={() => copyToClipboard(msg.code || '')} className="text-xs text-blue-400 hover:text-blue-300">
                      <i className="far fa-copy mr-1"></i> Copiar
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 overflow-x-auto mono text-xs text-blue-100">
                    <code>{msg.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass p-4 rounded-2xl flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <div className="p-4 glass border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-900/80 border border-white/10 rounded-2xl px-6 py-4 pr-16 focus:ring-2 focus:ring-blue-600 outline-none min-h-[100px] resize-none text-white"
              placeholder="Descreva sua UI Library..."
              rows={3}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={`absolute right-3 bottom-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !isLoading ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} onSettingsChange={setSettings} />
      <ExampleModal isOpen={isExampleOpen} onClose={() => setIsExampleOpen(false)} settings={settings} />
    </div>
  );
};

export default App;
