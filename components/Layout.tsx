
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Menu, X, Map, Search, Heart, Cookie, ShieldCheck, FileText, Sparkles, Loader2, ArrowRight, Lock, Unlock, LogIn, User, Key, Download, Trash2, Copy, CheckCircle, PlusCircle, Save, ChevronRight, Calendar, Send, MessageSquare, MapPin } from 'lucide-react';
import BottomNav from './BottomNav';
import { searchPlacesWithAI, chatWithTravelAssistant, ChatMessage } from '../services/geminiService';
import { MOCK_PLACES, CATEGORIES, BLOG_POSTS } from '../constants';
import PlaceCard from './PlaceCard';
import BlogCard from './BlogCard';
import { Place, CategoryId, BlogPost } from '../types';
import { useAdmin } from './AdminContext';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: string) => void;
  onOpenPost?: (post: BlogPost) => void;
  currentView: string;
}

type ModalType = 'none' | 'guide' | 'faq' | 'menu' | 'cookies' | 'filter' | 'login' | 'admin_panel' | 'admin_add_place';

const SUGGESTED_TAGS = ['Cerca de mí', 'Naturaleza', 'Romántico', 'Con niños', 'Historia', 'Playa', 'Aventura', 'Gastronomía'];

// --- GEOLOCATION HELPERS ---
const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, onOpenPost, currentView }) => {
  const { isAdminMode, login, logout, overrides, addedPlaces, addNewPlace, generateReport, clearAllChanges } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Top nav menu
  const [isScrolled, setIsScrolled] = useState(false); // Vertical position check
  const [isScrolling, setIsScrolling] = useState(false); // Movement check
  const [activeModal, setActiveModal] = useState<ModalType>('none');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchStatus, setSearchStatus] = useState<string>(''); // For location status updates

  // Favorites (Guide) State
  const [favoritePlaces, setFavoritePlaces] = useState<Place[]>([]);
  const [favoritePosts, setFavoritePosts] = useState<BlogPost[]>([]);

  // AI Chat (Help) State
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Report Copy State
  const [reportCopied, setReportCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // New Place Form State
  const [newPlaceData, setNewPlaceData] = useState<Partial<Place>>({
    categoryId: CategoryId.SENDERISMO,
    tags: []
  });
  const [newTagsInput, setNewTagsInput] = useState('');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Optimized Report Generation
  const fullReportCode = useMemo(() => {
    if (activeModal === 'admin_panel') {
      return generateReport();
    }
    return '';
  }, [activeModal, overrides, addedPlaces, generateReport]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // PWA Installation Event Listener
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("PWA Install Prompt captured");
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isMenuOpen || activeModal !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, activeModal]);

  // Load favorites when Guide modal opens
  useEffect(() => {
    if (activeModal === 'guide') {
      try {
        const favIds = JSON.parse(localStorage.getItem('huelvalate_favorites') || '[]');
        
        // Filter Places
        const allPlaces = [...addedPlaces, ...MOCK_PLACES];
        const favPlaces = allPlaces.filter(p => favIds.includes(p.id));
        setFavoritePlaces(favPlaces);

        // Filter Blog Posts
        const favPosts = BLOG_POSTS.filter(p => favIds.includes(p.id));
        setFavoritePosts(favPosts);

      } catch (e) {
        console.warn("Error loading favorites", e);
      }
    }
  }, [activeModal, addedPlaces]);

  // Auto-scroll chat
  useEffect(() => {
    if (activeModal === 'faq') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, activeModal]);

  const useSolidNav = isScrolled || currentView === 'home' || isMenuOpen;

  const navLinks = [
    { name: 'Inicio', id: 'home', icon: Map },
    { name: 'Agenda', id: 'agenda', icon: Calendar },
    { name: 'Senderismo', id: 'senderismo', icon: Map },
    { name: 'Naturaleza', id: 'monumentos_naturales', icon: Heart },
    { name: 'Patrimonio', id: 'patrimonio', icon: ShieldCheck },
    { name: 'Playas', id: 'playas', icon: Sparkles },
    { name: 'Blog', id: 'blog', icon: FileText },
  ];

  const handleBottomAction = (action: string) => {
    if (action === 'filter') {
       setActiveModal('filter');
       if (activeModal !== 'filter') {
         setSearchQuery('');
         setSearchResults([]);
         setHasSearched(false);
         setSearchStatus('');
       }
       return;
    }
    setActiveModal(action as ModalType);
  };

  const closeModal = () => {
    setActiveModal('none');
    setUsername('');
    setPassword('');
    setLoginError('');
    setReportCopied(false);
  };

  const executeAISearch = async (query: string, places: Place[]) => {
    const resultIds = await searchPlacesWithAI(query, places);
    const results = places.filter(p => resultIds.includes(p.id));
    const sortedResults = results.sort((a, b) => resultIds.indexOf(a.id) - resultIds.indexOf(b.id));
    setSearchResults(sortedResults);
    setIsSearching(false);
    setSearchStatus('');
  };

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);
    setSearchStatus('');
    
    const allPlaces = [...addedPlaces, ...MOCK_PLACES];

    // Check for "NEAR ME" intent
    const isNearMe = /cerca|near|aquí|aqui/i.test(query);

    if (isNearMe && navigator.geolocation) {
       setSearchStatus('Obteniendo tu ubicación...');
       navigator.geolocation.getCurrentPosition(
         async (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            setSearchStatus('Calculando distancias...');

            // 1. Calculate Distances
            const placesWithDistance = allPlaces.map(place => {
               if (!place.coordinates) return { ...place, distance: Infinity };
               const dist = getDistanceFromLatLonInKm(userLat, userLng, place.coordinates.lat, place.coordinates.lng);
               return { ...place, distance: dist };
            });

            // 2. Filter by Radius (50 km)
            const nearbyPlaces = placesWithDistance.filter(p => p.distance !== Infinity && p.distance <= 50);

            // 3. Extract Topic (remove "cerca de mi", etc)
            const topic = query.toLowerCase().replace(/cerca|de|mi|near|me|aqui|aquí|\s+/g, ' ').trim();
            
            let finalResults = nearbyPlaces;

            // 4. If there is a specific topic (e.g., "playas"), filter the nearby list
            if (topic.length > 2) {
               finalResults = nearbyPlaces.filter(p => 
                  p.title.toLowerCase().includes(topic) || 
                  p.tags.some(t => t.toLowerCase().includes(topic)) ||
                  p.categoryId.toLowerCase().includes(topic) ||
                  (p.shortDescription && p.shortDescription.toLowerCase().includes(topic))
               );
            }

            // 5. Sort by Distance
            finalResults.sort((a, b) => (a.distance || 0) - (b.distance || 0));
            
            setSearchResults(finalResults);
            setIsSearching(false);
            setSearchStatus(finalResults.length > 0 ? `Encontrados ${finalResults.length} lugares en 50km` : 'No hay lugares cercanos registrados.');
         },
         (error) => {
            console.warn("Geolocation denied or error", error);
            setSearchStatus('Ubicación no disponible. Buscando por texto...');
            // Fallback to normal AI search
            executeAISearch(query, allPlaces);
         },
         { timeout: 8000, enableHighAccuracy: false }
       );
    } else {
       executeAISearch(query, allPlaces);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      closeModal();
    } else {
      setLoginError('Credenciales incorrectas');
    }
  };

  const handleAdminClick = () => {
    if (isAdminMode) {
      setActiveModal('admin_panel');
    } else {
      setActiveModal('login');
    }
  };

  const handleCopyReport = async () => {
    if (!fullReportCode) return;
    try {
      await navigator.clipboard.writeText(fullReportCode);
      setReportCopied(true);
      setTimeout(() => setReportCopied(false), 3000);
    } catch (e) {
      if (textAreaRef.current) {
        textAreaRef.current.select();
        try {
          document.execCommand('copy');
          setReportCopied(true);
          setTimeout(() => setReportCopied(false), 3000);
        } catch (err) {
           alert("Usa Ctrl+C para copiar el texto seleccionado.");
        }
      }
    }
  };

  const handleCreatePlace = (e: React.FormEvent) => {
     e.preventDefault();
     if (!newPlaceData.title || !newPlaceData.location) return;

     const tags = newTagsInput.split(',').map(t => t.trim()).filter(t => t !== '');
     
     const newPlace: Place = {
       id: `custom-${Date.now()}`,
       title: newPlaceData.title || 'Nuevo Lugar',
       location: newPlaceData.location || 'Huelva',
       categoryId: newPlaceData.categoryId as CategoryId,
       shortDescription: newPlaceData.shortDescription || 'Descripción pendiente.',
       tags: tags,
       rating: 4.5,
       date: newPlaceData.date,
       imageUrl: '' 
     };

     addNewPlace(newPlace);
     setNewPlaceData({ categoryId: CategoryId.SENDERISMO });
     setNewTagsInput('');
     setActiveModal('admin_panel');
     onNavigate(newPlace.categoryId);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    const aiResponse = await chatWithTravelAssistant(chatHistory, userMsg);
    
    setChatHistory(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsChatLoading(false);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleBlogClick = (post: BlogPost) => {
    closeModal();
    if (onOpenPost) onOpenPost(post);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans text-stone-800 ${isAdminMode ? 'border-4 border-red-500' : ''}`}>
      
      {isAdminMode && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-[10px] font-bold text-center py-1 z-[100] uppercase tracking-widest flex justify-between px-4 items-center cursor-pointer hover:bg-red-700 transition-colors" onClick={() => setActiveModal('admin_panel')}>
          <span>⚠️ MODO ADMINISTRADOR ACTIVO</span>
          <div className="flex items-center space-x-2">
             <span className="bg-red-800 px-2 rounded-full">{Object.keys(overrides).length + addedPlaces.length} cambios</span>
             <span className="underline">Gestionar</span>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${useSolidNav ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'} ${isAdminMode ? 'top-6' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <div 
              className="flex items-center cursor-pointer group z-50 relative" 
              onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
            >
              <div className={`p-2 rounded-lg mr-3 transition-colors ${useSolidNav ? 'bg-orange-50 text-orange-600' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
                <Map className="w-6 h-6" />
              </div>
              <span className={`text-2xl font-bold tracking-tight serif ${useSolidNav ? 'text-stone-900' : 'text-white drop-shadow-md'}`}>
                Huelva<span className={`font-light ${useSolidNav ? 'text-orange-600' : 'text-orange-200'}`}>Late</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                    useSolidNav ? 'text-stone-600' : 'text-white/90 hover:text-white'
                  } ${currentView === link.id ? 'text-orange-500 font-bold' : ''}`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => handleBottomAction('filter')}
                className={`p-2 rounded-full transition-colors ${useSolidNav ? 'hover:bg-stone-100 text-stone-500' : 'hover:bg-white/20 text-white'}`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <div className="md:hidden z-50 relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-all duration-300 active:scale-95 ${useSolidNav ? 'bg-stone-100 text-stone-800' : 'bg-black/20 text-white backdrop-blur-sm'} ${isMenuOpen ? 'bg-orange-100 text-orange-600 rotate-90' : ''}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-stone-50/95 backdrop-blur-2xl flex flex-col overflow-y-auto no-scrollbar animate-fade-in">
             <div className="fixed top-0 right-0 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 animate-pulse pointer-events-none"></div>
             <div className="fixed bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-y-1/3 -translate-x-1/3 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

             <div className="flex-grow flex flex-col justify-center px-6 pt-24 pb-12 relative z-10">
                <div className="space-y-3">
                   {navLinks.map((link, idx) => (
                      <button
                        key={link.id}
                        onClick={() => { onNavigate(link.id); setIsMenuOpen(false); }}
                        style={{ animationDelay: `${idx * 0.05}s` }}
                        className={`w-full text-left p-4 rounded-2xl text-xl font-serif font-bold transition-all duration-300 flex items-center justify-between group animate-slide-in-up opacity-0 fill-mode-forwards border border-transparent ${
                           currentView === link.id 
                             ? 'bg-white shadow-lg shadow-orange-100 border-orange-100 text-orange-600 translate-x-2' 
                             : 'text-stone-600 hover:bg-white/60 hover:text-stone-900 hover:pl-6'
                        }`}
                      >
                         <span className="flex items-center">
                           <span className={`w-1.5 h-1.5 rounded-full mr-3 ${currentView === link.id ? 'bg-orange-500' : 'bg-stone-300'}`}></span>
                           {link.name}
                         </span>
                         <div className={`p-2 rounded-full transition-colors ${currentView === link.id ? 'bg-orange-50 text-orange-500' : 'text-stone-300 group-hover:text-stone-500'}`}>
                           <ChevronRight className="w-5 h-5" />
                         </div>
                      </button>
                   ))}
                </div>

                <div className="mt-8 pt-8 border-t border-stone-200/50 relative z-10 animate-slide-in-up opacity-0 fill-mode-forwards" style={{ animationDelay: '0.4s' }}>
                   <div className="grid grid-cols-2 gap-4">
                      <div 
                         onClick={() => { setIsMenuOpen(false); setActiveModal('guide'); }}
                         className="bg-white/60 rounded-2xl p-4 border border-white flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform"
                      >
                         <Heart className="w-6 h-6 text-orange-500 fill-orange-500 mb-2" />
                         <span className="text-xs font-bold text-stone-700">Favoritos</span>
                      </div>
                      <div 
                         onClick={() => { setIsMenuOpen(false); setActiveModal('faq'); }}
                         className="bg-white/60 rounded-2xl p-4 border border-white flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-transform"
                      >
                         <ShieldCheck className="w-6 h-6 text-blue-500 mb-2" />
                         <span className="text-xs font-bold text-stone-700">Ayuda</span>
                      </div>
                   </div>
                   <div className="mt-8 text-center">
                     <p className="text-[10px] text-stone-400 font-medium tracking-widest uppercase">
                        HuelvaLate &bull; {new Date().getFullYear()}
                     </p>
                   </div>
                </div>
             </div>
          </div>
        )}

      <main className="flex-grow pb-32">
        {children}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold serif mb-2">HuelvaLate</h3>
            <img src="https://solonet.es/wp-content/uploads/2025/11/Diseno-sin-titulo-26.png" alt="Logo" className="h-12 w-auto mb-4 object-contain opacity-90" />
            <p className="text-sm leading-relaxed max-w-xs mb-6">Tu guía inteligente para descubrir los tesoros ocultos de la provincia de Huelva.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li onClick={() => onNavigate('agenda')} className="hover:text-orange-500 cursor-pointer">Agenda Cultural</li>
              <li onClick={() => onNavigate('senderismo')} className="hover:text-orange-500 cursor-pointer">Rutas Senderismo</li>
              <li onClick={() => onNavigate('gastronomia')} className="hover:text-orange-500 cursor-pointer">Gastronomía</li>
              <li onClick={() => onNavigate('playas')} className="hover:text-orange-500 cursor-pointer">Playas</li>
            </ul>
          </div>
        </div>
        <div className="h-16 w-full"></div>
      </footer>

      <BottomNav 
        currentView={currentView}
        onNavigate={onNavigate}
        onAction={handleBottomAction}
        isScrolling={isScrolling}
      />

      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={closeModal} />
          
          <div className={`bg-white w-full max-w-2xl sm:rounded-2xl rounded-t-2xl p-6 pointer-events-auto relative transform transition-transform duration-300 animate-slide-up shadow-2xl
            ${(activeModal === 'filter' || activeModal === 'faq') ? 'h-[85vh] sm:h-auto sm:max-h-[85vh] flex flex-col overflow-hidden' : 'max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar'}`}
          >
            <button onClick={closeModal} className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 z-10 p-2 bg-white/50 rounded-full">
              <X className="w-6 h-6" />
            </button>

            {/* === ADMIN PANEL MODAL === */}
            {activeModal === 'admin_panel' && isAdminMode && (
              <div className="flex flex-col h-full">
                 <h3 className="text-2xl font-bold serif text-stone-900 mb-6 flex items-center"><Lock className="w-6 h-6 mr-3 text-red-600" /> Panel Admin</h3>
                 <div className="flex-grow mb-6 relative flex flex-col min-h-[250px]">
                    <textarea 
                      ref={textAreaRef} readOnly
                      className="w-full flex-grow bg-stone-900 text-green-400 font-mono text-xs p-4 rounded-xl no-scrollbar"
                      value={fullReportCode}
                    />
                    <button onClick={handleCopyReport} className={`absolute bottom-4 right-4 px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center z-10 ${reportCopied ? 'bg-green-500 text-white' : 'bg-white text-stone-900'}`}>
                      {reportCopied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {reportCopied ? '¡Copiado!' : 'Copiar Todo'}
                    </button>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={() => { clearAllChanges(); closeModal(); }} className="p-3 text-red-600 bg-red-50 rounded-xl font-bold text-sm">Borrar Todo</button>
                    <button onClick={() => { logout(); closeModal(); }} className="p-3 text-stone-600 bg-stone-100 rounded-xl font-bold text-sm">Cerrar Sesión</button>
                 </div>
              </div>
            )}

            {/* === ADD PLACE MODAL === */}
            {activeModal === 'admin_add_place' && isAdminMode && (
              <form onSubmit={handleCreatePlace} className="space-y-4">
                  <h3 className="text-xl font-bold serif text-stone-900 mb-4">Nuevo Lugar</h3>
                  <input required className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm" placeholder="Título" value={newPlaceData.title || ''} onChange={e => setNewPlaceData({...newPlaceData, title: e.target.value})} />
                  <input required className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm" placeholder="Ubicación" value={newPlaceData.location || ''} onChange={e => setNewPlaceData({...newPlaceData, location: e.target.value})} />
                  <textarea required className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm h-24" placeholder="Descripción" value={newPlaceData.shortDescription || ''} onChange={e => setNewPlaceData({...newPlaceData, shortDescription: e.target.value})} />
                  <button type="submit" className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4">Guardar Lugar</button>
              </form>
            )}

            {/* === LOGIN MODAL === */}
            {activeModal === 'login' && !isAdminMode && (
              <div className="pb-8">
                 <h3 className="text-2xl font-bold serif text-stone-900 text-center mb-8">Acceso Admin</h3>
                 <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-sm mx-auto">
                   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4" placeholder="Usuario" />
                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4" placeholder="Contraseña" />
                   {loginError && <div className="text-red-600 text-sm text-center">{loginError}</div>}
                   <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl shadow-lg">Entrar</button>
                 </form>
              </div>
            )}

            {/* === FILTER MODAL === */}
            {activeModal === 'filter' && (
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold serif mb-2 text-stone-900 flex items-center"><Sparkles className="w-5 h-5 text-orange-500 mr-2" /> Buscador Inteligente</h3>
                
                <div className="relative mb-4">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Ej: 'restaurantes cerca de mi', 'playas'..." className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-12 text-stone-800 focus:ring-2 focus:ring-orange-500" />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                  <button onClick={() => handleSearch()} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg">{isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}</button>
                </div>
                
                {searchStatus && (
                  <div className="mb-4 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg flex items-center">
                    {isSearching && <Loader2 className="w-3 h-3 animate-spin mr-2" />}
                    {searchStatus}
                  </div>
                )}

                <div className="flex-grow overflow-y-auto pr-1 min-h-0">
                  {!hasSearched && !isSearching && (
                    <div className="mb-8">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Sugerencias</p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_TAGS.map(tag => (
                          <button key={tag} onClick={() => handleSearch(tag)} className="px-4 py-2 bg-stone-100 rounded-full text-stone-600 text-sm hover:bg-orange-50 hover:text-orange-600">
                             {tag === 'Cerca de mí' ? <><MapPin className="w-3 h-3 inline mr-1" /> {tag}</> : `#${tag}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {!isSearching && hasSearched && (
                    <div className="grid grid-cols-1 gap-4 pb-6">
                      {searchResults.length > 0 ? searchResults.map(place => (
                         // USE COMPACT VARIANT HERE
                         <PlaceCard key={place.id} place={place} variant="compact" />
                      )) : <p className="text-center text-stone-500">No se encontraron resultados.</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === MENU MODAL === */}
            {activeModal === 'menu' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-bold serif">Menú Rápido</h3>
                   <button onClick={handleAdminClick} className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${isAdminMode ? 'bg-red-50 text-red-600' : 'bg-stone-50 text-stone-400'}`}>
                     {isAdminMode ? <Unlock className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />} Admin
                   </button>
                </div>
                
                {/* PWA Install Button */}
                {deferredPrompt && (
                   <button 
                     onClick={handleInstallClick}
                     className="flex items-center w-full p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all active:scale-95 mb-4 font-bold"
                   >
                     <Download className="w-5 h-5 mr-3" /> Instalar Aplicación
                   </button>
                )}

                <button className="flex items-center w-full p-3 hover:bg-stone-50 rounded-lg"><Cookie className="w-5 h-5 mr-3 text-stone-500" /> Política de Cookies</button>
                <button className="flex items-center w-full p-3 hover:bg-stone-50 rounded-lg"><ShieldCheck className="w-5 h-5 mr-3 text-stone-500" /> Privacidad</button>
                <button className="flex items-center w-full p-3 hover:bg-stone-50 rounded-lg"><FileText className="w-5 h-5 mr-3 text-stone-500" /> Términos</button>
              </div>
            )}

            {/* === GUIDE MODAL (FAVORITES) === */}
            {activeModal === 'guide' && (
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-bold serif mb-2 text-stone-900 flex items-center">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500 mr-2" />
                  Mis Favoritos
                </h3>
                <p className="text-stone-500 text-sm mb-6">Tus lugares guardados para planificar tu ruta perfecta.</p>
                
                <div className="flex-grow overflow-y-auto no-scrollbar pr-1 pb-4">
                  {(favoritePlaces.length > 0 || favoritePosts.length > 0) ? (
                    <div className="space-y-8">
                      {favoritePlaces.length > 0 && (
                        <div className="grid grid-cols-1 gap-6">
                          {favoritePlaces.map(place => (
                            <PlaceCard key={place.id} place={place} />
                          ))}
                        </div>
                      )}
                      
                      {favoritePosts.length > 0 && (
                        <div>
                           {favoritePlaces.length > 0 && <h4 className="text-lg font-bold text-stone-800 mb-4 serif border-t border-stone-200 pt-6">Blog Guardado</h4>}
                           <div className="grid grid-cols-1 gap-6">
                              {favoritePosts.map(post => (
                                <BlogCard key={post.id} post={post} onClick={() => handleBlogClick(post)} />
                              ))}
                           </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100">
                      <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-500 font-bold mb-2">Aún no tienes favoritos</p>
                      <p className="text-sm text-stone-400 max-w-xs mx-auto">
                        Explora los lugares y toca el corazón ❤️ para guardarlos aquí.
                      </p>
                      <button 
                        onClick={closeModal}
                        className="mt-6 bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-bold"
                      >
                        Empezar a explorar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === FAQ MODAL (AI CHAT) === */}
            {activeModal === 'faq' && (
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-4">
                   <div>
                     <h3 className="text-xl font-bold serif text-stone-900 flex items-center">
                       <MessageSquare className="w-5 h-5 text-blue-500 mr-2" /> 
                       Tartessos AI
                     </h3>
                     <p className="text-xs text-stone-500">Tu asistente de viaje personal 24/7</p>
                   </div>
                   <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center">
                     <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span> En línea
                   </div>
                </div>

                {/* Chat History */}
                <div className="flex-grow overflow-y-auto no-scrollbar space-y-4 mb-4 p-1">
                   {chatHistory.length === 0 && (
                     <div className="text-center py-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Sparkles className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="text-stone-600 font-medium mb-2">¡Hola! Soy Tartessos.</p>
                        <p className="text-sm text-stone-400 max-w-xs mx-auto mb-6">
                          Pregúntame sobre qué visitar, dónde comer gambas o planes con niños en Huelva.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {["Planes románticos", "Comer en la Sierra", "¿Qué ver en Doñana?", "Rutas fáciles"].map(suggestion => (
                            <button 
                              key={suggestion}
                              onClick={() => { setChatInput(suggestion); }}
                              className="text-xs bg-stone-100 hover:bg-blue-50 text-stone-600 px-3 py-2 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                     </div>
                   )}

                   {chatHistory.map((msg, idx) => (
                     <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                         msg.role === 'user' 
                           ? 'bg-stone-900 text-white rounded-br-none' 
                           : 'bg-stone-100 text-stone-800 rounded-bl-none shadow-sm'
                       }`}>
                         {msg.text}
                       </div>
                     </div>
                   ))}
                   
                   {isChatLoading && (
                     <div className="flex justify-start">
                       <div className="bg-stone-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                         <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                       </div>
                     </div>
                   )}
                   <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="relative mt-auto">
                   <input 
                     type="text"
                     value={chatInput}
                     onChange={(e) => setChatInput(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                     placeholder="Escribe tu duda aquí..."
                     className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   />
                   <button 
                     onClick={handleSendMessage}
                     disabled={!chatInput.trim() || isChatLoading}
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                   >
                     <Send className="w-4 h-4" />
                   </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Layout;
