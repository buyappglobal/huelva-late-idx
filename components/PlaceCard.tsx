
import React, { useState, useEffect } from 'react';
import { Place, CategoryId } from '../types';
import { MapPin, Sun, Thermometer, Sparkles, X, Calendar, Image as ImageIcon, Loader2, Navigation, ExternalLink, Map as MapIcon, Aperture, Heart, ChevronRight, Star, Volume2, Square, Share2, Ruler, Clock, Activity, Repeat, Check } from 'lucide-react';
import { generatePlaceDetails, generateImageForLocation, getCachedImage, getCacheKey } from '../services/geminiService';
import AdminOverlay from './AdminOverlay';
import { useAdmin } from './AdminContext';
import { flushSync } from 'react-dom';

interface PlaceCardProps {
  place: Place;
  variant?: 'default' | 'compact';
}

const LOADING_STEPS = [
  "Conectando con IA...",
  "Analizando entorno...",
  "Calculando iluminación...",
  "Revelando fotografía..."
];

// Placeholder images for loading backgrounds (blurred) and fallbacks
const PLACEHOLDER_SIERRA = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop"; 
const PLACEHOLDER_COAST = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop";

const PlaceCard: React.FC<PlaceCardProps> = ({ place, variant = 'default' }) => {
  const { getImageOverride, setImageOverride, getTextOverride, setTextOverride, isAdminMode } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Favorites State
  const [isFavorite, setIsFavorite] = useState(false);

  // Content States
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  
  // Text to Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize Favorites
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('huelvalate_favorites') || '[]');
      setIsFavorite(favs.includes(place.id));
    } catch (e) {
      console.warn("Error reading favorites", e);
    }
  }, [place.id]);

  // Cleanup speech synthesis on unmount or modal close
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop speaking when modal closes
  useEffect(() => {
    if (!isModalOpen && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isModalOpen, isSpeaking]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('huelvalate_favorites') || '[]');
      let newFavs;
      if (favs.includes(place.id)) {
        newFavs = favs.filter((id: string) => id !== place.id);
        setIsFavorite(false);
      } else {
        newFavs = [...favs, place.id];
        setIsFavorite(true);
      }
      localStorage.setItem('huelvalate_favorites', JSON.stringify(newFavs));
    } catch (e) {
      console.error("Error saving favorite", e);
    }
  };

  // --- IMAGE LOGIC (STATIC FIRST -> CACHE -> AI FALLBACK) ---

  // 1. Initialize State: Override -> Cache -> Default Static URL
  const [imageSrc, setImageSrc] = useState<string>(() => {
    // A. Admin Override (Highest priority)
    const override = getImageOverride(place.id);
    if (override) return override;

    // B. LocalStorage Cache (Fast retrieval)
    const cached = getCachedImage(place.title, place.location);
    if (cached) return cached;

    // C. Static/Mock URL (Fallback / Placeholder)
    return place.imageUrl;
  });

  // 2. Initialize Generation State - DISABLED AUTO-GENERATION
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Re-sync if admin override changes externally
  useEffect(() => {
    const override = getImageOverride(place.id);
    if (override) {
      setImageSrc(override);
      setIsGeneratingImage(false);
    }
  }, [place.id, getImageOverride]);
  
  // Animation for loading steps
  const [loadingStep, setLoadingStep] = useState(0);
  const isCoast = place.categoryId === CategoryId.PLAYAS;
  const loadingBg = isCoast ? PLACEHOLDER_COAST : PLACEHOLDER_SIERRA;

  useEffect(() => {
    if (!isGeneratingImage) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isGeneratingImage]);

  // 3. Effect: Trigger AI Generation if needed
  useEffect(() => {
    // Guard clause: Only generate if state says so and we don't have an override
    if (!isGeneratingImage || getImageOverride(place.id)) return;

    let isMounted = true;
    
    const fetchCustomImage = async () => {
      // Double check cache before expensive API call (in case of race conditions)
      const cached = getCachedImage(place.title, place.location);
      if (cached) {
        if (isMounted) {
          setImageSrc(cached);
          setIsGeneratingImage(false);
        }
        return;
      }

      // CALL AI SERVICE
      const generatedUrl = await generateImageForLocation(
        place.title,
        place.location,
        place.shortDescription
      );

      if (isMounted) {
        if (generatedUrl) {
          setImageSrc(generatedUrl);
          // If in admin mode, auto-save as override so we don't lose it
          if (isAdminMode) {
             setImageOverride(place.id, generatedUrl);
          }
        }
        // Whether success or fail (fallback to static), stop loading
        setIsGeneratingImage(false);
      }
    };

    fetchCustomImage();

    return () => { isMounted = false; };
  }, [place, isGeneratingImage, isAdminMode, setImageOverride, getImageOverride]);

  const handleRegenerate = async () => {
      setIsGeneratingImage(true);
      // Remove from cache to force generation
      const key = getCacheKey(place.title, place.location);
      localStorage.removeItem(key);
      
      const generatedUrl = await generateImageForLocation(
        place.title,
        place.location,
        place.shortDescription
      );
      
      if (generatedUrl) {
          setImageSrc(generatedUrl);
          if (isAdminMode) {
             setImageOverride(place.id, generatedUrl);
          }
      }
      setIsGeneratingImage(false);
  };

  // --- ERROR HANDLER ---
  const handleImageError = () => {
    // If the image fails to load, use fallback placeholder instead of AI
    if (imageSrc !== loadingBg) {
       console.log(`[PlaceCard] Image failed for ${place.title}. Using placeholder.`);
       setImageSrc(loadingBg);
       setIsGeneratingImage(false);
    }
  };

  // --- TEXT / AI GUIDE LOGIC ---
  const existingText = getTextOverride(place.id) || place.fullDescription;

  const handleAskAI = async () => {
    if (aiContent) return; 
    if (existingText) {
      setAiContent(existingText);
      return;
    }
    setIsLoadingAi(true);
    const content = await generatePlaceDetails(place);
    setAiContent(content);
    setIsLoadingAi(false);
    if (content && isAdminMode) {
      setTextOverride(place.id, content);
    }
  };

  const handleSpeak = () => {
    if (!aiContent) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(aiContent);
    utterance.lang = 'es-ES'; // Force Spanish
    utterance.rate = 1; // Normal speed
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: place.title,
      text: `¡Mira esta ruta en HuelvaLate!\n\n🥾 ${place.title}\n📍 ${place.location}\nℹ️ ${place.shortDescription}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${place.title} ${place.location} Huelva`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // RENDER COMPACT VARIANT (Search Results)
  if (variant === 'compact') {
    return (
      <div 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-white p-3 rounded-xl border border-stone-100 shadow-sm cursor-pointer hover:bg-stone-50 transition-colors"
      >
        <img src={imageSrc} alt={place.title} className="w-16 h-16 rounded-lg object-cover mr-4" onError={handleImageError} />
        <div className="flex-grow">
           <h4 className="font-bold text-stone-900 text-sm">{place.title}</h4>
           <div className="flex items-center text-xs text-stone-500">
             <MapPin className="w-3 h-3 mr-1" /> {place.location}
           </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-300" />
      </div>
    );
  }

  // RENDER DEFAULT CARD
  return (
    <>
      <article 
        className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full border border-stone-100 relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-stone-200">
          
          <AdminOverlay 
            entityId={place.id} 
            entityName={place.title} 
            type="place" 
            currentImageSrc={imageSrc}
            className="w-full h-full"
            onRegenerate={handleRegenerate}
          >
             {isGeneratingImage ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-800 z-10 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110"
                    style={{ backgroundImage: `url(${loadingBg})` }}
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <Loader2 className="w-8 h-8 text-orange-400 animate-spin mb-3" />
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase animate-pulse">
                      {LOADING_STEPS[loadingStep]}
                    </span>
                  </div>
                </div>
             ) : (
                <img 
                  src={imageSrc} 
                  alt={place.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={handleImageError}
                  style={{ viewTransitionName: `place-img-${place.id}` } as React.CSSProperties}
                />
             )}
          </AdminOverlay>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-none">
             {place.weather && (
               <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm flex items-center w-fit">
                  <Thermometer className="w-3 h-3 mr-1 text-orange-500" /> {place.weather.temp}°
               </div>
             )}
             {place.date && (
                <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-indigo-900 shadow-sm flex items-center w-fit">
                   <Calendar className="w-3 h-3 mr-1" /> {place.date}
                </div>
             )}
             {/* --- HIKING BADGE ON IMAGE --- */}
             {place.hiking && (
                <div className="bg-emerald-100/90 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm flex items-center w-fit">
                   <Activity className="w-3 h-3 mr-1" /> {place.hiking.difficulty}
                </div>
             )}
          </div>

          <button 
             onClick={toggleFavorite}
             className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-colors z-20 shadow-sm group/fav"
          >
             <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white group-hover/fav:text-red-500'}`} />
          </button>
        </div>

        {/* Card Content */}
        <div className="p-5 flex-grow flex flex-col">
           <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-stone-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                  {place.title}
                </h3>
                <div className="flex items-center text-stone-500 text-sm">
                  <MapPin className="w-3 h-3 mr-1" /> {place.location}
                </div>
              </div>
              <div className="flex items-center bg-stone-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-xs font-bold text-stone-700">{place.rating}</span>
              </div>
           </div>

           {/* --- HIKING STATS ROW --- */}
           {place.hiking && (
             <div className="flex items-center gap-4 py-3 my-2 border-t border-b border-stone-100">
                <div className="flex items-center text-stone-600 text-xs font-medium" title="Distancia">
                   <Ruler className="w-4 h-4 mr-1.5 text-stone-400" />
                   {place.hiking.distanceKm} km
                </div>
                <div className="flex items-center text-stone-600 text-xs font-medium" title="Tiempo estimado">
                   <Clock className="w-4 h-4 mr-1.5 text-stone-400" />
                   {place.hiking.timeMinutes} min
                </div>
                <div className="flex items-center text-stone-600 text-xs font-medium" title="Tipo de ruta">
                   <Repeat className="w-4 h-4 mr-1.5 text-stone-400" />
                   {place.hiking.circular ? 'Circular' : 'Lineal'}
                </div>
             </div>
           )}
           
           <p className="text-stone-500 text-sm line-clamp-2 mb-4 flex-grow mt-2">
             {place.shortDescription}
           </p>

           <div className="flex flex-wrap gap-2 mt-auto">
             {place.tags.slice(0, 3).map((tag, i) => (
               <span key={i} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-stone-100 text-stone-500 rounded-md">
                 {tag}
               </span>
             ))}
           </div>
        </div>
      </article>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
           
           <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64">
                <img 
                  src={imageSrc} 
                  alt={place.title} 
                  className="w-full h-full object-cover"
                  style={{ viewTransitionName: `place-img-${place.id}` } as React.CSSProperties}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                   <h2 className="text-3xl font-bold serif leading-none mb-2">{place.title}</h2>
                   <div className="flex items-center opacity-90 text-sm">
                      <MapPin className="w-4 h-4 mr-1" /> {place.location}
                   </div>
                </div>
              </div>

              <div className="p-6">
                {/* --- HIKING DETAIL STATS --- */}
                {place.hiking && (
                   <div className="grid grid-cols-3 gap-2 mb-6 bg-stone-50 p-3 rounded-2xl">
                      <div className="text-center">
                         <div className="text-xs text-stone-400 uppercase font-bold mb-1">Distancia</div>
                         <div className="text-lg font-bold text-stone-800">{place.hiking.distanceKm} km</div>
                      </div>
                      <div className="text-center border-l border-stone-200">
                         <div className="text-xs text-stone-400 uppercase font-bold mb-1">Tiempo</div>
                         <div className="text-lg font-bold text-stone-800">{Math.floor(place.hiking.timeMinutes/60)}h {place.hiking.timeMinutes%60}m</div>
                      </div>
                      <div className="text-center border-l border-stone-200">
                         <div className="text-xs text-stone-400 uppercase font-bold mb-1">Dificultad</div>
                         <div className={`text-lg font-bold ${
                           place.hiking.difficulty === 'Alta' || place.hiking.difficulty === 'Experto' ? 'text-red-600' : 
                           place.hiking.difficulty === 'Media' ? 'text-orange-600' : 'text-green-600'
                         }`}>
                           {place.hiking.difficulty}
                         </div>
                      </div>
                   </div>
                )}

                 <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
                    {place.tags.map(tag => (
                       <span key={tag} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          #{tag}
                       </span>
                    ))}
                 </div>

                 <p className="text-stone-600 leading-relaxed mb-6">
                    {place.shortDescription}
                 </p>

                 {/* AI Content Section */}
                 {aiContent && (
                    <div className="mb-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 animate-fade-in relative">
                       <h4 className="text-blue-800 font-bold text-sm mb-2 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" /> Guía Virtual
                       </h4>
                       <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
                          {aiContent}
                       </div>
                       <button 
                         onClick={handleSpeak}
                         className={`absolute top-3 right-3 p-2 rounded-full ${isSpeaking ? 'bg-blue-200 text-blue-700 animate-pulse' : 'bg-white text-stone-400 hover:text-blue-600'}`}
                       >
                         {isSpeaking ? <Square className="w-3 h-3 fill-current" /> : <Volume2 className="w-4 h-4" />}
                       </button>
                    </div>
                 )}

                 {/* Action Buttons */}
                 <div className="space-y-3">
                    <button 
                      onClick={handleAskAI}
                      disabled={isLoadingAi || !!aiContent}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                         aiContent 
                           ? 'bg-stone-100 text-stone-400 cursor-default' 
                           : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg active:scale-95'
                      }`}
                    >
                       {isLoadingAi ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Consultando a Tartessos...</>
                       ) : aiContent ? (
                          <><Check className="w-5 h-5 mr-2" /> Información cargada</>
                       ) : (
                          <><Sparkles className="w-5 h-5 mr-2 text-orange-400" /> ¿Qué hace especial este sitio?</>
                       )}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                       <button 
                         onClick={handleDirections}
                         className="py-3 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors"
                       >
                         <Navigation className="w-4 h-4 mr-2" /> Cómo llegar
                       </button>
                       <button 
                         onClick={handleShare}
                         className="py-3 bg-white border border-stone-200 text-stone-700 font-bold rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors"
                       >
                         <Share2 className="w-4 h-4 mr-2" /> Compartir
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default PlaceCard;
