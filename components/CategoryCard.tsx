
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { ArrowRight, Footprints, Mountain, Landmark, Umbrella, Calendar, Utensils, Loader2, Sparkles } from 'lucide-react';
import AdminOverlay from './AdminOverlay';
import { useAdmin } from './AdminContext';
import { generateImageForLocation, getCachedImage, getCacheKey } from '../services/geminiService';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const PLACEHOLDER_CATEGORY = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop";

const getIcon = (iconName: string, className: string) => {
  switch(iconName) {
    case 'Footprints': return <Footprints className={className} />;
    case 'Mountain': return <Mountain className={className} />;
    case 'Landmark': return <Landmark className={className} />;
    case 'Umbrella': return <Umbrella className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    default: return null;
  }
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { getImageOverride, setImageOverride, isAdminMode } = useAdmin();

  // --- IMAGE LOGIC (STATIC FIRST -> CACHE -> AI FALLBACK) ---

  // 1. Initialize State
  const [imageSrc, setImageSrc] = useState<string>(() => {
    // A. Override
    const override = getImageOverride(category.id);
    if (override) return override;

    // B. Cache (Use Category Title + 'Huelva' as key context)
    const cached = getCachedImage(category.title, "Huelva");
    if (cached) return cached;

    // C. Default Static
    return category.coverImage;
  });

  // 2. Generating State: DISABLED AUTO-GENERATION
  const [isGenerating, setIsGenerating] = useState(false);

  // Re-sync overrides
  useEffect(() => {
    const override = getImageOverride(category.id);
    if (override) {
      setImageSrc(override);
      setIsGenerating(false);
    }
  }, [category.id, getImageOverride]);

  // 3. Effect: Trigger AI Generation
  useEffect(() => {
    if (!isGenerating || getImageOverride(category.id)) return;

    let isMounted = true;

    const generate = async () => {
      // Check cache again
      const cached = getCachedImage(category.title, "Huelva");
      if (cached) {
        if (isMounted) {
           setImageSrc(cached);
           setIsGenerating(false);
        }
        return;
      }

      // Generate
      const promptDesc = `Una imagen de portada épica y cinematográfica que represente: ${category.title} en la provincia de Huelva. ${category.description}. Estilo fotografía de viajes profesional, alta resolución, sin texto.`;
      
      const generatedUrl = await generateImageForLocation(
        category.title,
        "Huelva", // Generic location for categories
        promptDesc
      );

      if (isMounted) {
        if (generatedUrl) {
          setImageSrc(generatedUrl);
          if (isAdminMode) {
            setImageOverride(category.id, generatedUrl);
          }
        }
        setIsGenerating(false);
      }
    };

    generate();

    return () => { isMounted = false; };
  }, [category, isGenerating, isAdminMode, setImageOverride, getImageOverride]);

  const handleRegenerate = async () => {
     setIsGenerating(true);
     // Force cache clear
     const key = getCacheKey(category.title, "Huelva");
     localStorage.removeItem(key);

     const promptDesc = `Una imagen de portada épica y cinematográfica que represente: ${category.title} en la provincia de Huelva. ${category.description}. Estilo fotografía de viajes profesional, alta resolución, sin texto.`;
      
     const generatedUrl = await generateImageForLocation(
        category.title,
        "Huelva",
        promptDesc
     );

     if (generatedUrl) {
        setImageSrc(generatedUrl);
        if (isAdminMode) {
           setImageOverride(category.id, generatedUrl);
        }
     }
     setIsGenerating(false);
  };

  // Helper to detect if background image failed to load
  const handleImageError = () => {
    if (imageSrc !== PLACEHOLDER_CATEGORY) {
      console.log(`[CategoryCard] Static image failed for ${category.title}. Using placeholder.`);
      setImageSrc(PLACEHOLDER_CATEGORY);
      setIsGenerating(false);
    }
  };

  const isGenerated = imageSrc.startsWith('data:');

  return (
    <div 
      onClick={onClick}
      className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-stone-900"
    >
      {/* Hidden img to catch load errors for the background image */}
      <img src={imageSrc} onError={handleImageError} className="hidden" alt="" />

      <AdminOverlay 
         entityId={category.id} 
         entityName={`Categoría: ${category.title}`} 
         type="category" 
         currentImageSrc={imageSrc}
         className="absolute inset-0 z-10"
         onRegenerate={handleRegenerate}
      >
        {/* Background Image */}
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${isGenerating ? 'blur-sm scale-105 opacity-50' : 'blur-0 opacity-100'}`}
          style={{ 
            backgroundImage: `url('${imageSrc}')`,
            viewTransitionName: `category-img-${category.id}` 
          } as React.CSSProperties}
        />
        
        {/* Loading Overlay */}
        {isGenerating && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20">
              <Loader2 className="w-8 h-8 text-orange-400 animate-spin mb-2" />
              <span className="text-white text-xs font-bold tracking-widest uppercase animate-pulse">Diseñando Portada...</span>
           </div>
        )}

        {/* AI Badge */}
        {isGenerated && !isGenerating && !getImageOverride(category.id) && (
           <div className="absolute top-4 right-4 z-30 bg-black/30 backdrop-blur px-2 py-1 rounded-full text-[10px] text-white/90 flex items-center border border-white/10">
              <Sparkles className="w-3 h-3 mr-1 text-orange-400" /> AI
           </div>
        )}

      </AdminOverlay>
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 group-hover:opacity-60 transition-opacity z-20 pointer-events-none`} />
      
      {/* Content Layer */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 pointer-events-none">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="mb-4 w-fit p-3 rounded-xl backdrop-blur-sm shadow-sm bg-white/10 text-white/90 transition-colors duration-500">
            {getIcon(category.iconName, "w-8 h-8")}
          </div>
          <h3 className="text-3xl font-bold mb-2 drop-shadow-sm transition-colors duration-500 text-white">
            {category.title}
          </h3>
          <p className="text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 font-medium text-sm drop-shadow-md">
            {category.description}
          </p>
          <div className="mt-4 flex items-center text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            Descubrir <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
