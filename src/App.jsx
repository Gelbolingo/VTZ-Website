import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Facebook,
  Github,
  Globe2,
  LocateFixed,
  Map,
  MapPin,
  Menu,
  Navigation,
  Play,
  Route,
  Search,
  Smartphone,
  Sparkles,
  Target,
  Twitter,
  UsersRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import markerArt from '../Asset/MAERKER.png';
import previewMap from '../Asset/preview/701470018_27538427522430001_1085027290509739756_n.jpg';
import previewReportRed from '../Asset/preview/Screenshot 2026-05-18 224410.png';
import previewReportBlue from '../Asset/preview/Screenshot 2026-05-18 224458.png';
import qrCodeImage from '../Asset/Qrcode/Qrcode.png';

const navItems = ['Features', 'How it works', 'Preview', 'Download'];
const apkUrl = new URL('https://github.com/Gelbolingo/VTZ-/releases/download/v1.0/VTZ.v1.apk', import.meta.url).href;

const features = [
  {
    icon: LocateFixed,
    title: 'Real-Time GPS Navigation',
    copy: 'Follow live location guidance that adjusts around your current position.',
  },
  {
    icon: MapPin,
    title: 'Nearest Terminal Finder',
    copy: 'Instantly discover nearby terminals and transfer points around you.',
  },
  {
    icon: Route,
    title: 'Smart Route Suggestions',
    copy: 'Compare transport options and choose the clearest path to your stop.',
  },
  {
    icon: Target,
    title: 'Live Location Tracking',
    copy: 'Keep your route visible with location-aware updates while moving.',
  },
  {
    icon: Search,
    title: 'Fast and Easy Search',
    copy: 'Search destinations, terminals, and routes with a clean commuter flow.',
  },
  {
    icon: UsersRound,
    title: 'Terminal Congestion Indicator',
    copy: 'Check crowd levels at terminals before choosing where to start your trip.',
  },
  {
    icon: Smartphone,
    title: 'Commuter-Friendly Interface',
    copy: 'Built for quick decisions, readable maps, and one-hand mobile use.',
  },
];

const steps = [
  ['Open VTZ', 'Launch the app and allow GPS so VTZ can read your nearby transit options.'],
  ['Search Destination', 'Enter where you want to go and review the suggested routes.'],
  ['Follow Suggested Route', 'Use the map, terminal list, and route cues to travel with confidence.'],
];

const stats = [
  ['2x', 'Faster commute planning'],
  ['GPS', 'Accurate location routes'],
  ['24/7', 'Designed for daily trips'],
  ['Easy', 'Simple commuter interface'],
];

const routeStops = ['Current location', 'VTZ Terminal 4', 'Market Ave', 'Destination'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6fbfa] text-ink">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AppPreview />
        <WhyChoose />
        <Download />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-white/55 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#hero" className="flex items-center gap-3" aria-label="VTZ home">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink shadow-glow">
            <img src={markerArt} alt="" className="h-8 w-8 rounded-xl object-cover mix-blend-screen" />
          </span>
          <span>
            <span className="block text-xl font-black tracking-wide">VTZ</span>
            <span className="block text-xs font-semibold uppercase text-ink/50">Valenzuela Tricycle Zone</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
              className="text-sm font-semibold text-ink/68 transition hover:text-ink"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href={apkUrl}
          download="https://github.com/Gelbolingo/VTZ-/releases/download/v1.0/VTZ.v1.apk"
          className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-[#0f2b32] lg:inline-flex"
        >
          Download App <ArrowRight size={16} />
        </a>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/70 lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mb-4 rounded-3xl border border-white/50 bg-white/85 p-4 shadow-premium lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-ink/75"
            >
              {item} <ChevronRight size={16} />
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 lg:px-8 lg:pt-36">
      <BackgroundLines />
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-aqua/25 blur-3xl" />
      <div className="absolute right-0 top-56 h-96 w-96 rounded-full bg-signal/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full min-w-0 max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-bold text-ink/70 shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-signal" />
            Real-time GPS routes for modern commuters
          </div>
          <h1 className="max-w-[340px] text-4xl font-black leading-[1.05] tracking-normal text-ink sm:max-w-none sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="block">Navigate Smarter</span>
            <span className="block">with VTZ</span>
          </h1>
          <p className="mt-6 max-w-[330px] text-base leading-7 text-ink/64 sm:max-w-xl md:mt-7 md:max-w-2xl md:text-xl md:leading-8">
            Find nearby terminals, discover routes, and reach your destination faster using real-time GPS
            navigation.
          </p>
          <div className="mt-9 flex max-w-[330px] flex-col gap-4 sm:max-w-none sm:flex-row">
            <a
              href={apkUrl}
              download="https://github.com/Gelbolingo/VTZ-/releases/download/v1.0/VTZ.v1.apk"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-extrabold text-white shadow-premium transition hover:-translate-y-1 hover:bg-[#113039] sm:w-auto"
            >
              Download App
              <ArrowRight className="transition group-hover:translate-x-1" size={19} />
            </a>
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-ink/10 bg-white/70 px-7 py-4 text-base font-extrabold text-ink shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white sm:w-auto"
            >
              Learn More
              <Play size={18} />
            </a>
          </div>
          <div className="mt-10 grid max-w-[330px] grid-cols-1 gap-3 sm:max-w-xl sm:grid-cols-3">
            {['Live GPS', 'Route Finder', 'Terminal Maps'].map((label) => (
              <div key={label} className="rounded-3xl border border-white/60 bg-white/60 p-4 shadow-sm backdrop-blur">
                <CheckCircle2 className="mb-2 text-aqua" size={20} />
                <p className="text-sm font-bold text-ink/72">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <FloatingTransportCard />
          <PhoneMockup variant="hero" image={previewMap} label="VTZ Map" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 left-2 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-premium backdrop-blur-xl sm:left-10"
          >
            <div className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-aqua/20 text-ink">
                <span className="absolute h-full w-full animate-ping rounded-2xl bg-aqua/30" />
                <Navigation size={22} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-ink/45">Nearest terminal</p>
                <p className="font-black">VTZ Terminal 4</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        eyebrow="Features"
        title="Everything commuters need in one GPS-powered app"
        copy="VTZ brings terminals, routes, search, and real-time direction cues into a clean interface built for daily travel."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.05}>
            <motion.article
              whileHover={{ y: -8, scale: 1.01 }}
              className="group h-full rounded-[2rem] border border-white/65 bg-white/72 p-7 shadow-sm backdrop-blur-xl transition hover:border-aqua/50 hover:shadow-premium"
            >
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white shadow-glow transition group-hover:bg-gradient-to-br group-hover:from-aqua group-hover:to-signal group-hover:text-ink">
                <feature.icon size={25} />
              </div>
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-ink/60">{feature.copy}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-ink px-5 py-24 text-white lg:px-8">
      <div className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
      <div className="absolute left-12 top-10 h-64 w-64 rounded-full bg-aqua/15 blur-3xl" />
      <SectionHeader
        light
        eyebrow="How it works"
        title="From where you are to where you need to be"
        copy="Three simple actions keep the commuting experience fast, clear, and reliable."
      />
      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-3">
        {steps.map(([title, copy], index) => (
          <Reveal key={title} delay={index * 0.1}>
            <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.07] p-7 shadow-glow backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-ink text-xl font-black">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-aqua/80 to-transparent lg:absolute lg:left-[calc(100%-20px)] lg:top-14 lg:block lg:w-16" />
                )}
              </div>
              <h3 className="text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-white/64">{copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AppPreview() {
  return (
    <section id="preview" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        eyebrow="App preview"
        title="A focused mobile interface for route decisions"
        copy="Preview the map, terminal list, and navigation route views designed for fast scanning on the move."
      />
      <div className="relative mx-auto mt-16 grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-premium backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-ink/8 pb-5">
              <div>
                <p className="text-sm font-black uppercase text-ink/45">Live route</p>
                <h3 className="text-2xl font-black">Terminal 4 to Market Ave</h3>
              </div>
            </div>
            <div className="mt-7 space-y-4">
              {routeStops.map((stop, index) => (
                <div key={stop} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
                    {index === routeStops.length - 1 ? <MapPin size={18} /> : <span className="h-3 w-3 rounded-full bg-aqua" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-black">{stop}</p>
                    <p className="text-sm text-ink/50">{index === 0 ? 'You are here' : index === routeStops.length - 1 ? 'Final stop' : 'Route checkpoint'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <PhoneMockup label="Map UI" image={previewMap} />
          <PhoneMockup label="Lost Item" image={previewReportRed} offset />
          <PhoneMockup label="Complaint" image={previewReportBlue} />
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="px-5 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-gradient-to-br from-[#dff9f5] via-white to-[#eaf0ff] p-6 shadow-premium md:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-12">
        <Reveal>
          <div>
            <p className="text-sm font-black uppercase text-signal">Why choose VTZ</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">Built for daily commuters, not complicated planning.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink/62">
              VTZ focuses on the moments that matter most: knowing the nearest terminal, understanding the best
              available route, and moving with confidence.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map(([value, label], index) => (
            <Reveal key={label} delay={index * 0.06}>
              <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
                <p className="text-4xl font-black text-ink">{value}</p>
                <p className="mt-2 font-bold text-ink/58">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="px-5 py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-ink p-8 text-white shadow-premium md:p-12 lg:p-16">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
        <div className="absolute -bottom-28 left-24 h-80 w-80 rounded-full bg-signal/25 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_.75fr]">
          <Reveal>
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase text-aqua">
                Ready to commute smarter
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">Download VTZ Today</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                Install VTZ and get real-time GPS route guidance, nearby terminal discovery, and a faster way to
                plan every trip.
              </p>
              <a
                href={apkUrl}
                download="https://github.com/Gelbolingo/VTZ-/releases/download/v1.0/VTZ.v1.apk"
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-base font-extrabold text-ink shadow-sm transition hover:-translate-y-1 hover:bg-aqua"
              >
                Download App <ArrowRight size={19} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mx-auto max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl">
              <div className="mx-auto grid h-44 w-44 place-items-center overflow-hidden rounded-[2rem] bg-white p-3 text-ink">
                <img src={qrCodeImage} alt="VTZ download QR code" className="h-full w-full object-contain" />
              </div>
              <p className="mt-5 text-sm font-bold text-white/62">Scan the QR code to access the VTZ mobile download.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-white px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink">
            <img src={markerArt} alt="" className="h-8 w-8 rounded-xl object-cover mix-blend-screen" />
          </span>
          <div>
            <p className="font-black">VTZ</p>
            <p className="text-sm text-ink/55">contact@vtz.app</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-bold text-ink/58">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} className="hover:text-ink">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {[Facebook, Twitter, Github, Globe2].map((Icon, index) => (
            <a key={index} href="#hero" aria-label="VTZ social link" className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink/65 transition hover:bg-ink hover:text-white">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-sm text-ink/45">© 2026 Unreal Graphics · Ury Gelbolingo.</p>
    </footer>
  );
}

function PhoneMockup({ variant, label = 'VTZ Live', offset = false, image = previewMap }) {
  return (
    <motion.div
      animate={{ y: offset ? [14, -8, 14] : [0, -12, 0] }}
      transition={{ duration: offset ? 6.5 : 5.5, repeat: Infinity, ease: 'easeInOut' }}
      className={variant === 'hero' ? 'relative mx-auto w-[285px] sm:w-[335px]' : 'relative mx-auto w-full max-w-[220px]'}
    >
      <div className="rounded-[2.4rem] border-[10px] border-ink bg-ink p-2 shadow-premium">
        <div className="overflow-hidden rounded-[1.7rem] bg-[#eef8f6]">
          <div className="flex items-center justify-between bg-white px-4 py-3">
            <div>
              <p className="text-[10px] font-black uppercase text-ink/42">{label}</p>
              <p className="text-sm font-black">Nearby routes</p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-aqua/20">
              <Map size={18} />
            </span>
          </div>
          <div className="relative h-[360px] overflow-hidden bg-[#dff5ef]">
            <img src={image} alt={`${label} app preview`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-ink/20" />
            <div className="absolute left-10 top-24">
              <PulsePin />
            </div>
            <div className="absolute right-14 top-48">
              <PulsePin blue />
            </div>
            <div className="absolute bottom-5 left-4 right-4 rounded-3xl bg-white/88 p-4 shadow-premium backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-ink/42">Best route</p>
                  <p className="font-black">Terminal 4 Express</p>
                </div>
                <span className="rounded-full bg-ink px-3 py-2 text-xs font-black text-white">Live</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/10">
                <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-aqua to-signal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PulsePin({ blue = false }) {
  return (
    <span className={`relative grid h-11 w-11 place-items-center rounded-full ${blue ? 'bg-signal' : 'bg-aqua'} shadow-glow`}>
      <span className={`absolute h-full w-full animate-ping rounded-full ${blue ? 'bg-signal/40' : 'bg-aqua/40'}`} />
      <MapPin size={22} className="text-ink" />
    </span>
  );
}

function FloatingTransportCard() {
  return (
    <motion.div
      animate={{ y: [0, 14, 0], rotate: [-1, 1.5, -1] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -right-2 top-7 z-10 hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-premium backdrop-blur-xl sm:block"
    >
      <div className="flex items-center gap-3">
        <img src={markerArt} alt="" className="h-12 w-12 rounded-2xl object-cover" />
        <div>
          <p className="text-xs font-black uppercase text-ink/42">Transport hub</p>
          <p className="font-black">3 nearby routes</p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, copy, light = false }) {
  return (
    <Reveal>
      <div className="relative mx-auto max-w-3xl text-center">
        <p className={`text-sm font-black uppercase ${light ? 'text-aqua' : 'text-signal'}`}>{eyebrow}</p>
        <h2 className={`mt-4 text-4xl font-black leading-tight md:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        <p className={`mx-auto mt-5 max-w-2xl text-lg leading-8 ${light ? 'text-white/62' : 'text-ink/62'}`}>{copy}</p>
      </div>
    </Reveal>
  );
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function BackgroundLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines bg-[length:46px_46px] opacity-55" />
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        className="absolute left-0 top-20 h-[620px] w-full"
        viewBox="0 0 1400 620"
        fill="none"
      >
        <motion.path
          d="M-20 420 C190 260 274 506 458 332 C640 160 752 194 922 278 C1090 360 1192 172 1428 92"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeDasharray="12 18"
        />
        <defs>
          <linearGradient id="routeGradient" x1="0" y1="0" x2="1400" y2="0">
            <stop stopColor="#38f2d6" />
            <stop offset=".5" stopColor="#4f8dff" />
            <stop offset="1" stopColor="#ffe65b" />
          </linearGradient>
        </defs>
      </motion.svg>
      <div className="absolute left-[12%] top-[32%]"><PulsePin /></div>
      <div className="absolute right-[18%] top-[24%]"><PulsePin blue /></div>
    </div>
  );
}

export default App;
