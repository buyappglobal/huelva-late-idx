
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PlaceCard from './components/PlaceCard';
import CategoryCard from './components/CategoryCard';
import BlogCard from './components/BlogCard';
import HomeMap from './components/HomeMap';
import PlaceDetailModal from './components/PlaceDetailModal';
import { CATEGORIES, MOCK_PLACES, BLOG_POSTS } from './constants';
import { Place, BlogPost } from './types';
import { AdminProvider, useAdmin } from './components/AdminContext';
import './services/firebase'; 
import { 
  Footprints, 
  Mountain, 
  Landmark, 
  Umbrella, 
  ArrowRight, 
  ChevronDown,
  Calendar,
  Utensils,
  ArrowLeft,
  Clock,
  User,
  Share2
} from 'lucide-react';
import { flushSync } from 'react-dom';

// Icon mapping helper
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

const parsePlaceDate = (dateStr?: string): number => {
  if (!dateStr) return 9999999999999;
  const str = dateStr.toLowerCase().trim();
  const now = new Date();
  const currentYear = now.getFullYear();
  const months: {[key: string]: number} = {
    'ene': 0, 'jan': 0, 'enero': 0,
    'feb': 1, 'febrero': 1,
    'mar': 2, 'marzo': 2,
    'abr': 3, 'apr': 3, 'abril': 3,
    'may': 4, 'mayo': 4,
    'jun': 5, 'junio': 5,
    'jul': 6, 'julio': 6,
    'ago': 7, 'aug': 7, 'agosto': 7,
    'sep': 8, 'septiembre': 8,
    'oct': 9, 'octubre': 9,
    'nov': 10, 'noviembre': 10,
    'dic': 11, 'dec': 11, 'diciembre': 11
  };
  const dmyRegex = /(\d{1,2}).*?([a-zñ]{3,}).*?(\d{4})/i;
  const dmyMatch = str.match(dmyRegex);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1]);
    const monthKey = dmyMatch[2].substring(0, 3).toLowerCase();
    const year = parseInt(dmyMatch[3]);
    const month = months[monthKey] ?? 0;
    return new Date(year, month, day).getTime();
  }
  for (const [mKey, mVal] of Object.entries(months)) {
    if (str.includes(mKey)) {
       return new Date(currentYear, mVal, 1).getTime();
    }
  }
  if (str.includes('pentecostés') || str.includes('rocío')) return new Date(currentYear, 5, 1).getTime();
  if (str.includes('semana santa')) return new Date(currentYear, 3, 1).getTime();
  return 9999999999999;
};

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [visiblePlaces, setVisiblePlaces] = useState<Place[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // For Deep Linking to Places
  const [deepLinkPlace, setDeepLinkPlace] = useState<Place | null>(null);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  
  const { getImageOverride, addedPlaces } = useAdmin();

  // --- ROUTING ENGINE ---
  useEffect(() => {
    const handlePopState = () => {
      processUrl();
    };

    const processUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view') || 'home';
      const postId = params.get('id');
      const placeId = params.get('placeId');

      // 1. Handle Place Modal Deep Link
      if (placeId) {
        const allPlaces = [...addedPlaces, ...MOCK_PLACES];
        const place = allPlaces.find(p => p.id === placeId);
        if (place) {
          setDeepLinkPlace(place);
        }
      } else {
        setDeepLinkPlace(null);
      }

      // 2. Handle Views
      setCurrentView(view);

      // 3. Handle Blog Post Deep Link
      if (view === 'post_detail' && postId) {
        const post = BLOG_POSTS.find(p => p.slug === postId || p.id === postId);
        if (post) {
          setSelectedPost(post);
        } else {
          setCurrentView('blog'); // Fallback if post not found
        }
      } else if (view !== 'post_detail') {
        setSelectedPost(null);
      }
    };

    // Initial load
    processUrl();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [addedPlaces]); // Dependency on addedPlaces ensuring admin places are loaded before checking

  const updateUrl = (view: string, id?: string) => {
    const params = new URLSearchParams();
    if (view !== 'home') params.set('view', view);
    if (id) params.set('id', id);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleNavigate = (view: string) => {
    if (view === currentView && !deepLinkPlace) return;

    // Close deep linked modal if navigating away
    if (deepLinkPlace) {
       setDeepLinkPlace(null);
       const params = new URLSearchParams(window.location.search);
       params.delete('placeId');
       const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
       window.history.pushState({}, '', newUrl);
    }

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        flushSync(() => {
          setCurrentView(view);
          updateUrl(view);
        });
      });
    } else {
      setCurrentView(view);
      updateUrl(view);
    }
  };

  const handleOpenPost = (post: BlogPost) => {
    const update = () => {
       setSelectedPost(post);
       setCurrentView('post_detail');
       updateUrl('post_detail', post.slug);
    };

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        flushSync(update);
      });
    } else {
       update();
    }
  };

  const handleCloseDeepLink = () => {
    setDeepLinkPlace(null);
    // Remove param from URL without refreshing
    const params = new URLSearchParams(window.location.search);
    params.delete('placeId');
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  };

  // Logic to handle specific share for Blog Post
  const handleSharePost = async () => {
    if (!selectedPost) return;
    const url = `${window.location.origin}/?view=post_detail&id=${selectedPost.slug}`;
    const shareData = {
      title: selectedPost.title,
      text: selectedPost.excerpt,
      url: url
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) {}
    } else {
      navigator.clipboard.writeText(url);
      alert("Enlace al artículo copiado.");
    }
  };

  // Filter Logic
  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
    const allPlaces = [...addedPlaces, ...MOCK_PLACES];

    if (currentView === 'home' || currentView === 'blog' || currentView === 'post_detail') {
      setFilteredPlaces([]);
      setVisiblePlaces([]);
    } else {
      const filtered = allPlaces.filter(p => p.categoryId === currentView);
      const sorted = filtered.sort((a, b) => {
        const timeA = parsePlaceDate(a.date);
        const timeB = parsePlaceDate(b.date);
        return timeA - timeB;
      });
      setFilteredPlaces(sorted);
      setVisiblePlaces(sorted.slice(0, ITEMS_PER_PAGE));
    }
  }, [currentView, addedPlaces]); 

  const loadMore = () => {
    const nextPage = page + 1;
    const newVisible = filteredPlaces.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisiblePlaces(newVisible);
    setPage(nextPage);
  };

  const activeCategory = CATEGORIES.find(c => c.id === currentView);
  const activeHeaderImage = activeCategory 
    ? (getImageOverride(activeCategory.id) || activeCategory.coverImage)
    : '';

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate} onOpenPost={handleOpenPost}>
      
      {/* DEEP LINK MODAL RENDER */}
      {deepLinkPlace && (
        <PlaceDetailModal 
          place={deepLinkPlace} 
          onClose={handleCloseDeepLink}
        />
      )}

      {/* --- HOME VIEW --- */}
      {currentView === 'home' && (
        <div className="animate-fade-in">
          <div id="categories" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-stone-50">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 serif">
                Descubre <span className="text-orange-500">Huelva</span>
              </h1>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
                Senderos infinitos, playas de luz y una historia que cambió el mundo.
              </p>
              <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {CATEGORIES.map((cat) => (
                <CategoryCard 
                  key={cat.id} 
                  category={cat} 
                  onClick={() => handleNavigate(cat.id)} 
                />
              ))}
            </div>

            <div className="mb-16">
               <div className="flex items-end justify-between mb-8">
                 <div>
                   <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-2 block">Mapa Interactivo</span>
                   <h2 className="text-3xl font-bold text-stone-900 serif">Explora la Provincia</h2>
                 </div>
               </div>
               
               <HomeMap 
                 places={[...MOCK_PLACES, ...addedPlaces]} 
                 onPlaceClick={(place) => handleNavigate(place.categoryId)} 
               />
            </div>
          </div>

          <section className="bg-white py-16 border-t border-stone-100">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                   <div>
                     <h2 className="text-3xl font-bold text-stone-900 serif mb-2">Inspiración & Guías</h2>
                     <p className="text-stone-500">Artículos seleccionados para planificar tu próxima aventura.</p>
                   </div>
                   <button 
                     onClick={() => handleNavigate('blog')}
                     className="hidden md:flex items-center text-orange-600 font-bold hover:text-orange-700 transition-colors"
                   >
                     Ver todo el blog <ArrowRight className="w-4 h-4 ml-2" />
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {BLOG_POSTS.slice(0, 3).map(post => (
                      <BlogCard key={post.id} post={post} onClick={() => handleOpenPost(post)} />
                   ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                   <button 
                     onClick={() => handleNavigate('blog')}
                     className="bg-stone-100 text-stone-700 px-6 py-3 rounded-full font-bold text-sm w-full"
                   >
                     Ver más artículos
                   </button>
                </div>
             </div>
          </section>
          
          <div className="bg-stone-900 text-white py-20 px-4 text-center">
             <h2 className="text-3xl font-bold serif mb-6">¿No sabes por dónde empezar?</h2>
             <p className="text-stone-400 max-w-xl mx-auto mb-8">
               Navega por nuestras secciones y deja que nuestra IA te cuente los secretos de cada rincón de Huelva.
             </p>
          </div>
        </div>
      )}

      {/* --- BLOG LIST VIEW --- */}
      {currentView === 'blog' && (
         <div className="animate-fade-in pt-24 pb-16 min-h-screen bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="text-center mb-16">
                  <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-2 block">El Blog de HuelvaLate</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 serif">Historias del Sur</h1>
                  <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                    Curiosidades, rutas secretas y la mejor gastronomía contada por locales.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BLOG_POSTS.map(post => (
                     <BlogCard key={post.id} post={post} onClick={() => handleOpenPost(post)} />
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* --- POST DETAIL VIEW --- */}
      {currentView === 'post_detail' && selectedPost && (
         <article className="animate-fade-in min-h-screen bg-white pb-20">
            <div className="relative h-[50vh] w-full">
               <img 
                 src={selectedPost.imageUrl} 
                 alt={selectedPost.title} 
                 className="w-full h-full object-cover"
                 style={{ viewTransitionName: `blog-img-${selectedPost.id}` } as React.CSSProperties}
               />
               <div className="absolute inset-0 bg-black/40" />
               <button 
                 onClick={() => handleNavigate('blog')}
                 className="absolute top-24 left-4 md:left-8 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center transition-colors text-sm font-bold"
               >
                 <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Blog
               </button>
            </div>

            <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10">
               <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-sm border border-stone-100">
                  <div className="flex flex-wrap gap-2 mb-6">
                     {selectedPost.tags.map(tag => (
                        <span key={tag} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                           {tag}
                        </span>
                     ))}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6 serif leading-tight">
                     {selectedPost.title}
                  </h1>

                  <div className="flex items-center justify-between border-b border-stone-100 pb-8 mb-8">
                     <div className="flex items-center space-x-6 text-sm text-stone-500">
                        <span className="flex items-center font-medium text-stone-900">
                           <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-2">
                              <User className="w-4 h-4 text-stone-500" />
                           </div>
                           {selectedPost.author}
                        </span>
                        <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {selectedPost.date}</span>
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {selectedPost.readTime} de lectura</span>
                     </div>
                     <button onClick={handleSharePost} className="text-stone-400 hover:text-stone-800 transition-colors">
                        <Share2 className="w-5 h-5" />
                     </button>
                  </div>

                  <div 
                     className="prose prose-stone prose-lg max-w-none first-letter:text-5xl first-letter:font-serif first-letter:text-orange-500 first-letter:mr-3 first-letter:float-left"
                     dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />

                  <div className="mt-12 pt-8 border-t border-stone-100">
                     <h3 className="font-bold text-lg mb-4 serif">¿Te ha gustado este artículo?</h3>
                     <p className="text-stone-500 mb-6">Descubre más experiencias relacionadas en nuestras categorías principales.</p>
                     <div className="flex gap-4">
                        <button onClick={() => handleNavigate('home')} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
                           Explorar más lugares
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </article>
      )}

      {/* --- CATEGORY / LIST VIEW --- */}
      {currentView !== 'home' && currentView !== 'blog' && currentView !== 'post_detail' && activeCategory && (
        <div className="animate-fade-in min-h-screen bg-stone-50">
          <div className="relative h-[40vh] w-full overflow-hidden">
            <img 
              src={activeHeaderImage} 
              alt={activeCategory.title} 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ viewTransitionName: `category-img-${activeCategory.id}` } as React.CSSProperties}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${activeCategory.color} opacity-80 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-6">
                 {getIcon(activeCategory.iconName, "w-10 h-10 text-white")}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 serif shadow-sm">
                {activeCategory.title}
              </h1>
              <p className="text-lg text-white/90 max-w-2xl font-light">
                {activeCategory.description}
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
             <div className="flex justify-between items-center mb-10 border-b border-stone-200 pb-4">
                <span className="text-stone-500 font-medium">
                  Mostrando {visiblePlaces.length} de {filteredPlaces.length} lugares
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {visiblePlaces.map((place) => (
                 <PlaceCard key={place.id} place={place} />
               ))}
             </div>

             {visiblePlaces.length < filteredPlaces.length && (
               <div className="mt-16 text-center">
                 <button 
                   onClick={loadMore}
                   className="bg-white hover:bg-stone-100 text-stone-800 font-bold py-3 px-8 rounded-full border border-stone-300 shadow-sm transition-all transform hover:scale-105 active:scale-95 flex items-center mx-auto"
                 >
                   Cargar más lugares
                   <ChevronDown className="ml-2 w-4 h-4" />
                 </button>
               </div>
             )}

             {visiblePlaces.length === 0 && (
               <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                 <p className="text-stone-400 text-lg">Próximamente añadiremos más lugares a esta sección.</p>
               </div>
             )}
          </div>
        </div>
      )}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
};

export default App;
