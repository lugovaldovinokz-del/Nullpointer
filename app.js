/* ==========================================================================
   AVISO DE COOKIES Y TÉRMINOS DE PRIVACIDAD DESPUÉS DE LA INTRO DEL LOGO
   ========================================================================== */
function initCookieAndPrivacyBanner() {
    const savedConsent = localStorage.getItem("np_privacyConsent");
    if (savedConsent) return;

    const overlay = document.createElement("aside");
    overlay.id = "cookie-consent-overlay";
    overlay.className = "cookie-consent-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "cookie-consent-title");

    overlay.innerHTML = `
        <div class="cookie-consent-box">
            <div class="cookie-consent-header">
                <h2 id="cookie-consent-title">🍪 Cookies y Términos de Privacidad — NullPointer</h2>
                <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan);">// PRIVACY_GUARD v2.6</span>
            </div>
            <p>
                En <strong>NullPointer Ergonomics</strong> utilizamos cookies esenciales y almacenamiento local para recordar tu carrito, proteger tu cuenta y validar direcciones de envío. Al continuar, aceptas nuestras
                <a id="link-open-privacy-terms" role="button" tabindex="0">Políticas de Cookies y Términos de Privacidad</a>.
            </p>
            <div class="cookie-options-panel" id="cookie-custom-panel" style="display: none;">
                <label class="cookie-check-row">
                    <span>🔒 <strong>Cookies Esenciales</strong> (Carrito, sesión y seguridad — obligatorias)</span>
                    <input type="checkbox" checked disabled>
                </label>
                <label class="cookie-check-row">
                    <span>📍 <strong>Cookies de Preferencias y Envío</strong> (Autoguardado de dirección y CP)</span>
                    <input type="checkbox" id="chk-cookie-prefs" checked>
                </label>
                <label class="cookie-check-row">
                    <span>📊 <strong>Cookies Analíticas</strong> (Mejora de catálogo ergonómico)</span>
                    <input type="checkbox" id="chk-cookie-analytics" checked>
                </label>
            </div>
            <div class="cookie-actions">
                <button type="button" class="btn-neon-blue" id="btn-cookie-config">Configurar</button>
                <button type="button" class="btn-neon-pink" id="btn-cookie-essential">Solo Esenciales</button>
                <button type="button" class="btn-neon-yellow" id="btn-cookie-accept">✓ Aceptar Todo y Continuar</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    const saveAndCloseConsent = (prefs) => {
        localStorage.setItem("np_privacyConsent", JSON.stringify({
            acceptedAt: new Date().toISOString(),
            ...prefs
        }));
        overlay.classList.remove("visible");
        setTimeout(() => overlay.remove(), 350);
    };

    overlay.querySelector("#btn-cookie-config").addEventListener("click", () => {
        const panel = overlay.querySelector("#cookie-custom-panel");
        panel.style.display = panel.style.display === "none" ? "flex" : "none";
    });

    overlay.querySelector("#btn-cookie-essential").addEventListener("click", () => {
        saveAndCloseConsent({ essential: true, preferences: false, analytics: false });
    });

    overlay.querySelector("#btn-cookie-accept").addEventListener("click", () => {
        const prefs = overlay.querySelector("#chk-cookie-prefs")?.checked ?? true;
        const analytics = overlay.querySelector("#chk-cookie-analytics")?.checked ?? true;
        saveAndCloseConsent({ essential: true, preferences: prefs, analytics });
    });

    overlay.querySelector("#link-open-privacy-terms").addEventListener("click", () => {
        showPrivacyPolicyModal();
    });

    const showAfterIntro = () => {
        const hasSplash = document.querySelector(".np-welcome-splash, #preloader");
        const delayMs = hasSplash ? 1700 : 250;
        setTimeout(() => {
            overlay.classList.add("visible");
        }, delayMs);
    };

    if (document.readyState === "complete") {
        showAfterIntro();
    } else {
        window.addEventListener("load", showAfterIntro);
    }
}

window.showPrivacyPolicyModal = function() {
    let privacyDialog = document.getElementById("modal-privacy-terms");
    if (!privacyDialog) {
        privacyDialog = document.createElement("dialog");
        privacyDialog.id = "modal-privacy-terms";
        privacyDialog.style.zIndex = "10000";
        privacyDialog.innerHTML = `
            <header>
                <h3>Política de Privacidad y Uso de Cookies</h3>
                <button type="button" class="btn-neon-pink" onclick="closeModal('modal-privacy-terms')">✕</button>
            </header>
            <section style="display:flex; flex-direction:column; gap:0.85rem; font-size:0.88rem; color:var(--text-main);">
                <p><strong style="color:var(--neon-yellow);">1. Responsable de los Datos:</strong> NullPointer Ergonomics S.A. resguarda tus datos personales de compra, envío y facturación únicamente para procesar tus pedidos y generar tus tickets oficiales.</p>
                <p><strong style="color:var(--neon-cyan);">2. Uso de Cookies y Almacenamiento Local:</strong> Empleamos cookies técnicas para mantener activos los artículos de tu carrito, validar códigos postales reales y conservar tu sesión iniciada.</p>
                <p><strong style="color:var(--neon-green);">3. Protección de Pagos:</strong> Los datos de tarjeta, SPEI, PayPal y referencias OXXO Pay se procesan bajo estándares cifrados y nunca se comparten con terceros ajenos a la entrega.</p>
                <p><strong style="color:var(--neon-magenta);">4. Derechos ARCO:</strong> Puedes eliminar tu historial de direcciones y pedidos en cualquier momento cerrando sesión desde tu perfil.</p>
                <button type="button" class="btn-neon-yellow" onclick="closeModal('modal-privacy-terms')">Entendido</button>
            </section>
        `;
        document.body.appendChild(privacyDialog);
    }
    privacyDialog.showModal();
};

/* ==========================================================================
   BASE DE DATOS NULLPOINTER: PRODUCTOS CON IMÁGENES REALES, TALLAS Y SERVICIOS
   ========================================================================== */
const PRODUCTS = [
    {
        id: 1,
        name: "Teclado Mecánico Split Ergo-Neon",
        category: "ergonomia",
        price: 2450,
        image: "https://m.media-amazon.com/images/I/61Tp6r+yOuL._AC_SL1500_.jpg",
        colors: ["Azul Pastel", "Rosa Pastel", "Amarillo Pastel", "Verde Menta", "Lila Pastel", "Negro Mate"],
        shortDesc: "Diseño dividido que alinea tus hombros y evita la desviación cubital.",
        specs: "Switches táctiles silenciosos, inclinación negativa ajustable de -5° a +10°, retroiluminación RGB programable y reposamuñecas magnético."
    },
    {
        id: 2,
        name: "Playera Postural Tensor-Back",
        category: "ropa",
        price: 1190,
        image: "https://tse1.mm.bing.net/th/id/OIP.B0CmNeTZoSpXkbQBxFiYRQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        colors: ["Negro / Rosa Pastel", "Negro / Azul Pastel", "Gris Carbón / Amarillo Pastel", "Lila Pastel", "Verde Menta", "Blanco Perla"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        shortDesc: "Bandas elásticas integradas que corrigen la postura cervical mientras programas.",
        specs: "Tejido transpirable de algodón orgánico y elastano con tensores dorsales invisibles y detalles reflejantes pastel."
    },
    {
        id: 3,
        name: "Mouse Vertical Anti-Túnel Carpiano",
        category: "ergonomia",
        price: 890,
        image: "https://m.media-amazon.com/images/I/51QLsIiXYJL._AC_SY300_SX300_QL70_ML2_.jpg",
        colors: ["Azul Pastel", "Rosa Pastel", "Amarillo Pastel", "Verde Menta", "Lila Pastel", "Negro Mate"],
        shortDesc: "Ángulo de 57° que elimina la presión en el nervio mediano de la muñeca.",
        specs: "Sensor óptico de 4000 DPI, 6 botones programables para macros de IDE y batería recargable USB-C."
    },
    {
        id: 4,
        name: "Lentes Cyber-Shield Filtro Luz Azul",
        category: "accesorios",
        price: 750,
        image: "https://m.media-amazon.com/images/I/41r2C+qb+mL._AC_SX679_.jpg",
        colors: ["Titanio Negro", "Azul Pastel", "Rosa Pastel", "Amarillo Translúcido", "Verde Menta", "Cristal Lila"],
        shortDesc: "Bloquea el 95% de luz azul nociva para evitar fatiga ocular y mejorar el sueño.",
        specs: "Armazón ultraligero de titanio, antirreflejante ámbar suave y protección UV400 para maratones de código."
    },
    {
        id: 5,
        name: "Guantes de Compresión Térmica Dev",
        category: "ropa",
        price: 420,
        image: "https://m.media-amazon.com/images/I/61PxLdK1suL._AC_SX679_.jpg",
        colors: ["Negro / Azul Pastel", "Negro / Rosa Pastel", "Gris / Verde Menta", "Lila / Amarillo Pastel"],
        sizes: ["S / M (Palma 7-8.5 cm)", "L / XL (Palma 8.5-10 cm)"],
        shortDesc: "Mejoran la circulación en dedos y muñecas durante sesiones nocturnas de código.",
        specs: "Diseño sin punta de dedos para máxima precisión al teclear, costuras planas y compresión graduada."
    },
    {
        id: 6,
        name: "Cojín Lumbar Memory-Foam Pro",
        category: "ergonomia",
        price: 980,
        image: "https://m.media-amazon.com/images/I/712PdsfwzhL._AC_SY300_SX300_QL70_ML2_.jpg",
        colors: ["Ribete Rosa Pastel", "Ribete Azul Pastel", "Ribete Amarillo Pastel", "Ribete Verde Menta", "Lila Completo"],
        shortDesc: "Soporte ortopédico de alta densidad para sillas de oficina o gaming.",
        specs: "Espuma viscoelástica con gel refrigerante, funda lavable transpirable y correas dobles de ajuste."
    },
    {
        id: 7,
        name: "Playera Compresión Postural Tech-Dry",
        category: "ropa",
        price: 680,
        image: "https://tse3.mm.bing.net/th/id/OIP.edSQ39mFZ-wPUWjBkPHScAHaHa?r=0&w=1920&h=1920&rs=1&pid=ImgDetMain&o=7&rm=3",
        colors: ["Negro / Amarillo Pastel", "Azul Pastel", "Rosa Pastel", "Verde Menta", "Lila Pastel", "Blanco Perla"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        shortDesc: "Camiseta ergonómica de ajuste anatómico que retrae ligeramente los hombros.",
        specs: "Microfibra termorreguladora anti-sudor con paneles de tensión escapular para evitar encorvamiento."
    },
    {
        id: 8,
        name: "Soporte Elevador de Laptop Articulado",
        category: "ergonomia",
        price: 1120,
        image: "https://http2.mlstatic.com/D_NQ_NP_733348-MLM69460175256_052023-O-soporte-laptop-premium-deli-elevador-ajustable-base-metal.webp",
        colors: ["Aluminio Negro", "Azul Pastel", "Rosa Pastel", "Verde Menta", "Amarillo Pastel", "Plata Satinado"],
        shortDesc: "Eleva tu pantalla a la altura exacta de tus ojos para prevenir fatiga cervical.",
        specs: "Aleación de aluminio aeroespacial, ajuste de altura hasta 30 cm y ventilación pasiva."
    },
    {
        id: 9,
        name: "Reposapiés Basculante Acupresión",
        category: "ergonomia",
        price: 640,
        image: "https://thumb.pccomponentes.com/w-530-530/articles/1081/10818633/182-iggual-rp3-reposapies-ajustable-con-bultos-de-acupresion-negro.jpg",
        colors: ["Negro / Azul Pastel", "Negro / Amarillo Pastel", "Negro / Rosa Pastel", "Gris / Verde Menta"],
        shortDesc: "Activa la circulación de las piernas y reduce la presión en la zona lumbar.",
        specs: "Inclinación dinámica de 0° a 20° con rodillos de masaje plantar antideslizantes."
    },
    {
        id: 10,
        name: "Calcetines de Compresión Graduada 20-30 mmHg",
        category: "ropa",
        price: 360,
        image: "https://m.media-amazon.com/images/I/81req4mGdbL._AC_SY500_.jpg",
        colors: ["Rayas Azul/Rosa Pastel", "Negro/Amarillo Pastel", "Lila/Verde Menta", "Rosa/Blanco Perla"],
        sizes: ["Chica (22 - 24.5 cm)", "Mediana (25 - 27.5 cm)", "Grande (28 - 30.5 cm)"],
        shortDesc: "Previenen hinchazón y cansancio en piernas tras horas sentado compilando.",
        specs: "Tejido de bambú antibacteriano con soporte en arco plantar y talón reforzado."
    },
    {
        id: 11,
        name: "Silla Ergonómica Mesh Cyber-Spine",
        category: "ergonomia",
        price: 5490,
        image: "https://m.media-amazon.com/images/I/71+PMRaNLVL._AC_SX679_.jpg",
        colors: ["Negro / Azul Pastel", "Negro / Rosa Pastel", "Negro / Verde Menta", "Gris / Lila Pastel"],
        shortDesc: "Respaldo de malla transpirable con soporte lumbar dinámico 4D para sesiones largas.",
        specs: "Brazos ajustables 4D, pistón clase 4, cabecero cervical articulado y reclinación sincronizada de 135°."
    },
    {
        id: 12,
        name: "Lámpara Barra de Monitor Anti-Reflejos",
        category: "accesorios",
        price: 820,
        image: "https://tse3.mm.bing.net/th/id/OIP._bK03xVg5_lJV2VH99yyGAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        colors: ["Negro Mate", "Gris Espacial", "Rosa Pastel", "Azul Pastel", "Blanco Perla"],
        shortDesc: "Ilumina tu escritorio sin generar reflejos en la pantalla ni fatiga ocular nocturna.",
        specs: "Temperatura ajustable 2700K-6500K, índice CRI95+, control táctil y alimentación USB-C."
    },
    {
        id: 13,
        name: "Chamarra Cortavientos Reflectante Dev-Ops",
        category: "ropa",
        price: 1450,
        image: "https://http2.mlstatic.com/D_NQ_NP_767915-MCO88802156700_082025-O.webp",
        colors: ["Negro / Ribete Rosa Pastel", "Negro / Ribete Amarillo Pastel", "Negro / Ribete Azul Pastel", "Lila / Verde Menta"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        shortDesc: "Prenda ligera térmica con cortes articulados en codos y hombros para libertad total.",
        specs: "Tela repelente al agua, forro interno transpirable y bandas reflectantes de alta visibilidad nocturna."
    },
    {
        id: 14,
        name: "Reposamuñecas Gel Refrigerante Split",
        category: "ergonomia",
        price: 390,
        image: "https://http2.mlstatic.com/D_NQ_NP_741997-MCO76800528601_062024-O.webp",
        colors: ["Azul Pastel", "Rosa Pastel", "Amarillo Pastel", "Verde Menta", "Lila Pastel", "Negro"],
        shortDesc: "Par de almohadillas independientes que mantienen tus muñecas en ángulo neutro.",
        specs: "Base antideslizante de silicona, gel frío de recuperación lenta y cubierta suave anti-sudor."
    },
    {
        id: 15,
        name: "Lentes Clip-On Magnéticos Night-Code",
        category: "accesorios",
        price: 580,
        image: "https://m.media-amazon.com/images/I/61WPln7KRAL._AC_SL1500_.jpg",
        colors: ["Ámbar Nocturno", "Transparente Filtro Azul", "Rosa Suave", "Azul Cielo", "Verde Menta"],
        shortDesc: "Filtro óptico desmontable ideal para programar de madrugada sin alterar melatonina.",
        specs: "Policarbonato óptico de alta claridad, bloqueo del 98% de espectro azul-violeta y estuche rígido."
    },
    {
        id: 16,
        name: "Auditoría Ergonómica de Setup (Remota)",
        category: "servicio",
        price: 650,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        colors: ["Modalidad Online"],
        shortDesc: "Análisis por videollamada de la altura de tu monitor, silla, teclado e iluminación.",
        specs: "Sesión de 45 minutos con especialista en ergonomía laboral + reporte PDF con ajustes milimétricos."
    },
    {
        id: 17,
        name: "Sesión de Fisioterapia Preventiva Dev",
        category: "servicio",
        price: 850,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
        colors: ["Presencial / Online"],
        shortDesc: "Terapia enfocada en liberar tensión cervical, lumbar y prevenir túnel carpiano.",
        specs: "Evaluación biomecánica completa + rutina personalizada de estiramientos de 5 minutos entre sprints."
    },
    {
        id: 18,
        name: "Plan Mensual Pausas Activas & Postura",
        category: "servicio",
        price: 490,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        colors: ["Acceso Digital 24/7"],
        shortDesc: "Seguimiento semanal con rutinas guiadas para mantener movilidad articular.",
        specs: "Acceso a micro-rutinas de movilidad de muñecas, espalda baja y descanso visual 20-20-20."
    },
    {
        id: 19,
        name: "Taller Ergonómico para Equipos Tech",
        category: "servicio",
        price: 3200,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        colors: ["Hasta 15 Desarrolladores"],
        shortDesc: "Capacitación práctica en vivo para prevenir lesiones laborales en equipos remotos.",
        specs: "Incluye diagnóstico grupal, guía de configuración de estaciones home-office y seguimiento de 30 días."
    }
];

/* ==========================================================================
   BASE DE DATOS GEOGRÁFICA: PAÍSES, ESTADOS DE MÉXICO Y MUNICIPIOS + CPs REALES
   ========================================================================== */
const ALL_COUNTRIES = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita",
    "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés",
    "Barbados", "Baréin", "Bélgica", "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia",
    "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi",
    "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China",
    "Chipre", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica",
    "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos",
    "Eritrea", "Eslovaquia", "Eslovenia", "España", "Estados Unidos", "Estonia", "Esuatini", "Etiopía",
    "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada",
    "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Guyana", "Haití", "Honduras",
    "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall",
    "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia",
    "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia",
    "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malasia", "Malaui",
    "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia",
    "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal",
    "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán",
    "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido",
    "República Centroafricana", "República Checa", "República del Congo", "República Democrática del Congo",
    "República Dominicana", "Ruanda", "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino",
    "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles",
    "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Sudáfrica", "Sudán", "Sudán del Sur",
    "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo",
    "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda",
    "Uruguay", "Uzbekistán", "Vanuatu", "Vaticano", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
];

const MEXICO_STATES_AND_MUNICIPALITIES = {
    "Aguascalientes": ["Aguascalientes", "Asientos", "Calvillo", "Cosío", "Jesús María", "Pabellón de Arteaga", "Rincón de Romos", "San Francisco de los Romo", "San José de Gracia", "Tepezalá", "El Llano"],
    "Baja California": ["Ensenada", "Mexicali", "Playas de Rosarito", "San Quintín", "San Felipe", "Tecate", "Tijuana"],
    "Baja California Sur": ["Comondú", "La Paz", "Loreto", "Los Cabos", "Mulegé"],
    "Campeche": ["Calakmul", "Calkiní", "Campeche", "Candelaria", "Carmen", "Champotón", "Dzitbalché", "Escárcega", "Hecelchakán", "Hopelchén", "Palizada", "Seybaplaya", "Tenabo"],
    "Chiapas": ["Acacoyagua", "Acala", "Acapetahua", "Altamirano", "Amatán", "Arriaga", "Bochil", "Cacahoatán", "Catazajá", "Chiapa de Corzo", "Cintalapa", "Comitán de Domínguez", "Huixtla", "Las Margaritas", "Mapastepec", "Motozintla", "Ocosingo", "Ocozocoautla de Espinosa", "Palenque", "Pichucalco", "Pijijiapan", "Reforma", "San Cristóbal de las Casas", "Simojovel", "Suchiate", "Tapachula", "Teopisca", "Tonalá", "Tuxtla Gutiérrez", "Venustiano Carranza", "Villaflores"],
    "Chihuahua": ["Ahumada", "Aldama", "Allende", "Aquiles Serdán", "Ascensión", "Bocoyna", "Camargo", "Casas Grandes", "Chihuahua", "Cuauhtémoc", "Delicias", "Guachochi", "Guadalupe y Calvo", "Hidalgo del Parral", "Jiménez", "Juárez", "Madera", "Meoqui", "Namiquipa", "Nuevo Casas Grandes", "Ojinaga", "Saucillo"],
    "Ciudad de México": ["Álvaro Obregón", "Azcapotzalco", "Benito Juárez", "Coyoacán", "Cuajimalpa de Morelos", "Cuauhtémoc", "Gustavo A. Madero", "Iztacalco", "Iztapalapa", "La Magdalena Contreras", "Miguel Hidalgo", "Milpa Alta", "Tláhuac", "Tlalpan", "Venustiano Carranza", "Xochimilco"],
    "Coahuila": ["Acuña", "Allende", "Arteaga", "Castaños", "Cuatro Ciénegas", "Francisco I. Madero", "Frontera", "Matamoros", "Monclova", "Múzquiz", "Nava", "Parras", "Piedras Negras", "Ramos Arizpe", "Sabinas", "Saltillo", "San Juan de Sabinas", "San Pedro", "Torreón"],
    "Colima": ["Armería", "Colima", "Comala", "Coquimatlán", "Cuauhtémoc", "Ixtlahuacán", "Manzanillo", "Minatitlán", "Tecomán", "Villa de Álvarez"],
    "Durango": ["Canatlán", "Cuencamé", "Durango", "El Oro", "Gómez Palacio", "Guadalupe Victoria", "Lerdo", "Mapimí", "Mezquital", "Nombre de Dios", "Nuevo Ideal", "Pueblo Nuevo", "San Dimas", "Santiago Papasquiaro", "Tamazula", "Tlahualilo", "Vicente Guerrero"],
    "Estado de México": ["Acolman", "Almoloya de Juárez", "Amecameca", "Atenco", "Atizapán de Zaragoza", "Atlacomulco", "Chalco", "Chicoloapan", "Chimalhuacán", "Coacalco de Berriozábal", "Cuautitlán", "Cuautitlán Izcalli", "Ecatepec de Morelos", "Huixquilucan", "Ixtapaluca", "Ixtlahuaca", "Jilotepec", "La Paz", "Lerma", "Metepec", "Naucalpan de Juárez", "Nezahualcóyotl", "Nicolás Romero", "Ocoyoacac", "Otumba", "San Mateo Atenco", "Tecámac", "Tejupilco", "Tenancingo", "Teotihuacán", "Tepotzotlán", "Texcoco", "Tianguistenco", "Tlalnepantla de Baz", "Toluca", "Tultepec", "Tultitlán", "Valle de Bravo", "Valle de Chalco Solidaridad", "Zinacantepec", "Zumpango"],
    "Guanajuato": ["Abasolo", "Acámbaro", "Apaseo el Alto", "Apaseo el Grande", "Atarjea", "Celaya", "Comonfort", "Coroneo", "Cortazar", "Cuerámaro", "Doctor Mora", "Dolores Hidalgo Cuna de la Independencia Nacional", "Guanajuato", "Huanímaro", "Irapuato", "Jaral del Progreso", "Jerécuaro", "León", "Manuel Doblado", "Moroleón", "Ocampo", "Pénjamo", "Pueblo Nuevo", "Purísima del Rincón", "Romita", "Salamanca", "Salvatierra", "San Diego de la Unión", "San Felipe", "San Francisco del Rincón", "San José Iturbide", "San Luis de la Paz", "San Miguel de Allende", "Santa Catarina", "Santa Cruz de Juventino Rosas", "Santiago Maravatío", "Silao de la Victoria", "Tarandacuao", "Tarimoro", "Tierra Blanca", "Uriangato", "Valle de Santiago", "Victoria", "Villagrán", "Xichú", "Yuriria"],
    "Guerrero": ["Acapulco de Juárez", "Atoyac de Álvarez", "Ayutla de los Libres", "Chilapa de Álvarez", "Chilpancingo de los Bravo", "Coyuca de Benítez", "Iguala de la Independencia", "Ometepec", "Petatlán", "Taxco de Alarcón", "Tecpan de Galeana", "Teloloapan", "Tixtla de Guerrero", "Tlapa de Comonfort", "Zihuatanejo de Azueta"],
    "Hidalgo": ["Actopan", "Apan", "Atotonilco de Tula", "Cuautepec de Hinojosa", "Huejutla de Reyes", "Huichapan", "Ixmiquilpan", "Mineral de la Reforma", "Mixquiahuala de Juárez", "Pachuca de Soto", "Progreso de Obregón", "San Agustín Tlaxiaca", "Santiago Tulantepec", "Tepeapulco", "Tepeji del Río de Ocampo", "Tizayuca", "Tula de Allende", "Tulancingo de Bravo", "Zempoala", "Zimapán"],
    "Jalisco": ["Acatic", "Acatlán de Juárez", "Ahualulco de Mercado", "Ameca", "Arandas", "Atotonilco el Alto", "Autlán de Navarro", "Chapala", "Cihuatlán", "Cocula", "Colotlán", "El Grullo", "El Salto", "Encarnación de Díaz", "Guadalajara", "Ixtlahuacán de los Membrillos", "Jalostotitlán", "Jamay", "Jocotepec", "La Barca", "Lagos de Moreno", "Magdalena", "Mascota", "Ocotlán", "Poncitlán", "Puerto Vallarta", "San Juan de los Lagos", "San Martín Hidalgo", "San Miguel el Alto", "San Pedro Tlaquepaque", "Sayula", "Tala", "Tamazula de Gordiano", "Tapalpa", "Tecalitlán", "Teocaltiche", "Tepatitlán de Morelos", "Tequila", "Tlajomulco de Zúñiga", "Tonalá", "Tuxpan", "Unión de Tula", "Villa Hidalgo", "Yahualica de González Gallo", "Zacoalco de Torres", "Zapopan", "Zapotiltic", "Zapotlán el Grande", "Zapotlanejo"],
    "Michoacán": ["Apatzingán", "Ario", "Ciudad Hidalgo", "Cuitzeo", "Jacona", "Jiquilpan", "La Piedad", "Lázaro Cárdenas", "Los Reyes", "Maravatío", "Morelia", "Múgica", "Paracho", "Pátzcuaro", "Puruándiro", "Quiroga", "Sahuayo", "Tacámbaro", "Tarímbaro", "Uruapan", "Yurécuaro", "Zacapu", "Zamora", "Zinapécuaro", "Zitácuaro"],
    "Morelos": ["Amacuzac", "Atlatlahucan", "Axochiapan", "Ayala", "Coatlán del Río", "Cuautla", "Cuernavaca", "Emiliano Zapata", "Huitzilac", "Jantetelco", "Jiutepec", "Jojutla", "Jonacatepec", "Mazatepec", "Miacatlán", "Ocuituco", "Puente de Ixtla", "Temixco", "Temoac", "Tepalcingo", "Tepoztlán", "Tetecala", "Tetela del Volcán", "Tlalnepantla", "Tlaltizapán de Zapata", "Tlaquiltenango", "Tlayacapan", "Totolapan", "Xochitepec", "Yautepec", "Yecapixtla", "Zacatepec", "Zacualpan de Amilpas"],
    "Nayarit": ["Acaponeta", "Ahuacatlán", "Bahía de Banderas", "Compostela", "Del Nayar", "Huajicori", "Ixtlán del Río", "Jala", "La Yesca", "Rosamorada", "Ruiz", "San Blas", "San Pedro Lagunillas", "Santa María del Oro", "Santiago Ixcuintla", "Tecuala", "Tepic", "Tuxpan", "Xalisco"],
    "Nuevo León": ["Abasolo", "Allende", "Anáhuac", "Apodaca", "Cadereyta Jiménez", "Ciénega de Flores", "Doctor Arroyo", "El Carmen", "Galeana", "García", "General Escobedo", "General Zuazua", "Guadalupe", "Juárez", "Linares", "Montemorelos", "Monterrey", "Pesquería", "Sabinas Hidalgo", "Salinas Victoria", "San Nicolás de los Garza", "San Pedro Garza García", "Santa Catarina", "Santiago"],
    "Oaxaca": ["Asunción Nochixtlán", "Ciudad Ixtepec", "Cosolapa", "Cuilápam de Guerrero", "Heroica Ciudad de Ejutla de Crespo", "Heroica Ciudad de Huajuapan de León", "Heroica Ciudad de Juchitán de Zaragoza", "Heroica Ciudad de Tlaxiaco", "Loma Bonita", "Matías Romero Avendaño", "Miahuatlán de Porfirio Díaz", "Oaxaca de Juárez", "Ocotlán de Morelos", "Putla Villa de Guerrero", "Salina Cruz", "San Juan Bautista Tuxtepec", "San Pedro Mixtepec", "San Pedro Pochutla", "Santa Cruz Xoxocotlán", "Santa Lucía del Camino", "Santa María Huatulco", "Santiago Pinotepa Nacional", "Santo Domingo Tehuantepec", "Villa de Zaachila", "Zimatlán de Álvarez"],
    "Puebla": ["Acatlán", "Acatzingo", "Ajalpan", "Amozoc", "Atlixco", "Chalchicomula de Sesma", "Chignahuapan", "Coronango", "Cuautlancingo", "Huauchinango", "Huejotzingo", "Izúcar de Matamoros", "Libres", "Puebla", "San Andrés Cholula", "San Martín Texmelucan", "San Pedro Cholula", "Tecamachalco", "Tehuacán", "Tepeaca", "Teziutlán", "Tlatlauquitepec", "Xicotepec", "Zacapoaxtla", "Zacatlán"],
    "Querétaro": ["Amealco de Bonfil", "Arroyo Seco", "Cadereyta de Montes", "Colón", "Corregidora", "El Marqués", "Ezequiel Montes", "Huimilpan", "Jalpan de Serra", "Landa de Matamoros", "Pedro Escobedo", "Peñamiller", "Pinal de Amoles", "Querétaro", "San Joaquín", "San Juan del Río", "Tequisquiapan", "Tolimán"],
    "Quintana Roo": ["Bacalar", "Benito Juárez", "Cozumel", "Felipe Carrillo Puerto", "Isla Mujeres", "José María Morelos", "Lázaro Cárdenas", "Othón P. Blanco", "Puerto Morelos", "Solidaridad", "Tulum"],
    "San Luis Potosí": ["Axtla de Terrazas", "Cárdenas", "Cedral", "Cerritos", "Charcas", "Ciudad del Maíz", "Ciudad Fernández", "Ciudad Valles", "Ébano", "Matehuala", "Mexquitic de Carmona", "Rioverde", "Salinas", "San Luis Potosí", "Santa María del Río", "Soledad de Graciano Sánchez", "Tamazunchale", "Tamuín", "Villa de Reyes", "Xilitla"],
    "Sinaloa": ["Ahome", "Angostura", "Badiraguato", "Choix", "Concordia", "Cosalá", "Culiacán", "El Fuerte", "Elota", "Escuinapa", "Guasave", "Mazatlán", "Mocorito", "Navolato", "Rosario", "Salvador Alvarado", "San Ignacio", "Sinaloa"],
    "Sonora": ["Agua Prieta", "Álamos", "Caborca", "Cajeme", "Cananea", "Empalme", "Etchojoa", "Guaymas", "Hermosillo", "Huatabampo", "Magdalena", "Navojoa", "Nogales", "Puerto Peñasco", "San Luis Río Colorado", "Santa Ana", "Ures"],
    "Tabasco": ["Balancán", "Cárdenas", "Centla", "Centro", "Comalcalco", "Cunduacán", "Emiliano Zapata", "Huimanguillo", "Jalapa", "Jalpa de Méndez", "Jonuta", "Macuspana", "Nacajuca", "Paraíso", "Tacotalpa", "Teapa", "Tenosique"],
    "Tamaulipas": ["Abasolo", "Aldama", "Altamira", "Camargo", "Ciudad Madero", "El Mante", "González", "Gustavo Díaz Ordaz", "Matamoros", "Miguel Alemán", "Nuevo Laredo", "Reynosa", "Río Bravo", "San Fernando", "Soto la Marina", "Tampico", "Tula", "Valle Hermoso", "Victoria", "Xicoténcatl"],
    "Tlaxcala": ["Apizaco", "Calpulalpan", "Chiautempan", "Contla de Juan Cuamatzi", "Huamantla", "Ixtacuixtla de Mariano Matamoros", "Nanacamilpa de Mariano Arista", "Natívitas", "Papalotla de Xicohténcatl", "San Pablo del Monte", "Tenancingo", "Teolocholco", "Tetla de la Solidaridad", "Tlaxcala", "Tlaxco", "Tzompantepec", "Xaloztoc", "Yauhquemehcan", "Zacatelco"],
    "Veracruz": ["Acayucan", "Álamo Temapache", "Alvarado", "Banderilla", "Boca del Río", "Coatepec", "Coatzacoalcos", "Córdoba", "Cosamaloapan", "Cosoleacaque", "Emiliano Zapata", "Fortín", "Gutiérrez Zamora", "Huatusco", "Ixtaczoquitlán", "Las Choapas", "Martínez de la Torre", "Minatitlán", "Misantla", "Nanchital", "Orizaba", "Pánuco", "Papantla", "Perote", "Poza Rica de Hidalgo", "Río Blanco", "San Andrés Tuxtla", "Santiago Tuxtla", "Tantoyuca", "Tierra Blanca", "Tihuatlán", "Tuxpan", "Veracruz", "Xalapa"],
    "Yucatán": ["Chemax", "Conkal", "Hunucmá", "Izamal", "Kanasín", "Maxcanú", "Mérida", "Motul", "Oxkutzcab", "Peto", "Progreso", "Tekax", "Ticul", "Tizimín", "Umán", "Valladolid"],
    "Zacatecas": ["Calera", "Concepción del Oro", "Fresnillo", "Guadalupe", "Jerez", "Loreto", "Luis Moya", "Mazapil", "Miguel Auza", "Nochistlán de Mejía", "Ojocaliente", "Pánuco", "Pinos", "Río Grande", "Sombrerete", "Tabasco", "Tlaltenango de Sánchez Román", "Valparaíso", "Villanueva", "Zacatecas"]
};

const ALL_MEXICO_MUNICIPALITIES = Array.from(
    new Set(Object.values(MEXICO_STATES_AND_MUNICIPALITIES).flat())
).sort((a, b) => a.localeCompare(b, "es"));

const VERIFIED_MX_ZIPS = {
    "37208": { state: "Guanajuato", city: "León", colonies: ["Las Trojes", "Brisas del Carmen", "El Coecillo", "Santa Clara", "Héroes de León"] },
    "37000": { state: "Guanajuato", city: "León", colonies: ["Centro", "Obregón", "San Juan de Dios", "Bellavista"] },
    "37150": { state: "Guanajuato", city: "León", colonies: ["Jardines del Moral", "Valle del Campestre", "Gran Jardín", "Lomas del Campestre"] },
    "37260": { state: "Guanajuato", city: "León", colonies: ["La Martinica", "Lourdes", "Oriental", "Killian"] },
    "37500": { state: "Guanajuato", city: "León", colonies: ["San Isidro", "Jardines de Jerez", "Cerrito de Jerez", "Prados Verdes"] },
    "36000": { state: "Guanajuato", city: "Guanajuato", colonies: ["Centro", "Pastita", "Embajadoras", "San Javier"] },
    "36500": { state: "Guanajuato", city: "Irapuato", colonies: ["Centro", "Las Reynas", "Moderna", "Gamez"] },
    "38000": { state: "Guanajuato", city: "Celaya", colonies: ["Centro", "Alameda", "Las Fuentes", "Renacimiento"] },
    "44100": { state: "Jalisco", city: "Guadalajara", colonies: ["Centro", "Americana", "Mexicaltzingo", "Moderna"] },
    "44130": { state: "Jalisco", city: "Guadalajara", colonies: ["Arcos Vallarta", "Lafayette", "Obrera"] },
    "45050": { state: "Jalisco", city: "Zapopan", colonies: ["Ciudad del Sol", "Chapalita", "La Estancia"] },
    "06000": { state: "Ciudad de México", city: "Cuauhtémoc", colonies: ["Centro", "Tabacalera", "Juárez"] },
    "06700": { state: "Ciudad de México", city: "Cuauhtémoc", colonies: ["Roma Norte", "Roma Sur", "Hipódromo Condesa"] },
    "03100": { state: "Ciudad de México", city: "Benito Juárez", colonies: ["Del Valle Centro", "Del Valle Norte", "Nápoles"] },
    "64000": { state: "Nuevo León", city: "Monterrey", colonies: ["Centro", "Obispado", "Mirador"] },
    "76000": { state: "Querétaro", city: "Querétaro", colonies: ["Centro Histórico", "La Cruz", "Alameda"] },
    "72000": { state: "Puebla", city: "Puebla", colonies: ["Centro Histórico", "El Carmen", "Analco"] }
};

let isCurrentZipValid = false;
let lastValidatedZip = "";
let zipValidationTimer = null;

function normalizeText(str) {
    return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function populateDatalist(datalistId, items, query = "") {
    const dl = document.getElementById(datalistId);
    if (!dl) return;
    const normQuery = normalizeText(query);
    const filtered = normQuery
        ? items.filter(item => normalizeText(item).startsWith(normQuery) || normalizeText(item).includes(normQuery))
        : items;

    dl.innerHTML = filtered
        .slice(0, 80)
        .map(val => `<option value="${val}"></option>`)
        .join("");
}

function setZipStatus(statusType, message) {
    const statusEl = document.getElementById("zip-validation-status");
    const zipInput = document.getElementById("ship-zip");
    if (!statusEl || !zipInput) return;

    statusEl.textContent = message;
    if (statusType === "valid") {
        statusEl.style.color = "var(--neon-green)";
        zipInput.style.borderColor = "var(--neon-green)";
        zipInput.setCustomValidity("");
        isCurrentZipValid = true;
    } else if (statusType === "loading") {
        statusEl.style.color = "var(--neon-yellow)";
        zipInput.style.borderColor = "var(--neon-yellow)";
        zipInput.setCustomValidity("Validando código postal...");
        isCurrentZipValid = false;
    } else if (statusType === "invalid") {
        statusEl.style.color = "#ff4d6d";
        zipInput.style.borderColor = "#ff4d6d";
        zipInput.setCustomValidity(message);
        isCurrentZipValid = false;
    } else {
        statusEl.style.color = "var(--text-muted)";
        zipInput.style.borderColor = "var(--border-subtle)";
        zipInput.setCustomValidity("Ingresa un código postal válido de 5 dígitos.");
        isCurrentZipValid = false;
    }
}

async function verifyRealPostalCode(zipCode, preserveExistingColony = false) {
    const cleanZip = (zipCode || "").trim();
    const zipInput = document.getElementById("ship-zip");
    if (!zipInput) return false;

    if (!/^[0-9]{5}$/.test(cleanZip)) {
        setZipStatus("neutral", "Ingresa un código postal de 5 dígitos reales (Ej. 37208).");
        lastValidatedZip = "";
        return false;
    }

    setZipStatus("loading", `⏳ Verificando código postal ${cleanZip}...`);

    let resolvedData = null;
    try {
        const res = await fetch(`https://api.zippopotam.us/mx/${cleanZip}`);
        if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.places) && data.places.length > 0) {
                const firstPlace = data.places[0];
                const stateName = firstPlace.state || "";
                const coloniesFromApi = Array.from(
                    new Set(data.places.map(p => p["place name"]).filter(Boolean))
                );

                const localMatch = VERIFIED_MX_ZIPS[cleanZip];
                const cityName = localMatch
                    ? localMatch.city
                    : (MEXICO_STATES_AND_MUNICIPALITIES[stateName]?.[0] || coloniesFromApi[0] || "");
                const allColonies = localMatch
                    ? Array.from(new Set([...localMatch.colonies, ...coloniesFromApi]))
                    : coloniesFromApi;

                resolvedData = {
                    state: stateName,
                    city: cityName,
                    colonies: allColonies
                };
            }
        }
    } catch (_) {
        // Respaldo local sin conexión
    }

    if (!resolvedData && VERIFIED_MX_ZIPS[cleanZip]) {
        resolvedData = VERIFIED_MX_ZIPS[cleanZip];
    }

    if (!resolvedData) {
        setZipStatus("invalid", `❌ El código postal ${cleanZip} no existe. Ingresa un CP real.`);
        lastValidatedZip = "";
        populateDatalist("colonies-datalist", []);
        return false;
    }

    lastValidatedZip = cleanZip;
    const countryInput = document.getElementById("ship-country");
    const stateInput = document.getElementById("ship-state");
    const cityInput = document.getElementById("ship-city");
    const colonyInput = document.getElementById("ship-colony");

    if (countryInput && !countryInput.value.trim()) {
        countryInput.value = "México";
    }
    if (stateInput && resolvedData.state) {
        stateInput.value = resolvedData.state;
        const stateMunis = MEXICO_STATES_AND_MUNICIPALITIES[resolvedData.state] || ALL_MEXICO_MUNICIPALITIES;
        populateDatalist("cities-datalist", stateMunis);
    }
    if (cityInput && resolvedData.city) {
        cityInput.value = resolvedData.city;
    }

    populateDatalist("colonies-datalist", resolvedData.colonies);
    if (colonyInput && resolvedData.colonies.length > 0 && (!preserveExistingColony || !colonyInput.value.trim())) {
        colonyInput.value = resolvedData.colonies[0];
    }

    const previewColonies = resolvedData.colonies.slice(0, 3).join(", ");
    setZipStatus(
        "valid",
        `✅ CP ${cleanZip} válido: ${resolvedData.city}, ${resolvedData.state} — Colonias: ${previewColonies}`
    );

    if (currentUser) {
        draftShipping = readShippingInputs();
        localStorage.setItem("np_draftShipping", JSON.stringify(draftShipping));
    }

    return true;
}

function initLocationAutocompleteAndZipValidation() {
    const countryInput = document.getElementById("ship-country");
    const stateInput = document.getElementById("ship-state");
    const cityInput = document.getElementById("ship-city");
    const zipInput = document.getElementById("ship-zip");

    const allStates = Object.keys(MEXICO_STATES_AND_MUNICIPALITIES);

    if (countryInput) {
        populateDatalist("countries-datalist", ALL_COUNTRIES);
        countryInput.addEventListener("input", () => {
            populateDatalist("countries-datalist", ALL_COUNTRIES, countryInput.value);
        });
        countryInput.addEventListener("focus", () => {
            populateDatalist("countries-datalist", ALL_COUNTRIES, countryInput.value);
        });
    }

    if (stateInput) {
        populateDatalist("states-datalist", allStates);
        stateInput.addEventListener("input", () => {
            populateDatalist("states-datalist", allStates, stateInput.value);
            const matchedState = allStates.find(
                st => normalizeText(st) === normalizeText(stateInput.value)
            );
            const munis = matchedState
                ? MEXICO_STATES_AND_MUNICIPALITIES[matchedState]
                : ALL_MEXICO_MUNICIPALITIES;
            populateDatalist("cities-datalist", munis, cityInput ? cityInput.value : "");
        });
        stateInput.addEventListener("focus", () => {
            populateDatalist("states-datalist", allStates, stateInput.value);
        });
    }

    if (cityInput) {
        populateDatalist("cities-datalist", ALL_MEXICO_MUNICIPALITIES);
        const updateCitiesList = () => {
            const matchedState = stateInput
                ? allStates.find(st => normalizeText(st) === normalizeText(stateInput.value))
                : null;
            const sourceList = matchedState
                ? MEXICO_STATES_AND_MUNICIPALITIES[matchedState]
                : ALL_MEXICO_MUNICIPALITIES;
            populateDatalist("cities-datalist", sourceList, cityInput.value);
        };
        cityInput.addEventListener("input", updateCitiesList);
        cityInput.addEventListener("focus", updateCitiesList);
    }

    if (zipInput) {
        zipInput.addEventListener("input", () => {
            zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5);
            clearTimeout(zipValidationTimer);

            if (zipInput.value.length < 5) {
                setZipStatus("neutral", "Ingresa los 5 dígitos de un código postal real (Ej. 37208).");
                lastValidatedZip = "";
                return;
            }

            zipValidationTimer = setTimeout(() => {
                verifyRealPostalCode(zipInput.value, false);
            }, 250);
        });
    }
}

/* ==========================================================================
   LOGOTIPOS SVG Y CONFIGURACIÓN DE MÉTODOS DE PAGO (CON OXXO PAY)
   ========================================================================== */
const PAYPAL_SVG_LOGO = `
<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.65h6.59c2.25 0 3.91.52 4.86 1.54.89.96 1.18 2.34.86 4.11-.52 2.86-2.46 4.49-5.48 4.49H9.86a.77.77 0 0 0-.76.65l-.95 5.99a.64.64 0 0 1-.63.54l-.444.947z"/>
    <path fill="#0079C1" d="M18.92 8.95c-.58 3.16-2.76 4.94-6.06 4.94h-2.36a.77.77 0 0 0-.76.65l-1.15 7.26a.56.56 0 0 0 .55.65h3.88a.67.67 0 0 0 .66-.56l.78-4.93a.67.67 0 0 1 .66-.56h1.45c2.77 0 4.66-1.35 5.29-4.38.31-1.5.12-2.72-.54-3.57-.39-.51-.95-.88-1.66-1.14-.19.2-.45.41-.74.64z"/>
</svg>`;

const OXXO_SVG_LOGO = `
<svg width="46" height="22" viewBox="0 0 92 42" aria-hidden="true">
    <rect x="1" y="1" width="90" height="40" rx="6" fill="#E2001A" stroke="#FFE600" stroke-width="2.5"/>
    <text x="46" y="28" text-anchor="middle" fill="#FFFFFF" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="21" letter-spacing="1">OXXO</text>
</svg>`;

const PAYMENT_OPTIONS_CONFIG = [
    {
        value: "Tarjeta de Crédito / Débito",
        label: "Tarjeta Crédito / Débito",
        iconHtml: `<span class="pay-emoji">💳</span>`
    },
    {
        value: "Transferencia SPEI",
        label: "Transferencia SPEI",
        iconHtml: `<span class="pay-emoji">🏦</span>`
    },
    {
        value: "PayPal",
        label: "PayPal",
        iconHtml: `<span class="pay-logo-badge" style="background:#ffffff;">${PAYPAL_SVG_LOGO}</span>`
    },
    {
        value: "Efectivo en OXXO",
        label: "OXXO Pay",
        iconHtml: `<span class="pay-logo-badge">${OXXO_SVG_LOGO}</span>`
    }
];

function generateOxxoReference() {
    const p1 = Math.floor(1000 + Math.random() * 9000);
    const p2 = Math.floor(1000 + Math.random() * 9000);
    const p3 = Math.floor(1000 + Math.random() * 9000);
    const p4 = Math.floor(10 + Math.random() * 89);
    return `93${p1}-${p2}-${p3}-${p4}`;
}

function buildOxxoSlipHtml(referenceCode, amountMxn) {
    const formattedTotal = amountMxn.toLocaleString("es-MX");
    const cleanDigits = referenceCode.replace(/\D/g, "");
    return `
        <div class="oxxo-slip-card">
            <div class="oxxo-slip-header">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    ${OXXO_SVG_LOGO}
                    <strong style="font-size:0.9rem; color:#e2001a;">FICHA DE PAGO OXXO PAY</strong>
                </div>
                <span style="background:#ffe600; color:#111; padding:2px 6px; border-radius:4px; font-size:0.72rem; font-weight:800;">
                    VIGENCIA 48 HRS
                </span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.82rem;">
                <span>Concepto: <strong>Pedido NullPointer</strong></span>
                <span>Monto a pagar: <strong>$${formattedTotal} MXN</strong></span>
            </div>
            <div class="oxxo-barcode-box">
                <div class="oxxo-barcode-bars" aria-hidden="true"></div>
                <div class="oxxo-ref-number" id="pay-oxxo-ref">${referenceCode}</div>
                <small style="color:#444; font-size:0.7rem;">*${cleanDigits}*</small>
            </div>
            <p style="font-size:0.74rem; color:#333; line-height:1.35;">
                1. Acude a cualquier tienda OXXO y solicita un pago de servicio <strong>OXXO Pay</strong>.<br>
                2. Muestra el código de barras o dicta los 16 dígitos de referencia al cajero.<br>
                3. Conserva tu comprobante impreso de caja.
            </p>
        </div>
    `;
}

/* ==========================================================================
   DETECTOR DE BANDERA DE PAÍS POR PREFIJO TELEFÓNICO
   ========================================================================== */
const COUNTRY_CODES = [
    { code: "593", flag: "🇪🇨" },
    { code: "591", flag: "🇧🇴" },
    { code: "595", flag: "🇵🇾" },
    { code: "598", flag: "🇺🇾" },
    { code: "502", flag: "🇬🇹" },
    { code: "503", flag: "🇸🇻" },
    { code: "504", flag: "🇭🇳" },
    { code: "505", flag: "🇳🇮" },
    { code: "506", flag: "🇨🇷" },
    { code: "507", flag: "🇵🇦" },
    { code: "52",  flag: "🇲🇽" },
    { code: "54",  flag: "🇦🇷" },
    { code: "55",  flag: "🇧🇷" },
    { code: "56",  flag: "🇨🇱" },
    { code: "57",  flag: "🇨🇴" },
    { code: "58",  flag: "🇻🇪" },
    { code: "51",  flag: "🇵🇪" },
    { code: "53",  flag: "🇨🇺" },
    { code: "34",  flag: "🇪🇸" },
    { code: "33",  flag: "🇫🇷" },
    { code: "39",  flag: "🇮🇹" },
    { code: "44",  flag: "🇬🇧" },
    { code: "49",  flag: "🇩🇪" },
    { code: "81",  flag: "🇯🇵" },
    { code: "82",  flag: "🇰🇷" },
    { code: "1",   flag: "🇺🇸" }
];

function detectFlagFromPhone(rawValue) {
    const cleaned = (rawValue || "").trim();
    if (!cleaned) return "🇲🇽";

    const digitsOnly = cleaned.replace(/\D/g, "");
    if (!digitsOnly) return "🇲🇽";

    const sorted = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);

    if (cleaned.startsWith("+") || cleaned.startsWith("00")) {
        const intlDigits = cleaned.startsWith("00") ? digitsOnly.slice(2) : digitsOnly;
        if (!intlDigits) return "🌍";
        const match = sorted.find(c => intlDigits.startsWith(c.code));
        return match ? match.flag : "🌐";
    }

    if (digitsOnly.length <= 10) {
        return "🇲🇽";
    }

    const match = sorted.find(c => digitsOnly.startsWith(c.code));
    return match ? match.flag : "🌐";
}

function updatePhoneFlag(input, ladaSelect = null) {
    if (!input) return;
    const flagBox = input.parentElement?.querySelector(".phone-flag-box");
    if (!flagBox) return;
    const raw = ladaSelect ? `${ladaSelect.value} ${input.value}` : input.value;
    flagBox.textContent = detectFlagFromPhone(raw);
}

function initPhoneCountryDetectors() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        const existingGroup = input.parentElement?.classList.contains("phone-input-group")
            ? input.parentElement
            : null;
        const ladaSelect = existingGroup ? existingGroup.querySelector("select") : null;

        if (!existingGroup) {
            const wrapper = document.createElement("div");
            wrapper.className = "phone-input-group";

            const flagBox = document.createElement("span");
            flagBox.className = "phone-flag-box";
            flagBox.setAttribute("aria-hidden", "true");
            flagBox.textContent = "🇲🇽";

            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(flagBox);
            wrapper.appendChild(input);
        } else if (!existingGroup.querySelector(".phone-flag-box")) {
            const flagBox = document.createElement("span");
            flagBox.className = "phone-flag-box";
            flagBox.setAttribute("aria-hidden", "true");
            flagBox.textContent = "🇲🇽";
            existingGroup.insertBefore(flagBox, existingGroup.firstChild);
        }

        input.addEventListener("input", () => updatePhoneFlag(input, ladaSelect));
        ladaSelect?.addEventListener("change", () => updatePhoneFlag(input, ladaSelect));
        updatePhoneFlag(input, ladaSelect);
    });
}

/* ==========================================================================
   NOTIFICACIÓN FLOTANTE AL AGREGAR AL CARRITO
   ========================================================================== */
function showCartNotification(product, chosenColor, chosenSize = null) {
    let container = document.getElementById("np-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "np-toast-container";
        container.className = "np-toast-container";
        container.setAttribute("aria-live", "polite");
        document.body.appendChild(container);
    }

    const detailLabel = chosenSize
        ? `Color: ${chosenColor} • Talla: ${chosenSize}`
        : `Opción: ${chosenColor}`;

    const toast = document.createElement("div");
    toast.className = "np-toast";
    toast.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="np-toast-content">
            <strong>✓ Agregado al carrito</strong>
            <span>${product.name}</span>
            <small>${detailLabel}</small>
        </div>
        <button type="button" class="np-toast-btn">Ver</button>
    `;

    toast.querySelector(".np-toast-btn").addEventListener("click", () => {
        renderSavedShippingOption();
        openModal("modal-cart");
        toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-hide");
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

/* ==========================================================================
   UTILIDAD PARA CALCULAR FECHA ESTIMADA DE ENTREGA
   ========================================================================== */
function getEstimatedDeliveryDate(daysToAdd = 2) {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formatted = target.toLocaleDateString("es-MX", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/* ==========================================================================
   ESTADO GLOBAL CON PERSISTENCIA EN LOCALSTORAGE
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem("np_cart")) || [];
let users = JSON.parse(localStorage.getItem("np_users")) || [];
let currentUser = JSON.parse(localStorage.getItem("np_currentUser")) || null;
let orders = JSON.parse(localStorage.getItem("np_orders")) || {};
let savedAddresses = JSON.parse(localStorage.getItem("np_savedAddresses")) || [];
let draftShipping = JSON.parse(localStorage.getItem("np_draftShipping")) || null;
let activeOxxoReference = "";

if (!currentUser) {
    orders = {};
    savedAddresses = [];
    draftShipping = null;
    localStorage.removeItem("np_orders");
    localStorage.removeItem("np_savedAddresses");
    localStorage.removeItem("np_draftShipping");
    localStorage.removeItem("np_lastShipping");
}

function saveState() {
    localStorage.setItem("np_users", JSON.stringify(users));
    localStorage.setItem("np_currentUser", JSON.stringify(currentUser));
    localStorage.setItem("np_cart", JSON.stringify(cart));

    if (currentUser) {
        localStorage.setItem("np_orders", JSON.stringify(orders));
        localStorage.setItem("np_savedAddresses", JSON.stringify(savedAddresses));
        localStorage.setItem("np_draftShipping", JSON.stringify(draftShipping));
    } else {
        localStorage.removeItem("np_orders");
        localStorage.removeItem("np_savedAddresses");
        localStorage.removeItem("np_draftShipping");
    }
}

/* ==========================================================================
   AUTOGUARDADO DE DIRECCIONES Y VALIDACIÓN DE CÓDIGO POSTAL
   ========================================================================== */
const SHIPPING_FIELD_MAP = {
    recipient: "ship-name",
    lada: "ship-lada",
    phone: "ship-phone",
    country: "ship-country",
    state: "ship-state",
    city: "ship-city",
    zip: "ship-zip",
    colony: "ship-colony",
    street: "ship-street",
    number: "ship-number",
    refs: "ship-refs"
};

function readShippingInputs() {
    const lada = (document.getElementById("ship-lada")?.value || "+52 55").trim();
    const phoneDigits = (document.getElementById("ship-phone")?.value || "").trim();
    const fullPhone = `${lada} ${phoneDigits}`.trim();
    const flag = detectFlagFromPhone(fullPhone);
    return {
        recipient: (document.getElementById("ship-name")?.value || "").trim(),
        lada,
        phone: phoneDigits,
        fullPhone,
        countryFlag: phoneDigits ? flag : "",
        country: (document.getElementById("ship-country")?.value || "").trim() || "México",
        state: (document.getElementById("ship-state")?.value || "").trim(),
        city: (document.getElementById("ship-city")?.value || "").trim(),
        zip: (document.getElementById("ship-zip")?.value || "").trim(),
        colony: (document.getElementById("ship-colony")?.value || "").trim(),
        street: (document.getElementById("ship-street")?.value || "").trim(),
        number: (document.getElementById("ship-number")?.value || "").trim(),
        refs: (document.getElementById("ship-refs")?.value || "").trim()
    };
}

function fillShippingInputs(addr) {
    const data = addr || {
        recipient: "",
        lada: "+52 55",
        phone: "",
        country: "México",
        state: "",
        city: "",
        zip: "",
        colony: "",
        street: "",
        number: "",
        refs: ""
    };
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val;
    };

    setVal("ship-name", data.recipient || "");
    if (data.lada) setVal("ship-lada", data.lada);
    setVal("ship-phone", data.phone || "");
    setVal("ship-country", data.country || "México");
    setVal("ship-state", data.state || "");
    setVal("ship-city", data.city || "");
    setVal("ship-zip", data.zip || "");
    setVal("ship-colony", data.colony || "");
    setVal("ship-street", data.street || "");
    setVal("ship-number", data.number || "");
    setVal("ship-refs", data.refs === "Sin referencias adicionales" ? "" : (data.refs || ""));

    updatePhoneFlag(document.getElementById("ship-phone"), document.getElementById("ship-lada"));
    if (data.zip && /^[0-9]{5}$/.test(data.zip)) {
        verifyRealPostalCode(data.zip, true);
    } else {
        setZipStatus("neutral", "Ingresa un CP válido de 5 dígitos (Ej. 37208).");
    }
}

function setShippingFieldsVisible(visible) {
    const fieldset = document.querySelector("#checkout-form fieldset.checkout-group");
    if (!fieldset) return;
    fieldset.querySelectorAll(":scope > .form-row-2, :scope > label").forEach(el => {
        el.style.display = visible ? "" : "none";
    });
}

function isAddressComplete(addr) {
    return Boolean(
        addr &&
        addr.recipient &&
        addr.phone &&
        addr.country &&
        addr.state &&
        addr.city &&
        addr.zip &&
        addr.colony &&
        addr.street &&
        addr.number
    );
}

function initShippingAutoSave() {
    Object.values(SHIPPING_FIELD_MAP).forEach(inputId => {
        const input = document.getElementById(inputId);
        if (!input) return;
        const eventName = input.tagName === "SELECT" ? "change" : "input";
        input.addEventListener(eventName, () => {
            if (!currentUser) return;
            draftShipping = readShippingInputs();
            localStorage.setItem("np_draftShipping", JSON.stringify(draftShipping));
        });
    });
}

function renderSavedShippingOption() {
    const box = document.getElementById("saved-shipping-box");
    if (!box) return;

    if (!currentUser) {
        box.innerHTML = `
            <div style="background-color: rgba(255, 42, 133, 0.14); border: 1px solid var(--neon-pink); border-radius: 8px; padding: 0.85rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <strong style="color: var(--neon-pink); font-size: 0.85rem;">
                    🔒 Inicia sesión para completar tu pedido
                </strong>
                <p style="font-size: 0.8rem; color: var(--text-main);">
                    Necesitas tener una cuenta activa para generar tu ticket de compra, guardar tu dirección y rastrear tu paquete.
                </p>
                <div>
                    <button type="button" class="btn-neon-pink" id="btn-login-from-checkout" style="padding: 0.45rem 0.9rem; font-size: 0.78rem;">
                        Iniciar Sesión / Crear Cuenta
                    </button>
                </div>
            </div>
        `;
        document.getElementById("btn-login-from-checkout")?.addEventListener("click", () => {
            closeModal("modal-cart");
            renderAuthModal("login");
            openModal("modal-auth");
        });
        setShippingFieldsVisible(true);
        return;
    }

    const activeAddr = isAddressComplete(draftShipping)
        ? draftShipping
        : (savedAddresses.length > 0 ? savedAddresses[0] : null);

    if (!activeAddr) {
        box.innerHTML = `
            <p style="font-size: 0.78rem; color: var(--neon-green);">
                💾 Tus datos de envío se autoguardan automáticamente mientras escribes para tus próximos pedidos.
            </p>
        `;
        if (draftShipping) {
            fillShippingInputs(draftShipping);
        } else if (currentUser && document.getElementById("ship-name") && !document.getElementById("ship-name").value) {
            document.getElementById("ship-name").value = currentUser.name;
        }
        setShippingFieldsVisible(true);
        return;
    }

    fillShippingInputs(activeAddr);
    setShippingFieldsVisible(false);

    const flagPrefix = activeAddr.countryFlag ? `${activeAddr.countryFlag} ` : "";

    const savedListSelect = savedAddresses.length > 1
        ? `
            <label style="color: var(--neon-blue); margin-top: 0.35rem;">
                O elige otra dirección de tu historial:
                <select id="select-saved-address">
                    ${savedAddresses.map((addr, idx) => `
                        <option value="${idx}">
                            ${addr.recipient} — ${addr.street} ${addr.number || ""}, Col. ${addr.colony}, ${addr.city} (CP ${addr.zip})
                        </option>
                    `).join("")}
                </select>
            </label>
          `
        : "";

    box.innerHTML = `
        <section class="saved-address-card">
            <strong style="color: var(--neon-green); font-size: 0.85rem;">
                📍 Dirección de envío guardada automáticamente:
            </strong>
            <div class="saved-address-summary" id="active-address-preview">
                <strong>${activeAddr.recipient}</strong> • Tel: ${flagPrefix}${activeAddr.fullPhone || activeAddr.phone}<br>
                ${activeAddr.street} ${activeAddr.number || ""}, Col. ${activeAddr.colony}, CP ${activeAddr.zip}, ${activeAddr.city}, ${activeAddr.state}, ${activeAddr.country}
                ${activeAddr.refs && activeAddr.refs !== "Sin referencias adicionales" ? `<br><small style="color: var(--neon-yellow);">Ref: ${activeAddr.refs}</small>` : ""}
            </div>
            ${savedListSelect}
            <menu style="list-style: none; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                <li>
                    <button type="button" class="btn-neon-yellow" id="btn-edit-shipping" style="padding: 0.45rem 0.9rem; font-size: 0.78rem;">
                        ✏️ Cambiar / Editar dirección
                    </button>
                </li>
                <li>
                    <button type="button" class="btn-neon-pink" id="btn-new-shipping" style="padding: 0.45rem 0.9rem; font-size: 0.78rem;">
                        + Nueva dirección en blanco
                    </button>
                </li>
            </menu>
        </section>
    `;

    const selectHistory = document.getElementById("select-saved-address");
    if (selectHistory) {
        selectHistory.addEventListener("change", () => {
            const chosen = savedAddresses[parseInt(selectHistory.value, 10)];
            if (!chosen) return;
            fillShippingInputs(chosen);
            draftShipping = { ...chosen };
            localStorage.setItem("np_draftShipping", JSON.stringify(draftShipping));
            const chosenFlag = chosen.countryFlag ? `${chosen.countryFlag} ` : "";
            document.getElementById("active-address-preview").innerHTML = `
                <strong>${chosen.recipient}</strong> • Tel: ${chosenFlag}${chosen.fullPhone || chosen.phone}<br>
                ${chosen.street} ${chosen.number || ""}, Col. ${chosen.colony}, CP ${chosen.zip}, ${chosen.city}, ${chosen.state}, ${chosen.country}
            `;
        });
    }

    document.getElementById("btn-edit-shipping").addEventListener("click", () => {
        setShippingFieldsVisible(true);
        document.getElementById("ship-name")?.focus();
    });

    document.getElementById("btn-new-shipping").addEventListener("click", () => {
        fillShippingInputs({
            recipient: currentUser ? currentUser.name : "",
            lada: "+52 55",
            phone: "",
            country: "México",
            state: "",
            city: "",
            zip: "",
            colony: "",
            street: "",
            number: "",
            refs: ""
        });
        draftShipping = null;
        localStorage.removeItem("np_draftShipping");
        setShippingFieldsVisible(true);
        document.getElementById("ship-zip")?.focus();
    });
}

/* ==========================================================================
   FUNCIÓN PARA MOSTRAR / OCULTAR CONTRASEÑA (BOTÓN DE OJO)
   ========================================================================== */
window.togglePasswordVisibility = function(inputId, btnElement) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        btnElement.textContent = "🙈";
        btnElement.setAttribute("aria-label", "Ocultar contraseña");
    } else {
        input.type = "password";
        btnElement.textContent = "👁️";
        btnElement.setAttribute("aria-label", "Mostrar contraseña");
    }
};

/* ==========================================================================
   FUNCIONES DE MODALES (<dialog>)
   ========================================================================== */
function openModal(id) {
    const dialog = document.getElementById(id);
    if (dialog && !dialog.open) {
        dialog.showModal();
    }
}

function closeModal(id) {
    const dialog = document.getElementById(id);
    if (dialog && dialog.open) {
        dialog.close();
    }
}

/* ==========================================================================
   RENDERIZADO DE PRODUCTOS CON IMÁGENES, COLORES, TALLAS EN ROPA Y DETALLE
   ========================================================================== */
function createProductCard(product) {
    const article = document.createElement("article");
    article.className = "product-card";

    const colorOptions = product.colors
        .map(color => `<option value="${color}">${color}</option>`)
        .join("");

    const hasSizes = product.category === "ropa" && Array.isArray(product.sizes) && product.sizes.length > 0;
    const sizeSelectorHtml = hasSizes
        ? `
            <label class="color-picker-label">
                Talla disponible:
                <select class="color-select" id="size-card-${product.id}">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
                </select>
            </label>
          `
        : "";

    const badgeInfo = hasSizes
        ? `// ${product.category.toUpperCase()} • ${product.colors.length} COLORES • ${product.sizes.length} TALLAS`
        : `// ${product.category.toUpperCase()} • ${product.colors.length} OPCIONES`;

    article.innerHTML = `
        <figure>
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <figcaption>${badgeInfo}</figcaption>
        </figure>
        <section class="card-body">
            <h3>${product.name}</h3>
            <p>${product.shortDesc}</p>
            <label class="color-picker-label">
                Color / Variante disponible:
                <select class="color-select" id="color-card-${product.id}">
                    ${colorOptions}
                </select>
            </label>
            ${sizeSelectorHtml}
            <p class="price">$${product.price.toLocaleString("es-MX")} MXN</p>
        </section>
        <footer>
            <button type="button" class="btn-neon-blue" onclick="showProductDetail(${product.id})">Ver más</button>
            <button type="button" class="btn-neon-pink" onclick="addFromCard(${product.id})">+ Carrito</button>
        </footer>
    `;
    return article;
}

window.addFromCard = function(id) {
    const colorSelect = document.getElementById(`color-card-${id}`);
    const sizeSelect = document.getElementById(`size-card-${id}`);
    const selectedColor = colorSelect ? colorSelect.value : null;
    const selectedSize = sizeSelect ? sizeSelect.value : null;
    addToCart(id, selectedColor, selectedSize);
};

function renderCatalog() {
    const featuredGrid = document.getElementById("featured-products-grid");
    const allGrid = document.getElementById("all-products-grid");
    const servicesGrid = document.getElementById("services-grid");

    if (featuredGrid) {
        featuredGrid.innerHTML = "";
        PRODUCTS.slice(0, 6).forEach(p => featuredGrid.appendChild(createProductCard(p)));
    }

    if (allGrid) {
        const physicalProducts = PRODUCTS.filter(p => p.category !== "servicio");
        const renderFiltered = (filter = "todos") => {
            allGrid.innerHTML = "";
            const filtered = filter === "todos"
                ? physicalProducts
                : physicalProducts.filter(p => p.category === filter);
            filtered.forEach(p => allGrid.appendChild(createProductCard(p)));
        };
        renderFiltered();

        document.querySelectorAll(".filter-bar button").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-bar button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderFiltered(btn.dataset.filter);
            });
        });
    }

    if (servicesGrid) {
        servicesGrid.innerHTML = "";
        PRODUCTS.filter(p => p.category === "servicio").forEach(s => {
            servicesGrid.appendChild(createProductCard(s));
        });
    }
}

window.showProductDetail = function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const container = document.getElementById("detail-content");
    if (!product || !container) return;

    const colorOptions = product.colors
        .map(color => `<option value="${color}">${color}</option>`)
        .join("");

    const hasSizes = product.category === "ropa" && Array.isArray(product.sizes) && product.sizes.length > 0;
    const sizeSelectHtml = hasSizes
        ? `
            <label style="margin-bottom: 1rem;">
                Selecciona talla disponible (${product.sizes.length} tallas):
                <select id="detail-size-select">
                    ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
                </select>
            </label>
          `
        : "";

    container.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="detail-modal-img">
        <h4 style="color: var(--neon-blue); margin: 0.5rem 0;">${product.name}</h4>
        <p style="margin-bottom: 0.75rem;">${product.shortDesc}</p>
        <p style="background: var(--bg-card); padding: 0.85rem; border-left: 3px solid var(--neon-yellow); margin-bottom: 1rem;">
            <strong>Beneficio Ergonómico y Ficha Técnica:</strong><br>${product.specs}
        </p>
        <label style="margin-bottom: 1rem;">
            Selecciona color disponible (${product.colors.length} en stock):
            <select id="detail-color-select">${colorOptions}</select>
        </label>
        ${sizeSelectHtml}
        <p class="price" style="font-size: 1.4rem; color: var(--neon-green); margin-bottom: 1rem;">
            $${product.price.toLocaleString("es-MX")} MXN
        </p>
        <button type="button" class="btn-neon-pink" onclick="addFromDetail(${product.id})">
            Agregar al Carrito
        </button>
    `;
    openModal("modal-detail");
};

window.addFromDetail = function(id) {
    const colorSelect = document.getElementById("detail-color-select");
    const sizeSelect = document.getElementById("detail-size-select");
    const chosenColor = colorSelect ? colorSelect.value : null;
    const chosenSize = sizeSelect ? sizeSelect.value : null;
    addToCart(id, chosenColor, chosenSize);
    closeModal("modal-detail");
};

/* ==========================================================================
   MÉTODOS DE PAGO VISUALES (EMOJIS + LOGOS SVG) Y FICHA OXXO CON CÓDIGO DE BARRAS
   ========================================================================== */
function renderPaymentDetailsFor(method) {
    const container = document.getElementById("payment-details-fields");
    if (!container) return;

    if (method === "Tarjeta de Crédito / Débito") {
        container.innerHTML = `
            <p style="font-size:0.85rem; color:var(--neon-blue);">💳 Pago seguro con Tarjeta de Crédito o Débito</p>
            <label>Nombre del titular de la tarjeta * <input type="text" id="pay-card-holder" required placeholder="Como aparece en el plástico"></label>
            <label>Número de tarjeta (16 dígitos) * <input type="text" id="pay-card-number" required pattern="[0-9]{16}" maxlength="16" inputmode="numeric" placeholder="4532015112830366"></label>
            <section class="form-row-2">
                <label>Vencimiento (MM/AA) * <input type="text" id="pay-card-exp" required pattern="(0[1-9]|1[0-2])/[0-9]{2}" maxlength="5" inputmode="numeric" placeholder="09/29"></label>
                <label>
                    Código CVV *
                    <div class="password-field">
                        <input type="password" id="pay-card-cvv" required pattern="[0-9]{3,4}" maxlength="4" inputmode="numeric" placeholder="123">
                        <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('pay-card-cvv', this)" aria-label="Mostrar CVV">👁️</button>
                    </div>
                </label>
            </section>
        `;

        const expInput = document.getElementById("pay-card-exp");
        if (expInput) {
            expInput.addEventListener("input", (e) => {
                const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                if (digits.length >= 3) {
                    e.target.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                } else {
                    e.target.value = digits;
                }
            });
        }
    } else if (method === "Transferencia SPEI") {
        container.innerHTML = `
            <p style="font-size: 0.85rem; color: var(--neon-yellow);">🏦 CLABE Interbancaria NullPointer: <strong>012180001928374650</strong> (BBVA)</p>
            <section class="form-row-2">
                <label>Banco desde donde transfieres * <input type="text" id="pay-spei-bank" required placeholder="Ej. BBVA, Nu, Santander"></label>
                <label>Clave de rastreo / Últimos 4 dígitos * <input type="text" id="pay-spei-ref" required minlength="4" placeholder="Ej. 8841"></label>
            </section>
        `;
    } else if (method === "PayPal") {
        container.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.5rem; font-size:0.85rem; color:var(--neon-blue);">
                <span style="background:#fff; padding:2px 6px; border-radius:4px; display:inline-flex;">${PAYPAL_SVG_LOGO}</span>
                <span>Serás vinculado con tu cuenta <strong>PayPal</strong></span>
            </div>
            <label>Correo electrónico de tu cuenta PayPal * <input type="email" id="pay-paypal-email" required placeholder="usuario@paypal.com"></label>
        `;
    } else if (method === "Efectivo en OXXO") {
        if (!activeOxxoReference) {
            activeOxxoReference = generateOxxoReference();
        }
        const totalMxn = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
        container.innerHTML = buildOxxoSlipHtml(activeOxxoReference, totalMxn);
    } else {
        container.innerHTML = "";
    }
}

function initPaymentFields() {
    const methodSelect = document.getElementById("payment-method");
    const container = document.getElementById("payment-details-fields");
    if (!methodSelect || !container) return;

    const parentLabel = methodSelect.closest("label");
    if (parentLabel && !document.getElementById("visual-payment-grid")) {
        methodSelect.style.position = "absolute";
        methodSelect.style.opacity = "0";
        methodSelect.style.pointerEvents = "none";
        methodSelect.style.height = "1px";

        const grid = document.createElement("div");
        grid.id = "visual-payment-grid";
        grid.className = "payment-methods-grid";

        PAYMENT_OPTIONS_CONFIG.forEach(opt => {
            if (![...methodSelect.options].some(o => o.value === opt.value)) {
                const newOpt = document.createElement("option");
                newOpt.value = opt.value;
                newOpt.textContent = opt.label;
                methodSelect.appendChild(newOpt);
            }

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "payment-option-card";
            btn.dataset.payValue = opt.value;
            btn.innerHTML = `${opt.iconHtml}<span>${opt.label}</span>`;

            btn.addEventListener("click", () => {
                methodSelect.value = opt.value;
                grid.querySelectorAll(".payment-option-card").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                if (opt.value === "Efectivo en OXXO") {
                    activeOxxoReference = generateOxxoReference();
                }
                renderPaymentDetailsFor(opt.value);
            });

            grid.appendChild(btn);
        });

        parentLabel.appendChild(grid);
    }

    methodSelect.addEventListener("change", () => {
        renderPaymentDetailsFor(methodSelect.value);
    });
}

function updateCartUI(animate = false) {
    const countSpan = document.getElementById("cart-count");
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

    if (countSpan) {
        countSpan.textContent = totalItems;
        if (animate) {
            countSpan.classList.remove("cart-bump");
            void countSpan.offsetWidth;
            countSpan.classList.add("cart-bump");
            setTimeout(() => countSpan.classList.remove("cart-bump"), 300);
        }
    }

    const list = document.getElementById("cart-items-list");
    const totalSpan = document.getElementById("cart-total");
    if (!list || !totalSpan) return;

    list.innerHTML = "";
    let totalAmount = 0;

    if (cart.length === 0) {
        list.innerHTML = "<li>Tu carrito está vacío. Agrega equipo ergonómico o servicios.</li>";
    } else {
        cart.forEach((item, index) => {
            const subtotal = item.price * item.qty;
            totalAmount += subtotal;
            const productData = PRODUCTS.find(p => p.id === item.id);
            const imgSrc = item.image || (productData ? productData.image : "");
            const sizeBadge = item.size ? ` • <small style="color: var(--neon-green);">Talla: ${item.size}</small>` : "";

            const li = document.createElement("li");
            li.innerHTML = `
                <div class="cart-item-info">
                    <img src="${imgSrc}" alt="${item.name}" class="cart-item-img">
                    <span>
                        <strong>${item.name}</strong><br>
                        <small style="color: var(--neon-yellow);">Color: ${item.color}</small>${sizeBadge} • 
                        <small>$${item.price.toLocaleString("es-MX")} x ${item.qty}</small>
                    </span>
                </div>
                <menu style="list-style:none; display:flex; gap:0.4rem;">
                    <li><button type="button" class="btn-neon-blue" style="padding:0.25rem 0.6rem;" onclick="changeQty(${index}, -1)">-</button></li>
                    <li><button type="button" class="btn-neon-blue" style="padding:0.25rem 0.6rem;" onclick="changeQty(${index}, 1)">+</button></li>
                </menu>
            `;
            list.appendChild(li);
        });
    }
    totalSpan.textContent = `$${totalAmount.toLocaleString("es-MX")} MXN`;

    const methodSelect = document.getElementById("payment-method");
    if (methodSelect && methodSelect.value === "Efectivo en OXXO") {
        renderPaymentDetailsFor("Efectivo en OXXO");
    }
}

window.addToCart = function(id, chosenColor, chosenSize = null) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const color = chosenColor || product.colors[0];
    const hasSizes = product.category === "ropa" && Array.isArray(product.sizes) && product.sizes.length > 0;
    const size = hasSizes ? (chosenSize || product.sizes[0]) : null;

    const existing = cart.find(item =>
        item.id === id &&
        item.color === color &&
        (item.size || null) === size
    );

    if (existing) {
        existing.qty += 1;
        if (!existing.image) existing.image = product.image;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: color,
            size: size,
            qty: 1
        });
    }

    saveState();
    updateCartUI(true);
    showCartNotification(product, color, size);
};

window.changeQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    saveState();
    updateCartUI(false);
};

/* ==========================================================================
   CHECKOUT Y TICKET DE COMPRA (VALIDA CP REAL Y GENERA COMPROBANTE OXXO)
   ========================================================================== */
function initCheckout() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("⚠️ Debes iniciar sesión o crear una cuenta antes de confirmar tu pedido.");
            closeModal("modal-cart");
            renderAuthModal("login");
            openModal("modal-auth");
            return;
        }

        if (cart.length === 0) {
            alert("Tu carrito está vacío. Agrega al menos un producto.");
            return;
        }

        const zipValue = (document.getElementById("ship-zip")?.value || "").trim();
        const zipValid = (isCurrentZipValid && lastValidatedZip === zipValue)
            ? true
            : await verifyRealPostalCode(zipValue, true);

        if (!zipValid) {
            setShippingFieldsVisible(true);
            document.getElementById("ship-zip")?.focus();
            alert(`El código postal "${zipValue}" no es válido o no existe. Por favor ingresa un código postal real para continuar.`);
            return;
        }

        const shippingData = readShippingInputs();
        if (!isAddressComplete(shippingData)) {
            setShippingFieldsVisible(true);
            alert("Por favor completa todos los campos obligatorios de envío.");
            return;
        }

        const method = document.getElementById("payment-method")?.value || "";
        if (!method) {
            alert("Selecciona un método de pago antes de confirmar tu compra.");
            return;
        }

        let paymentInfo = method;
        let oxxoReferenceSaved = "";

        if (method === "Tarjeta de Crédito / Débito") {
            const cardNum = document.getElementById("pay-card-number")?.value || "";
            const holder = document.getElementById("pay-card-holder")?.value || "";
            paymentInfo = `💳 Tarjeta •••• ${cardNum.slice(-4)} (${holder})`;
        } else if (method === "Transferencia SPEI") {
            const bank = document.getElementById("pay-spei-bank")?.value || "";
            const ref = document.getElementById("pay-spei-ref")?.value || "";
            paymentInfo = `🏦 SPEI ${bank} • Ref: ${ref}`;
        } else if (method === "PayPal") {
            const ppEmail = document.getElementById("pay-paypal-email")?.value || "";
            paymentInfo = `PayPal (${ppEmail})`;
        } else if (method === "Efectivo en OXXO") {
            oxxoReferenceSaved = document.getElementById("pay-oxxo-ref")?.textContent || activeOxxoReference || generateOxxoReference();
            paymentInfo = `OXXO Pay • Ref: ${oxxoReferenceSaved}`;
        }

        if (!shippingData.refs) shippingData.refs = "Sin referencias adicionales";

        const alreadySaved = savedAddresses.some(a =>
            a.street === shippingData.street &&
            a.number === shippingData.number &&
            a.city === shippingData.city &&
            a.zip === shippingData.zip
        );
        if (!alreadySaved) {
            savedAddresses.unshift(shippingData);
        }

        const orderId = "NP-" + Math.floor(1000 + Math.random() * 9000);
        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        const now = new Date();
        const dateStr = now.toLocaleDateString("es-MX") + " " + now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
        const estDelivery = getEstimatedDeliveryDate(2);

        const newOrder = {
            id: orderId,
            userEmail: currentUser.email,
            date: dateStr,
            estimatedDelivery: estDelivery,
            items: [...cart],
            total: subtotal,
            paymentMethod: method,
            paymentInfo,
            oxxoReference: oxxoReferenceSaved,
            shipping: shippingData,
            statusStep: 2,
            events: [
                { time: dateStr, title: "Paquete en centro de clasificación NullPointer", location: `Hub Central — Rumbo a ${shippingData.city}` },
                {
                    time: dateStr,
                    title: method === "Efectivo en OXXO"
                        ? "Orden registrada (pendiente de pago en tienda OXXO)"
                        : "Pago aprobado y orden confirmada",
                    location: "Sistema Automatizado"
                }
            ]
        };

        orders[orderId] = newOrder;
        cart = [];
        activeOxxoReference = "";
        draftShipping = null;
        localStorage.removeItem("np_draftShipping");
        saveState();
        updateCartUI(false);

        document.getElementById("payment-method").value = "";
        document.getElementById("payment-details-fields").innerHTML = "";
        document.querySelectorAll(".payment-option-card").forEach(b => b.classList.remove("selected"));

        closeModal("modal-cart");
        showReceiptTicket(newOrder);
    });
}

window.showReceiptTicket = function(order) {
    const container = document.getElementById("ticket-printable");
    if (!order || !container) return;

    const rows = order.items.map(item => {
        const variantDetail = item.size ? `${item.color}, Talla ${item.size}` : item.color;
        return `
            <tr>
                <td>${item.qty}x ${item.name} (${variantDetail})</td>
                <td>$${(item.price * item.qty).toLocaleString("es-MX")}</td>
            </tr>
        `;
    }).join("");

    const flagPrefix = order.shipping.countryFlag ? `${order.shipping.countryFlag} ` : "";

    const secondOxxoTicketHtml = order.oxxoReference ? `
        <div style="margin: 1rem 0 0.5rem 0; border-top: 2px dashed #e2001a; padding-top: 1rem;">
            <p style="text-align:center; font-weight:800; color:#e2001a; margin-bottom:0.5rem;">
                ✂️ COMPROBANTE ADICIONAL DE PAGO EN CAJA OXXO
            </p>
            ${buildOxxoSlipHtml(order.oxxoReference, order.total)}
        </div>
    ` : "";

    container.innerHTML = `
        <h4>NULLPOINTER ERGONOMICS // TICKET</h4>
        <p><strong>Folio de Rastreo:</strong> ${order.id}</p>
        <p><strong>Fecha:</strong> ${order.date}</p>
        <p><strong>Cliente:</strong> ${order.shipping.recipient} (${flagPrefix}${order.shipping.fullPhone || order.shipping.phone})</p>
        <p><strong>Envío:</strong> ${order.shipping.street} ${order.shipping.number || ""}, Col. ${order.shipping.colony}, CP ${order.shipping.zip}, ${order.shipping.city}, ${order.shipping.state}, ${order.shipping.country}</p>
        <p><strong>Método de Pago:</strong> ${order.paymentInfo || order.paymentMethod}</p>
        <table>
            <thead>
                <tr><th>Concepto</th><th>Importe</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <p style="text-align:right; font-size:1rem;"><strong>TOTAL: $${order.total.toLocaleString("es-MX")} MXN</strong></p>
        <p style="text-align:center; margin-top:0.5rem;">Entrega estimada: <strong>${order.estimatedDelivery}</strong></p>
        ${secondOxxoTicketHtml}
    `;
    openModal("modal-ticket");
};

/* ==========================================================================
   RASTREO DE PEDIDOS
   ========================================================================== */
function initOrderTracker() {
    const trackerForm = document.getElementById("form-tracker");
    const resultBox = document.getElementById("tracker-result");
    if (!trackerForm || !resultBox) return;

    trackerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const codeInput = document.getElementById("tracking-input");
        const code = (codeInput?.value || "").trim().toUpperCase();
        const order = orders[code];

        if (!order) {
            resultBox.innerHTML = `
                <p style="color: var(--neon-pink); font-weight: bold;">
                    ⚠️ No se encontró ningún pedido con el folio "${code}". Verifica tu ticket de compra.
                </p>
            `;
            return;
        }

        const steps = [
            "Pedido Confirmado",
            "Preparando Equipo",
            "En Ruta de Entrega",
            "Entregado"
        ];

        const stepperHTML = steps.map((label, idx) => {
            const stepNum = idx + 1;
            let cls = "";
            if (stepNum < order.statusStep) cls = "completed";
            else if (stepNum === order.statusStep) cls = "active";
            return `
                <li class="${cls}">
                    <span class="step-dot">${stepNum < order.statusStep ? "✓" : stepNum}</span>
                    <strong>${label}</strong>
                </li>
            `;
        }).join("");

        const eventsHTML = order.events.map(ev => `
            <li>
                <time>${ev.time}</time>
                <strong>${ev.title}</strong>
                <small>${ev.location}</small>
            </li>
        `).join("");

        resultBox.innerHTML = `
            <article class="amazon-tracker-card">
                <header class="amazon-delivery-banner">
                    <div>
                        <h3>Llega el ${order.estimatedDelivery}</h3>
                        <p>Folio: <strong>${order.id}</strong> • Destinatario: ${order.shipping.recipient}</p>
                    </div>
                    <button type="button" class="btn-neon-yellow" onclick="showReceiptTicket(orders['${order.id}'])">
                        Ver Ticket
                    </button>
                </header>
                <ol class="amazon-stepper">${stepperHTML}</ol>
                <section class="amazon-timeline-box">
                    <h4>Historial de Movimientos</h4>
                    <ul class="amazon-events-list">${eventsHTML}</ul>
                </section>
            </article>
        `;
    });
}

/* ==========================================================================
   HISTORIAL DE PEDIDOS Y AUTENTICACIÓN (LOGIN / REGISTRO / RECUPERAR / CAMBIAR)
   ========================================================================== */
function renderOrdersHistory() {
    const list = document.getElementById("orders-history-list");
    if (!list) return;

    const allOrders = Object.values(orders).reverse();
    if (allOrders.length === 0) {
        list.innerHTML = "<li>Aún no tienes pedidos registrados.</li>";
        return;
    }

    list.innerHTML = allOrders.map(ord => `
        <li>
            <div>
                <strong style="color: var(--neon-yellow);">${ord.id}</strong> • <small>${ord.date}</small><br>
                <span>Total: $${ord.total.toLocaleString("es-MX")} MXN (${ord.items.length} artículos)</span>
            </div>
            <button type="button" class="btn-neon-blue" onclick="closeModal('modal-orders'); showReceiptTicket(orders['${ord.id}'])">
                ${ord.oxxoReference ? "Ticket + OXXO" : "Ticket"}
            </button>
        </li>
    `).join("");
}

function updateAuthUI() {
    const btnUser = document.getElementById("btn-open-auth");
    if (!btnUser) return;
    btnUser.textContent = currentUser ? `👤 ${currentUser.name.split(" ")[0]}` : "Iniciar Sesión";
}

function renderAuthModal(mode = "login") {
    const container = document.getElementById("auth-forms-container");
    if (!container) return;

    if (currentUser) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:1.25rem;">
                <p>Sesión iniciada como <strong style="color:var(--neon-green);">${currentUser.name}</strong> (${currentUser.email})</p>

                <form class="stacked-form" id="change-pass-form">
                    <h4 style="color:var(--neon-yellow);">Cambiar Contraseña</h4>
                    <label>
                        Contraseña actual *
                        <div class="password-field">
                            <input type="password" id="old-pass" required placeholder="••••••••">
                            <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('old-pass', this)" aria-label="Mostrar contraseña">👁️</button>
                        </div>
                    </label>
                    <label>
                        Nueva contraseña (mín. 6 caracteres) *
                        <div class="password-field">
                            <input type="password" id="new-pass" required minlength="6" placeholder="••••••••">
                            <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('new-pass', this)" aria-label="Mostrar contraseña">👁️</button>
                        </div>
                    </label>
                    <button type="submit" class="btn-neon-yellow">Actualizar Contraseña</button>
                </form>

                <hr style="border-color:var(--border-subtle);">

                <button type="button" class="btn-neon-pink" id="btn-logout">Cerrar Sesión</button>
            </div>
        `;
        return;
    }

    if (mode === "register") {
        container.innerHTML = `
            <form class="stacked-form" id="register-form">
                <h4 style="color:var(--neon-yellow);">Crear Cuenta Nueva</h4>
                <label>Nombre completo * <input type="text" id="reg-name" required minlength="3" placeholder="Grace Hopper"></label>
                <label>Correo electrónico * <input type="email" id="reg-email" required placeholder="grace@nullpointer.io"></label>
                <label>
                    Contraseña (mín. 6 caracteres) *
                    <div class="password-field">
                        <input type="password" id="reg-pass" required minlength="6" placeholder="••••••••">
                        <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('reg-pass', this)" aria-label="Mostrar contraseña">👁️</button>
                    </div>
                </label>
                <menu class="hero-actions">
                    <li><button type="submit" class="btn-neon-yellow">Registrarme</button></li>
                    <li><button type="button" class="btn-neon-blue" id="btn-switch-login">Ya tengo cuenta</button></li>
                </menu>
            </form>
        `;
        return;
    }

    if (mode === "recover") {
        container.innerHTML = `
            <form class="stacked-form" id="recover-form">
                <h4 style="color:var(--neon-pink);">Restablecer Contraseña</h4>
                <p style="font-size:0.85rem; color:var(--text-muted);">Ingresa tu correo registrado para asignar una nueva contraseña:</p>
                <label>Correo electrónico * <input type="email" id="rec-email" required placeholder="dev@nullpointer.io"></label>
                <label>
                    Nueva contraseña (mín. 6 caracteres) *
                    <div class="password-field">
                        <input type="password" id="rec-pass" required minlength="6" placeholder="••••••••">
                        <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('rec-pass', this)" aria-label="Mostrar contraseña">👁️</button>
                    </div>
                </label>
                <menu class="hero-actions">
                    <li><button type="submit" class="btn-neon-pink">Restablecer Contraseña</button></li>
                    <li><button type="button" class="btn-neon-blue" id="btn-switch-login">← Volver</button></li>
                </menu>
            </form>
        `;
        return;
    }

    container.innerHTML = `
        <form class="stacked-form" id="login-form">
            <h4 style="color:var(--neon-blue);">Iniciar Sesión</h4>
            <label>Correo electrónico * <input type="email" id="login-email" required placeholder="dev@nullpointer.io"></label>
            <label>
                Contraseña *
                <div class="password-field">
                    <input type="password" id="login-pass" required placeholder="••••••••">
                    <button type="button" class="btn-toggle-eye" onclick="togglePasswordVisibility('login-pass', this)" aria-label="Mostrar contraseña">👁️</button>
                </div>
            </label>
            <menu class="hero-actions">
                <li><button type="submit" class="btn-neon-blue">Entrar</button></li>
                <li><button type="button" class="btn-neon-yellow" id="btn-switch-register">Crear Cuenta</button></li>
                <li><button type="button" class="btn-neon-pink" id="btn-switch-recover">Olvidé mi contraseña</button></li>
            </menu>
        </form>
    `;
}

function initAuthDelegation() {
    const container = document.getElementById("auth-forms-container");
    if (!container) return;

    container.addEventListener("click", (e) => {
        if (e.target.id === "btn-switch-register") {
            renderAuthModal("register");
            setTimeout(() => document.getElementById("reg-name")?.focus(), 20);
        } else if (e.target.id === "btn-switch-login") {
            renderAuthModal("login");
            setTimeout(() => document.getElementById("login-email")?.focus(), 20);
        } else if (e.target.id === "btn-switch-recover") {
            renderAuthModal("recover");
            setTimeout(() => document.getElementById("rec-email")?.focus(), 20);
        } else if (e.target.id === "btn-logout") {
            currentUser = null;
            cart = [];
            orders = {};
            savedAddresses = [];
            draftShipping = null;
            activeOxxoReference = "";
            isCurrentZipValid = false;
            lastValidatedZip = "";

            localStorage.removeItem("np_currentUser");
            localStorage.removeItem("np_cart");
            localStorage.removeItem("np_orders");
            localStorage.removeItem("np_savedAddresses");
            localStorage.removeItem("np_draftShipping");
            localStorage.removeItem("np_lastShipping");

            const checkoutForm = document.getElementById("checkout-form");
            if (checkoutForm) checkoutForm.reset();

            const paymentDetails = document.getElementById("payment-details-fields");
            if (paymentDetails) paymentDetails.innerHTML = "";

            fillShippingInputs(null);
            setShippingFieldsVisible(true);
            renderSavedShippingOption();

            const trackerResult = document.getElementById("tracker-result");
            if (trackerResult) trackerResult.innerHTML = "";

            updateAuthUI();
            updateCartUI(false);
            renderOrdersHistory();
            closeModal("modal-auth");
        }
    });

    container.addEventListener("submit", (e) => {
        e.preventDefault();

        if (e.target.id === "login-form") {
            const email = document.getElementById("login-email").value.trim().toLowerCase();
            const pass = document.getElementById("login-pass").value;
            const found = users.find(u => u.email === email && u.password === pass);

            if (!found) {
                alert("Correo o contraseña incorrectos.");
                return;
            }
            currentUser = found;
            saveState();
            updateAuthUI();
            closeModal("modal-auth");

            if (cart.length > 0) {
                renderSavedShippingOption();
                openModal("modal-cart");
            }
        } else if (e.target.id === "register-form") {
            const name = document.getElementById("reg-name").value.trim();
            const email = document.getElementById("reg-email").value.trim().toLowerCase();
            const password = document.getElementById("reg-pass").value;

            if (users.some(u => u.email === email)) {
                alert("Este correo ya está registrado.");
                return;
            }
            const newUser = { name, email, password };
            users.push(newUser);
            currentUser = newUser;
            saveState();
            updateAuthUI();
            closeModal("modal-auth");

            if (cart.length > 0) {
                renderSavedShippingOption();
                openModal("modal-cart");
            }
        } else if (e.target.id === "recover-form") {
            const email = document.getElementById("rec-email").value.trim().toLowerCase();
            const newPass = document.getElementById("rec-pass").value;
            const user = users.find(u => u.email === email);

            if (!user) {
                alert("No encontramos ninguna cuenta con ese correo.");
                return;
            }
            user.password = newPass;
            saveState();
            alert("Contraseña actualizada. Ya puedes iniciar sesión.");
            renderAuthModal("login");
        } else if (e.target.id === "change-pass-form") {
            const oldPass = document.getElementById("old-pass").value;
            const newPass = document.getElementById("new-pass").value;

            if (oldPass !== currentUser.password) {
                alert("La contraseña actual es incorrecta.");
                return;
            }

            currentUser.password = newPass;
            const idx = users.findIndex(u => u.email === currentUser.email);
            if (idx !== -1) {
                users[idx].password = newPass;
            }
            saveState();
            alert("Contraseña actualizada correctamente.");
            e.target.reset();
        }
    });
}

/* ==========================================================================
   FORMULARIO DE CONTACTO
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById("contact-form");
    const output = document.getElementById("contact-feedback");
    if (!form || !output) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const nombre = data.get("nombre");
        const lada = data.get("lada") || "";
        const telefono = data.get("telefono") || "";
        const telFlag = detectFlagFromPhone(`${lada} ${telefono}`);
        const ticketSoporte = "SUP-" + Math.floor(1000 + Math.random() * 9000);

        output.innerHTML = `
            <div style="margin-top:1rem; padding:1rem; border:1px solid var(--neon-green); background:rgba(57,255,20,0.12); border-radius:8px; color:var(--text-main);">
                <strong style="color:var(--neon-green);">✓ Solicitud recibida con éxito (${ticketSoporte})</strong><br>
                Gracias, <strong>${nombre}</strong>. Un especialista en ergonomía responderá a <strong>${data.get("correo")}</strong> o al <strong>${telFlag} ${lada} ${telefono}</strong> en menos de 24 horas.
            </div>
        `;
        form.reset();
        updatePhoneFlag(form.querySelector('input[type="tel"]'), form.querySelector('select[name="lada"]'));
    });
}

/* ==========================================================================
   PANTALLA DE BIENVENIDA ANIMADA AL ENTRAR A LA PÁGINA
   ========================================================================== */
function initWelcomeSplash() {
    if (sessionStorage.getItem("np_splash_shown")) return;
    sessionStorage.setItem("np_splash_shown", "true");

    const splash = document.createElement("div");
    splash.className = "np-welcome-splash";
    splash.setAttribute("role", "status");
    splash.innerHTML = `
        <div class="np-splash-orb">
            <svg width="64" height="54" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <linearGradient id="np-splash-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stop-color="#00f5ff"/>
                        <stop offset="50%" stop-color="#ff2a85"/>
                        <stop offset="100%" stop-color="#ffe600"/>
                    </linearGradient>
                </defs>
                <path d="M58 22 C74 22, 92 31, 98 44 C101 51, 94 58, 82 58 L72 58 C78 55, 86 52, 87 48 L75 48 C73 48, 72 45, 75 45 L88 45 C87 38, 76 31, 63 31 L58 38 L58 22 Z" fill="url(#np-splash-grad)"/>
                <circle cx="81" cy="39" r="3.5" fill="#06050e"/>
                <path d="M58 28 C34 28, 14 45, 14 68 C14 85, 27 95, 42 95 C55 95, 64 86, 64 75 C64 66, 57 60, 49 60 C42 60, 38 65, 38 71 C38 76, 42 79, 46 79 C49 79, 51 77, 51 74 C51 72, 49 71, 47 71 C46 71, 45 72, 45 73" stroke="url(#np-splash-grad)" stroke-width="8.5" stroke-linecap="round" fill="none"/>
                <path d="M58 46 L48 56 L58 63" stroke="url(#np-splash-grad)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <path d="M40 65 L104 65 L95 62 L44 62 Z" fill="url(#np-splash-grad)"/>
            </svg>
        </div>
        <h2 class="np-splash-title">Null<span>Pointer &lt;/&gt;</span></h2>
        <p class="np-splash-sub">// INICIALIZANDO ENTORNO CYBER-ERGONÓMICO...</p>
        <div class="np-splash-bar">
            <div class="np-splash-bar-fill"></div>
        </div>
    `;

    document.body.appendChild(splash);

    setTimeout(() => {
        splash.classList.add("splash-exit");
        setTimeout(() => splash.remove(), 650);
    }, 1550);
}

/* ==========================================================================
   INICIALIZACIÓN GLOBAL
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initWelcomeSplash();
    initCookieAndPrivacyBanner();
    renderCatalog();
    updateCartUI(false);
    updateAuthUI();
    initLocationAutocompleteAndZipValidation();
    initShippingAutoSave();
    initPhoneCountryDetectors();
    initPaymentFields();
    initCheckout();
    initOrderTracker();
    initAuthDelegation();
    initContactForm();

    document.getElementById("btn-open-cart")?.addEventListener("click", () => {
        renderSavedShippingOption();
        openModal("modal-cart");
    });

    document.getElementById("btn-open-orders")?.addEventListener("click", () => {
        renderOrdersHistory();
        openModal("modal-orders");
    });

    document.getElementById("btn-open-auth")?.addEventListener("click", () => {
        renderAuthModal("login");
        openModal("modal-auth");
    });
});