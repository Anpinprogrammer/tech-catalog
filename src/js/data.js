// ============================================================
// NexaTech — Informacion Servicios 
// ============================================================

const CATEGORIES = ['Todos', 'Web', 'Móvil', 'Automatización', 'IA & Data', 'Cloud', 'Seguridad', 'Consultoría'];

const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'Desarrollo Web a Medida',
    category: 'Web',
    price: 'Desde $2,500 USD',
    shortDesc: 'Aplicaciones web modernas, escalables y de alto rendimiento con las últimas tecnologías.',
    description: 'Construimos aplicaciones web empresariales utilizando React, Vue, Angular o tecnologías puras. Desde landing pages de alto impacto hasta plataformas SaaS complejas, cada proyecto es diseñado con arquitectura sólida, UX excepcional y rendimiento optimizado. Incluye diseño responsivo, integración de APIs, autenticación segura y panel de administración.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
    tags: ['React', 'Node.js', 'API REST', 'Responsive', 'SEO'],
    featured: true
  },
  {
    id: 2,
    name: 'Apps Móviles Nativas & Híbridas',
    category: 'Móvil',
    price: 'Desde $3,800 USD',
    shortDesc: 'Aplicaciones iOS y Android con experiencia de usuario fluida y funcionalidades avanzadas.',
    description: 'Desarrollamos aplicaciones móviles para iOS y Android usando Flutter, React Native o Swift/Kotlin nativo. Cada app es optimizada para rendimiento, batería y experiencia del usuario. Integramos pagos, geolocalización, notificaciones push, cámara, biometría y más. Publicación incluida en App Store y Google Play.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    tags: ['Flutter', 'React Native', 'iOS', 'Android', 'Push Notifications'],
    featured: true
  },
  {
    id: 3,
    name: 'Automatización de Procesos (RPA)',
    category: 'Automatización',
    price: 'Desde $1,800 USD',
    shortDesc: 'Elimina tareas repetitivas con robots de software que trabajan 24/7 sin errores.',
    description: 'Implementamos soluciones RPA con UiPath, Power Automate y Python para automatizar procesos empresariales: facturación, reportes, gestión de datos, correos automáticos, integración de sistemas legacy. Reducimos costos operativos hasta un 70% y eliminamos errores humanos. Incluye análisis de procesos, desarrollo, pruebas y capacitación.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    tags: ['RPA', 'UiPath', 'Python', 'Power Automate', 'Bots'],
    featured: true
  },
  {
    id: 4,
    name: 'Inteligencia Artificial & Machine Learning',
    category: 'IA & Data',
    price: 'Desde $4,500 USD',
    shortDesc: 'Modelos predictivos, procesamiento de lenguaje natural y visión por computadora.',
    description: 'Desarrollamos soluciones de IA personalizadas: chatbots inteligentes con LLMs, modelos de predicción y clasificación, análisis de sentimientos, reconocimiento de imágenes y documentos, sistemas de recomendación. Utilizamos TensorFlow, PyTorch, LangChain y OpenAI API. Transformamos datos en ventajas competitivas reales.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    tags: ['Machine Learning', 'NLP', 'Python', 'TensorFlow', 'LLMs'],
    featured: true
  },
  {
    id: 5,
    name: 'Cloud Migration & DevOps',
    category: 'Cloud',
    price: 'Desde $2,200 USD',
    shortDesc: 'Migra tu infraestructura a la nube y optimiza tu pipeline de desarrollo.',
    description: 'Diseñamos e implementamos arquitecturas cloud en AWS, GCP y Azure. Configuramos pipelines CI/CD con GitHub Actions, Jenkins o GitLab. Containerización con Docker y orquestación con Kubernetes. Monitoreo con Grafana/Prometheus. Reducimos time-to-market y costos de infraestructura con escalabilidad automática.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    featured: false
  },
  {
    id: 6,
    name: 'Auditoría & Ciberseguridad',
    category: 'Seguridad',
    price: 'Desde $1,500 USD',
    shortDesc: 'Protege tu empresa con pruebas de penetración, auditorías y hardening de sistemas.',
    description: 'Realizamos auditorías de seguridad completas: pentesting web y móvil, análisis de vulnerabilidades, revisión de código, configuración segura de infraestructura. Certificación OWASP Top 10, ISO 27001 y PCI-DSS. Incluye informe ejecutivo detallado con hoja de ruta de remediación priorizada por riesgo.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    tags: ['Pentesting', 'OWASP', 'ISO 27001', 'SIEM', 'Zero Trust'],
    featured: false
  },
  {
    id: 7,
    name: 'E-commerce & Marketplaces',
    category: 'Web',
    price: 'Desde $3,200 USD',
    shortDesc: 'Tiendas online de alto rendimiento con pasarelas de pago y gestión de inventario.',
    description: 'Desarrollamos plataformas de comercio electrónico a medida o sobre WooCommerce, Shopify y Magento. Integración con pasarelas de pago locales e internacionales (Wompi, PayU, Stripe, PayPal). Gestión de inventario, cupones, envíos, reportes avanzados y remarketing. Optimización de conversiones con A/B testing incluido.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    tags: ['Shopify', 'WooCommerce', 'Stripe', 'Magento', 'CRO'],
    featured: false
  },
  {
    id: 8,
    name: 'Data Analytics & Business Intelligence',
    category: 'IA & Data',
    price: 'Desde $2,800 USD',
    shortDesc: 'Dashboards interactivos y análisis profundo para decisiones basadas en datos.',
    description: 'Construimos pipelines de datos y dashboards ejecutivos con Power BI, Tableau y Metabase. ETL con Apache Airflow y dbt. Data warehouse en Snowflake, BigQuery o Redshift. Desde la recolección de datos hasta la visualización en tiempo real. Transforma tu empresa en una organización data-driven con insights accionables.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    tags: ['Power BI', 'Tableau', 'BigQuery', 'ETL', 'Data Warehouse'],
    featured: false
  },
  {
    id: 9,
    name: 'Consultoría Tecnológica & CTO as a Service',
    category: 'Consultoría',
    price: 'Desde $1,200 USD',
    shortDesc: 'Dirección tecnológica estratégica sin necesidad de contratar un CTO de tiempo completo.',
    description: 'Proveemos liderazgo tecnológico on-demand: definición de arquitectura, selección de tecnologías, gestión de equipos de desarrollo, revisiones de código, evaluación de proveedores y roadmap tecnológico. Ideal para startups y empresas en crecimiento que necesitan experiencia senior sin el costo de un ejecutivo de tiempo completo.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    tags: ['CTO', 'Arquitectura', 'Estrategia', 'Scrum', 'Roadmap'],
    featured: false
  },
  {
    id: 10,
    name: 'Integración de APIs & Microservicios',
    category: 'Web',
    price: 'Desde $1,600 USD',
    shortDesc: 'Conecta tus sistemas con APIs robustas y arquitecturas de microservicios escalables.',
    description: 'Diseñamos y desarrollamos APIs RESTful y GraphQL de alto rendimiento. Arquitecturas de microservicios con comunicación via gRPC o eventos (Kafka, RabbitMQ). Integraciones con terceros: CRMs, ERPs, plataformas de pago, logística y más. Documentación con Swagger/OpenAPI y monitoreo con métricas en tiempo real.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    tags: ['REST API', 'GraphQL', 'Microservices', 'Kafka', 'gRPC'],
    featured: false
  },
  {
    id: 11,
    name: 'Desarrollo de Chatbots & Asistentes IA',
    category: 'IA & Data',
    price: 'Desde $2,000 USD',
    shortDesc: 'Chatbots inteligentes para atención al cliente, ventas y procesos internos.',
    description: 'Creamos asistentes conversacionales inteligentes con GPT-4, Claude y Gemini. Integración en WhatsApp Business, Telegram, Slack, web y apps móviles. RAG (Retrieval-Augmented Generation) para respuestas basadas en tu documentación. Gestión de conversaciones, escalamiento a humanos, analytics y mejora continua del modelo.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80',
    tags: ['GPT-4', 'WhatsApp', 'RAG', 'LangChain', 'NLP'],
    featured: false
  },
  {
    id: 12,
    name: 'Mantenimiento & Soporte TI',
    category: 'Consultoría',
    price: 'Desde $800 USD/mes',
    shortDesc: 'Mantén tus sistemas actualizados, seguros y funcionando al 100% con soporte proactivo.',
    description: 'Servicio de mantenimiento preventivo y correctivo para aplicaciones web, móviles e infraestructura. Actualizaciones de seguridad, optimización de rendimiento, monitoreo 24/7 con alertas, backups automáticos, soporte técnico con SLA garantizado. Plan mensual que incluye horas de desarrollo para mejoras continuas.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    tags: ['Soporte 24/7', 'Monitoring', 'SLA', 'Updates', 'Backup'],
    featured: false
  }
];

function getServices() {
  const stored = localStorage.getItem('nexatech_services');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  localStorage.setItem('nexatech_services', JSON.stringify(DEFAULT_SERVICES));
  return DEFAULT_SERVICES;
}

function saveServices(services) {
  localStorage.setItem('nexatech_services', JSON.stringify(services));
}

function getFavorites() {
  const stored = localStorage.getItem('nexatech_favorites');
  if (stored) {
    try { return JSON.parse(stored); } catch(e) {}
  }
  return [];
}

function saveFavorites(favs) {
  localStorage.setItem('nexatech_favorites', JSON.stringify(favs));
}

function toggleFavorite(serviceId) {
  let favs = getFavorites();
  const idx = favs.indexOf(serviceId);
  if (idx === -1) {
    favs.push(serviceId);
    showToast('Agregado a favoritos ⭐', 'success');
  } else {
    favs.splice(idx, 1);
    showToast('Eliminado de favoritos', 'info');
  }
  saveFavorites(favs);
  updateFavBadge();
  return favs;
}

function isFavorite(serviceId) {
  return getFavorites().includes(serviceId);
}

function updateFavBadge() {
  const badge = document.getElementById('favBadge');
  if (badge) badge.textContent = getFavorites().length;
}
