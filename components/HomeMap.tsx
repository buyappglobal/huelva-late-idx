
import React, { useEffect, useRef } from 'react';
import { Place, CategoryId } from '../types';

interface HomeMapProps {
  places: Place[];
  onPlaceClick: (place: Place) => void;
}

const HomeMap: React.FC<HomeMapProps> = ({ places, onPlaceClick }) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only initialize map if container exists and map isn't already initialized
    if (mapContainerRef.current && !mapRef.current) {
      // Access global L from Leaflet script in index.html
      const L = (window as any).L;
      if (!L) return;

      const map = L.map(mapContainerRef.current, {
        center: [37.55, -6.95], // Centered roughly on Huelva province
        zoom: 9,
        scrollWheelZoom: false, // Prevent accidental scrolling on page
        zoomControl: false, // We'll add it to a better position
      });

      // Add Zoom Control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Add Tile Layer (OpenStreetMap - Hot style for warmer colors)
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      mapRef.current = map;
    }

    // Update markers when places change
    if (mapRef.current) {
      const L = (window as any).L;
      const map = mapRef.current;

      // Clear existing markers if any (simple implementation: clear all layers except tiles)
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      places.forEach(place => {
        if (place.coordinates) {
          // Define color based on category
          let color = '#f97316'; // Orange default
          let iconChar = '';
          
          if (place.categoryId === CategoryId.PLAYAS) { color = '#3b82f6'; iconChar = '🏖️'; } // Blue
          else if (place.categoryId === CategoryId.SENDERISMO) { color = '#10b981'; iconChar = '🥾'; } // Emerald
          else if (place.categoryId === CategoryId.PATRIMONIO) { color = '#b91c1c'; iconChar = '🏰'; } // Red
          else if (place.categoryId === CategoryId.MONUMENTOS_NATURALES) { color = '#78716c'; iconChar = '⛰️'; } // Stone
          else if (place.categoryId === CategoryId.GASTRONOMIA) { color = '#d97706'; iconChar = '🍷'; } // Amber

          // Create custom CSS marker
          const customIcon = L.divIcon({
            className: 'custom-icon',
            html: `<div class="custom-marker-pin" style="background-color: ${color}"></div><div style="position:absolute; top:-35px; left:-5px; font-size:18px;">${iconChar}</div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -35]
          });

          const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div class="text-center">
                <h3 class="font-bold text-sm mb-1 text-stone-900">${place.title}</h3>
                <p class="text-xs text-stone-500 mb-2">${place.location}</p>
                <img src="${place.imageUrl}" class="w-full h-24 object-cover rounded-lg mb-2" alt="${place.title}" />
                <button class="bg-stone-900 text-white text-xs px-3 py-1.5 rounded-full w-full font-bold">Ver Detalles</button>
              </div>
            `);
            
            // Handle popup click to navigate
            marker.on('popupopen', () => {
              const popupNode = marker.getPopup().getElement();
              const btn = popupNode.querySelector('button');
              if (btn) {
                btn.onclick = () => onPlaceClick(place);
              }
            });
        }
      });
    }
  }, [places, onPlaceClick]);

  return (
    <div className="w-full h-[450px] bg-stone-100 rounded-3xl overflow-hidden shadow-sm relative z-0">
       <div ref={mapContainerRef} id="map" className="w-full h-full" />
       {/* Overlay gradient for smooth integration */}
       <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-stone-50 to-transparent pointer-events-none z-[1000]" />
       <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none z-[1000]" />
    </div>
  );
};

export default HomeMap;
