import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  getImageOverride: (id: string) => string | null;
  setImageOverride: (id: string, url: string) => void;
  clearImageOverride: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  // Load overrides from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('huelvalate_img_overrides');
      if (stored) {
        setOverrides(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to load image overrides");
    }
  }, []);

  const toggleAdminMode = () => setIsAdminMode(prev => !prev);

  const getImageOverride = (id: string) => {
    return overrides[id] || null;
  };

  const setImageOverride = (id: string, url: string) => {
    const newOverrides = { ...overrides, [id]: url };
    setOverrides(newOverrides);
    localStorage.setItem('huelvalate_img_overrides', JSON.stringify(newOverrides));
  };

  const clearImageOverride = (id: string) => {
    const newOverrides = { ...overrides };
    delete newOverrides[id];
    setOverrides(newOverrides);
    localStorage.setItem('huelvalate_img_overrides', JSON.stringify(newOverrides));
  };

  return (
    <AdminContext.Provider value={{ isAdminMode, toggleAdminMode, getImageOverride, setImageOverride, clearImageOverride }}>
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
