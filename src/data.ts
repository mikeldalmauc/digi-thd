export type CardType = 'thd' | 'case';

export interface CardData {
  id: string;
  type: CardType;
  title: string;
  description: string;
  color: 'blue' | 'gray';
  categoryId?: string;
  thdId?: string; // Valid for cases to map to THD
}

export const THD_CARDS: CardData[] = [
  {
    id: 'thd-1',
    type: 'thd',
    title: 'Gemelo Digital',
    description: 'Réplica virtual exacta de un producto o sistema físico que se alimenta de datos de sensores en tiempo real para simular comportamientos.',
    color: 'blue'
  },
  {
    id: 'thd-2',
    type: 'thd',
    title: 'Blockchain',
    description: 'Base de datos descentralizada e inmutable donde la información se registra en bloques cifrados y requiere consenso para ser modificada, garantizando trazabilidad y confianza.',
    color: 'blue'
  },
  {
    id: 'thd-3',
    type: 'thd',
    title: 'Internet de las Cosas (IoT)',
    description: 'Red de objetos físicos con sensores y conectividad que recogen y envían datos por internet para monitorizar y optimizar procesos.',
    color: 'blue'
  },
  {
    id: 'thd-4',
    type: 'thd',
    title: 'Inteligencia Artificial (IA)',
    description: 'Sistemas informáticos que aprenden de datos (Machine Learning) para realizar tareas como reconocimiento de patrones, toma de decisiones o predicciones.',
    color: 'blue'
  },
  {
    id: 'thd-5',
    type: 'thd',
    title: 'Fabricación Aditiva',
    description: 'Proceso de construcción de objetos físicos añadiendo material capa a capa a partir de un diseño digital tridimensional, reduciendo desperdicios.',
    color: 'blue'
  },
  {
    id: 'thd-6',
    type: 'thd',
    title: 'Edge Computing',
    description: 'Procesamiento de datos en el "borde" (cerca de la fuente) para reducir la latencia, ahorrar ancho de banda y permitir el funcionamiento sin internet.',
    color: 'blue'
  }
];

export const CASE_CARDS: CardData[] = [
  // Gemelo Digital
  { id: 'c-1-1', type: 'case', thdId: 'thd-1', categoryId: 'industria', title: 'Réplica de Línea de Montaje', description: 'Réplica de línea de montaje industrial.', color: 'gray' },
  { id: 'c-1-2', type: 'case', thdId: 'thd-1', categoryId: 'sanidad', title: 'Simulación Quirúrgica', description: 'Simulación de cirugía compleja.', color: 'gray' },
  { id: 'c-1-3', type: 'case', thdId: 'thd-1', categoryId: 'industria', title: 'Virtual Commissioning', description: 'Virtual Commissioning (puesta en marcha virtual).', color: 'gray' },
  { id: 'c-1-4', type: 'case', thdId: 'thd-1', categoryId: 'infraestructura', title: 'Mantenimiento Predictivo', description: 'Mantenimiento predictivo de puentes.', color: 'gray' },
  { id: 'c-1-5', type: 'case', thdId: 'thd-1', categoryId: 'educacion', title: 'Formación de Riesgos', description: 'Formación en entornos peligrosos simulados.', color: 'gray' },

  // Blockchain
  { id: 'c-2-1', type: 'case', thdId: 'thd-2', categoryId: 'comercio', title: 'Trazabilidad Alimentaria', description: 'Trazabilidad alimentaria con código QR.', color: 'gray' },
  { id: 'c-2-2', type: 'case', thdId: 'thd-2', categoryId: 'energia', title: 'Certificados Renovables', description: 'Certificados de energía 100% renovable.', color: 'gray' },
  { id: 'c-2-3', type: 'case', thdId: 'thd-2', categoryId: 'transporte', title: 'Historial de Aviones', description: 'Historial inmutable de mantenimiento de aviones.', color: 'gray' },
  { id: 'c-2-4', type: 'case', thdId: 'thd-2', categoryId: 'finanzas', title: 'Contratos Inteligentes', description: 'Contratos inteligentes (Smart Contracts) para pagos automáticos.', color: 'gray' },
  { id: 'c-2-5', type: 'case', thdId: 'thd-2', categoryId: 'educacion', title: 'Verificación de Títulos', description: 'Verificación segura de títulos académicos.', color: 'gray' },

  // IoT
  { id: 'c-3-1', type: 'case', thdId: 'thd-3', categoryId: 'agricultura', title: 'Vallas Virtuales', description: 'Vallas virtuales para ganado con GPS.', color: 'gray' },
  { id: 'c-3-2', type: 'case', thdId: 'thd-3', categoryId: 'agricultura', title: 'Riego con Sensores', description: 'Sensores de humedad para riego automático.', color: 'gray' },
  { id: 'c-3-3', type: 'case', thdId: 'thd-3', categoryId: 'sanidad', title: 'Monitorización UCI', description: 'Monitorización constante de constantes vitales en UCI.', color: 'gray' },
  { id: 'c-3-4', type: 'case', thdId: 'thd-3', categoryId: 'salud', title: 'Rendimiento Deportivo', description: 'Seguimiento de rendimiento deportivo con relojes inteligentes.', color: 'gray' },
  { id: 'c-3-5', type: 'case', thdId: 'thd-3', categoryId: 'ciudad', title: 'Control de Contenedores', description: 'Control de llenado de contenedores urbanos.', color: 'gray' },

  // IA
  { id: 'c-4-1', type: 'case', thdId: 'thd-4', categoryId: 'entretenimiento', title: 'Recomendaciones Streaming', description: 'Recomendaciones personalizadas en plataformas de streaming.', color: 'gray' },
  { id: 'c-4-2', type: 'case', thdId: 'thd-4', categoryId: 'sanidad', title: 'Diagnóstico Tumoral', description: 'Diagnóstico de tumores por visión artificial.', color: 'gray' },
  { id: 'c-4-3', type: 'case', thdId: 'thd-4', categoryId: 'servicios', title: 'Chatbots de Atención', description: 'Chatbots de atención al cliente.', color: 'gray' },
  { id: 'c-4-4', type: 'case', thdId: 'thd-4', categoryId: 'industria', title: 'Detección de Defectos', description: 'Detección automática de defectos de calidad en fábrica.', color: 'gray' },
  { id: 'c-4-5', type: 'case', thdId: 'thd-4', categoryId: 'finanzas', title: 'Análisis de Riesgos', description: 'Análisis de riesgos financieros y detección de fraudes.', color: 'gray' },

  // Fabricación Aditiva
  { id: 'c-5-1', type: 'case', thdId: 'thd-5', categoryId: 'sanidad', title: 'Prótesis a Medida', description: 'Prótesis e implantes médicos a medida.', color: 'gray' },
  { id: 'c-5-2', type: 'case', thdId: 'thd-5', categoryId: 'aeronautica', title: 'Piezas Aeronáuticas', description: 'Piezas de motor aeronáutico con canales internos ligeros.', color: 'gray' },
  { id: 'c-5-3', type: 'case', thdId: 'thd-5', categoryId: 'industria', title: 'Almacén Digital', description: 'Almacén digital de repuestos antiguos para impresión bajo demanda.', color: 'gray' },
  { id: 'c-5-4', type: 'case', thdId: 'thd-5', categoryId: 'salud', title: 'Monturas Personalizadas', description: 'Monturas de gafas personalizadas.', color: 'gray' },
  { id: 'c-5-5', type: 'case', thdId: 'thd-5', categoryId: 'diseno', title: 'Prototipado Nocturno', description: 'Prototipado rápido de productos en una noche.', color: 'gray' },

  // Edge Computing
  { id: 'c-6-1', type: 'case', thdId: 'thd-6', categoryId: 'emergencias', title: 'Dron de Rescate', description: 'Dron de rescate que procesa imágenes localmente.', color: 'gray' },
  { id: 'c-6-2', type: 'case', thdId: 'thd-6', categoryId: 'transporte', title: 'Frenado de Emergencia', description: 'Frenado de emergencia en vehículos autónomos.', color: 'gray' },
  { id: 'c-6-3', type: 'case', thdId: 'thd-6', categoryId: 'industria', title: 'Control por Visión', description: 'Control de calidad por visión artificial en la propia cámara.', color: 'gray' },
  { id: 'c-6-4', type: 'case', thdId: 'thd-6', categoryId: 'agricultura', title: 'Riego Sin Cobertura', description: 'Riego automático en zonas rurales sin cobertura.', color: 'gray' },
  { id: 'c-6-5', type: 'case', thdId: 'thd-6', categoryId: 'industria', title: 'Parada de Seguridad', description: 'Parada instantánea de seguridad en brazos robóticos colaborativos.', color: 'gray' }
];

export const getCardById = (id: string): CardData | undefined => {
  return [...THD_CARDS, ...CASE_CARDS].find(c => c.id === id);
};
