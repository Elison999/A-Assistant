
import React from 'react';
import { UISettings, UIElement } from '../types.ts';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UISettings;
}

const getElementExample = (element: UIElement): string => {
  switch (element) {
    case 'Button':
      return `Section:CreateButton({
    Name = "BotÃ£o de Teste",
    Callback = function()
        print("BotÃ£o acionado!")
    end
})`;
    case 'Toggle':
      return `Section:CreateToggle({
    Name = "Ativar Recurso",
    CurrentValue = false,
    Callback = function(Value)
        print("Toggle alterado para: ", Value)
    end
})`;
    case 'Slider':
      return `Section:CreateSlider({
    Name = "Ajuste de Velocidade",
    Range = {16, 100},
    Increment = 1,
    Suffix = " Spd",
    CurrentValue = 16,
    Callback = function(Value)
        print("Novo valor do Slider: ", Value)
    end
})`;
    case 'Dropdown':
      return `Section:CreateDropdown({
    Name = "Selecionar Modo",
    Options = {"Agressivo", "Silencioso", "PadrÃ£o"},
    CurrentOption = "PadrÃ£o",
    MultipleOptions = false,
    Callback = function(Option)
        print("Selecionado: ", Option)
    end
})`;
    case 'TextBox':
      return `Section:CreateInput({
    Name = "Nome do Jogador",
    PlaceholderText = "Digite aqui...",
    RemoveTextAfterFocusLost = false,
    Callback = function(Text)
        print("Input recebido: ", Text)
    end
})`;
    case 'ColorPicker':
      return `Section:CreateColorPicker({
    Name = "Cor da UI",
    Color = Color3.fromRGB(255, 0, 0),
    Callback = function(Value)
        print("Cor selecionada: ", Value)
    end
})`;
    case 'Keybind':
      return `Section:CreateKeybind({
    Name = "Atalho de Teclado",
    CurrentKeybind = "F",
    HoldToInteract = false,
    Callback = function(Keybind)
        print("Tecla pressionada: ", Keybind)
    end
})`;
    default:
      return `-- Exemplo para ${element} nÃ£o disponÃ­vel nesta prÃ©-visualizaÃ§Ã£o.`;
  }
};

export const ExampleModal: React.FC<ExampleModalProps> = ({ isOpen, onClose, settings }) => {
  if (!isOpen) return null;

  const elementsCode = settings.selectedElements
    .map(el => getElementExample(el))
    .join('\n\n');

  const keySystemCode = settings.addKeySystem ? `
-- LÃ³gica do Sistema de Chaves (Habilitado)
local Window = Library:CreateWindow({
    Name = "${settings.libraryName}",
    KeySystem = true, -- Ativa o sistema interno
    KeySettings = {
        Title = "Sistema de VerificaÃ§Ã£o",
        Subtitle = "Obtenha sua chave no Discord",
        Note = "A chave expira em 24h",
        FileName = "${settings.libraryName.replace(/\s+/g, '')}Key",
        SaveKey = true,
        GrabKeyFromSite = false,
        Key = {"SUA_CHAVE_AQUI", "CHAVE_ADMIN"}
    }
})` : `
-- LÃ³gica PadrÃ£o sem Sistema de Chaves
local Window = Library:CreateWindow({
    Name = "${settings.libraryName}",
    LoadingTitle = "Iniciando...",
    LoadingSubtitle = "by AI Architect",
    ConfigurationSaving = {
        Enabled = true,
        FolderName = "${settings.libraryName.replace(/\s+/g, '')}Config"
    }
})`;

  const exampleCode = `local Library = loadstring(game:HttpGet("LINK_GERADO_AQUI"))()
${keySystemCode}

local MainTab = Window:CreateTab({
    Name = "Principal",
    Icon = "rbxassetid://4483345998"
})

local Section = MainTab:CreateSection("Controles DisponÃ­veis")

${elementsCode}

Library:Notify({
    Title = "Sucesso",
    Content = "Script carregado com sucesso!",
    Duration = 5
})`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exampleCode);
    alert('Exemplo dinÃ¢mico copiado!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="glass w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <i className="fas fa-code text-blue-400"></i> Exemplo da sua Library
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-slate-950">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div>
              <p className="text-sm text-slate-200 font-medium">Uso prÃ¡tico baseado na sua configuraÃ§Ã£o:</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">
                Inclui: {settings.selectedElements.join(' â€¢ ')} {settings.addKeySystem ? 'â€¢ Key System' : ''}
              </p>
            </div>
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 flex-shrink-0"
            >
              <i className="far fa-copy mr-2"></i> Copiar CÃ³digo
            </button>
          </div>
          <pre className="mono text-xs leading-relaxed text-blue-200 p-5 rounded-xl border border-white/5 bg-slate-900/50 overflow-x-auto selection:bg-blue-500/30">
            <code>{exampleCode}</code>
          </pre>
        </div>

        <div className="p-4 border-t border-white/10 bg-slate-800/50 flex justify-center">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors"
          >
            Fechar VisualizaÃ§Ã£o
          </button>
        </div>
      </div>
    </div>
  );
};
