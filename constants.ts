
import { Category, CategoryId, Place, BlogPost } from './types';

export const CATEGORIES: Category[] = [
  {
    id: CategoryId.AGENDA,
    title: 'Agenda Cultural',
    description: 'Festivales de teatro, conciertos bajo la luna y ferias gastronómicas.',
    iconName: 'Calendar',
    color: 'from-purple-600 to-indigo-900',
    coverImage: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_u0l0ibu0l0ibu0l0.png',
  },
  {
    id: CategoryId.SENDERISMO,
    title: 'Rutas de Senderismo',
    description: 'Explora la Sierra de Aracena y Picos de Aroche, el Andévalo y la Cuenca Minera.',
    iconName: 'Footprints',
    color: 'from-emerald-600 to-teal-800',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop', // Bosque soleado
  },
  {
    id: CategoryId.MONUMENTOS_NATURALES,
    title: 'Monumentos Naturales',
    description: 'Espacios protegidos, grutas milenarias y marismas únicas en Europa.',
    iconName: 'Mountain',
    color: 'from-stone-600 to-stone-800',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop', // Naturaleza impresionante
  },
  {
    id: CategoryId.PATRIMONIO,
    title: 'Patrimonio Histórico',
    description: 'Castillos, dólmenes, el Legado Inglés y los Lugares Colombinos.',
    iconName: 'Landmark',
    color: 'from-orange-700 to-red-900',
    coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop', // Murallas de Niebla
  },
  {
    id: CategoryId.PLAYAS,
    title: 'Costa de la Luz',
    description: 'Kilómetros de arena fina, dunas y el Océano Atlántico.',
    iconName: 'Umbrella',
    color: 'from-blue-500 to-cyan-600',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', // Playa paradisiaca
  },
  {
    id: CategoryId.GASTRONOMIA,
    title: 'Sabores de Huelva',
    description: 'Cuna del Jamón de Jabugo, la Gamba Blanca y los Vinos del Condado.',
    iconName: 'Utensils',
    color: 'from-amber-600 to-yellow-800',
    coverImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', // Comida/Jamón
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: '5-eventos-imperdibles-huelva-2024',
    title: '5 Eventos que no te puedes perder en Huelva este año',
    excerpt: 'Desde festivales de teatro medieval hasta ferias gastronómicas. Descubre la agenda cultural esencial de la provincia.',
    author: 'Carmen Rodríguez',
    date: '12 Oct 2024',
    readTime: '4 min',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_3ihwbe3ihwbe3ihw-scaled.png',
    tags: ['Cultura', 'Eventos', 'Ocio'],
    content: `
      <p>La provincia de Huelva es un hervidero de cultura y tradición. Si estás planeando tu visita, asegúrate de coincidir con alguno de estos cinco eventos imprescindibles:</p>
      
      <h3>1. Festival de Teatro y Danza de Niebla</h3>
      <p>Durante los meses de verano, el Patio de Armas del Castillo de los Guzmanes se convierte en uno de los escenarios más mágicos de España. Obras clásicas y contemporáneas bajo las estrellas.</p>
      
      <h3>2. Feria del Jamón de Aracena</h3>
      <p>En octubre, la sierra se viste de gala. Es el paraíso para los amantes del ibérico. Degustaciones, concursos de corte y venta directa del productor.</p>
      
      <h3>3. Festival de Cine Iberoamericano</h3>
      <p>Huelva tiende puentes con América a través del séptimo arte. Una semana en noviembre donde la ciudad respira cine, con proyecciones y encuentros con directores.</p>
      
      <h3>4. Saca de las Yeguas (Almonte)</h3>
      <p>Una tradición ancestral que se celebra cada 26 de junio. Los yegüerizos bajan a las yeguas y potrillos desde las marismas de Doñana hasta Almonte. Un espectáculo visual único.</p>
      
      <h3>5. Jornadas Medievales de Cortegana</h3>
      <p>En agosto, este pueblo de la sierra viaja al pasado. Su castillo domina una fiesta llena de mercadillos, teatro callejero y música celta.</p>
    `
  },
  {
    id: 'blog-2',
    slug: 'ruta-castanos-otono',
    title: 'Otoño Mágico: La Ruta de los Castaños',
    excerpt: 'El otoño en la Sierra de Aracena es un espectáculo de ocres y rojos. Te guiamos por los senderos más fotogénicos.',
    author: 'Manuel García',
    date: '05 Oct 2024',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
    tags: ['Senderismo', 'Naturaleza', 'Sierra'],
    content: `
      <p>Cuando caen las primeras lluvias y bajan las temperaturas, la Sierra de Aracena y Picos de Aroche sufre una metamorfosis. El verde perenne de las encinas y alcornoques se mezcla con la explosión caduca de los castaños.</p>
      <p>La ruta más emblemática parte de Fuenteheridos hacia Galaroza. Es un camino sencillo, ideal para familias, donde el suelo se cubre de un manto de hojas y erizos de castañas.</p>
      <p><strong>Consejo experto:</strong> Lleva una cesta, pero recuerda que muchas castañas están en fincas privadas. Recoge solo las que estén en el camino público o pide permiso.</p>
    `
  },
  {
    id: 'blog-3',
    slug: 'guia-gamba-blanca',
    title: 'La Gamba Blanca: Guía para no turistas',
    excerpt: '¿Sabes distinguir una gamba fresca de una congelada? Aprende dónde comer el mejor marisco de Huelva.',
    author: 'Lucía Chef',
    date: '28 Sep 2024',
    readTime: '3 min',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/descarga-2.jpg', // IMAGEN ACTUALIZADA
    tags: ['Gastronomía', 'Guía Local', 'Marisco'],
    content: `
      <p>No hay Huelva sin su Gamba Blanca. Pero no en todos sitios te ponen "la buena". Aquí tienes las claves para disfrutar de este manjar:</p>
      <ul>
        <li><strong>El Bigote:</strong> Debe estar largo e intacto. Si está roto, la gamba ha sufrido en el transporte o congelación.</li>
        <li><strong>El color:</strong> Un rosa pálido que se torna casi blanco al cocerse. Nunca naranja intenso artificial.</li>
        <li><strong>Dónde comerla:</strong> Huye de las trampas para turistas. Busca las cervecerías del Mercado del Carmen en la capital o los cocederos tradicionales de Isla Cristina.</li>
      </ul>
    `
  },
  {
    id: 'blog-4',
    slug: 'mejores-atardeceres-costa-luz',
    title: 'Cazando el Sol: Los mejores atardeceres',
    excerpt: 'Desde marismas infinitas hasta muelles históricos. Localizaciones exactas para la foto perfecta.',
    author: 'Alejandro Fotografía',
    date: '15 Sep 2024',
    readTime: '2 min',
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9d869?q=80&w=800&auto=format&fit=crop',
    tags: ['Fotografía', 'Playas', 'Romántico'],
    content: `
      <p>La luz de Huelva es especial. No lo decimos nosotros, lo dicen los pintores y fotógrafos que la visitan. Aquí tienes mi Top 3 personal:</p>
      <ol>
        <li><strong>Muelle del Tinto:</strong> El clásico. La estructura de hierro se recorta contra el sol cayendo sobre la ría. Llega 30 minutos antes.</li>
        <li><strong>Marismas del Rocío:</strong> El reflejo del sol en el agua, con los flamencos y caballos salvajes de fondo, es una imagen de National Geographic.</li>
        <li><strong>Cuesta Maneli:</strong> Ver cómo el sol se hunde en el Atlántico desde lo alto de la duna fósil no tiene precio.</li>
      </ol>
    `
  },
  {
    id: 'blog-5',
    slug: 'legado-britanico',
    title: 'El Huelva Inglés: Un viaje victoriano',
    excerpt: 'Barrios victorianos, clubes de tenis y minas a cielo abierto. La huella británica sigue viva.',
    author: 'Sarah History',
    date: '02 Sep 2024',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=800&auto=format&fit=crop',
    tags: ['Historia', 'Patrimonio', 'Cultura'],
    content: `
      <p>A finales del siglo XIX, Huelva era una pequeña colonia británica debido a la explotación de las minas de Riotinto. Ese legado ha dejado una arquitectura única en Andalucía.</p>
      <p>El Barrio Reina Victoria (Barrio Obrero) es el máximo exponente. Casitas de estilo inglés adaptadas al clima del sur. No te pierdas tampoco la Casa Colón, antiguo hotel de lujo donde se fundó el Recreativo de Huelva, el club de fútbol más antiguo de España (El Decano).</p>
    `
  }
];

export const MOCK_PLACES: Place[] = [
  // --- SENDERISMO ---
  {
    id: 's-1',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero de los Molinos',
    location: 'Cortegana',
    shortDescription: 'Una ruta histórica entre molinos harineros y vegetación de ribera en plena sierra.',
    imageUrl: 'https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=600&auto=format&fit=crop',
    tags: ['Dificultad Media', '5km', 'Agua'],
    rating: 4.8,
    hiking: { distanceKm: 5.2, timeMinutes: 120, difficulty: 'Media', circular: true }
  },
  {
    id: 's-2',
    categoryId: CategoryId.SENDERISMO,
    title: 'Subida al Cerro de San Cristóbal',
    location: 'Almonaster la Real',
    shortDescription: 'Vistas panorámicas de toda la comarca desde uno de los puntos más altos.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop',
    tags: ['Dificultad Alta', 'Panorámica', 'Montaña'],
    rating: 4.6,
    hiking: { distanceKm: 8.5, timeMinutes: 180, difficulty: 'Alta', circular: true }
  },
  {
    id: 's-3',
    categoryId: CategoryId.SENDERISMO,
    title: 'Vía Verde del Guadiana',
    location: 'El Granado - Sanlúcar',
    shortDescription: 'Antiguo trazado ferroviario reconvertido para caminantes y ciclistas junto al río.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    tags: ['Fácil', 'Ciclismo', 'Familiar'],
    rating: 4.5,
    hiking: { distanceKm: 16, timeMinutes: 240, difficulty: 'Baja', circular: false }
  },
  {
    id: 's-4',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta del Río Tinto',
    location: 'Minas de Riotinto',
    shortDescription: 'Un paisaje marciano único en el mundo con aguas rojas y tierra ocre.',
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=600&auto=format&fit=crop',
    tags: ['Único', 'Geología', 'Fotografía'],
    rating: 4.9,
    hiking: { distanceKm: 4.0, timeMinutes: 90, difficulty: 'Baja', circular: true }
  },
  {
    id: 's-5',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero Ribera de Jabugo',
    location: 'Jabugo',
    shortDescription: 'Caminos de castaños y encinas en el corazón de la zona del jamón.',
    imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=600&auto=format&fit=crop',
    tags: ['Gastronomía', 'Otoño', 'Sombra'],
    rating: 4.7,
    hiking: { distanceKm: 6.5, timeMinutes: 150, difficulty: 'Media', circular: true }
  },
  {
    id: 's-6',
    categoryId: CategoryId.SENDERISMO,
    title: 'Acantilado del Asperillo',
    location: 'Parque Natural de Doñana',
    shortDescription: 'Impresionante recorrido por dunas fósiles y acantilados frente al Atlántico.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    tags: ['Costa', 'Dunas', 'Vistas'],
    rating: 4.9,
    hiking: { distanceKm: 3.5, timeMinutes: 60, difficulty: 'Baja', circular: false }
  },
  {
    id: 's-7',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta Dólmenes de El Pozuelo',
    location: 'Zalamea la Real',
    shortDescription: 'Un viaje a la prehistoria visitando uno de los conjuntos megalíticos más importantes.',
    imageUrl: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=600&auto=format&fit=crop',
    tags: ['Historia', 'Arqueología', 'Tranquilo'],
    rating: 4.6,
    hiking: { distanceKm: 11, timeMinutes: 210, difficulty: 'Media', circular: true }
  },
  {
    id: 's-8',
    categoryId: CategoryId.SENDERISMO,
    title: 'Laguna de El Portil',
    location: 'Punta Umbría',
    shortDescription: 'Sendero llano rodeando la laguna, ideal para el avistamiento de aves.',
    imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=600&auto=format&fit=crop',
    tags: ['Familiar', 'Aves', 'Relax'],
    rating: 4.5,
    hiking: { distanceKm: 3.0, timeMinutes: 45, difficulty: 'Baja', circular: true }
  },
  {
    id: 's-9',
    categoryId: CategoryId.SENDERISMO,
    title: 'Molinos del Odiel',
    location: 'Sotiel Coronada',
    shortDescription: 'Ruta etnográfica junto al río Odiel descubriendo antiguos molinos harineros.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Senda-Molinos-harineros-Odiel.jpg',
    tags: ['Río', 'Patrimonio', 'Fotografía'],
    rating: 4.7,
    hiking: { distanceKm: 7.0, timeMinutes: 160, difficulty: 'Media', circular: true }
  },
  {
    id: 's-10',
    categoryId: CategoryId.SENDERISMO,
    title: 'Cuesta de la Traición',
    location: 'Alájar',
    shortDescription: 'Ruta circular exigente con las mejores vistas de la Sierra desde la Peña de Arias Montano.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop',
    tags: ['Desafío', 'Vistas', 'Sierra'],
    rating: 4.8,
    hiking: { distanceKm: 9.0, timeMinutes: 200, difficulty: 'Alta', circular: true }
  },
  {
    id: 's-11',
    categoryId: CategoryId.SENDERISMO,
    title: 'Bosque de las Letras',
    location: 'Santa Ana la Real',
    shortDescription: 'Un sendero literario mágico donde los árboles "hablan" con poemas y textos grabados.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    tags: ['Literario', 'Magia', 'Familiar'],
    rating: 4.9,
    hiking: { distanceKm: 4.5, timeMinutes: 100, difficulty: 'Baja', circular: true }
  },
  {
    id: 's-12',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta de los Contrabandistas',
    location: 'Encinasola',
    shortDescription: 'Camino fronterizo con Portugal lleno de historia y paisajes de dehesa.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140884-074cf27f731d?q=80&w=600&auto=format&fit=crop',
    tags: ['Frontera', 'Historia', 'Aventura'],
    rating: 4.7,
    hiking: { distanceKm: 14.0, timeMinutes: 300, difficulty: 'Alta', circular: false }
  },

  // --- PLAYAS (COSTA DE LA LUZ) ---
  {
    id: 'p-1',
    categoryId: CategoryId.PLAYAS,
    title: 'Cuesta Maneli',
    location: 'Parque Natural de Doñana',
    shortDescription: 'Playa virgen accesible por una pasarela de madera entre dunas y pinos.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/cuesta-maneli2.webp',
    tags: ['Virgen', 'Naturaleza', 'Atardecer'],
    weather: { temp: 28, waterTemp: 22, condition: 'sunny', flag: 'green' },
    rating: 4.9
  },
  {
    id: 'p-2',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de Matalascañas',
    location: 'Almonte',
    shortDescription: 'Famosa por su "tapón" y sus kilómetros de arena fina junto al Parque Nacional.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/caption.jpg',
    tags: ['Familiar', 'Servicios', 'Dunas'],
    weather: { temp: 29, waterTemp: 23, condition: 'sunny', flag: 'green' },
    rating: 4.5
  },
  {
    id: 'p-3',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa del Parador',
    location: 'Mazagón',
    shortDescription: 'Rodeada de acantilados de arenisca y bosque de pinos, ideal para desconectar.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/parador.jpg',
    tags: ['Relax', 'Acantilados', 'Pinos'],
    weather: { temp: 27, waterTemp: 21, condition: 'windy', flag: 'yellow' },
    rating: 4.7
  },
  {
    id: 'p-4',
    categoryId: CategoryId.PLAYAS,
    title: 'Flecha del Rompido',
    location: 'El Rompido',
    shortDescription: 'Lengua de arena natural accesible solo por barco, un paraíso natural.',
    imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=600&auto=format&fit=crop',
    tags: ['Exclusivo', 'Naturaleza', 'Barco'],
    weather: { temp: 28, waterTemp: 22, condition: 'sunny', flag: 'green' },
    rating: 4.8
  },

  // --- PATRIMONIO ---
  {
    id: 'pat-1',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Muelle del Tinto',
    location: 'Huelva Capital',
    shortDescription: 'Impresionante obra de ingeniería inglesa del siglo XIX sobre la ría, ideal al atardecer.',
    imageUrl: 'https://images.unsplash.com/photo-1621683937812-32117565492d?q=80&w=600&auto=format&fit=crop',
    tags: ['Icono', 'Atardecer', 'Fotografía'],
    rating: 4.9
  },
  {
    id: 'pat-2',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Castillo de Niebla',
    location: 'Niebla',
    shortDescription: 'Fortaleza medieval rodeada de murallas almohades en perfecto estado.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
    tags: ['Medieval', 'Historia', 'Murallas'],
    rating: 4.6
  },
  {
    id: 'pat-3',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Monasterio de La Rábida',
    location: 'Palos de la Frontera',
    shortDescription: 'Lugar clave en el descubrimiento de América, donde Colón preparó su viaje.',
    imageUrl: 'https://images.unsplash.com/photo-1565033488426-5b4859f5b61e?q=80&w=600&auto=format&fit=crop',
    tags: ['Colón', 'Historia', 'Claustro'],
    rating: 4.8
  },
  {
    id: 'pat-4',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Mezquita de Almonaster',
    location: 'Almonaster la Real',
    shortDescription: 'La única mezquita rural conservada en España, una joya islámica en la sierra.',
    imageUrl: 'https://images.unsplash.com/photo-1582294432131-2856f6c9d09a?q=80&w=600&auto=format&fit=crop',
    tags: ['Único', 'Islámico', 'Paz'],
    rating: 4.9
  },

  // --- MONUMENTOS NATURALES ---
  {
    id: 'n-1',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Gruta de las Maravillas',
    location: 'Aracena',
    shortDescription: 'Una catedral subterránea esculpida por el agua y la piedra durante siglos.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop',
    tags: ['Geología', 'Impresionante', 'Cueva'],
    rating: 5.0
  },
  {
    id: 'n-2',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Marismas del Odiel',
    location: 'Huelva',
    shortDescription: 'Reserva de la Biosfera y paraíso para la observación de flamencos y aves.',
    imageUrl: 'https://images.unsplash.com/photo-1444211353242-d59516625827?q=80&w=600&auto=format&fit=crop',
    tags: ['Aves', 'Flamencos', 'Biosfera'],
    rating: 4.7
  },
  {
    id: 'n-3',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Peña de Arias Montano',
    location: 'Alájar',
    shortDescription: 'Lugar místico con vistas espectaculares y la ermita de la Reina de los Ángeles.',
    imageUrl: 'https://images.unsplash.com/photo-1504280506508-46ab6d9dc320?q=80&w=600&auto=format&fit=crop',
    tags: ['Místico', 'Vistas', 'Relax'],
    rating: 4.8
  },

  // --- GASTRONOMIA ---
  {
    id: 'g-1',
    categoryId: CategoryId.GASTRONOMIA,
    title: 'Bodegas del Condado',
    location: 'Bollullos Par del Condado',
    shortDescription: 'Cata de vinos generosos y naranjas en bodegas centenarias.',
    imageUrl: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=600&auto=format&fit=crop',
    tags: ['Vino', 'Enoturismo', 'Tradición'],
    rating: 4.6
  },
  {
    id: 'g-2',
    categoryId: CategoryId.GASTRONOMIA,
    title: 'Ruta del Jamón',
    location: 'Jabugo',
    shortDescription: 'Visita secaderos y degusta el mejor jamón 100% ibérico de bellota del mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    tags: ['Gourmet', 'Ibérico', 'Delicioso'],
    rating: 5.0
  },
  {
    id: 'g-3',
    categoryId: CategoryId.GASTRONOMIA,
    title: 'Mercado del Carmen',
    location: 'Huelva Capital',
    shortDescription: 'El templo del marisco fresco: gamba blanca, coquinas y pescado de la costa.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop',
    tags: ['Marisco', 'Fresco', 'Local'],
    rating: 4.8
  },

  // --- AGENDA CULTURAL ---
  {
    id: 'a-1',
    categoryId: CategoryId.AGENDA,
    title: 'Festival de Teatro y Danza',
    location: 'Castillo de Niebla',
    shortDescription: 'Las noches de verano cobran vida con obras clásicas en el patio del castillo.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_7ddfr97ddfr97ddf.png',
    tags: ['Teatro', 'Noche', 'Cultura'],
    date: 'Julio - Agosto',
    rating: 4.8
  },
  {
    id: 'a-2',
    categoryId: CategoryId.AGENDA,
    title: 'Feria de la Gamba',
    location: 'Punta Umbría',
    shortDescription: 'Un evento gastronómico masivo para disfrutar de los tesoros del mar.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_wx29kowx29kowx29-scaled.png',
    tags: ['Gastronomía', 'Fiesta', 'Marisco'],
    date: 'Abril',
    rating: 4.5
  },
  {
    id: 'a-3',
    categoryId: CategoryId.AGENDA,
    title: 'Romería del Rocío',
    location: 'Aldea del Rocío',
    shortDescription: 'La peregrinación más famosa, llena de color, caballos y devoción.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_5x5p7u5x5p7u5x5p.png',
    tags: ['Tradición', 'Internacional', 'Pasión'],
    date: 'Pentecostés',
    rating: 4.9
  },
  {
    id: 'a-4',
    categoryId: CategoryId.AGENDA,
    title: 'Fiesta de Carnaval 2026',
    location: 'Higuera de la Sierra',
    shortDescription: 'Pasacalle desde Plaza San Antonio a la Nave del Charcón. Música, concursos y diversión asegurada.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-10.20.11-1.jpeg', 
    tags: ['Carnaval', 'Fiesta', 'Disfraces'],
    date: '7 Feb 2026 - 19:30',
    rating: 4.7
  },
  {
    id: 'a-5',
    categoryId: CategoryId.AGENDA,
    title: 'Fiesta de Carnaval Corteconcepción',
    location: 'Corteconcepción',
    shortDescription: 'Gran pasacalles con charanga "Los Vikingos" y fiesta nocturna con DJ en la Nave Municipal.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/CARTEL-CORTECONCEPCION.jpg',
    tags: ['Carnaval', 'Música', 'Disfraces'],
    date: '21 Feb 2026 - 17:30',
    rating: 4.8
  },
  {
    id: 'a-6',
    categoryId: CategoryId.AGENDA,
    title: 'Concurso de Carnaval de Cortegana',
    location: 'Cortegana',
    shortDescription: 'Chirigotas y comparsas en el Teatro Capitol Sierra. Del 24 al 27 de febrero. Organiza Asoc. La Carpa.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-17-at-10.20.11.jpeg',
    tags: ['Teatro', 'Carnaval', 'Concurso'],
    date: '24 - 27 Feb 2026',
    rating: 4.9
  },
  {
    id: 'a-7',
    categoryId: CategoryId.AGENDA,
    title: 'Feria del Aceite (Oleozufre)',
    location: 'Zufre',
    shortDescription: 'XXII Feria del Aceite de Oliva y Productos Serranos. Gastronomía, mercado y tradición en la sierra.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/ba4d3ea3-1a5f-4807-9a7f-fa1de2ec76dd.jpg',
    tags: ['Gastronomía', 'Aceite', 'Feria'],
    date: '6 - 8 Feb 2026',
    rating: 4.8
  },
  {
    id: 'a-9',
    categoryId: CategoryId.AGENDA,
    title: 'Feria Agroganadera Comarca de Doñana',
    location: 'Rociana del Condado',
    shortDescription: 'XIV Feria Agroganadera y Comercial. Exhibición ecuestre, gastronomía y artesanía.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/1c37c53f-b5f6-4f18-ab9d-c810b6937738.jpg',
    tags: ['Feria', 'Caballos', 'Gastronomía'],
    date: '6 - 8 Feb 2026',
    rating: 4.8
  },
  {
    id: 'a-10',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval de Ayamonte 2026',
    location: 'Ayamonte',
    shortDescription: 'La Fiesta de la Alegría regresa con fuerza. Concurso de agrupaciones, cabalgatas y callejeros en la Puerta de España.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.43.23.jpeg',
    tags: ['Carnaval', 'Fiesta', 'Ayamonte'],
    date: '18 Ene - 21 Feb 2026',
    rating: 4.9
  },
  {
    id: 'a-11',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval Cumbres de San Bartolomé',
    location: 'Cumbres de San Bartolomé',
    shortDescription: '¡No faltes! Gran baile de disfraces, pasacalles, fantasía y diversión en la sierra.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.43.41.jpeg',
    tags: ['Carnaval', 'Fiesta', 'Sierra'],
    date: '14 - 15 Feb 2026',
    rating: 4.8
  },
  {
    id: 'a-12',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval Almonaster la Real 2026',
    location: 'Almonaster la Real',
    shortDescription: 'Sábado 7 de Febrero. 13:00h Apertura, 18:30h Pasacalles Charanga Cachonera, 23:00h DJ Raster en la Carpa Municipal.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.45.13.jpeg',
    tags: ['Carnaval', 'Música', 'Fiesta'],
    date: '7 Feb 2026',
    rating: 4.8
  },
  {
    id: 'a-13',
    categoryId: CategoryId.AGENDA,
    title: 'II Concurso Doma Vaquera Social',
    location: 'Rociana del Condado',
    shortDescription: 'Memorial José Tirado Cerrada. Viernes 6 de Febrero a las 17:00h en el Recinto Ferial Alcalde Manuel Pérez Pérez.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.45.44.jpeg',
    tags: ['Caballos', 'Doma Vaquera', 'Concurso'],
    date: '6 Feb 2026 - 17:00',
    rating: 4.7
  },
  {
    id: 'a-14',
    categoryId: CategoryId.AGENDA,
    title: 'Magia del Caballo: Santi Serracamps',
    location: 'Aldea del Rocío',
    shortDescription: 'Espectáculo ecuestre único con Santí Serracamps y trinomio de campeones de España. Artistas invitados: Rafel Arcos, El Chamo y Rocío Jiménez.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.48.07.jpeg',
    tags: ['Caballos', 'Espectáculo', 'Rocío'],
    date: '24 Ene 2026 - 17:00',
    rating: 4.9
  },
  {
    id: 'a-15',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval 2026 Valverde del Camino',
    location: 'Valverde del Camino',
    shortDescription: 'Del 31 de enero al 22 de febrero. Programación especial en el Teatro Puerta del Andévalo.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.48.07.jpeg',
    tags: ['Carnaval', 'Teatro', 'Disfraces'],
    date: '31 Ene - 22 Feb 2026',
    rating: 4.8
  },
  {
    id: 'a-16',
    categoryId: CategoryId.AGENDA,
    title: 'Huelva Flamenca 2026',
    location: 'Huelva Capital',
    shortDescription: '15ª Edición de la Pasarela Oficial de Moda Flamenca. Desfiles y tendencias en el Ayuntamiento de Huelva.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.50.39.jpeg',
    tags: ['Moda', 'Flamenco', 'Pasarela'],
    date: '6 - 8 Feb 2026',
    rating: 4.8
  },
  // --- NUEVO EVENTO ---
  {
    id: 'a-17',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval de Isla Cristina 2026',
    location: 'Isla Cristina',
    shortDescription: 'Fiesta de Interés Turístico de Andalucía. Del 23 de enero al 22 de febrero. Disfruta del concurso de agrupaciones y el gran desfile.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-20-at-15.16.54.jpeg',
    tags: ['Carnaval', 'Fiesta', 'Interés Turístico'],
    date: '23 Ene - 22 Feb 2026',
    rating: 4.9
  },
  // --- NUEVO EVENTO ---
  {
    id: 'a-18',
    categoryId: CategoryId.AGENDA,
    title: 'Concierto Solidario: José A. de Moreno',
    location: 'Almonte',
    shortDescription: 'A beneficio de la asociación "Navega con Ángela". Viernes 23 de Enero a las 20:00h en la Casa de la Cultura.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-21-at-10.23.39.jpeg',
    tags: ['Música', 'Solidario', 'Concierto'],
    date: '23 Ene 2026 - 20:00',
    rating: 4.8
  }
];
