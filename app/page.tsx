'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Wifi, 
  Clock, 
  ShieldCheck, 
  PawPrint, 
  Users, 
  AlertTriangle, 
  Package, 
  Phone, 
  MapPin,
  Calendar,
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

// --- Data Structure ---

const sections = [
  {
    id: 'estorno',
    icon: <Calendar className="w-5 h-5" />,
    title: 'Política de Estorno',
    content: 'Em caso de não comparecimento sem aviso, será cobrado o valor total. Cancelamentos dentro do prazo recebem estorno em até 7 dias. Reembolso total ao cancelar em até 7 dias após a confirmação da reserva (ART.49 CDC). Após esse período, não há reembolso.',
    alert: 'Atenção ao prazo de 7 dias do CDC.'
  },
  {
    id: 'checkin',
    icon: <Clock className="w-5 h-5" />,
    title: 'Check-in e Check-out',
    content: (
      <div className="space-y-2">
        <p><strong>Check-in:</strong> A partir das 15:00.</p>
        <p><strong>Check-out:</strong> Até 12:00.</p>
        <p className="text-sm italic text-gray-500">Late-checkout: consultar disponibilidade e valores.</p>
      </div>
    )
  },
  {
    id: 'wifi',
    icon: <Wifi className="w-5 h-5" />,
    title: 'Wi-Fi',
    content: 'Senha: (Solicitar pessoalmente na recepção ou verificar no QR Code do quarto)',
    highlight: 'senha:  ?'
  },
  {
    id: 'pets',
    icon: <PawPrint className="w-5 h-5" />,
    title: 'Pet Friendly',
    content: 'Sua mascote é bem-vinda! A hospedagem para pets é gratuita.',
    highlight: 'Pets: Gratuito.'
  },
  {
    id: 'convivencia',
    icon: <Users className="w-5 h-5" />,
    title: 'Regras de Convivência',
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Silêncio após 22h e antes de 08h.</li>
        <li>Proibido som alto nas áreas comuns.</li>
        <li>Acesso apenas a hóspedes registrados.</li>
      </ul>
    )
  },
  {
    id: 'danos',
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Danos e Avarias',
    content: 'Cuidados com a acomodação são fundamentais. Danos identificados serão cobrados no check-out.',
  },
  {
    id: 'esquecidos',
    icon: <Package className="w-5 h-5" />,
    title: 'Objetos Esquecidos',
    content: 'Caso esqueça algo, solicite a devolução via WhatsApp. Taxa de envio/processamento: R$150,00.',
  },
  {
    id: 'checkout-auto',
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Check-out Automático',
    content: 'Ultrapassando o horário de 12h sem comunicação prévia, o sistema cobra automaticamente uma taxa de R$390,00.',
    alert: 'Evite taxas extras respeitando o horário de saída.'
  }
];

const contactInfo = {
  phone: '(16) 98135-6900',
  whatsappLink: 'https://wa.me/5516981356900',
  instagram: 'https://www.instagram.com/chalegranreserva/',
  address: 'Rod. Dep. Agostinho Patrus - Monte Verde, Camanducaia - MG, 37650-000',
  addressDetails: '4WW8+GR Camanducaia, Minas Gerais',
  coordinates: '22°51\'13.2"S 46°04\'58.7"W'
};

const heroVideos = [
  '/assets/cozinha.mp4',
  '/assets/estacionamento.mp4',
  '/assets/quartos.mp4',
  '/assets/Sala&Banheiro.mp4'
];

const sectionEmoji: Record<string, string> = {
  estorno: '💳',
  checkin: '🏡',
  wifi: '📡',
  pets: '🐾',
  convivencia: '📋',
  danos: '⚠️',
  esquecidos: '🔒',
  'checkout-auto': '⏰'
};

// --- Components ---

function InfoCard({ section, isOpen, onToggle }: { section: typeof sections[0], isOpen: boolean, onToggle: () => void }) {
  const isWifi = section.id === 'wifi';
  const [copied, setCopied] = useState(false);

  const wifiPassword = useMemo(() => {
    const match = typeof section.highlight === 'string' ? section.highlight.match(/senha:\s*(.+)/i) : null;
    return match?.[1]?.trim() ?? '?';
  }, [section.highlight]);

  const copyWifiPassword = async () => {
    try {
      await navigator.clipboard.writeText(wifiPassword);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true }}
      className={`overflow-hidden rounded-[28px] border border-[var(--card-border)] bg-[linear-gradient(180deg,#ffffff_0%,#f9f7f1_100%)] shadow-[0_10px_28px_-22px_rgba(0,0,0,0.45)] transition-all duration-300 ${isOpen ? 'shadow-[0_20px_40px_-20px_rgba(59,45,20,0.38)] ring-1 ring-[var(--brand-primary)]/20' : ''}`}
    >
      <button 
        onClick={onToggle}
        className="w-full p-5 md:p-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/40"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fffaf0_0%,#efe4cc_70%)] border border-[#e5d8bd] flex items-center justify-center text-lg shadow-inner">
            {sectionEmoji[section.id] ?? 'ℹ️'}
          </div>
          <h3 className="font-cormorant text-2xl font-semibold tracking-tight text-[var(--brand-ink)]">
            {section.title}
          </h3>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--brand-primary)]/50"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 md:px-6 pb-6 pt-0 border-t border-[#ebe2d0] mt-2">
              <div className="font-inter text-[var(--brand-ink)]/80 leading-relaxed py-4">
                {section.content}
              </div>

              {isWifi && (
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--brand-bg)] px-4 py-2">
                  <span className="text-xs uppercase tracking-wider text-[var(--brand-primary)]">Senha:</span>
                  <code className="text-sm font-semibold text-[var(--brand-ink)]">{wifiPassword}</code>
                  <button
                    type="button"
                    onClick={copyWifiPassword}
                    className="ml-1 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[var(--brand-primary)] border border-[var(--card-border)]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              )}
              
              {section.alert && (
                <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                  <p className="text-xs font-medium text-red-700 leading-tight">
                    {section.alert}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Page() {
  const [showInfo, setShowInfo] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>(null);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroVideo((previous) => (previous + 1) % heroVideos.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const videoElement = heroVideoRef.current;
    if (!videoElement) {
      return;
    }

    const tryPlayVideo = () => {
      videoElement.muted = true;
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Mobile browsers may block autoplay until interaction.
        });
      }
    };

    tryPlayVideo();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        tryPlayVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeHeroVideo]);

  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#f2eee4] flex flex-col font-inter selection:bg-[var(--brand-primary)] selection:text-white">
      <section className="relative min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,#a88e69_0%,#69563f_34%,#2f271d_100%)]">
          <div className="absolute inset-0">
            <video
              key={heroVideos[activeHeroVideo]}
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={heroVideos[activeHeroVideo]} type="video/mp4" />
            </video>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,#a88e69_0%,#69563f_34%,#2f271d_100%)] opacity-55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_62%)]" />
          <motion.div
            initial={{ opacity: 0.2, scale: 0.92 }}
            animate={{ opacity: 0.45, scale: 1.02 }}
            transition={{ duration: 3.5, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute -top-20 -right-10 h-80 w-80 rounded-full bg-[#dfc396]/40 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0.15, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 0.95 }}
            transition={{ duration: 4.2, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute -bottom-16 -left-6 h-72 w-72 rounded-full bg-[#f2e3bf]/25 blur-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[#12100b]/80" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,0.06)_25%,rgba(255,255,255,0.06)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.06)_76%,transparent_77%)] bg-[length:110px_110px]" />
        </div>

        <div className="relative z-20 min-h-[88vh] flex flex-col items-center justify-center px-5 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-2xl px-7 py-10 md:px-12 md:py-14 text-center"
          >
            <p className="inline-flex items-center rounded-full border border-white/25 bg-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/90 mb-5">Guia oficial do hóspede</p>
            <h1 className="font-cormorant text-white text-5xl md:text-6xl leading-tight tracking-tight">
              Chalé Gran Reserva
            </h1>
            <p className="mt-4 text-white/85 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
              Seja bem-vindo ao seu refúgio nas montanhas. Explore as informações da sua estadia.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setShowInfo(true);
                window.setTimeout(() => {
                  document.getElementById('info-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 80);
              }}
              className="mt-9 bg-white text-[#1a1a1a] px-8 py-3.5 rounded-full font-semibold tracking-wide shadow-xl inline-flex items-center gap-2"
            >
              VER INFORMAÇÕES <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 bg-[#efece4]/95 backdrop-blur-sm"
            >
              <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowInfo(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-primary)]"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>
                <p className="font-cormorant text-xl text-[var(--brand-ink)]">Chalé Gran Reserva</p>
                <div className="w-14" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="info-section" className={`flex-1 bg-[#f2eee4] px-5 pb-20 transition-all ${showInfo ? 'pt-28 md:pt-32' : 'pt-16 md:pt-24'}`}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[360px_minmax(0,1fr)] gap-8 lg:gap-10">
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            <div className="rounded-[30px] border border-[#e8dcc7] bg-[#fcf9f2] p-6 md:p-7 shadow-[0_12px_30px_-24px_rgba(73,56,29,0.35)]">
              <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-[var(--brand-primary)] font-semibold">Instruções de Check-in</p>
              <h2 className="font-cormorant text-4xl md:text-5xl leading-[1.05] text-[var(--brand-ink)] mt-3">Tudo o que você precisa saber.</h2>
              <p className="text-[var(--brand-ink)]/70 mt-4 leading-relaxed">
                Preparamos este guia para tornar sua experiência o mais fluida e prazerosa possível. Sinta-se em casa.
              </p>
            </div>

            <div className="rounded-[30px] border border-[#ded0b8] bg-[linear-gradient(160deg,#6f604a_0%,#4f4435_100%)] p-6 text-white shadow-xl">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Contato rápido</p>
              <p className="mt-3 text-2xl font-cormorant">Fale com a recepção</p>
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
              <a
                href={contactInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm text-white/85 underline underline-offset-4"
              >
                @chalegranreserva
              </a>
            </div>
          </aside>

          <div>
            <div className="grid gap-4 md:gap-5">
              {sections.map((section) => (
                <InfoCard 
                  key={section.id} 
                  section={section} 
                  isOpen={openCard === section.id} 
                  onToggle={() => toggleCard(section.id)} 
                />
              ))}
            </div>

            <div className="mt-14 space-y-8">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-[linear-gradient(150deg,#5f513d_0%,#3f3529_100%)] text-white p-7 md:p-9 rounded-[32px] shadow-[0_20px_40px_-24px_rgba(0,0,0,0.65)] border border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-cormorant text-3xl mb-2">Recepção Digital</h3>
                    <p className="text-white/70 text-sm max-w-sm">
                      Precisa de ajuda imediata? Fale conosco via WhatsApp para um atendimento rápido.
                    </p>
                    <a
                      href={contactInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-4 items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      Instagram: @chalegranreserva
                    </a>
                  </div>
                  <motion.a
                    href={contactInfo.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" /> Falar com a Recepção
                  </motion.a>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-white/10">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Telefone</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Endereço</p>
                      <p className="font-medium text-sm leading-relaxed">
                        {contactInfo.address}
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        {contactInfo.addressDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-[32px] p-5 md:p-6 border border-[#e8dcc7] shadow-[0_12px_28px_-22px_rgba(0,0,0,0.32)]">
                <h3 className="font-cormorant text-3xl text-[var(--brand-ink)] mb-2">📍 Localização</h3>
                <p className="text-[var(--brand-ink)]/70 mb-4 text-sm md:text-base">{contactInfo.addressDetails}</p>
                <p className="text-[var(--brand-ink)]/70 mb-4 text-xs md:text-sm">{contactInfo.coordinates}</p>
                <div className="rounded-3xl overflow-hidden h-72 border border-[var(--card-border)]">
                  <iframe 
                    src="https://www.google.com/maps?q=-22.8536716,-46.082965&z=17&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://www.google.com/maps/place/Chal%C3%A9+Gran+Reserva/@-22.8536666,-46.0855399,17z/data=!3m1!4b1!4m6!3m5!1s0x94cc05f423ed28d5:0xeb3ea4b2fee2306b!8m2!3d-22.8536716!4d-46.082965!16s%2Fg%2F11rrm6nn5d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#1f7d42] px-4 py-2 text-white text-sm font-semibold"
                  >
                    Abrir no Google Maps
                  </a>
                  <a
                    href="https://waze.com/ul?ll=-22.8536716,-46.082965&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[#2f9fff] px-4 py-2 text-white text-sm font-semibold"
                  >
                    Abrir no Waze
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--card-bg)] py-12 px-6 border-t border-[var(--brand-bg)] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-cormorant text-2xl text-[var(--brand-ink)] mb-2 italic">Agradecemos a sua preferência.</p>
          <p className="text-[var(--brand-ink)]/40 text-xs uppercase tracking-widest">Chalé Gran Reserva &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
