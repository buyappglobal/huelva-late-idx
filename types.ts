
export enum CategoryId {
  SENDERISMO = 'senderismo',
  MONUMENTOS_NATURALES = 'monumentos_naturales',
  PATRIMONIO = 'patrimonio',
  PLAYAS = 'playas',
  AGENDA = 'agenda',
  GASTRONOMIA = 'gastronomia'
}

export interface WeatherInfo {
  temp: number;
  waterTemp?: number;
  condition: 'sunny' | 'cloudy' | 'windy';
  flag?: 'green' | 'yellow' | 'red';
}

export interface HikingDetails {
  distanceKm: number;
  timeMinutes: number; // en minutos
  difficulty: 'Baja' | 'Media' | 'Alta' | 'Experto';
  circular: boolean;
}

export interface Place {
  id: string;
  categoryId: CategoryId;
  title: string;
  location: string;
  shortDescription: string;
  fullDescription?: string; // Can be populated by AI
  imageUrl: string;
  tags: string[];
  weather?: WeatherInfo; // Specifically for beaches
  hiking?: HikingDetails; // Specifically for hiking trails
  date?: string; // Specifically for events
  rating?: number;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  iconName: string; // Lucide icon name mapped in component
  color: string;
  coverImage: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for rich text
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}
