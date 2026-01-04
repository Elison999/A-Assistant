
import React from 'react';
import { UISettings, UIElement } from '../types.ts';
import { Toggle } from './Toggle.tsx';
import { UI_ELEMENTS } from '../constants.tsx';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UISettings;
  onSettingsChange: (settings: UISettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  if (!isOpen) return null;

  const toggleElement = (el: UIElement) => {
    const isSelected = settings.selectedElements.includes(el);
    let newElements: UIElement[];
    if (isSelected) {
      newElements = settings.selectedElements.filter(item => item !== el);
    } else {
      if (settings.selectedElements.length >= 12) return;
      newElements = [...settings.selectedElements, el];
    }
    onSettingsChange({ ...settings, selectedElements: newElements });
  };

  const handleMaxLinesChange = (val: string) => {
    let num = parseInt(val) || 0;
    if (num > 7500) num = 7500;
    if (num < 1) num = 1;
    onSettingsChange({ ...settings, maxLines: num });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <i className="fas fa-cog text-blue-400"></i> ConfiguraÃ§Ãµes da UI Library
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Geral</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-tighter">Nome da Biblioteca</label>
                  <input
                    type="text"
                    value={settings.libraryName}
                    onChange={(e) => onSettingsChange({ ...settings, libraryName: e.target.value })}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                    placeholder="Ex: Sapphire Hub"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-tighter">MÃ¡ximo de Linhas (Max: 7500)</label>
                  <input
                    type="number"
                    min="1"
                    max="7500"
                    value={settings.maxLines}
                    onChange={(e) => handleMaxLinesChange(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  />
                  <p className="text-[10px] text-slate-500 mt-1 italic">Controla a complexidade e tamanho do cÃ³digo gerado.</p>
                </div>
              </div>
            </div>
            <div>
               <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">MÃ©tricas</h3>
               <div className="bg-slate-900/30 border border-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Elementos Ativos:</span>
                    <span className="text-blue-400 font-bold">{settings.selectedElements.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Budget de Linhas:</span>
                    <span className="text-blue-400 font-bold">{settings.maxLines}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Sistema de Keys:</span>
                    <span className={settings.addKeySystem ? "text-green-500" : "text-slate-600"}>{settings.addKeySystem ? "Sim" : "NÃ£o"}</span>
                  </div>
               </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Estrutura Visual & SeguranÃ§a</h3>
            <div className="divide-y divide-white/5">
              <Toggle
                label="Adicionar Topbar"
                description="Inclui uma barra superior com o nome da biblioteca."
                enabled={settings.addTopbar}
                onChange={(val) => onSettingsChange({ ...settings, addTopbar: val })}
              />
              <Toggle
                label="BotÃ£o Fechar/Abrir"
                description="Adiciona funcionalidade de toggle para visibilidade."
                enabled={settings.addCloseButton}
                onChange={(val) => onSettingsChange({ ...settings, addCloseButton: val })}
              />
              <Toggle
                label="AnimaÃ§Ãµes na Topbar"
                description="Habilita transiÃ§Ãµes suaves ao interagir com a barra."
                enabled={settings.animatedTopbar}
                onChange={(val) => onSettingsChange({ ...settings, animatedTopbar: val })}
              />
              <Toggle
                label="Sistema de Keys"
                description="Inclui uma interface de verificaÃ§Ã£o de chave antes de carregar a biblioteca."
                enabled={settings.addKeySystem}
                onChange={(val) => onSettingsChange({ ...settings, addKeySystem: val })}
              />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Elementos (MÃ¡x 12)</h3>
              <span className="text-xs font-medium text-blue-400">{settings.selectedElements.length}/12 selecionados</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {UI_ELEMENTS.map((el) => {
                const isSelected = settings.selectedElements.includes(el.value);
                return (
                  <button
                    key={el.value}
                    onClick={() => toggleElement(el.value)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                      isSelected 
                        ? 'bg-blue-600/20 border-blue-500 text-blue-100' 
                        : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <i className={`fas ${el.icon} ${isSelected ? 'text-blue-400' : 'text-slate-500'}`}></i>
                    <span className="text-xs font-medium">{el.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-white/10 bg-slate-800/50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Salvar ConfiguraÃ§Ãµes
          </button>
        </div>
      </div>
    </div>
  );
};
