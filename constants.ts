
import { Category, CategoryId, Place, BlogPost } from './types';

const CATEGORIES: Category[] = [
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

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-oleozufre-2026',
    slug: 'guia-oleozufre-2026',
    title: 'Oleozufre 2026: Guía completa de la Feria del Aceite y Productos Serranos',
    excerpt: 'Globo aerostático, showcooking, catas de vino y el mejor aceite de oliva virgen extra. Tienes una cita en Zufre del 6 al 8 de febrero.',
    author: 'Redacción HuelvaLate',
    date: '04 Feb 2026',
    readTime: '6 min',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/ba4d3ea3-1a5f-4807-9a7f-fa1de2ec76dd.jpg',
    tags: ['Feria', 'Gastronomía', 'Zufre'],
    content: `
      <p class="lead">Zufre, conocido como "El Balcón de la Sierra" por sus impresionantes vistas, se prepara para acoger su evento más emblemático: la <strong>XXII Feria del Aceite de Oliva y XVIII de Productos Serranos</strong>. Del 6 al 8 de febrero, el municipio se llenará de sabor, artesanía y actividades para toda la familia.</p>

      <h3>Viernes 6 de Febrero: Inauguración y Cultura</h3>
      <p>La jornada comienza fuerte con un desayuno ecológico para los más pequeños, sentando las bases de la educación alimentaria.</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><strong>11:30:</strong> Desayuno Ecológico con Aceite de Oliva (CEIP Sutefie).</li>
        <li><strong>17:30:</strong> Inauguración oficial de la muestra en el Recinto Ferial.</li>
        <li><strong>17:45:</strong> Actuación del Grupo de Baile y Castañuelas de Zufre.</li>
        <li><strong>18:00:</strong> Entrega del prestigioso galardón "Oliva de Plata".</li>
        <li><strong>19:00:</strong> Actuación inaugural en el Recinto Ferial.</li>
      </ul>

      <h3>Sábado 7 de Febrero: Altura y Espectáculo</h3>
      <p>El sábado es el día grande, destacando una actividad espectacular: <strong>un globo aerostático cautivo</strong> en la Plaza de Toros para ver la sierra desde el cielo.</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><strong>10:00 - 12:00:</strong> Globo Aerostático (Plaza de Toros). ¡Imprescindible!</li>
        <li><strong>11:00 - 14:00:</strong> Visita guiada por el municipio (Salida: Paseo de los Alcaldes).</li>
        <li><strong>12:30:</strong> Espectáculo de circo "Cirkalgia" (Paseo de los Alcaldes).</li>
        <li><strong>13:30:</strong> Showcooking a cargo de la Diputación de Huelva (Recinto Ferial).</li>
        <li><strong>16:00:</strong> Actuación de humorista.</li>
        <li><strong>18:00:</strong> Concierto del grupo "Los Maleantes".</li>
        <li><strong>20:00:</strong> Sesión DJ Jesuli para cerrar la tarde con ritmo.</li>
      </ul>

      <h3>Domingo 8 de Febrero: Gastronomía y Tradición</h3>
      <p>El cierre de la feria se centra en lo mejor de nuestra tierra: el comer y el beber.</p>
      <ul class="list-disc pl-5 space-y-2 mb-6">
        <li><strong>11:00 - 14:00:</strong> Visita guiada por el municipio.</li>
        <li><strong>12:00:</strong> Degustación de Productos Típicos de la comarca (Ayto. de Zufre).</li>
        <li><strong>12:30:</strong> Espectáculo de Cetrería (Plaza de Toros).</li>
        <li><strong>14:00:</strong> Maridaje perfecto: Degustación de Vino del Condado con Cortador de Jamón.</li>
        <li><strong>15:30:</strong> Actuación del grupo "La Pólvora de la Calle".</li>
      </ul>

      <p><strong>Actividades Permanentes:</strong> Durante el sábado y domingo habrá hinchables infantiles (12:00-20:00/18:00) en la Plaza Constitución, convirtiéndolo en un plan ideal para ir con niños.</p>
      
      <p>No pierdas la oportunidad de comprar aceite de cooperativa recién prensado y embutidos artesanos en los stands del recinto ferial. ¡Nos vemos en Zufre!</p>
    `
  },
  {
    id: 'blog-new-1',
    slug: 'guia-completa-donana',
    title: 'Doñana: Guía definitiva para visitar el Parque Nacional',
    excerpt: '¿4x4, barco o a pie? Desglosamos todas las opciones para visitar la mayor reserva ecológica de Europa y avistar al lince ibérico.',
    author: 'Elena Naturalista',
    date: '10 Feb 2026',
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1579603097200-c9a764d9b4c0?q=80&w=800&auto=format&fit=crop',
    tags: ['Naturaleza', 'Guía', 'Doñana'],
    content: `
      <p class="lead">Visitar Doñana no es ir a un parque cualquiera; es adentrarse en un mosaico de ecosistemas que cambian con cada estación. Dunas móviles, cotos, marismas y playas vírgenes conforman este Patrimonio de la Humanidad.</p>

      <h3>¿Cómo visitar el Parque Nacional?</h3>
      <p>El acceso al corazón del parque está restringido para proteger su fragilidad. Sin embargo, existen varias opciones para conocerlo a fondo:</p>
      
      <ul>
        <li><strong>Rutas en 4x4:</strong> Es la opción más popular. Salen desde el centro de visitantes de El Acebuche. Dura unas 4 horas y recorre todos los ecosistemas (playa, dunas y bosque). Es la mejor opción para ver mamíferos grandes como ciervos y jabalíes.</li>
        <li><strong>El Buque Real Fernando:</strong> Sale desde Sanlúcar de Barrameda y remonta el Guadalquivir. Hace paradas en el Poblado de la Plancha (chozas típicas). Ideal para ver aves acuáticas y flamencos.</li>
        <li><strong>A pie por los senderos:</strong> Existen senderos de libre acceso en la periferia, como el del Palacio del Acebrón o el sendero de la Laguna del Acebuche, perfectos para ir por libre y con prismáticos.</li>
      </ul>

      <h3>El Lince Ibérico: El rey de Doñana</h3>
      <p>Doñana es el último refugio histórico del felino más amenazado del mundo. Aunque verlo es cuestión de suerte (y mucha paciencia), las mejores horas son el amanecer y el atardecer en la zona del Coto del Rey o cerca de la Raya Real.</p>

      <blockquote class="border-l-4 border-orange-500 pl-4 italic my-4 text-stone-600">
        "Consejo de experto: No te obsesiones con el lince. Disfruta de la inmensidad de la marisma y el silencio. Si aparece, será el regalo definitivo."
      </blockquote>

      <h3>La Aldea del Rocío</h3>
      <p>Ninguna visita está completa sin pasar por la aldea de El Rocío. Sus calles de arena (sin asfalto) y su ubicación justo al borde de la marisma la convierten en un escenario de película. La Ermita refleja su blanco inmaculado en las aguas de la Madre de las Marismas, ofreciendo una de las postales más bellas de Andalucía.</p>
    `
  },
  {
    id: 'blog-new-2',
    slug: 'viaje-a-marte-riotinto',
    title: 'Un viaje a Marte sin salir de Huelva: Minas de Riotinto',
    excerpt: 'Descubre por qué la NASA estudia este río rojo y cómo subirte a un tren minero del siglo XIX a través de un paisaje extraterrestre.',
    author: 'Javier Explorador',
    date: '02 Feb 2026',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1605218427368-3617637e1744?q=80&w=800&auto=format&fit=crop',
    tags: ['Minas', 'Fotografía', 'Historia'],
    content: `
      <p>Imagina un lugar donde el agua es roja como la sangre, la tierra es violeta y amarilla, y la vegetación es casi inexistente. No es ciencia ficción; es la Cuenca Minera de Riotinto, un lugar tan singular que la NASA y la Agencia Espacial Europea lo usan como campo de pruebas para sus misiones a Marte.</p>

      <h3>El Río Tinto: Un laboratorio natural</h3>
      <p>Durante décadas se pensó que el color rojo del río se debía únicamente a la contaminación minera. Hoy sabemos que es un fenómeno natural extremo causado por bacterias extremófilas que se alimentan de hierro y sulfuros. El pH del agua es tan ácido (cerca de 2) que pocos organismos pueden sobrevivir, salvo estas bacterias microscópicas.</p>

      <h3>Imprescindibles en tu visita</h3>
      <ol>
        <li><strong>El Ferrocarril Turístico Minero:</strong> Súbete a vagones de madera restaurados del siglo XIX. El tren recorre 12 km paralelos al río, atravesando túneles y puentes espectaculares. La parada en la orilla del río permite tocar (con cuidado) esas aguas marcianas.</li>
        <li><strong>Corta Atalaya:</strong> Durante años fue la mina a cielo abierto más grande de Europa. Sus dimensiones son colosales: 1.200 metros de diámetro. Mirar al fondo es asomarse a las entrañas de la tierra.</li>
        <li><strong>Museo Minero y Casa 21:</strong> En el barrio de Bella Vista, los ingleses que gestionaban las minas construyeron una "Little England". Casas victorianas, club de tenis y jardines cuidados. La Casa 21 es un museo que muestra cómo vivían estos ingenieros británicos aislados en la sierra onubense.</li>
      </ol>

      <p><strong>Tip fotográfico:</strong> Visita la zona al mediodía para captar los colores más intensos del río, o al atardecer para ver cómo las montañas de escoria mineral brillan como oro viejo.</p>
    `
  },
  {
    id: 'blog-new-3',
    slug: 'pueblos-blancos-sierra-aracena',
    title: 'Ruta por los Pueblos Blancos más bonitos de la Sierra',
    excerpt: 'Más allá de Aracena, existen joyas ocultas como Almonaster la Real o Linares de la Sierra. Te diseñamos la ruta de fin de semana perfecta.',
    author: 'Manuel García',
    date: '25 Ene 2026',
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1582294432131-2856f6c9d09a?q=80&w=800&auto=format&fit=crop',
    tags: ['Pueblos', 'Rural', 'Escapada'],
    content: `
      <p>La Sierra de Aracena y Picos de Aroche está salpicada de pueblos blancos que parecen detener el tiempo. Calles empedradas, chimeneas humeantes y el aroma a leña y jamón serrano. Aquí tienes una ruta circular para un fin de semana inolvidable.</p>

      <h3>Parada 1: Almonaster la Real</h3>
      <p>Posiblemente el pueblo con más encanto de la provincia. Su joya es la <strong>Mezquita</strong> (siglo X), construida sobre una basílica visigoda y un templo romano. Es un espacio de paz absoluto, con su patio de los naranjos y sus arcos de herradura, vigilando el pueblo desde lo alto del cerro. Pasear por Almonaster es perderse en la historia.</p>

      <h3>Parada 2: Linares de la Sierra</h3>
      <p>Escondido en un valle, Linares conserva una arquitectura popular única: los "llanos" o empedrados artísticos en la entrada de las casas. No te pierdas sus lavaderos públicos en la plaza central, donde el agua corre cristalina. Es el punto de partida ideal para senderistas.</p>

      <h3>Parada 3: Fuenteheridos y la Plaza del Coso</h3>
      <p>El corazón de la sierra late en la Plaza del Coso de Fuenteheridos, con su famosa fuente de los 12 caños. Es el lugar perfecto para parar a comer y comprar artesanía local o miel de la zona. Desde aquí parten los senderos hacia los bosques de castaños más frondosos.</p>

      <h3>Parada 4: Castaño del Robledo</h3>
      <p>El pueblo más alto de la provincia ofrece unas vistas inigualables. Es famoso por la "Catedral Inacabada", un monumento monumental que se quedó a medio construir y que hoy ofrece una estampa melancólica y romántica.</p>
    `
  },
  {
    id: 'blog-1',
    slug: '5-eventos-imperdibles-huelva-2026',
    title: '5 Eventos que no te puedes perder en Huelva este año',
    excerpt: 'Desde festivales de teatro medieval hasta ferias gastronómicas. Descubre la agenda cultural esencial de la provincia para 2026.',
    author: 'Carmen Rodríguez',
    date: '15 Ene 2026',
    readTime: '5 min',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Gemini_Generated_Image_3ihwbe3ihwbe3ihw-scaled.png',
    tags: ['Cultura', 'Eventos', 'Ocio'],
    content: `
      <p>La provincia de Huelva es un hervidero de cultura y tradición. Si estás planeando tu visita, asegúrate de coincidir con alguno de estos cinco eventos imprescindibles:</p>
      
      <h3>1. Festival de Teatro y Danza de Niebla (Julio-Agosto)</h3>
      <p>Durante las noches de verano, el Patio de Armas del Castillo de los Guzmanes se convierte en uno de los escenarios más mágicos de España. Obras clásicas y contemporáneas bajo las estrellas, con una acústica natural impresionante dentro de las murallas almorávides.</p>
      
      <h3>2. Feria del Jamón de Aracena (Octubre)</h3>
      <p>En octubre, la sierra se viste de gala. Es el paraíso para los amantes del ibérico. Degustaciones a precios populares, concursos de corte de jamón y venta directa del productor. El olor que inunda el recinto ferial es inolvidable.</p>
      
      <h3>3. Festival de Cine Iberoamericano (Noviembre)</h3>
      <p>Huelva tiende puentes con América a través del séptimo arte. Una semana en noviembre donde la ciudad respira cine, con proyecciones, alfombras rojas y encuentros con directores en la Casa Colón.</p>
      
      <h3>4. Saca de las Yeguas (Junio)</h3>
      <p>Una tradición ancestral con más de 500 años de historia. Cada 26 de junio, los yegüerizos bajan a las yeguas y sus potrillos salvajes desde las marismas de Doñana hasta Almonte. Ver pasar a cientos de caballos levantando el polvo al atardecer es un espectáculo visual único.</p>
      
      <h3>5. Jornadas Medievales de Cortegana (Agosto)</h3>
      <p>Uno de los eventos medievales más auténticos de Andalucía. Su castillo del siglo XIII domina una fiesta donde todo el pueblo se disfraza, con mercadillos, teatro callejero, música celta y torneos de caballeros.</p>
    `
  },
  {
    id: 'blog-3',
    slug: 'guia-gamba-blanca-y-vinos',
    title: 'La Gamba Blanca y Vinos del Condado: Maridaje Perfecto',
    excerpt: '¿Sabes distinguir una gamba fresca? Aprende dónde comer el mejor marisco de Huelva y con qué vino acompañarlo.',
    author: 'Lucía Chef',
    date: '12 Ene 2026',
    readTime: '4 min',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/descarga-2.jpg',
    tags: ['Gastronomía', 'Vino', 'Marisco'],
    content: `
      <p>No hay Huelva sin su Gamba Blanca. Es la reina indiscutible de la mesa, pero disfrutarla plenamente requiere cierto conocimiento local. Aquí tienes las claves para disfrutar de este manjar como un onubense más.</p>

      <h3>Cómo identificar la auténtica Gamba Blanca</h3>
      <ul>
        <li><strong>El Bigote:</strong> Debe estar largo e intacto. Si está roto, la gamba ha sufrido en el transporte o congelación. Es el primer indicador de frescura extrema.</li>
        <li><strong>El color:</strong> Un rosa pálido que se torna casi blanco al cocerse. Nunca debe tener un color naranja intenso artificial.</li>
        <li><strong>La cocción:</strong> El secreto está en el agua de mar (o agua con la salinidad exacta). Se cuecen segundos, se sacan y se enfrían en agua con hielo para que la cáscara se separe fácilmente.</li>
      </ul>

      <h3>El Maridaje: Vinos del Condado de Huelva</h3>
      <p>Olvídate de vinos de otras regiones; lo que crece junto, sabe mejor junto. La uva <strong>Zalema</strong>, autóctona de Huelva, produce vinos blancos frescos, ligeros y afrutados que limpian el paladar de la grasa del marisco.</p>
      <p><strong>Recomendación:</strong> Pide un "Vino Naranja" para el postre o el aperitivo, pero para la gamba, busca un blanco joven del Condado bien frío.</p>

      <h3>¿Dónde comerla?</h3>
      <p>Huye de las trampas para turistas. Busca las cervecerías del Mercado del Carmen en la capital o los cocederos tradicionales de Isla Cristina y Punta Umbría.</p>
    `
  },
  {
    id: 'blog-new-4',
    slug: 'secreto-jamon-jabugo',
    title: 'Entendiendo el Jamón de Jabugo: La Dehesa y la Montanera',
    excerpt: '¿Qué significa realmente "Pata Negra"? Viajamos al corazón de la producción del mejor jamón del mundo.',
    author: 'Carlos Gourmet',
    date: '05 Ene 2026',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
    tags: ['Gastronomía', 'Ibérico', 'Jabugo'],
    content: `
      <p>Jabugo no es solo un pueblo, es una marca mundial. Pero detrás de cada loncha de jamón hay un ecosistema único: la Dehesa. Este bosque humanizado de encinas y alcornoques es el escenario de la "Montanera".</p>

      <h3>¿Qué es la Montanera?</h3>
      <p>Es el periodo final de engorde del cerdo ibérico, que va de octubre a febrero. Durante estos meses, el cerdo vive en libertad total, recorriendo hasta 14 km diarios y alimentándose casi exclusivamente de bellotas y hierba. Este ejercicio y dieta es lo que infiltra la grasa en el músculo, dando esa textura jugosa única.</p>

      <h3>Las etiquetas de colores: Guía rápida</h3>
      <p>Para que no te den gato por liebre, fíjate en la brida (precinto) del jamón:</p>
      <ul>
        <li><strong>Negra (100% Ibérico de Bellota):</strong> El rey. Padres 100% ibéricos, criado en libertad y comiendo bellotas. Pata fina y sabor intenso.</li>
        <li><strong>Roja (Ibérico de Bellota):</strong> Criado en libertad con bellotas, pero con algún cruce genético (normalmente madre ibérica, padre Duroc).</li>
        <li><strong>Verde (Cebo de Campo):</strong> Criado en campo pero alimentado con piensos y pastos.</li>
        <li><strong>Blanca (Cebo):</strong> Criado en granja y alimentado con pienso.</li>
      </ul>
      
      <p>Visitar un secadero en Jabugo o Corteconcepción es una experiencia sensorial donde el aroma te envuelve nada más entrar.</p>
    `
  },
  {
    id: 'blog-4',
    slug: 'mejores-atardeceres-costa-luz',
    title: 'Cazando el Sol: Los mejores atardeceres de Huelva',
    excerpt: 'Desde marismas infinitas hasta muelles históricos. Localizaciones exactas y consejos técnicos para la foto perfecta.',
    author: 'Alejandro Fotografía',
    date: '28 Dic 2025',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9d869?q=80&w=800&auto=format&fit=crop',
    tags: ['Fotografía', 'Playas', 'Romántico'],
    content: `
      <p>La "Costa de la Luz" no tiene ese nombre por casualidad. Huelva ofrece, gracias a su orientación geográfica, atardeceres sobre el mar (algo raro en el sur de España). Aquí tienes mi Top 3 personal y cómo fotografiarlos:</p>

      <h3>1. Muelle del Tinto (Huelva Capital)</h3>
      <p>El clásico. Esta estructura de ingeniería inglesa se adentra en la Ría de Huelva. </p>
      <p><strong>La foto perfecta:</strong> No te quedes en la entrada. Baja a la arena cuando la marea esté baja y fotografía la estructura de hierro recortada contra el sol poniente y su reflejo en el agua. Llega 30 minutos antes para coger sitio.</p>

      <h3>2. Marismas del Rocío</h3>
      <p>El reflejo del sol en el agua somera, con los flamencos y caballos salvajes de fondo, crea una imagen de National Geographic. La zona del Paseo Marismeño frente a la Ermita ofrece la mejor perspectiva.</p>

      <h3>3. Cuesta Maneli</h3>
      <p>Ver cómo el sol se hunde literalmente en el Océano Atlántico desde lo alto del acantilado de la duna fósil no tiene precio. El contraste entre el verde de los pinos, el dorado de la arena y el azul del mar es espectacular. Es un paseo de 15 minutos por pasarela de madera que merece cada paso.</p>
    `
  },
  {
    id: 'blog-2',
    slug: 'ruta-castanos-otono',
    title: 'Otoño Mágico: La Ruta de los Castaños',
    excerpt: 'El otoño en la Sierra de Aracena es un espectáculo de ocres y rojos. Te guiamos por los senderos más fotogénicos y la recolección de setas.',
    author: 'Manuel García',
    date: '10 Nov 2025',
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
    tags: ['Senderismo', 'Naturaleza', 'Otoño'],
    content: `
      <p>Cuando caen las primeras lluvias y bajan las temperaturas, la Sierra de Aracena y Picos de Aroche sufre una metamorfosis. El verde perenne de las encinas y alcornoques se mezcla con la explosión caduca de los castaños, creando un tapiz de amarillos, naranjas y rojos.</p>

      <h3>La Ruta Recomendada: Fuenteheridos - Galaroza</h3>
      <p>La ruta más emblemática parte de Fuenteheridos. Es un camino sencillo, ideal para familias, donde el suelo se cubre de un manto crujiente de hojas y erizos de castañas. El "Bosque Encantado" cerca de Castaño del Robledo es otra parada obligatoria para fotógrafos.</p>
      
      <h3>Micología: El otro tesoro</h3>
      <p>Junto a las castañas, surgen las setas. La <strong>Tana</strong> (Amanita caesarea) y el <strong>Tentullo</strong> (Boletus aereus) son las reinas de la gastronomía local en esta época. Muchos restaurantes ofrecen menús micológicos específicos en noviembre.</p>

      <p><strong>Etiqueta de la Sierra:</strong> Si vas a recoger castañas o setas, recuerda que muchas fincas son privadas. Recoge solo lo que esté en el camino público o pide permiso. Y nunca uses rastrillos para las setas, dañas el micelio.</p>
    `
  },
  {
    id: 'blog-5',
    slug: 'legado-britanico',
    title: 'El Huelva Inglés: Un viaje a la época victoriana',
    excerpt: 'Barrios victorianos, clubes de tenis y cementerios protestantes. La huella británica en Huelva sigue muy viva.',
    author: 'Sarah History',
    date: '15 Oct 2025',
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=800&auto=format&fit=crop',
    tags: ['Historia', 'Patrimonio', 'Cultura'],
    content: `
      <p>A finales del siglo XIX, Huelva se convirtió en una pequeña colonia británica debido a la venta de las minas de Riotinto a un consorcio inglés. Ese legado ha dejado una arquitectura única en Andalucía, una mezcla extraña y fascinante entre el ladrillo industrial de Manchester y la luz del sur.</p>

      <h3>El Barrio Reina Victoria (Barrio Obrero)</h3>
      <p>Situado en una colina de la capital, es el máximo exponente. Casitas unifamiliares con entramados de madera, tejados a dos aguas y jardines delanteros. Los ingleses adaptaron su arquitectura al clima, mezclándola con toques neomudéjares y coloniales. Pasear por aquí es teletransportarse.</p>
      
      <h3>La Casa Colón</h3>
      <p>Originalmente fue el Gran Hotel Colón, inaugurado en 1883 para alojar a los directivos y visitantes de la compañía minera. Fue un hotel de ultra lujo para la época, con agua corriente y luz eléctrica. Hoy es el centro cultural de la ciudad y sede del Festival de Cine. En sus jardines se fundó el <strong>Recreativo de Huelva</strong>, el club de fútbol más antiguo de España (El Decano).</p>

      <h3>El Legado Deportivo</h3>
      <p>Los ingleses no solo trajeron industria; trajeron sus aficiones. El fútbol, el tenis y el golf entraron en España por Huelva. Visitar el Real Club Recreativo de Tenis de Huelva es visitar la cuna de este deporte en la península.</p>
    `
  }
];

const MOCK_PLACES: Place[] = [
  // --- SENDERISMO (SIERRA) ---
  {
    id: 's-1',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero de los Molinos',
    location: 'Cortegana',
    shortDescription: 'Una ruta histórica entre molinos harineros y vegetación de ribera en plena sierra.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/peixuan-yu-WGRlgAdr1mc-unsplash.jpg',
    tags: ['Dificultad Media', '5km', 'Agua'],
    rating: 4.8,
    hiking: { distanceKm: 5.2, timeMinutes: 120, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.9142, lng: -6.9189 }
  },
  {
    id: 's-2',
    categoryId: CategoryId.SENDERISMO,
    title: 'Subida al Cerro de San Cristóbal',
    location: 'Almonaster la Real',
    shortDescription: 'Vistas panorámicas de toda la comarca desde uno de los puntos más altos.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/Subida-al-Cerro-de-San-Cristobal.jpg',
    tags: ['Dificultad Alta', 'Panorámica', 'Montaña'],
    rating: 4.6,
    hiking: { distanceKm: 8.5, timeMinutes: 180, difficulty: 'Alta', circular: true },
    coordinates: { lat: 37.8719, lng: -6.7865 }
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
    hiking: { distanceKm: 16, timeMinutes: 240, difficulty: 'Baja', circular: false },
    coordinates: { lat: 37.5250, lng: -7.5020 }
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
    hiking: { distanceKm: 4.0, timeMinutes: 90, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.6961, lng: -6.5925 }
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
    hiking: { distanceKm: 6.5, timeMinutes: 150, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.9255, lng: -6.7300 }
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
    hiking: { distanceKm: 3.5, timeMinutes: 60, difficulty: 'Baja', circular: false },
    coordinates: { lat: 37.0658, lng: -6.6713 }
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
    hiking: { distanceKm: 11, timeMinutes: 210, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.6698, lng: -6.6415 }
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
    hiking: { distanceKm: 3.0, timeMinutes: 45, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.2185, lng: -7.0322 }
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
    hiking: { distanceKm: 7.0, timeMinutes: 160, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.6189, lng: -6.8398 }
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
    hiking: { distanceKm: 9.0, timeMinutes: 200, difficulty: 'Alta', circular: true },
    coordinates: { lat: 37.8710, lng: -6.6660 }
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
    hiking: { distanceKm: 4.5, timeMinutes: 100, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.8680, lng: -6.7200 }
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
    hiking: { distanceKm: 14.0, timeMinutes: 300, difficulty: 'Alta', circular: false },
    coordinates: { lat: 38.1360, lng: -6.8730 }
  },
  {
    id: 's-13',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero del Río Múrtiga',
    location: 'Galaroza',
    shortDescription: 'Un paseo encantador por bosques de galería y arquitectura rural tradicional.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    tags: ['Bosque', 'Río', 'Tranquilidad'],
    rating: 4.7,
    hiking: { distanceKm: 5.0, timeMinutes: 90, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.9190, lng: -6.7080 }
  },
  {
    id: 's-14',
    categoryId: CategoryId.SENDERISMO,
    title: 'Charco Malo',
    location: 'Cortelazor',
    shortDescription: 'Ruta hacia una cascada natural y una poza rodeada de naturaleza exuberante.',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop',
    tags: ['Agua', 'Verano', 'Cascada'],
    rating: 4.6,
    hiking: { distanceKm: 4.5, timeMinutes: 80, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.9350, lng: -6.6390 }
  },
  {
    id: 's-15',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta del Camaleón',
    location: 'Isla Cristina',
    shortDescription: 'Sendero lineal por dunas y pinares costeros, hábitat del camaleón común.',
    imageUrl: 'https://images.unsplash.com/photo-1596726591244-90a4242e2a0f?q=80&w=600&auto=format&fit=crop',
    tags: ['Costa', 'Fauna', 'Familiar'],
    rating: 4.8,
    hiking: { distanceKm: 3.0, timeMinutes: 50, difficulty: 'Baja', circular: false },
    coordinates: { lat: 37.2020, lng: -7.3240 }
  },
  {
    id: 's-16',
    categoryId: CategoryId.SENDERISMO,
    title: 'Peña de Hierro',
    location: 'Nerva',
    shortDescription: 'Descubre el nacimiento del Río Tinto y la impresionante corta minera.',
    imageUrl: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=600&auto=format&fit=crop',
    tags: ['Minas', 'Paisaje', 'Historia'],
    rating: 4.8,
    hiking: { distanceKm: 2.5, timeMinutes: 45, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.7120, lng: -6.5500 }
  },
  {
    id: 's-17',
    categoryId: CategoryId.SENDERISMO,
    title: 'Camino de los Ángeles',
    location: 'Linares de la Sierra - Alájar',
    shortDescription: 'Sendero empedrado histórico que une dos de los pueblos más bonitos de la sierra.',
    imageUrl: 'https://images.unsplash.com/photo-1620311204026-613d0859c042?q=80&w=600&auto=format&fit=crop',
    tags: ['Pueblos', 'Historia', 'Empedrado'],
    rating: 4.9,
    hiking: { distanceKm: 4.0, timeMinutes: 85, difficulty: 'Media', circular: false },
    coordinates: { lat: 37.8860, lng: -6.6210 }
  },
  {
    id: 's-18',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta de los Castillos',
    location: 'Aroche - Cortegana',
    shortDescription: 'Recorrido exigente que conecta las fortalezas medievales de ambos municipios.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
    tags: ['Castillos', 'Historia', 'Larga Distancia'],
    rating: 4.7,
    hiking: { distanceKm: 13.0, timeMinutes: 240, difficulty: 'Alta', circular: false },
    coordinates: { lat: 37.9430, lng: -6.9530 }
  },
  {
    id: 's-19',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero Laguna de El Acebuche',
    location: 'Doñana',
    shortDescription: 'Observación de aves en los humedales más importantes de Europa.',
    imageUrl: 'https://images.unsplash.com/photo-1549643276-fbc2bd5f5249?q=80&w=600&auto=format&fit=crop',
    tags: ['Aves', 'Humedal', 'Accesible'],
    rating: 4.6,
    hiking: { distanceKm: 3.5, timeMinutes: 60, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.1080, lng: -6.5330 }
  },
  {
    id: 's-20',
    categoryId: CategoryId.SENDERISMO,
    title: 'Vía Verde Litoral',
    location: 'Ayamonte - Gibraleón',
    shortDescription: 'Antigua vía de tren que atraviesa marismas y campos de cultivo.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    tags: ['Ciclismo', 'Llano', 'Paisaje'],
    rating: 4.4,
    hiking: { distanceKm: 49.0, timeMinutes: 600, difficulty: 'Media', circular: false },
    coordinates: { lat: 37.2300, lng: -7.3700 }
  },
  {
    id: 's-21',
    categoryId: CategoryId.SENDERISMO,
    title: 'Subida a la Era',
    location: 'Castaño del Robledo',
    shortDescription: 'Punto estratégico para observar la magnitud del bosque serrano.',
    imageUrl: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=600&auto=format&fit=crop',
    tags: ['Vistas', 'Castaños', 'Breve'],
    rating: 4.5,
    hiking: { distanceKm: 2.0, timeMinutes: 40, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.8930, lng: -6.7050 }
  },
  {
    id: 's-22',
    categoryId: CategoryId.SENDERISMO,
    title: 'Ruta del Agua',
    location: 'Cañaveral de León',
    shortDescription: 'Un recorrido por huertas y acequias en torno a la famosa laguna artificial.',
    imageUrl: 'https://images.unsplash.com/photo-1533514114760-4389f572ae26?q=80&w=600&auto=format&fit=crop',
    tags: ['Agua', 'Huertas', 'Tranquilo'],
    rating: 4.6,
    hiking: { distanceKm: 6.0, timeMinutes: 110, difficulty: 'Baja', circular: true },
    coordinates: { lat: 38.0160, lng: -6.5250 }
  },
  {
    id: 's-23',
    categoryId: CategoryId.SENDERISMO,
    title: 'Sendero Ribera del Hierro',
    location: 'Santa Olalla del Cala',
    shortDescription: 'Adéntrate en la dehesa de encinas y alcornoques, paisaje típico onubense.',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop',
    tags: ['Dehesa', 'Ganadería', 'Naturaleza'],
    rating: 4.4,
    hiking: { distanceKm: 8.0, timeMinutes: 150, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.9400, lng: -6.2280 }
  },
  {
    id: 's-24',
    categoryId: CategoryId.SENDERISMO,
    title: 'Salinas del Duque',
    location: 'Ayamonte',
    shortDescription: 'Ruta por esteros y molinos de marea con gran valor ornitológico.',
    imageUrl: 'https://images.unsplash.com/photo-1615729947596-a59563d0095c?q=80&w=600&auto=format&fit=crop',
    tags: ['Marismas', 'Aves', 'Salinas'],
    rating: 4.7,
    hiking: { distanceKm: 5.5, timeMinutes: 100, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.2050, lng: -7.4080 }
  },
  {
    id: 's-25',
    categoryId: CategoryId.SENDERISMO,
    title: 'Dolmen de Soto',
    location: 'Trigueros',
    shortDescription: 'Breve paseo para visitar uno de los monumentos megalíticos más importantes de Europa.',
    imageUrl: 'https://images.unsplash.com/photo-1594383479679-9942a0376263?q=80&w=600&auto=format&fit=crop',
    tags: ['Prehistoria', 'Cultura', 'Fácil'],
    rating: 4.9,
    hiking: { distanceKm: 1.5, timeMinutes: 30, difficulty: 'Baja', circular: true },
    coordinates: { lat: 37.3526, lng: -6.7513 }
  },
  {
    id: 's-26',
    categoryId: CategoryId.SENDERISMO,
    title: 'Barranco de los Madroñeros',
    location: 'Alájar',
    shortDescription: 'Camino mágico hacia una aldea casi abandonada detenida en el tiempo.',
    imageUrl: 'https://images.unsplash.com/photo-1504280506508-46ab6d9dc320?q=80&w=600&auto=format&fit=crop',
    tags: ['Aldea', 'Historia', 'Bosque'],
    rating: 4.8,
    hiking: { distanceKm: 3.0, timeMinutes: 60, difficulty: 'Media', circular: true },
    coordinates: { lat: 37.8690, lng: -6.6580 }
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
    rating: 4.9,
    coordinates: { lat: 37.0658, lng: -6.6713 }
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
    rating: 4.5,
    coordinates: { lat: 37.0076, lng: -6.5501 }
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
    rating: 4.7,
    coordinates: { lat: 37.1264, lng: -6.8048 }
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
    rating: 4.8,
    coordinates: { lat: 37.2081, lng: -7.1124 }
  },
  {
    id: 'p-5',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de Los Enebrales',
    location: 'Punta Umbría',
    shortDescription: 'Paraje natural donde el bosque de pinos y enebros llega hasta la misma orilla.',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=600&auto=format&fit=crop',
    tags: ['Naturaleza', 'Bosque', 'Tranquilidad'],
    weather: { temp: 27, waterTemp: 21, condition: 'sunny', flag: 'green' },
    rating: 4.8,
    coordinates: { lat: 37.1945, lng: -6.9922 }
  },
  {
    id: 'p-6',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de Isla Canela',
    location: 'Ayamonte',
    shortDescription: 'Infinitos arenales dorados ideales para el kitesurf y atardeceres de película.',
    imageUrl: 'https://images.unsplash.com/photo-1534234828569-1f3553dadd1d?q=80&w=600&auto=format&fit=crop',
    tags: ['Deportes', 'Familiar', 'Atardecer'],
    weather: { temp: 26, waterTemp: 20, condition: 'windy', flag: 'yellow' },
    rating: 4.7,
    coordinates: { lat: 37.1750, lng: -7.3850 }
  },
  {
    id: 'p-7',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa del Espigón',
    location: 'Huelva Capital',
    shortDescription: 'Playa virgen ubicada en el Paraje Natural de Marismas del Odiel. Zona apta para mascotas.',
    imageUrl: 'https://images.unsplash.com/photo-1615729947596-a59563d0095c?q=80&w=600&auto=format&fit=crop',
    tags: ['Mascotas', 'Pesca', 'Virgen'],
    weather: { temp: 28, waterTemp: 22, condition: 'sunny', flag: 'green' },
    rating: 4.5,
    coordinates: { lat: 37.1420, lng: -6.9320 }
  },
  {
    id: 'p-8',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de Islantilla',
    location: 'Lepe / Isla Cristina',
    shortDescription: 'Certificada con Q de Calidad Turística, paseo marítimo animado y todos los servicios.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    tags: ['Servicios', 'Familiar', 'Accesible'],
    weather: { temp: 29, waterTemp: 23, condition: 'sunny', flag: 'green' },
    rating: 4.6,
    coordinates: { lat: 37.2025, lng: -7.2350 }
  },
  {
    id: 'p-9',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de La Antilla',
    location: 'Lepe',
    shortDescription: 'Playa familiar de tradición pesquera, famosa por sus barcas varadas en la arena.',
    imageUrl: 'https://images.unsplash.com/photo-1520116468816-95b69f847357?q=80&w=600&auto=format&fit=crop',
    tags: ['Tradición', 'Gastronomía', 'Familiar'],
    weather: { temp: 28, waterTemp: 22, condition: 'sunny', flag: 'green' },
    rating: 4.5,
    coordinates: { lat: 37.2060, lng: -7.2080 }
  },
  {
    id: 'p-10',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa Central',
    location: 'Isla Cristina',
    shortDescription: 'Playa urbana rodeada de un inmenso pinar, con fina arena dorada y aguas tranquilas.',
    imageUrl: 'https://images.unsplash.com/photo-1596726591244-90a4242e2a0f?q=80&w=600&auto=format&fit=crop',
    tags: ['Accesible', 'Bosque', 'Urbana'],
    weather: { temp: 27, waterTemp: 22, condition: 'cloudy', flag: 'green' },
    rating: 4.6,
    coordinates: { lat: 37.1970, lng: -7.3200 }
  },
  {
    id: 'p-11',
    categoryId: CategoryId.PLAYAS,
    title: 'Playa de Nueva Umbría',
    location: 'Lepe',
    shortDescription: '12 km de playa virgen y naturista, parte del Paraje Natural Marismas del Río Piedras.',
    imageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=600&auto=format&fit=crop',
    tags: ['Nudista', 'Virgen', 'Aislada'],
    weather: { temp: 28, waterTemp: 21, condition: 'sunny', flag: 'green' },
    rating: 4.8,
    coordinates: { lat: 37.2100, lng: -7.1500 }
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
    rating: 4.9,
    coordinates: { lat: 37.2476, lng: -6.9405 }
  },
  {
    id: 'pat-2',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Castillo de Niebla',
    location: 'Niebla',
    shortDescription: 'Fortaleza medieval rodeada de murallas almohades en perfecto estado.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
    tags: ['Medieval', 'Historia', 'Murallas'],
    rating: 4.6,
    coordinates: { lat: 37.3621, lng: -6.6778 }
  },
  {
    id: 'pat-3',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Monasterio de La Rábida',
    location: 'Palos de la Frontera',
    shortDescription: 'Lugar clave en el descubrimiento de América, donde Colón preparó su viaje.',
    imageUrl: 'https://images.unsplash.com/photo-1565033488426-5b4859f5b61e?q=80&w=600&auto=format&fit=crop',
    tags: ['Colón', 'Historia', 'Claustro'],
    rating: 4.8,
    coordinates: { lat: 37.2106, lng: -6.9248 }
  },
  {
    id: 'pat-4',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Mezquita de Almonaster',
    location: 'Almonaster la Real',
    shortDescription: 'La única mezquita rural conservada en España, una joya islámica en la sierra.',
    imageUrl: 'https://images.unsplash.com/photo-1582294432131-2856f6c9d09a?q=80&w=600&auto=format&fit=crop',
    tags: ['Único', 'Islámico', 'Paz'],
    rating: 4.9,
    coordinates: { lat: 37.8719, lng: -6.7865 }
  },
  {
    id: 'pat-5',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Barrio Reina Victoria',
    location: 'Huelva Capital',
    shortDescription: 'Conocido como Barrio Obrero, un pedazo de Inglaterra en Huelva con arquitectura victoriana única.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/barrio-obrero-huelva.jpg',
    tags: ['Inglés', 'Arquitectura', 'Urbano'],
    rating: 4.7,
    coordinates: { lat: 37.2662, lng: -6.9389 }
  },
  {
    id: 'pat-6',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Ciudad Romana de Turóbriga',
    location: 'Aroche',
    shortDescription: 'El único yacimiento romano visitable de la provincia, con foro, termas y casas señoriales.',
    imageUrl: 'https://images.unsplash.com/photo-1544911853-333e38712776?q=80&w=600&auto=format&fit=crop',
    tags: ['Roma', 'Arqueología', 'Historia'],
    rating: 4.5,
    coordinates: { lat: 37.9400, lng: -6.9530 }
  },
  {
    id: 'pat-7',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Monasterio de Santa Clara',
    location: 'Moguer',
    shortDescription: 'Monasterio gótico-mudéjar donde Colón veló armas a su regreso de América.',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-e877e87b7274?q=80&w=600&auto=format&fit=crop',
    tags: ['Colombino', 'Gótico', 'Religioso'],
    rating: 4.8,
    coordinates: { lat: 37.2740, lng: -6.8370 }
  },
  {
    id: 'pat-8',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Casa Colón',
    location: 'Huelva Capital',
    shortDescription: 'Antiguo Gran Hotel de estilo colonial inglés, sede del Festival de Cine y centro cultural.',
    imageUrl: 'https://images.unsplash.com/photo-1577033503551-7c9751e04134?q=80&w=600&auto=format&fit=crop',
    tags: ['Inglés', 'Cultura', 'Jardines'],
    rating: 4.7,
    coordinates: { lat: 37.2580, lng: -6.9470 }
  },
  {
    id: 'pat-9',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Castillo de Sancho IV',
    location: 'Cumbres Mayores',
    shortDescription: 'Imponente fortaleza de la Banda Gallega construida para defender la frontera con Portugal.',
    imageUrl: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?q=80&w=600&auto=format&fit=crop',
    tags: ['Fortaleza', 'Medieval', 'Frontera'],
    rating: 4.6,
    coordinates: { lat: 38.0640, lng: -6.6450 }
  },
  {
    id: 'pat-10',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Castillo de San Marcos',
    location: 'Sanlúcar de Guadiana',
    shortDescription: 'Vigía del Guadiana con vistas espectaculares a Alcoutim (Portugal) y el río.',
    imageUrl: 'https://images.unsplash.com/photo-1597334756855-325d774d8122?q=80&w=600&auto=format&fit=crop',
    tags: ['Vistas', 'Guadiana', 'Castillo'],
    rating: 4.8,
    coordinates: { lat: 37.4720, lng: -7.4640 }
  },
  {
    id: 'pat-11',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Casa Museo Zenobia y Juan Ramón',
    location: 'Moguer',
    shortDescription: 'Hogar del Premio Nobel de Literatura, conservando sus objetos personales y biblioteca.',
    imageUrl: 'https://images.unsplash.com/photo-1453894236894-0e3181825838?q=80&w=600&auto=format&fit=crop',
    tags: ['Literatura', 'Museo', 'Nobel'],
    rating: 4.7,
    coordinates: { lat: 37.2750, lng: -6.8360 }
  },
  {
    id: 'pat-12',
    categoryId: CategoryId.PATRIMONIO,
    title: 'Iglesia de San Jorge',
    location: 'Palos de la Frontera',
    shortDescription: 'Templo gótico-mudéjar donde se leyó la Real Pragmática para la entrega de carabelas a Colón.',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-e877e87b7274?q=80&w=600&auto=format&fit=crop',
    tags: ['Colombino', 'Historia', 'Monumento'],
    rating: 4.6,
    coordinates: { lat: 37.2280, lng: -6.8940 }
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
    rating: 5.0,
    coordinates: { lat: 37.8906, lng: -6.5619 }
  },
  {
    id: 'n-2',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Marismas del Odiel',
    location: 'Huelva',
    shortDescription: 'Reserva de la Biosfera y paraíso para la observación de flamencos y aves.',
    imageUrl: 'https://images.unsplash.com/photo-1444211353242-d59516625827?q=80&w=600&auto=format&fit=crop',
    tags: ['Aves', 'Flamencos', 'Biosfera'],
    rating: 4.7,
    coordinates: { lat: 37.2267, lng: -6.9744 }
  },
  {
    id: 'n-3',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Peña de Arias Montano',
    location: 'Alájar',
    shortDescription: 'Lugar místico con vistas espectaculares y la ermita de la Reina de los Ángeles.',
    imageUrl: 'https://images.unsplash.com/photo-1504280506508-46ab6d9dc320?q=80&w=600&auto=format&fit=crop',
    tags: ['Místico', 'Vistas', 'Relax'],
    rating: 4.8,
    coordinates: { lat: 37.8710, lng: -6.6660 }
  },
  // --- NUEVOS MONUMENTOS NATURALES ---
  {
    id: 'n-4',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Sierra Pelada y Rivera del Aserrador',
    location: 'Aroche / Cortegana',
    shortDescription: 'Zona de Protección Especial con la colonia de buitres negros más importante de Europa.',
    imageUrl: 'https://images.unsplash.com/photo-1563812803876-47b515d9703f?q=80&w=600&auto=format&fit=crop',
    tags: ['Buitres', 'Fauna', 'Sierra'],
    rating: 4.7,
    coordinates: { lat: 37.9500, lng: -6.9800 }
  },
  {
    id: 'n-5',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Laguna de las Madres y Palos',
    location: 'Moguer / Palos',
    shortDescription: 'Singular turbera formada por cuatro lagunas con una biodiversidad botánica única.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
    tags: ['Turbera', 'Botánica', 'Paz'],
    rating: 4.5,
    coordinates: { lat: 37.1550, lng: -6.8650 }
  },
  {
    id: 'n-6',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Parque Moret',
    location: 'Huelva Capital',
    shortDescription: 'El gran pulmón verde de Huelva. Más de 70 hectáreas de naturaleza urbana y yacimientos.',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=600&auto=format&fit=crop',
    tags: ['Urbano', 'Pulmón', 'Picnic'],
    rating: 4.8,
    coordinates: { lat: 37.2750, lng: -6.9350 }
  },
  {
    id: 'n-7',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Paraje Natural Marismas del Río Piedras',
    location: 'Cartaya / Lepe',
    shortDescription: 'Un estuario de gran belleza paisajística formado por la aportación de materiales del río.',
    imageUrl: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=600&auto=format&fit=crop',
    tags: ['Estuario', 'Mareas', 'Aves'],
    rating: 4.8,
    coordinates: { lat: 37.2160, lng: -7.1330 }
  },
  {
    id: 'n-8',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Pino Centenario del Parador',
    location: 'Mazagón',
    shortDescription: 'Monumento Natural de tipo biótico. Un pino piñonero de porte majestuoso junto al mar.',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=600&auto=format&fit=crop',
    tags: ['Árbol Singular', 'Historia', 'Naturaleza'],
    rating: 4.6,
    coordinates: { lat: 37.1200, lng: -6.8200 }
  },
  {
    id: 'n-9',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Rivera de Huelva',
    location: 'Sierra de Aracena',
    shortDescription: 'Cauce fluvial de gran valor ecológico que serpentea por el parque natural creando paisajes de ribera.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
    tags: ['Río', 'Agua', 'Frescor'],
    rating: 4.7,
    coordinates: { lat: 37.9000, lng: -6.4000 }
  },
  {
    id: 'n-10',
    categoryId: CategoryId.MONUMENTOS_NATURALES,
    title: 'Dehesa de Campofrío',
    location: 'Campofrío',
    shortDescription: 'Ejemplo perfecto de bosque mediterráneo y cría del cerdo ibérico en libertad.',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600&auto=format&fit=crop',
    tags: ['Dehesa', 'Ibérico', 'Tradición'],
    rating: 4.5,
    coordinates: { lat: 37.7600, lng: -6.5500 }
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
    rating: 4.6,
    coordinates: { lat: 37.3396, lng: -6.5369 }
  },
  {
    id: 'g-2',
    categoryId: CategoryId.GASTRONOMIA,
    title: 'Ruta del Jamón',
    location: 'Jabugo',
    shortDescription: 'Visita secaderos y degusta el mejor jamón 100% ibérico de bellota del mundo.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop',
    tags: ['Gourmet', 'Ibérico', 'Delicioso'],
    rating: 5.0,
    coordinates: { lat: 37.9255, lng: -6.7300 }
  },
  {
    id: 'g-3',
    categoryId: CategoryId.GASTRONOMIA,
    title: 'Mercado del Carmen',
    location: 'Huelva Capital',
    shortDescription: 'El templo del marisco fresco: gamba blanca, coquinas y pescado de la costa.',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop',
    tags: ['Marisco', 'Fresco', 'Local'],
    rating: 4.8,
    coordinates: { lat: 37.2530, lng: -6.9530 }
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
    rating: 4.8,
    coordinates: { lat: 37.3621, lng: -6.6778 }
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
    rating: 4.5,
    coordinates: { lat: 37.1818, lng: -6.9656 }
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
    rating: 4.9,
    coordinates: { lat: 37.1314, lng: -6.4851 }
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
    rating: 4.9,
    coordinates: { lat: 37.9142, lng: -6.9189 }
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
    rating: 4.9,
    coordinates: { lat: 37.2150, lng: -7.4080 }
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
    rating: 4.8,
    coordinates: { lat: 37.8719, lng: -6.7865 }
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
    rating: 4.9,
    coordinates: { lat: 37.1314, lng: -6.4851 }
  },
  {
    id: 'a-15',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval 2026 Valverde del Camino',
    location: 'Valverde del Camino',
    shortDescription: 'Del 31 de enero al 22 de febrero. Programación especial en el Teatro Puerta del Andévalo.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-18-at-16.48.33.jpeg',
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
    rating: 4.8,
    coordinates: { lat: 37.2580, lng: -6.9470 }
  },
  {
    id: 'a-17',
    categoryId: CategoryId.AGENDA,
    title: 'Carnaval de Isla Cristina 2026',
    location: 'Isla Cristina',
    shortDescription: 'Fiesta de Interés Turístico de Andalucía. Del 23 de enero al 22 de febrero. Disfruta del concurso de agrupaciones y el gran desfile.',
    imageUrl: 'https://solonet.es/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-20-at-15.16.54.jpeg',
    tags: ['Carnaval', 'Fiesta', 'Interés Turístico'],
    date: '23 Ene - 22 Feb 2026',
    rating: 4.9,
    coordinates: { lat: 37.2000, lng: -7.3200 }
  },
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

export { CATEGORIES, BLOG_POSTS, MOCK_PLACES };
