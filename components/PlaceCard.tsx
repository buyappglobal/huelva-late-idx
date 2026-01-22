
import React, { useState, useEffect } from 'react';
import { Place, CategoryId } from '../types';
import { MapPin, Thermometer, Calendar, Image as ImageIcon, Loader2, Activity, Heart, ChevronRight, Star, Ruler, Clock, Repeat, Navigation } from 'lucide-react';
import { generateImageForLocation, getCachedImage, getCacheKey } from '../services/geminiService';
import AdminOverlay from './AdminOverlay';
import { useAdmin } from './AdminContext';
import PlaceDetailModal from './PlaceDetailModal';

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

// Placeholder images
const PLACEHOLDER_SIERRA = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop"; 
const PLACEHOLDER_COAST = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop";

const PlaceCard: React.FC<PlaceCardProps> = ({ place, variant = 'default' }) => {
  const { getImageOverride, setImageOverride, isAdminMode } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Initialize Favorites
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('huelvalate_favorites') || '[]');
      setIsFavorite(favs.includes(place.id));
    } catch (e) {
      console.warn("Error reading favorites", e);
    }
  }, [place.id]);

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
  const [imageSrc, setImageSrc] = useState<string>(() => {
    const override = getImageOverride(place.id);
    if (override) return override;
    const cached = getCachedImage(place.title, place.location);
    if (cached) return cached;
    return place.imageUrl;
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Re-sync if admin override changes
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

  // Trigger AI Generation if needed
  useEffect(() => {
    if (!isGeneratingImage || getImageOverride(place.id)) return;

    let isMounted = true;
    
    const fetchCustomImage = async () => {
      const cached = getCachedImage(place.title, place.location);
      if (cached) {
        if (isMounted) {
          setImageSrc(cached);
          setIsGeneratingImage(false);
        }
        return;
      }

      const generatedUrl = await generateImageForLocation(
        place.title,
        place.location,
        place.shortDescription
      );

      if (isMounted) {
        if (generatedUrl) {
          setImageSrc(generatedUrl);
          if (isAdminMode) {
             setImageOverride(place.id, generatedUrl);
          }
        }
        setIsGeneratingImage(false);
      }
    };

    fetchCustomImage();
    return () => { isMounted = false; };
  }, [place, isGeneratingImage, isAdminMode, setImageOverride, getImageOverride]);

  const handleRegenerate = async () => {
      setIsGeneratingImage(true);
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

  const handleImageError = () => {
    if (imageSrc !== loadingBg) {
       console.log(`[PlaceCard] Image failed for ${place.title}. Using placeholder.`);
       setImageSrc(loadingBg);
       setIsGeneratingImage(false);
    }
  };

  const isPlaceholder = !imageSrc.includes('solonet.es') && !imageSrc.startsWith('data:');

  // COMPACT VARIANT
  if (variant === 'compact') {
    return (
      <div 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center bg-white p-3 rounded-xl border border-stone-100 shadow-sm cursor-pointer hover:bg-stone-50 transition-colors"
      >
        <img src={imageSrc} alt={place.title} className="w-16 h-16 rounded-lg object-cover mr-4" onError={handleImageError} />
        <div className="flex-grow">
           <h4 className="font-bold text-stone-900 text-sm">{place.title}</h4>
           <div className="flex flex-wrap items-center gap-2 mt-1">
             <div className="flex items-center text-xs text-stone-500">
               <MapPin className="w-3 h-3 mr-1" /> {place.location}
             </div>
             {place.distance !== undefined && (
               <div className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                 <Navigation className="w-3 h-3 mr-1" />
                 {place.distance < 1 ? `${Math.round(place.distance * 1000)} m` : `${place.distance.toFixed(1)} km`}
               </div>
             )}
           </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-300" />
        
        {isModalOpen && (
          <PlaceDetailModal 
            place={place} 
            onClose={() => setIsModalOpen(false)} 
            initialImageSrc={imageSrc}
          />
        )}
      </div>
    );
  }

  // DEFAULT CARD
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
             
             {isPlaceholder && !isGeneratingImage && (
               <div className="absolute bottom-0 left-0 w-full bg-stone-900/60 backdrop-blur-[2px] text-white/90 text-[10px] font-bold uppercase tracking-widest py-1.5 flex items-center justify-center z-20">
                  <ImageIcon className="w-3 h-3 mr-2 text-stone-300" /> Imagen de Referencia
               </div>
             )}

          </AdminOverlay>
          
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
                  {place.distance !== undefined && (
                     <span className="ml-2 text-blue-600 font-bold text-xs flex items-center bg-blue-50 px-2 py-0.5 rounded-full">
                       {place.distance < 1 ? Math.round(place.distance * 1000) + ' m' : place.distance.toFixed(1) + ' km'}
                     </span>
                  )}
                </div>
              </div>
              <div className="flex items-center bg-stone-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-xs font-bold text-stone-700">{place.rating}</span>
              </div>
           </div>

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

      {/* Place Detail Modal */}
      {isModalOpen && (
        <PlaceDetailModal 
          place={place} 
          onClose={() => setIsModalOpen(false)}
          initialImageSrc={imageSrc}
        />
      )}
    </>
  );
};

export default PlaceCard;
