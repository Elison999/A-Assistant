
import { UIElement } from './types.ts';

export const UI_ELEMENTS: { value: UIElement; label: string; icon: string }[] = [
  { value: 'Button', label: 'BotÃ£o Interativo', icon: 'fa-mouse-pointer' },
  { value: 'Toggle', label: 'Interruptor (Toggle)', icon: 'fa-toggle-on' },
  { value: 'Slider', label: 'Barra de Deslizamento', icon: 'fa-sliders-h' },
  { value: 'Dropdown', label: 'Menu Suspenso', icon: 'fa-caret-square-down' },
  { value: 'Label', label: 'RÃ³tulo de Texto', icon: 'fa-font' },
  { value: 'TextBox', label: 'Campo de Entrada', icon: 'fa-keyboard' },
  { value: 'ScrollingFrame', label: 'Painel com Scroll', icon: 'fa-scroll' },
  { value: 'ColorPicker', label: 'Seletor de Cores', icon: 'fa-palette' },
  { value: 'Keybind', label: 'Atalho de Teclado', icon: 'fa-keyboard' },
  { value: 'Tabs', label: 'Sistema de Abas', icon: 'fa-columns' },
  { value: 'Notification', label: 'NotificaÃ§Ãµes Toast', icon: 'fa-bell' },
  { value: 'SearchBar', label: 'Barra de Pesquisa', icon: 'fa-search' },
];
