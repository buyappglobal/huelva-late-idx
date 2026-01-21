import React from 'react';
import { Home, BookOpen, Filter, HelpCircle, Menu } from 'lucide-react';

interface BottomNavProps {
  onNavigate: (view: string) => void;
  onAction: (action: string) => void;
  currentView: string;
  isScrolling?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, onAction, currentView, isScrolling = false }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-16 z-[100] bg-stone-900/95 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.4)] flex items-center justify-around px-2 text-[10px] font-medium text-stone-400 border-t border-stone-800 overflow-visible">
      
      {/* Inicio */}
      <button 
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center w-14 h-full space-y-1 transition-colors ${currentView === 'home' ? 'text-white' : 'hover:text-stone-200'}`}
      >
        <Home className={`w-5 h-5 ${currentView === 'home' ? 'text-orange-500' : ''}`} />
        <span>Inicio</span>
      </button>

      {/* Guía */}
      <button 
        onClick={() => onAction('guide')}
        className="flex flex-col items-center justify-center w-14 h-full space-y-1 hover:text-stone-200 transition-colors"
      >
        <BookOpen className="w-5 h-5" />
        <span>Guía</span>
      </button>

      {/* Botón Central Dinámico (Filtrar) - Integrado y Plano */}
      <button 
        onClick={() => onAction('filter')}
        className="relative flex flex-col items-center justify-center w-14 h-full space-y-1 group"
      >
        {/* Contenedor del Icono con Efectos */}
        <div className="relative">
           {/* Halo/Destello: Solo visible cuando se para el scroll */}
           <div className={`absolute inset-0 bg-orange-500 rounded-full blur-md transition-all duration-700 ease-out 
             ${!isScrolling ? 'opacity-60 animate-pulse scale-125' : 'opacity-0 scale-75'}`} 
           />
           
           {/* El Icono en sí */}
           <div className={`relative z-10 p-1.5 rounded-full transition-all duration-500 border border-transparent
             ${!isScrolling 
               ? 'bg-orange-500 text-white shadow-sm transform scale-110 border-orange-400' 
               : 'bg-transparent text-stone-400 group-hover:text-stone-200'}`}
           >
             <Filter className="w-5 h-5" />
           </div>
        </div>
        
        {/* Texto */}
        <span className={`transition-colors duration-300 ${!isScrolling ? 'text-orange-500 font-bold' : 'text-stone-400 group-hover:text-stone-200'}`}>
          Filtrar
        </span>
      </button>

      {/* Ayuda */}
      <button 
        onClick={() => onAction('faq')}
        className="flex flex-col items-center justify-center w-14 h-full space-y-1 hover:text-stone-200 transition-colors"
      >
        <HelpCircle className="w-5 h-5" />
        <span>Ayuda</span>
      </button>

      {/* Menú (Cookies, etc) */}
      <button 
        onClick={() => onAction('menu')}
        className="flex flex-col items-center justify-center w-14 h-full space-y-1 hover:text-stone-200 transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span>Menú</span>
      </button>

    </div>
  );
};

export default BottomNav;