export const buildingsData = {
    palacio: {
        id: 'palacio',
        coords: [-25.2772, -57.6377],
        year: '1892',
        model3d: '/palacio.glb',
        audio: '/audio/palacio.mp3',
        pdf: { es: '/docs/palacio_es.pdf', en: '/docs/palacio_en.pdf' },
        thumbnail: '/img/palacio-1.jpg',
        gallery: ['/img/palacio-1.jpg', '/img/palacio-2.jpg', '/img/palacio-3.jpg'],
        es: {
            style: "Neoclásico / Palladiano",
            title: "Palacio de los López",
            subtitle: "Sede del Poder Ejecutivo • Arq. Alonso Taylor",
            desc: "FICHA TÉCNICA:\n• Arquitecto: Alonso Taylor (Inglés) / Colaboración de Alejandro Ravizza (Italiano).\n• Materialidad: Ladrillo cocido, maderas nobles, hierro forjado.\n• Horarios de visita: Acceso interior restringido, solo con visitas guiadas. Vista exterior 24/7.\n• Acceso: Gratuito.\n\nEl Palacio de los López constituye el ejemplo más emblemático de la arquitectura civil paraguaya del siglo XIX. Su esquema compositivo presenta una marcada influencia del neoclasicismo europeo, destacándose su simetría axial, la galería de doble altura con arcos de medio punto y la emblemática torre-mirador central. La intervención de constructores europeos dejó su impronta en los detalles ornamentales y la resolución estructural, adaptando cánones clásicos al clima local.",
            arTooltip: "Torre Principal",
            arTooltipDesc: "Diseñada originalmente para vigilar la bahía de Asunción."
        },
        en: {
            style: "Neoclassical / Palladian",
            title: "Palacio de los López",
            subtitle: "Executive Branch HQ • Arch. Alonso Taylor",
            desc: "TECHNICAL SHEET:\n• Architect: Alonso Taylor (English) / Collaboration by Alejandro Ravizza (Italian).\n• Materials: Baked brick, fine woods, wrought iron.\n• Visiting hours: Interior access restricted, only with guided tours. Exterior view available 24/7.\n• Access: Free.\n\nThe López Palace is the most emblematic example of 19th-century Paraguayan civil architecture. Its composition shows a strong European neoclassical influence, highlighting its axial symmetry, double-height gallery with semi-circular arches, and the central watchtower. European builders adapted classical canons to local materials and climate.",
            arTooltip: "Main Tower",
            arTooltipDesc: "Originally designed to watch over the bay of Asunción."
        },
        images: [
            { year: "1868", url: "/img/palacio-5.jpg", desc_es: "Los barcos brasileños llegaron a la bahía y bombardearon el palacio.", desc_en: "Brazilian ships arrived at the Bay and bombarded the palace." },
            { year: "1892", url: "/img/palacio-4.jpg", desc_es: "Vista de la fachada posterior hacia la bahía.", desc_en: "View of the rear facade facing the bay." }
        ]
    },
    panteon: {
        id: 'panteon',
        coords: [-25.2818, -57.6350],
        year: '1863',
        model3d: '/panteon.glb',
        audio: '/audio/panteon.mp3',
        pdf: { es: '/docs/panteon_es.pdf', en: '/docs/panteon_en.pdf' },
        thumbnail: '/img/panteon-1.jpg',
        gallery: ['/img/panteon-1.jpg', '/img/panteon-2.jpg', '/img/panteon-3.jpg'],
        es: {
            style: "Neoclásico / Ecléctico",
            title: "Panteón de los Héroes",
            subtitle: "Oratorio de la Virgen • Arq. Alejandro Ravizza",
            desc: "FICHA TÉCNICA:\n• Arquitecto: Alejandro Ravizza (Italia).\n• Sistema Estructural: Muros portantes y cúpula sobre tambor.\n• Horarios de visita: Martes a Domingo (07:00 - 17:00 hrs).\n• Costo: Acceso gratuito.\n\nInspirado arquitectónicamente en Les Invalides de París, el edificio plantea una planta centralizada coronada por una imponente cúpula que domina el perfil del microcentro asunceno. Su construcción fue interrumpida durante décadas por la Guerra de la Triple Alianza, siendo finalizado recién en 1936. Destaca la riqueza de los detalles de estuco en su interior y la resolución del tambor que permite el ingreso de luz cenital, creando una atmósfera de solemnidad monumental.",
            arTooltip: "Cúpula Principal",
            arTooltipDesc: "Diseñada originalmente por Alejandro Ravizza, inspirada en Les Invalides."
        },
        en: {
            style: "Neoclassical / Eclectic",
            title: "Pantheon of the Heroes",
            subtitle: "Virgin's Oratory • Arch. Alejandro Ravizza",
            desc: "TECHNICAL SHEET:\n• Architect: Alejandro Ravizza (Italy).\n• Structural System: Load-bearing walls and dome on drum.\n• Visiting hours: Tuesday to Sunday (07:00 - 17:00 hrs).\n• Cost: Free admission.\n\nArchitecturally inspired by Les Invalides in Paris, the building features a centralized plan crowned by an imposing dome that dominates downtown Asunción. Its construction was interrupted for decades by the Triple Alliance War, finally being completed in 1936. It stands out for its interior stucco details and zenithal lighting.",
            arTooltip: "Main Dome",
            arTooltipDesc: "Originally designed by Alejandro Ravizza, inspired by Les Invalides."
        },
        images: [
            { year: "1890", url: "/img/panteon-4.jpg", desc_es: "Estructura inconclusa durante 70 años.", desc_en: "Unfinished structure for 70 years." },
            { year: "1936", url: "/img/panteon-5.jpg", desc_es: "Finalización de la cúpula e inauguración oficial.", desc_en: "Dome completion and official inauguration." }
        ]
    },
    estacion: {
        id: 'estacion',
        coords: [-25.2850, -57.6292],
        year: '1861',
        model3d: '/estacion.glb',
        audio: '/audio/estacion.mp3',
        pdf: { es: '/docs/estacion_es.pdf', en: '/docs/estacion_en.pdf' },
        thumbnail: '/img/ferrocarril-1.jpg',
        gallery: ['/img/ferrocarril-1.jpg', '/img/ferrocarril-2.jpg', '/img/ferrocarril-3.jpg'],
        es: {
            style: "Industrial / Ecléctico",
            title: "Estación del Ferrocarril",
            subtitle: "Estación Central San Francisco",
            desc: "FICHA TÉCNICA:\n• Arquitectos: Alonso Taylor y John Whitehead (Inglaterra).\n• Materialidad: Ladrillo a la vista, armaduras de hierro estructural.\n• Horarios de visita: Lunes a Viernes (08:00 - 16:00 hrs).\n• Acceso: Gratuito.\n\nRepresenta la llegada de la Revolución Industrial a Paraguay. La Estación Central se distingue por ser uno de los primeros edificios en Sudamérica en emplear estructuras metálicas de gran luz para cubrir los andenes, importadas directamente desde fundiciones británicas. Su fachada principal, sin embargo, mantiene un rigor académico con proporciones clásicas, logrando una transición armoniosa entre el lenguaje institucional urbano y la tipología de infraestructura de transporte.",
            arTooltip: "Locomotora Encarnación",
            arTooltipDesc: "Una de las primeras máquinas a vapor."
        },
        en: {
            style: "Industrial / Eclectic",
            title: "Railway Station",
            subtitle: "San Francisco Central Station",
            desc: "TECHNICAL SHEET:\n• Architects: Alonso Taylor and John Whitehead (England).\n• Materials: Exposed brick, structural iron trusses.\n• Visiting hours: Monday to Friday (08:00 - 16:00 hrs).\n• Access: Free.\n\nRepresenting the arrival of the Industrial Revolution in Paraguay, this was one of the first buildings in South America to use large-span metal structures for its platforms, imported directly from British foundries. Its main facade maintains academic rigor with classical proportions.",
            arTooltip: "Encarnación Locomotive",
            arTooltipDesc: "One of the first steam engines."
        },
        images: [
            { year: "1861", url: "/img/ferrocarril-4.jpg", desc_es: "Llegada de la primera locomotora a vapor.", desc_en: "Arrival of the first steam locomotive." },
            { year: "1900", url: "/img/ferrocarril-5.jpg", desc_es: "Estructura metálica del andén principal.", desc_en: "Metal structure of the main platform." }
        ]
    }
};

export const uiContent = {
    es: {
        langBtn: "EN",
        homeTitle: "Memoria Construida",
        homeSub: "Explora el patrimonio arquitectónico",
        explore: "Explorar Edificios",
        audioBtn: "Escuchar historia",
        audioSub: "1:20 min • Resumen inmersivo",
        history: "Evolución Histórica",
        tools: "Herramientas Premium",
        pro1Title: "1. Guía Arquitectónica PDF",
        pro2Title: "2. Planos Originales",
        pro3Title: "3. Cortes Interiores 3D",
        arBtn: "Ver en Sitio",
        profileTitle: "Tu Perfil",
        appPromoTitle: "Suscripción Premium",
        appPromoDesc: "Accede a e-books, descargas y contenido exclusivo por un pago único de Gs. 40.000 (o $6.5 USD).",
        downloadBtn: "Pagar por WhatsApp (SIPAP)",
        notesTitle: "Mis Notas",
        notesPlaceholder: "Escribe tus apuntes, medidas o ideas sobre este edificio aquí. Se guardarán automáticamente en tu dispositivo...",
        demoTitle: "Versión Demo (V1.1)",
        demoDesc: "Estamos trabajando constantemente para mejorar tu experiencia interactiva.",

        // --- TRADUCCIONES DE AUTH Y PERFIL ---
        authLoginTitle: "Iniciar Sesión",
        authRegTitle: "Crear Cuenta",
        authLoginSub: "Accede a tus recorridos y e-books.",
        authRegSub: "Únete a la comunidad de Tekohapp.",
        authEmail: "Correo electrónico",
        authPass: "Contraseña (mín. 6 caracteres)",
        authName: "Nombre",
        authLastName: "Apellido",
        authNick: "Nickname (Opcional)",
        authBtnLogin: "Entrar",
        authBtnReg: "Registrarme",
        authNoAccount: "¿No tienes cuenta? Regístrate aquí.",
        authYesAccount: "¿Ya tienes cuenta? Inicia sesión.",
        authLoading: "Cargando...",
        profNotes: "Notas Creadas",
        profMember: "Miembro desde",
        profPremium: "Suscripción Premium",
        profFree: "Cuenta Gratuita",
        profUpgrade: "Hacerse Premium",
        profLogout: "Cerrar Sesión",
        supportTitle: "Soporte y Sugerencias",
        supportDesc: "¿Quieres agregar tu edificio, reportar un error o necesitas ayuda? Contáctanos."
    },
    en: {
        langBtn: "ES",
        homeTitle: "Built Memory",
        homeSub: "Explore architectural heritage",
        explore: "Explore Buildings",
        audioBtn: "Listen to history",
        audioSub: "1:20 min • Immersive summary",
        history: "Historical Evolution",
        tools: "Premium Tools",
        pro1Title: "1. Architectural PDF Guide",
        pro2Title: "2. Original Blueprints",
        pro3Title: "3. 3D Interior Sections",
        arBtn: "View on Site",
        profileTitle: "Your Profile",
        appPromoTitle: "Premium Subscription",
        appPromoDesc: "Access e-books, downloads, and exclusive content for a one-time payment of 40,000 Gs (or $6.5 USD).",
        downloadBtn: "Pay via WhatsApp (SIPAP)",
        notesTitle: "My Notes",
        notesPlaceholder: "Write your notes, measurements, or ideas about this building here. They will save automatically on your device...",
        demoTitle: "Demo Version (V1.1)",
        demoDesc: "We are constantly working to improve your interactive experience.",

        // --- TRADUCCIONES DE AUTH Y PERFIL ---
        authLoginTitle: "Log In",
        authRegTitle: "Create Account",
        authLoginSub: "Access your tours and e-books.",
        authRegSub: "Join the Tekohapp community.",
        authEmail: "Email address",
        authPass: "Password (min. 6 characters)",
        authName: "First Name",
        authLastName: "Last Name",
        authNick: "Nickname (Optional)",
        authBtnLogin: "Sign In",
        authBtnReg: "Register",
        authNoAccount: "Don't have an account? Sign up here.",
        authYesAccount: "Already have an account? Log in.",
        authLoading: "Loading...",
        profNotes: "Notes Created",
        profMember: "Member since",
        profPremium: "Premium Subscription",
        profFree: "Free Account",
        profUpgrade: "Upgrade to Premium",
        profLogout: "Log Out",
        supportTitle: "Support & Feedback",
        supportDesc: "Want to add a building, report a bug, or need help? Contact us."
    }
};