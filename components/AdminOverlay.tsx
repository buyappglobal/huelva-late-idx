import React, { useState, useRef } from 'react';
import { useAdmin } from './AdminContext';
import { Settings, Copy, Check, X, Loader2, Image as ImageIcon, RefreshCw, Upload } from 'lucide-react';

interface AdminOverlayProps {
  entityId: string;
  entityName: string;
  type: 'category' | 'place';
  currentImageSrc: string;
  children: React.ReactNode;
  className?: string;
  onRegenerate?: () => Promise<void>;
}

const AdminOverlay: React.FC<AdminOverlayProps> = ({ 
  entityId, 
  entityName, 
  type, 
  currentImageSrc, 
  children,
  className = "",
  onRegenerate
}) => {
  const { isAdminMode, setImageOverride, clearImageOverride } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  
  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Copy states
  const [copied, setCopied] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  
  // Regenerate state
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!isAdminMode) {
    return <div className={className}>{children}</div>;
  }

  const handleCopyImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCopying) return;

    setIsCopying(true);

    try {
      const response = await fetch(currentImageSrc);
      const blob = await response.blob();
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar imagen:", err);
      try {
         await navigator.clipboard.writeText(currentImageSrc);
         alert("Se ha copiado la URL/Texto en su lugar.");
      } catch (e2) {
         alert("Error al acceder al portapapeles.");
      }
    } finally {
      setIsCopying(false);
    }
  };

  const handleRegenerateClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onRegenerate || isRegenerating) return;
    
    setIsRegenerating(true);
    try {
      await onRegenerate();
    } catch (err) {
      console.error("Regeneration failed", err);
      alert("Error al regenerar imagen");
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Convert File to Base64 to store in LocalStorage/State
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageOverride(entityId, base64String);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert("Error al leer el archivo");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newUrl.trim()) {
      setImageOverride(entityId, newUrl);
      setShowInput(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
     e.stopPropagation();
     clearImageOverride(entityId);
     setShowInput(false);
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dashed border to indicate editable area */}
      <div className="absolute inset-0 border-4 border-red-500/30 pointer-events-none z-30 animate-pulse" />
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="image/*"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()} 
      />
      
      {children}

      {/* Info Tooltip & Controls */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-40 flex flex-col items-center justify-center p-4 text-white animate-fade-in transition-all">
          
          {!showInput ? (
            <>
              <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-2">
                Modo Admin
              </div>
              <h4 className="text-center font-bold text-sm mb-1">{entityName}</h4>
              <p className="text-xs text-gray-300 font-mono mb-4 bg-black/50 px-2 py-1 rounded">ID: {entityId}</p>
              
              <div className="flex gap-2 flex-wrap justify-center">
                <button 
                  onClick={handleUploadClick}
                  disabled={isUploading}
                  className="flex items-center bg-purple-600 hover:bg-purple-500 px-3 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg"
                  title="Subir imagen propia (Cartel)"
                >
                  {isUploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}
                  Subir
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); setShowInput(true); setNewUrl(currentImageSrc); }}
                  className="flex items-center bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                  title="Editar URL manualmente"
                >
                  <Settings className="w-4 h-4 mr-1" /> URL
                </button>
                
                {onRegenerate && (
                  <button 
                    onClick={handleRegenerateClick}
                    disabled={isRegenerating}
                    className="flex items-center bg-orange-600 hover:bg-orange-500 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                    title="Regenerar imagen con IA"
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
                    IA
                  </button>
                )}

                <button 
                  onClick={handleCopyImage}
                  disabled={isCopying}
                  className={`flex items-center px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                    copied ? 'bg-green-600' : 'bg-stone-700 hover:bg-stone-600'
                  }`}
                  title="Copiar imagen"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full bg-white p-3 rounded-lg shadow-xl text-stone-900" onClick={(e) => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-2">
                 <h5 className="font-bold text-xs">Nueva URL de Imagen</h5>
                 <button onClick={() => setShowInput(false)}><X className="w-4 h-4 text-stone-400" /></button>
               </div>
               <textarea 
                 value={newUrl}
                 onChange={(e) => setNewUrl(e.target.value)}
                 className="w-full text-xs p-2 border border-stone-300 rounded mb-2 h-20"
                 placeholder="Pega aquí https://... o data:image/..."
               />
               <div className="flex gap-2">
                 <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-1 rounded text-xs font-bold hover:bg-green-700">
                   Guardar
                 </button>
                 <button onClick={handleClear} className="bg-red-100 text-red-600 py-1 px-3 rounded text-xs font-bold hover:bg-red-200">
                   Reset
                 </button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOverlay;