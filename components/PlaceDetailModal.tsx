
import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { MapPin, Sparkles, X, Volume2, Square, Share2, Navigation, Check, Loader2, Image as ImageIcon, Ruler, Clock, Repeat } from 'lucide-react';
import { generatePlaceDetails, generateImageForLocation, getCachedImage, getCacheKey } from '../services/geminiService';
import { useAdmin } from './AdminContext';

interface PlaceDetailModalProps {
  place: Place;
  onClose: () => void;
  initialImageSrc?: string; // Optional: If opening from a card that already has the image
}

const LOADING_STEPS = [
  "Conectando con IA...",
  "Analizando entorno...",
  "Calculando iluminación...",
  "Revelando fotografía..."
];

const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({ place, onClose, initialImageSrc }) => {
  const { getImageOverride, setImageOverride, getTextOverride, setTextOverride, isAdminMode } = useAdmin();
  
  // Content States
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Image Logic (Duplicated from PlaceCard to support standalone mode)
  const [imageSrc, setImageSrc] = useState<string>(() => {
    if (initialImageSrc) return initialImageSrc;
    const override = getImageOverride(place.id);
    if (override) return override;
    const cached = getCachedImage(place.title, place.location);
    if (cached) return cached;
    return place.imageUrl;
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Generate image if we don't have a good one (standalone mode)
  useEffect(() => {
    if (initialImageSrc || getImageOverride(place.id)) return;
    
    // Check if it's a placeholder URL (simple check)
    const isPlaceholder = !imageSrc.includes('solonet.es') && !imageSrc.startsWith('data:');
    
    // If we are in standalone mode (no initialImage) and current is placeholder, try to load from cache or just stick with placeholder to avoid auto-gen cost on load
    // For now, we behave like PlaceCard: check cache, update if found.
    const cached = getCachedImage(place.title, place.location);
    if (cached && cached !== imageSrc) {
        setImageSrc(cached);
    }
  }, [place, initialImageSrc, getImageOverride, imageSrc]);

  // Cleanup speech
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleAskAI = async () => {
    const existingText = getTextOverride(place.id) || place.fullDescription;
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
    utterance.lang = 'es-ES';
    utterance.rate = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleShare = async () => {
    // Generate Deep Link
    const url = `${window.location.origin}/?placeId=${place.id}`;
    
    const shareData = {
      title: place.title,
      text: `¡Mira este plan en HuelvaLate!\n\n${place.title} (${place.location})\n${place.shortDescription}`,
      url: url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      alert("Enlace copiado: " + url);
    }
  };

  const handleDirections = () => {
    const query = encodeURIComponent(`${place.title} ${place.location} Huelva`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const isPlaceholder = !imageSrc.includes('solonet.es') && !imageSrc.startsWith('data:');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
       
       <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-slide-up max-h-[90vh] overflow-y-auto no-scrollbar">
          <button 
            onClick={onClose} 
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
            
            {isPlaceholder && (
               <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest flex items-center border border-white/10">
                  <ImageIcon className="w-3 h-3 mr-2 text-stone-300" /> Imagen de Referencia
               </div>
            )}

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
  );
};

export default PlaceDetailModal;
