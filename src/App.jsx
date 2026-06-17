import { useState, useRef, useEffect, Suspense } from 'react';
import { Map as MapIcon, Lock, Play, Pause, ChevronLeft, X, ChevronRight, Search, Home, User, Smartphone, Maximize, Minimize, LogOut, Clock, FileText, CheckCircle2, MessageCircle, Mail } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { buildingsData, uiContent } from './data';
import { supabase } from './supabaseClient';

const brand = {
  bg: "bg-[#F3EBE1]",
  primary: "bg-[#823A30]",
  textPrimary: "text-[#823A30]",
  textDark: "text-stone-800",
  textMuted: "text-stone-500",
  card: "bg-white",
  border: "border-stone-200"
};

function BuildingModel({ url }) {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1} position={[0, 0.3, 0]} />;
  } catch (error) {
    return (
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 2.5, 1.5]} />
        <meshStandardMaterial color="#823A30" />
      </mesh>
    );
  }
}

function BuildingViewer({ modelUrl, isFullscreen, toggleFullscreen }) {
  return (
    <div className={isFullscreen ? "absolute inset-0 z-50 w-full h-[100dvh] bg-[#EAE1D5]" : "w-full h-[45vh] bg-[#EAE1D5] relative"}>
      <button
        onClick={toggleFullscreen}
        className={`absolute z-50 p-2 bg-white/50 backdrop-blur-md rounded-full ${brand.textDark} border border-stone-300 shadow-sm active:scale-95 transition-transform ${isFullscreen ? 'top-12 right-5' : 'top-4 right-4'}`}
      >
        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
      </button>

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <Suspense fallback={<mesh position={[0, 0.5, 0]}><boxGeometry args={[1.5, 2.5, 1.5]} /><meshStandardMaterial color="#D9CFC1" /></mesh>}>
          <BuildingModel url={modelUrl} />
        </Suspense>
        <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={10} blur={2} />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

const getCustomIcon = (isActive) => {
  const bgColor = isActive ? '#823A30' : 'white';
  const strokeColor = isActive ? 'white' : '#823A30';
  const ping = isActive ? '<div class="absolute w-12 h-12 rounded-full animate-ping opacity-40 bg-[#823A30] left-[-4px] top-[-4px]"></div>' : '';

  return L.divIcon({
    className: 'custom-map-icon',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        ${ping}
        <div style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2); border: 2px solid #823A30; background-color: ${bgColor}; transition: all 0.3s;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${isActive ? 'white' : 'none'}" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

function MapScreen({ lang, goToBuilding }) {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="flex-1 relative w-full h-full overflow-hidden z-0">
      <div className="absolute top-10 w-full flex justify-center z-[500] pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200">
          <p className={`text-xs font-bold ${brand.textPrimary} tracking-widest uppercase select-none`}>
            {lang === 'es' ? 'Explora Asunción' : 'Explore Asunción'}
          </p>
        </div>
      </div>

      <MapContainer center={[-25.281, -57.634]} zoom={15.5} className="absolute inset-0 z-0" zoomControl={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; OpenStreetMap' />
        {Object.values(buildingsData).map(b => (
          b.coords && (
            <Marker key={b.id} position={b.coords} icon={getCustomIcon(activePin === b.id)} eventHandlers={{ click: () => setActivePin(b.id) }} />
          )
        ))}
      </MapContainer>

      {activePin && (
        <div className="absolute bottom-28 w-full px-5 z-[500] animate-in slide-in-from-bottom-10 duration-300">
          <div className={`${brand.card} border ${brand.border} rounded-3xl p-4 flex gap-4 shadow-xl items-center relative overflow-hidden`}>
            <img src={buildingsData[activePin].thumbnail} className="w-20 h-20 rounded-2xl object-cover shadow-sm pointer-events-none select-none" alt="" draggable="false" onContextMenu={(e) => e.preventDefault()} />
            <div className="flex-1">
              <h4 className={`font-bold text-lg leading-tight mb-1 ${brand.textDark} select-none`}>{buildingsData[activePin][lang].title}</h4>
              <p className={`text-xs ${brand.textMuted} mb-3 select-none`}>{buildingsData[activePin].year}</p>
              <button onClick={() => goToBuilding(activePin)} className={`${brand.primary} text-white text-xs font-bold py-2 px-4 rounded-full w-full active:scale-95 transition-transform`}>
                {lang === 'es' ? 'Visitar Edificio' : 'Visit Building'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BuildingCard({ building, lang, onSelect }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        let nextScroll = scrollLeft + clientWidth;
        if (nextScroll >= scrollWidth - 10) nextScroll = 0;
        scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' });
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${brand.card} ${brand.border} border rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 flex flex-col`}>
      <div className="h-48 w-full relative">
        <div className={`absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm ${brand.textPrimary} select-none`}>{building[lang].style}</div>
        <div ref={scrollRef} className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth">
          {building.gallery.map((img, index) => <img key={index} src={img} className="w-full h-full object-cover flex-shrink-0 snap-center pointer-events-none select-none" alt="img" draggable="false" onContextMenu={(e) => e.preventDefault()} />)}
        </div>
      </div>
      <div className="p-5 flex justify-between items-end relative z-10">
        <div className="pr-4"><h4 className={`font-bold text-xl mb-1 leading-tight ${brand.textDark} select-none`}>{building[lang].title}</h4><p className={`text-xs ${brand.textMuted} leading-relaxed select-none`}>{building.year} • {building[lang].subtitle.split('•')[0]}</p></div>
        <button onClick={() => onSelect(building.id)} className={`${brand.primary} text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md active:scale-95 transition-transform`}><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState('es');
  const ui = uiContent[lang];

  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);

  const [showPromoModal, setShowPromoModal] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [is3DFullscreen, setIs3DFullscreen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // AUTH
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [authNickname, setAuthNickname] = useState('');

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [buildingNote, setBuildingNote] = useState('');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) checkPremiumStatus(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkPremiumStatus(session.user.id);
      } else {
        setIsPremium(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkPremiumStatus = async (userId) => {
    const { data } = await supabase.from('profiles').select('is_premium').eq('id', userId).single();
    if (data) setIsPremium(data.is_premium);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      if (authMode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              first_name: authFirstName,
              last_name: authLastName,
              nickname: authNickname
            }
          }
        });
        if (error) throw error;
        alert(lang === 'es' ? '¡Registro exitoso! Ya puedes iniciar sesión.' : 'Registration successful! You can now log in.');
        setAuthMode('login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) throw error;
        setShowAuthModal(false);
      }
    } catch (error) { setAuthError(error.message); }
    finally { setAuthLoading(false); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setShowAuthModal(false);
  };

  const handleWhatsAppUpgrade = () => {
    const phoneNumber = "595971181962";
    const message = `¡Hola! Quiero activar mi Suscripción Premium en Tekohapp 🏛️✨\n\nMi correo de registro es: ${user?.email || "NO_LOGUEADO"}\n\nPor favor, envíame los datos para la transferencia SIPAP de Gs. 40.000 (USD 6.5).`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowPromoModal(false);
  };

  const toggleAudio = () => {
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    setIsPlaying(false);
    setIs3DFullscreen(false);
    if (selectedBuildingId && user && isPremium) {
      const savedNote = localStorage.getItem(`tekohapp_note_${user.id}_${selectedBuildingId}`);
      setBuildingNote(savedNote || '');
    }
  }, [selectedBuildingId, lang, user, isPremium]);

  const saveNote = (text) => {
    setBuildingNote(text);
    if (user && isPremium) {
      localStorage.setItem(`tekohapp_note_${user.id}_${selectedBuildingId}`, text);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2000);
    }
  };

  const goToHome = () => { setActiveTab('inicio'); setSelectedBuildingId(null); setIsSearchOpen(false); setShowPromoModal(false); setIs3DFullscreen(false); };
  const goToMap = () => { setActiveTab('mapa'); setIsSearchOpen(false); setShowPromoModal(false); setIs3DFullscreen(false); };
  const goToBuilding = (id) => { setSelectedBuildingId(id); setActiveTab('edificio'); setIsSearchOpen(false); };

  const searchResults = Object.values(buildingsData).filter(b => {
    const textToSearch = `${b[lang].title} ${b[lang].style} ${b.year} ${b[lang].subtitle}`.toLowerCase();
    return textToSearch.includes(searchQuery.toLowerCase());
  });

  const currentAudioSrc = selectedBuildingId ? (lang === 'en' ? buildingsData[selectedBuildingId].audio.replace('.mp3', '_en.mp3') : buildingsData[selectedBuildingId].audio) : null;

  const displayName = user?.user_metadata?.nickname || user?.user_metadata?.first_name || user?.email?.split('@')[0];
  let notesCount = 0;
  if (user) {
    notesCount = Object.keys(localStorage).filter(k => k.startsWith(`tekohapp_note_${user.id}`)).length;
  }

  const Navbar = () => (
    <nav className={`absolute bottom-0 w-full ${brand.bg} border-t ${brand.border} px-6 py-4 pb-8 flex justify-between items-center z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]`}>
      <button onClick={goToHome} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'inicio' ? brand.textPrimary : 'text-stone-400'}`}><Home size={22} /><span className="text-[10px] font-bold">Inicio</span></button>
      <button onClick={() => setIsSearchOpen(true)} className={`flex flex-col items-center gap-1 text-stone-400 transition-colors hover:${brand.textPrimary}`}><Search size={22} /><span className="text-[10px] font-bold">Buscar</span></button>
      <button onClick={goToMap} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'mapa' ? brand.textPrimary : 'text-stone-400'}`}><MapIcon size={22} /><span className="text-[10px] font-bold">Mapa</span></button>
      <button onClick={() => setShowAuthModal(true)} className={`flex flex-col items-center gap-1 transition-colors ${showAuthModal ? brand.textPrimary : 'text-stone-400'} hover:${brand.textPrimary}`}><User size={22} /><span className="text-[10px] font-bold">Perfil</span></button>
    </nav>
  );

  return (
    <div className={`max-w-md mx-auto h-[100dvh] ${brand.bg} ${brand.textDark} relative flex flex-col overflow-hidden shadow-2xl user-select-none`}>
      <style>{`.user-select-none { -webkit-user-select: none; user-select: none; } textarea { -webkit-user-select: text; user-select: text; }`}</style>

      {selectedBuildingId && currentAudioSrc && <audio ref={audioRef} src={currentAudioSrc} onEnded={() => setIsPlaying(false)} />}

      {activeTab === 'inicio' && !is3DFullscreen && (
        <header className={`w-full px-5 pt-8 pb-4 flex justify-between items-center z-20 shrink-0 bg-[#F3EBE1]`}>
          <img src="/img/logo.png" alt="tekohapp" className="h-12 drop-shadow-sm pointer-events-none" draggable="false" />
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className={`bg-white px-3 py-1 rounded-full border ${brand.border} text-xs font-bold active:scale-95 shadow-sm ${brand.textDark}`}>{ui.langBtn}</button>
        </header>
      )}

      {(activeTab === 'edificio' || activeTab === 'mapa') && !is3DFullscreen && (
        <div className="absolute top-0 w-full px-5 pt-12 pb-4 flex justify-between items-center z-20 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {activeTab === 'edificio' && (
              <button onClick={goToHome} className={`p-2 bg-white/80 backdrop-blur-md rounded-full border ${brand.border} active:scale-95 shadow-sm ${brand.textDark}`}><ChevronLeft size={20} /></button>
            )}
          </div>
          <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className={`pointer-events-auto bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border ${brand.border} text-xs font-bold active:scale-95 shadow-sm ${brand.textDark}`}>{ui.langBtn}</button>
        </div>
      )}

      {activeTab === 'inicio' && (
        <main className="flex-1 px-5 pt-2 overflow-y-auto pb-24 hide-scrollbar">
          <h2 className={`text-4xl font-bold mb-2 ${brand.textDark}`}>{ui.homeTitle}</h2><p className={`${brand.textMuted} mb-8 font-medium`}>{ui.homeSub}</p><h3 className={`text-xs font-bold ${brand.textPrimary} uppercase tracking-widest mb-4`}>{ui.explore}</h3>
          <div className="flex flex-col gap-6">{Object.values(buildingsData).map(building => <BuildingCard key={building.id} building={building} lang={lang} onSelect={goToBuilding} />)}</div>

          <div className="mt-8 mb-6 bg-[#823A30]/10 border border-[#823A30]/20 rounded-2xl p-4 text-center">
            <p className="text-xs font-bold text-[#823A30] mb-1">🚀 {ui.demoTitle}</p>
            <p className="text-[10px] text-[#823A30]/80 font-medium">{ui.demoDesc}</p>
          </div>
        </main>
      )}

      {activeTab === 'mapa' && (
        <main className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
          <MapScreen lang={lang} goToBuilding={goToBuilding} />
        </main>
      )}

      {activeTab === 'edificio' && selectedBuildingId && (
        <main className={`flex-1 overflow-y-auto hide-scrollbar ${is3DFullscreen ? '' : 'pb-24'}`}>
          <BuildingViewer modelUrl={buildingsData[selectedBuildingId].model3d} isFullscreen={is3DFullscreen} toggleFullscreen={() => setIs3DFullscreen(!is3DFullscreen)} />

          {!is3DFullscreen && (
            <div className={`p-6 ${brand.bg} -mt-6 rounded-t-3xl relative z-10 animate-in fade-in duration-300 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]`}>
              <div className="mb-6">
                <div className="flex gap-2 mb-3"><span className={`bg-white border ${brand.border} ${brand.textPrimary} text-[10px] px-3 py-1 rounded-full uppercase font-bold shadow-sm`}>{buildingsData[selectedBuildingId][lang].style}</span><span className={`bg-white border ${brand.border} ${brand.textPrimary} text-[10px] px-3 py-1 rounded-full uppercase font-bold shadow-sm`}>{buildingsData[selectedBuildingId].year}</span></div>
                <h2 className={`text-3xl font-black leading-tight ${brand.textDark}`}>{buildingsData[selectedBuildingId][lang].title}</h2><p className={`text-sm mt-1 font-medium ${brand.textMuted}`}>{buildingsData[selectedBuildingId][lang].subtitle}</p>
              </div>

              <button onClick={toggleAudio} className={`w-full bg-white border ${brand.border} rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-sm active:scale-[0.98] transition-transform`}>
                <div className={`${brand.primary} text-white rounded-full p-3 shadow-md`}>{isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}</div>
                <div className="text-left"><p className={`font-bold text-sm ${brand.textDark}`}>{ui.audioBtn}</p><p className={`text-xs ${brand.textMuted}`}>{ui.audioSub}</p></div>
              </button>

              <div className="mb-8"><p className={`text-sm leading-relaxed ${brand.textDark} font-medium whitespace-pre-line`}>{buildingsData[selectedBuildingId][lang].desc}</p></div>

              {buildingsData[selectedBuildingId].images.length > 0 && (
                <div className="mb-8">
                  <h3 className={`text-xs font-bold ${brand.textPrimary} uppercase tracking-widest mb-4`}>{ui.history}</h3>
                  <div className="flex flex-col gap-4">
                    {buildingsData[selectedBuildingId].images.map((img, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
                        <div className="w-full h-40 rounded-xl bg-stone-200 overflow-hidden relative mb-2">
                          <img src={img.url} className="w-full h-full object-cover sepia-[.20] pointer-events-none" alt={img.year} draggable="false" onContextMenu={(e) => e.preventDefault()} />
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-stone-800 shadow-sm">{img.year}</div>
                        </div>
                        <p className={`text-xs ${brand.textMuted} px-1 font-medium`}>{lang === 'es' ? img.desc_es : img.desc_en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h3 className={`text-xs font-bold ${brand.textPrimary} uppercase tracking-widest mb-4 mt-8`}>{ui.tools}</h3>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {[ui.pro1Title, ui.pro2Title, ui.pro3Title].map((title, i) => (
                  <button key={i} onClick={() => {
                    if (!user) { setShowAuthModal(true); return; }
                    if (!isPremium) { setShowPromoModal(true); return; }

                    if (i === 0) {
                      const pdfUrl = buildingsData[selectedBuildingId].pdf[lang];
                      if (pdfUrl) {
                        window.open(pdfUrl, '_blank');
                      } else {
                        alert(lang === 'es' ? "Documento no disponible." : "Document not available.");
                      }
                    } else {
                      alert(lang === 'es' ? "¡Esta herramienta estará disponible próximamente! Gracias por ser Premium." : "This tool will be available soon! Thanks for being Premium.");
                    }
                  }} className={`w-full bg-white border ${brand.border} rounded-xl p-4 flex justify-between items-center text-left active:scale-[0.98] transition-transform shadow-sm`}>
                    <div className="flex items-center gap-3">
                      <FileText size={18} className={isPremium ? brand.textPrimary : "text-stone-400"} />
                      <p className={`font-bold text-sm ${brand.textDark}`}>{title}</p>
                    </div>
                    {isPremium ? <ChevronRight size={18} className="text-stone-300" /> : <Lock size={18} className="text-stone-300" />}
                  </button>
                ))}
              </div>

              {isPremium && (
                <div className="mt-8 mb-6 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm relative">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className={`text-xs font-bold ${brand.textPrimary} uppercase tracking-widest`}>{ui.notesTitle}</h3>
                    {noteSavedFeedback && <span className="text-[10px] text-green-600 font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Guardado</span>}
                  </div>
                  <textarea
                    value={buildingNote}
                    onChange={(e) => saveNote(e.target.value)}
                    placeholder={ui.notesPlaceholder}
                    className="w-full bg-stone-50 border border-stone-100 rounded-xl p-3 text-sm focus:outline-none focus:border-[#823A30] resize-none h-24 text-stone-700"
                  />
                </div>
              )}
            </div>
          )}
        </main>
      )}

      {!is3DFullscreen && <Navbar />}

      {/* OVERLAYS Y MODALES */}
      {isSearchOpen && (
        <div className={`absolute inset-0 z-50 ${brand.bg} flex flex-col p-5 animate-in fade-in duration-200`}>
          <div className="flex items-center gap-3 mb-8 mt-10">
            <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className={`p-2 bg-white rounded-full border ${brand.border} shadow-sm`}><ChevronLeft size={24} className={brand.textDark} /></button>
            <input type="text" autoFocus placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`flex-1 bg-white border ${brand.border} rounded-full px-5 py-3 text-base font-medium focus:outline-none focus:border-[#823A30] ${brand.textDark} placeholder:text-stone-400 shadow-sm`} />
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto">
            <h3 className={`text-xs font-bold ${brand.textPrimary} uppercase tracking-widest mb-2 px-2`}>Resultados</h3>
            {searchResults.length > 0 ? searchResults.map(b => (
              <button key={b.id} onClick={() => goToBuilding(b.id)} className={`flex items-center gap-4 bg-white active:bg-stone-50 p-3 rounded-2xl text-left border ${brand.border} shadow-sm`}>
                <img src={b.thumbnail} className="w-16 h-16 rounded-xl object-cover pointer-events-none" draggable="false" />
                <div><h4 className={`font-bold text-sm ${brand.textDark}`}>{b[lang].title}</h4><p className={`text-xs ${brand.textMuted}`}>{b[lang].style} • {b.year}</p></div>
              </button>
            )) : <div className="text-center mt-12"><p className={`font-medium ${brand.textMuted}`}>No hay coincidencias.</p></div>}
          </div>
        </div>
      )}

      {showPromoModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`${brand.card} border ${brand.border} rounded-3xl p-6 w-full max-w-sm relative shadow-2xl flex flex-col items-center text-center`}>
            <button onClick={() => setShowPromoModal(false)} className={`absolute top-4 right-4 ${brand.textMuted} hover:${brand.textDark} bg-stone-100 p-2 rounded-full`}><X size={20} /></button>
            <div className={`w-full bg-gradient-to-br from-[#823A30]/5 to-[#823A30]/10 border border-[#823A30]/20 rounded-2xl p-5 mb-4 mt-6`}>
              <div className="flex justify-center mb-3"><Lock size={32} className={brand.textPrimary} /></div>
              <h3 className={`font-bold text-lg mb-2 ${brand.textDark}`}>{ui.appPromoTitle}</h3>
              <p className={`text-xs font-medium leading-relaxed mb-5 ${brand.textMuted}`}>{ui.appPromoDesc}</p>

              <div className="bg-white rounded-xl p-3 mb-5 border border-stone-200 text-left">
                <p className="text-[10px] text-stone-500 font-bold uppercase mb-1">Tu cuenta actual:</p>
                <p className="text-xs font-medium text-stone-800 truncate">{user?.email || "Inicia sesión primero"}</p>
              </div>

              <button onClick={user ? handleWhatsAppUpgrade : () => { setShowPromoModal(false); setShowAuthModal(true); }} className={`w-full ${brand.primary} text-white font-bold py-3 rounded-xl active:scale-95 shadow-lg flex items-center justify-center gap-2`}>
                <Smartphone size={18} /> {user ? ui.downloadBtn : ui.authBtnLogin}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE AUTENTICACIÓN / PERFIL */}
      {showAuthModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-5 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`${brand.card} border ${brand.border} rounded-3xl p-6 w-full max-w-sm relative shadow-2xl`}>
            <button onClick={() => setShowAuthModal(false)} className={`absolute top-4 right-4 ${brand.textMuted} hover:${brand.textDark} bg-stone-100 p-2 rounded-full`}><X size={20} /></button>

            {user ? (
              <div className="text-center mt-4">
                <div className="w-16 h-16 bg-[#823A30]/10 rounded-full flex items-center justify-center mx-auto mb-4"><User size={32} className="text-[#823A30]" /></div>
                <h2 className="text-xl font-bold text-stone-800 mb-1">{displayName}</h2>
                <p className="text-sm text-stone-500 mb-6 truncate">{user.email}</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col items-center">
                    <FileText size={20} className="text-[#823A30] mb-1" />
                    <span className="text-xs text-stone-500 font-medium text-center">{ui.profNotes}</span>
                    <span className="font-bold text-stone-800">{notesCount}</span>
                  </div>
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex flex-col items-center">
                    <Clock size={20} className="text-[#823A30] mb-1" />
                    <span className="text-xs text-stone-500 font-medium text-center">{ui.profMember}</span>
                    <span className="font-bold text-stone-800">{new Date(user.created_at).getFullYear()}</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl mb-6 ${isPremium ? 'bg-green-50 border border-green-200' : 'bg-stone-50 border border-stone-200'}`}>
                  <p className={`font-bold text-sm flex items-center justify-center gap-2 ${isPremium ? 'text-green-700' : 'text-stone-600'}`}>
                    {isPremium ? <><CheckCircle2 size={18} /> {ui.profPremium}</> : ui.profFree}
                  </p>
                </div>

                {!isPremium && (
                  <button onClick={() => { setShowAuthModal(false); setShowPromoModal(true); }} className={`w-full bg-[#823A30] text-white font-bold py-3 rounded-xl active:scale-95 shadow-md mb-3`}>
                    {ui.profUpgrade}
                  </button>
                )}
                <button onClick={handleLogout} className="w-full bg-stone-100 text-stone-600 font-bold py-3 rounded-xl active:scale-95 flex items-center justify-center gap-2 mb-6">
                  <LogOut size={18} /> {ui.profLogout}
                </button>

                {/* BOTONES DE SOPORTE Y CONTACTO */}
                <div className="border-t border-stone-200 pt-4 text-left">
                  <h3 className={`text-[10px] font-bold ${brand.textPrimary} uppercase tracking-widest mb-1`}>{ui.supportTitle}</h3>
                  <p className="text-xs text-stone-500 mb-3 leading-tight">{ui.supportDesc}</p>
                  <div className="flex gap-2">
                    <button onClick={() => window.open('https://wa.me/595971181962', '_blank')} className="flex-1 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-sm">
                      <MessageCircle size={14} /> WhatsApp
                    </button>
                    <button onClick={() => window.open('mailto:tekohaapp@gmail.com', '_blank')} className="flex-1 bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1 shadow-sm">
                      <Mail size={14} /> Email
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="mt-2">
                <h2 className="text-2xl font-bold text-stone-800 mb-1">{authMode === 'login' ? ui.authLoginTitle : ui.authRegTitle}</h2>
                <p className="text-sm text-stone-500 mb-6">{authMode === 'login' ? ui.authLoginSub : ui.authRegSub}</p>
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">

                  {authMode === 'register' && (
                    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                      <div className="flex gap-2">
                        <input type="text" placeholder={ui.authName} required value={authFirstName} onChange={(e) => setAuthFirstName(e.target.value)} className={`w-1/2 bg-stone-50 border ${brand.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#823A30]`} />
                        <input type="text" placeholder={ui.authLastName} required value={authLastName} onChange={(e) => setAuthLastName(e.target.value)} className={`w-1/2 bg-stone-50 border ${brand.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#823A30]`} />
                      </div>
                      <input type="text" placeholder={ui.authNick} value={authNickname} onChange={(e) => setAuthNickname(e.target.value)} className={`w-full bg-stone-50 border ${brand.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#823A30]`} />
                    </div>
                  )}

                  <input type="email" autoComplete="username" placeholder={ui.authEmail} required value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className={`w-full bg-stone-50 border ${brand.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#823A30]`} />
                  <input type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} placeholder={ui.authPass} required minLength={6} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className={`w-full bg-stone-50 border ${brand.border} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#823A30]`} />

                  {authError && <p className="text-xs text-red-500 text-center">{authError}</p>}
                  <button type="submit" disabled={authLoading} className={`w-full bg-[#823A30] text-white font-bold py-3 rounded-xl mt-2 shadow-md ${authLoading ? 'opacity-70' : 'active:scale-95'}`}>
                    {authLoading ? ui.authLoading : (authMode === 'login' ? ui.authBtnLogin : ui.authBtnReg)}
                  </button>
                </form>
                <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="w-full text-center mt-4 text-xs font-medium text-stone-500 hover:text-[#823A30]">
                  {authMode === 'login' ? ui.authNoAccount : ui.authYesAccount}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}