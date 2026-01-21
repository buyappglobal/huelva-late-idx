import React, { createContext, useContext, useState, useEffect } from 'react';
import { Place, Category } from '../types';
import { MOCK_PLACES, CATEGORIES } from '../constants';

interface AdminContextType {
  isAdminMode: boolean;
  overrides: Record<string, string>; // Image overrides
  textOverrides: Record<string, string>; // Text descriptions overrides
  addedPlaces: Place[];
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  getImageOverride: (id: string) => string | null;
  setImageOverride: (id: string, url: string) => void;
  clearImageOverride: (id: string) => void;
  getTextOverride: (id: string) => string | null;
  setTextOverride: (id: string, text: string) => void;
  addNewPlace: (place: Place) => void;
  removeNewPlace: (id: string) => void;
  generateReport: () => string;
  clearAllChanges: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [textOverrides, setTextOverrides] = useState<Record<string, string>>({});
  const [addedPlaces, setAddedPlaces] = useState<Place[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      // Load Image Overrides
      const storedOverrides = localStorage.getItem('huelvalate_img_overrides');
      if (storedOverrides) {
        setOverrides(JSON.parse(storedOverrides));
      }

      // Load Text Overrides
      const storedTextOverrides = localStorage.getItem('huelvalate_text_overrides');
      if (storedTextOverrides) {
        setTextOverrides(JSON.parse(storedTextOverrides));
      }

      // Load New Places
      const storedPlaces = localStorage.getItem('huelvalate_new_places');
      if (storedPlaces) {
        setAddedPlaces(JSON.parse(storedPlaces));
      }
      
      const sessionActive = sessionStorage.getItem('huelvalate_admin_session');
      if (sessionActive === 'true') {
        setIsAdminMode(true);
      }
    } catch (e) {
      console.warn("Failed to load admin data");
    }
  }, []);

  const login = (user: string, pass: string): boolean => {
    if (user === 'admin' && pass === 'huelvalate') {
      setIsAdminMode(true);
      sessionStorage.setItem('huelvalate_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminMode(false);
    sessionStorage.removeItem('huelvalate_admin_session');
  };

  // --- IMAGE OVERRIDES ---
  const getImageOverride = (id: string) => {
    return overrides[id] || null;
  };

  const setImageOverride = (id: string, url: string) => {
    if (overrides[id] === url) return;
    const newOverrides = { ...overrides, [id]: url };
    setOverrides(newOverrides);
    try {
      localStorage.setItem('huelvalate_img_overrides', JSON.stringify(newOverrides));
    } catch (e) { console.warn("Error saving img overrides"); }
  };

  const clearImageOverride = (id: string) => {
    const newOverrides = { ...overrides };
    delete newOverrides[id];
    setOverrides(newOverrides);
    try {
      localStorage.setItem('huelvalate_img_overrides', JSON.stringify(newOverrides));
    } catch (e) { console.warn("Error clearing img override"); }
  };

  // --- TEXT OVERRIDES ---
  const getTextOverride = (id: string) => {
    return textOverrides[id] || null;
  };

  const setTextOverride = (id: string, text: string) => {
    if (textOverrides[id] === text) return;
    const newOverrides = { ...textOverrides, [id]: text };
    setTextOverrides(newOverrides);
    try {
      localStorage.setItem('huelvalate_text_overrides', JSON.stringify(newOverrides));
    } catch (e) { console.warn("Error saving text overrides"); }
  };

  // --- PLACES MANAGEMENT ---
  const addNewPlace = (place: Place) => {
    const newPlaces = [...addedPlaces, place];
    setAddedPlaces(newPlaces);
    try {
      localStorage.setItem('huelvalate_new_places', JSON.stringify(newPlaces));
    } catch (e) { console.warn("Error saving new place"); }
  };

  const removeNewPlace = (id: string) => {
    const newPlaces = addedPlaces.filter(p => p.id !== id);
    setAddedPlaces(newPlaces);
    try {
      localStorage.setItem('huelvalate_new_places', JSON.stringify(newPlaces));
    } catch (e) { console.warn("Error removing place"); }
  };

  const clearAllChanges = () => {
    if (window.confirm("¿Estás seguro de que quieres borrar TODOS los cambios (imágenes, textos y nuevos lugares) no guardados en código?")) {
      setOverrides({});
      setTextOverrides({});
      setAddedPlaces([]);
      localStorage.removeItem('huelvalate_img_overrides');
      localStorage.removeItem('huelvalate_text_overrides');
      localStorage.removeItem('huelvalate_new_places');
    }
  };

  // Generates the full Typescript code for MOCK_PLACES
  const generateReport = () => {
    
    // Helper to merge data
    const mergePlaceData = (p: Place) => {
      const imgOverride = overrides[p.id];
      const txtOverride = textOverrides[p.id];
      return {
        ...p,
        imageUrl: imgOverride || p.imageUrl,
        fullDescription: txtOverride || p.fullDescription
      };
    };

    // 1. Process Original Places
    const processedOriginals = MOCK_PLACES.map(mergePlaceData);

    // 2. Process New Places
    const processedNew = addedPlaces.map(mergePlaceData);

    const finalPlaces = [...processedOriginals, ...processedNew];

    let report = `// === COPIA Y PEGA ESTO EN constants.ts (Reemplaza export const MOCK_PLACES = [...]) ===\n\n`;
    report += `export const MOCK_PLACES: Place[] = [\n`;
    
    finalPlaces.forEach(p => {
      report += `  {\n`;
      report += `    id: '${p.id}',\n`;
      
      // Handle CategoryId
      let enumStr = `CategoryId.SENDERISMO`; 
      if (p.categoryId === 'senderismo') enumStr = 'CategoryId.SENDERISMO';
      if (p.categoryId === 'monumentos_naturales') enumStr = 'CategoryId.MONUMENTOS_NATURALES';
      if (p.categoryId === 'patrimonio') enumStr = 'CategoryId.PATRIMONIO';
      if (p.categoryId === 'playas') enumStr = 'CategoryId.PLAYAS';
      if (p.categoryId === 'agenda') enumStr = 'CategoryId.AGENDA';
      if (p.categoryId === 'gastronomia') enumStr = 'CategoryId.GASTRONOMIA';

      report += `    categoryId: ${enumStr},\n`;
      report += `    title: "${p.title.replace(/"/g, '\\"')}",\n`;
      report += `    location: "${p.location.replace(/"/g, '\\"')}",\n`;
      report += `    shortDescription: "${p.shortDescription.replace(/"/g, '\\"')}",\n`;
      
      // Full Description (AI Text)
      if (p.fullDescription) {
        // Use JSON.stringify to handle newlines and escaping correctly
        report += `    fullDescription: ${JSON.stringify(p.fullDescription)},\n`;
      }

      report += `    imageUrl: '${p.imageUrl}',\n`; 
      report += `    tags: [${p.tags.map(t => `"${t}"`).join(', ')}],\n`;
      report += `    rating: ${p.rating || 4.5}`;
      
      if (p.weather) {
        report += `,\n    weather: { temp: ${p.weather.temp}, waterTemp: ${p.weather.waterTemp || 20}, condition: '${p.weather.condition}', flag: '${p.weather.flag}' }`;
      }
      if (p.date) {
        report += `,\n    date: "${p.date}"`;
      }

      report += `\n  },\n`;
    });

    report += `];\n`;
    
    return report;
  };

  return (
    <AdminContext.Provider value={{ 
      isAdminMode, 
      overrides,
      textOverrides,
      addedPlaces,
      login, 
      logout, 
      getImageOverride, 
      setImageOverride, 
      clearImageOverride,
      getTextOverride,
      setTextOverride,
      addNewPlace,
      removeNewPlace,
      generateReport,
      clearAllChanges
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};