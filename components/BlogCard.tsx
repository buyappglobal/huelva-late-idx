
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight, User, Loader2, Sparkles } from 'lucide-react';
import AdminOverlay from './AdminOverlay';
import { useAdmin } from './AdminContext';
import { generateImageForLocation, getCachedImage, getCacheKey } from '../services/geminiService';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const PLACEHOLDER_BLOG = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop";

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const { getImageOverride, setImageOverride, isAdminMode } = useAdmin();

  // --- IMAGE LOGIC (STATIC FIRST -> CACHE -> AI FALLBACK) ---

  // 1. Initialize State
  const [imageSrc, setImageSrc] = useState<string>(() => {
    // A. Admin Override
    const override = getImageOverride(post.id);
    if (override) return override;

    // B. LocalStorage Cache
    const cached = getCachedImage(post.title, "Blog");
    if (cached) return cached;

    // C. Default Static URL
    return post.imageUrl;
  });

  // 2. Initialize Generation State - DISABLED AUTO-GENERATION
  const [isGenerating, setIsGenerating] = useState(false);

  // Re-sync overrides if they change externally
  useEffect(() => {
    const override = getImageOverride(post.id);
    if (override) {
      setImageSrc(override);
      setIsGenerating(false);
    }
  }, [post.id, getImageOverride]);

  // 3. Effect: Trigger AI Generation
  useEffect(() => {
    if (!isGenerating || getImageOverride(post.id)) return;

    let isMounted = true;

    const generate = async () => {
      // Check cache again to avoid race conditions
      const cached = getCachedImage(post.title, "Blog");
      if (cached) {
        if (isMounted) {
           setImageSrc(cached);
           setIsGenerating(false);
        }
        return;
      }

      // Generate Image
      const promptDesc = `Fotografía editorial para artículo de blog de viajes sobre Huelva. Título: ${post.title}. Contexto: ${post.excerpt}. Estilo periodístico, alta calidad, sin texto.`;
      
      const generatedUrl = await generateImageForLocation(
        post.title,
        "Blog Huelva",
        promptDesc
      );

      if (isMounted) {
        if (generatedUrl) {
          setImageSrc(generatedUrl);
          // Auto-save override in admin mode
          if (isAdminMode) {
            setImageOverride(post.id, generatedUrl);
          }
        }
        setIsGenerating(false);
      }
    };

    generate();

    return () => { isMounted = false; };
  }, [post, isGenerating, isAdminMode, setImageOverride, getImageOverride]);

  const handleRegenerate = async () => {
     setIsGenerating(true);
     // Force cache clear
     const key = getCacheKey(post.title, "Blog");
     localStorage.removeItem(key);

     const promptDesc = `Fotografía editorial para artículo de blog de viajes sobre Huelva. Título: ${post.title}. Contexto: ${post.excerpt}. Estilo periodístico, alta calidad, sin texto.`;
      
     const generatedUrl = await generateImageForLocation(
        post.title,
        "Blog Huelva",
        promptDesc
     );

     if (generatedUrl) {
        setImageSrc(generatedUrl);
        if (isAdminMode) {
           setImageOverride(post.id, generatedUrl);
        }
     }
     setIsGenerating(false);
  };

  // --- ERROR HANDLER ---
  const handleImageError = () => {
    // Fallback strategy: If static image loads fail, use placeholder
    if (imageSrc !== PLACEHOLDER_BLOG) {
       console.log(`[BlogCard] Image failed for ${post.title}. Using placeholder.`);
       setImageSrc(PLACEHOLDER_BLOG);
       setIsGenerating(false);
    }
  };

  const isGenerated = imageSrc.startsWith('data:');

  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full border border-stone-100"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-stone-200">
        
        {isGenerating ? (
          /* --- LOADING STATE --- */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-800 z-10">
             <div 
               className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm scale-110"
               style={{ backgroundImage: `url(${post.imageUrl})` }}
             />
             <div className="relative z-10 flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-orange-400 animate-spin mb-3" />
                <span className="text-white text-[10px] font-bold tracking-widest uppercase animate-pulse">
                  Ilustrando Artículo...
                </span>
             </div>
          </div>
        ) : (
          /* --- IMAGE DISPLAY --- */
          <AdminOverlay
             entityId={post.id}
             entityName={post.title}
             type="place"
             currentImageSrc={imageSrc}
             className="w-full h-full"
             onRegenerate={handleRegenerate}
          >
            <img 
              src={imageSrc} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
              style={{ viewTransitionName: `blog-img-${post.id}` } as React.CSSProperties}
            />
            
            {/* AI Badge */}
            {isGenerated && !getImageOverride(post.id) && (
               <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full text-[10px] font-medium text-white shadow-sm flex items-center animate-fade-in" title="Generado por IA">
                 <Sparkles className="w-3 h-3 mr-1 text-orange-400" /> AI
               </div>
            )}
          </AdminOverlay>
        )}

        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm flex items-center z-20 pointer-events-none">
           <span className="text-orange-600 mr-1">#</span> {post.tags[0]}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-center text-stone-400 text-xs mb-3 space-x-3">
          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
        </div>
        
        <h3 className="text-lg font-bold text-stone-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors serif">
          {post.title}
        </h3>
        
        <p className="text-stone-500 text-sm line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
           <div className="flex items-center text-xs text-stone-500 font-medium">
             <div className="w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center mr-2 text-stone-400">
               <User className="w-3 h-3" />
             </div>
             {post.author}
           </div>
           
           <button className="text-orange-600 text-xs font-bold uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform">
             Saber más <ArrowRight className="w-3 h-3 ml-1" />
           </button>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
