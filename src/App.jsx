import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Compass,
  Download as DownloadIcon,
  FileWarning,
  Github,
  Info,
  Landmark,
  Map,
  MapPin,
  Menu,
  PackageSearch,
  Play,
  ReceiptText,
  Search,
  Smartphone,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';
import { useState } from 'react';
import markerArt from '../Asset/MAERKER.png';
import previewHelpdesk from '../Asset/preview/Helpdesk.png';
import previewMap from '../Asset/preview/map.png';
import previewNotifications from '../Asset/preview/notification.png';
import previewValenzuela from '../Asset/preview/Valenzuela.jpg';
import qrCodeImage from '../Asset/Qrcode/VTZQRCode2.png';

const APK_URL = 'https://github.com/Gelbolingo/VTZ-Website/releases/download/1.3/VTZv.1.3.apk';
const GITHUB_RELEASE_URL = 'https://github.com/Gelbolingo/VTZ-Website/releases/tag/1.3';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About VTZ', href: '#about' },
  { label: 'Download', href: '#download' },
];

const whyCards = [
  {
    icon: Compass,
    title: 'Find Nearby Terminals',
    copy: 'Discover tricycle terminal locations across Valenzuela City more conveniently.',
  },
  {
    icon: Info,
    title: 'Access Useful Information',
    copy: 'Explore terminal details, routes, and fare information in one place.',
  },
  {
    icon: ClipboardList,
    title: 'Stay Informed',
    copy: 'Access commuter services such as Lost Item reporting and Complaint Reporting.',
  },
];

const journeySteps = [
  {
    index: '01',
    title: 'Discover',
    copy: 'Explore tricycle terminals available throughout Valenzuela City.',
  },
  {
    index: '02',
    title: 'Find',
    copy: 'Locate a terminal and review its available information.',
  },
  {
    index: '03',
    title: 'Understand',
    copy: 'Check relevant terminal details, routes, and fare information.',
  },
  {
    index: '04',
    title: 'Commute',
    copy: 'Use the information to make more informed travel decisions.',
  },
];

const heroPhones = [
  {
    label: 'Discover Terminals',
    caption: 'Terminal map',
    image: previewMap,
    alt: 'VTZ map screen showing tricycle terminal locations across Valenzuela City',
  },
  {
    label: 'Explore Terminal Information',
    caption: 'Report updates',
    image: previewNotifications,
    alt: 'VTZ notifications screen with Lost Item and Complaint Report updates',
  },
  {
    label: 'Access Commuter Services',
    caption: 'Help Desk',
    image: previewHelpdesk,
    alt: 'VTZ Help Desk screen for submitting Lost Item and complaint reports',
  },
];

const coreFeatures = [
  {
    icon: Search,
    title: 'Terminal Discovery',
    copy: 'Find and explore tricycle terminals in Valenzuela City.',
  },
  {
    icon: MapPin,
    title: 'Location-Based Information',
    copy: 'Access terminal information relevant to commuters.',
  },
  {
    icon: Landmark,
    title: 'Terminal Details',
    copy: 'View useful information about terminals, including route and fare details where supported.',
  },
  {
    icon: PackageSearch,
    title: 'Lost Item',
    copy: 'Report a lost item and access relevant lost-item information.',
  },
  {
    icon: FileWarning,
    title: 'Complaint Reporting',
    copy: 'Provide a way for commuters to report commuter-related concerns.',
  },
  {
    icon: Smartphone,
    title: 'Commuter-Focused Experience',
    copy: 'A simple interface designed around everyday transportation needs.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f6fbfa] text-ink antialiased">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main">
        <Hero />
        <WhyVTZ />
        <HowItWorks />
        <CoreFeatures />
        <CommuterServices />
        <AboutVTZ />
        <Download />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-white/80 backdrop-blur-2xl">
      <nav aria-label="Primary" className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          aria-label="VTZ — back to home"
          className="flex items-center gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ink/10">
            <img src={markerArt} alt="VTZ logo" className="h-11 w-11 object-contain" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-black tracking-tight">VTZ</span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-ink/55">Valenzuela Tricycle Zone</span>
          </span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2.5 text-sm font-bold text-ink/68 transition hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
        <DownloadButton variant="nav" label="Download App" className="hidden lg:inline-flex" />
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="grid h-12 w-12 place-items-center rounded-2xl border border-ink/10 bg-white text-ink shadow-sm lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="mx-4 mb-4 rounded-3xl border border-ink/10 bg-white p-3 shadow-premium lg:hidden"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-ink/75 transition hover:bg-ink/5"
            >
              {item.label} <ChevronRight size={16} />
            </a>
          ))}
          <DownloadButton variant="mobile" label="Download App" className="mt-2 w-full" onClick={() => setMenuOpen(false)} />
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative overflow-hidden px-5 pb-20 pt-32 lg:px-8 lg:pt-36">
      <BackgroundLines />
      <div aria-hidden="true" className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-aqua/25 blur-3xl" />
      <div aria-hidden="true" className="absolute right-0 top-56 h-96 w-96 rounded-full bg-signal/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto w-full min-w-0 max-w-3xl text-center"
        >
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-bold text-ink/70 shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-signal" aria-hidden="true" />
            Valenzuela City commuter guide
          </p>
          <h1 id="hero-heading" className="text-4xl font-black leading-[1.05] tracking-normal text-ink sm:text-5xl md:text-7xl">
            Your Guide to Tricycle Terminals in Valenzuela
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-ink/64 md:mt-7 md:max-w-2xl md:text-xl md:leading-8">
            Discover terminals, routes, fares, and useful commuter services with VTZ.
          </p>
          <div className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <DownloadButton variant="hero" label="Download Now" className="w-full justify-center sm:w-auto" />
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-7 py-4 text-base font-extrabold text-ink shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
            >
              Explore Features
              <Play size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <HeroPhoneGallery />
      </div>
    </section>
  );
}

function HeroPhoneGallery() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="relative"
      >
        <FloatingTransportCard />
        <div
          role="img"
          aria-label="Preview of three VTZ mobile application screens: terminal map, report updates, and Help Desk"
          className="grid grid-cols-1 items-end justify-items-center gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-7"
        >
          {heroPhones.map((phone, index) => (
            <motion.div
              key={phone.label}
              initial={{ opacity: 0, y: 36, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -4 : index === 2 ? 4 : 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              className={index === 1 ? 'sm:-mt-8' : ''}
            >
              <DeviceFrame
                image={phone.image}
                alt=""
                label={phone.label}
                caption={phone.caption}
                float={index === 1}
                floatDelay={index * 0.9}
              />
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm font-black uppercase tracking-[0.2em] text-ink/45">VTZ App Preview</p>
      </motion.div>
    </div>
  );
}

function CoreFeatures() {
  return (
    <section id="features" aria-labelledby="features-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="features-heading"
        eyebrow="Core Features"
        title="Everything You Need to Navigate with Confidence"
        copy="VTZ focuses on terminal discovery, terminal information, and supporting commuter services."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {coreFeatures.map((feature, index) => (
          <Reveal key={feature.title} delay={(index % 3) * 0.07} y={26}>
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group h-full rounded-[2rem] border border-white/65 bg-white/75 p-7 shadow-sm backdrop-blur-xl transition hover:border-aqua/50 hover:shadow-premium"
            >
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white transition group-hover:bg-gradient-to-br group-hover:from-aqua group-hover:to-signal group-hover:text-ink">
                <feature.icon size={25} aria-hidden="true" />
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

function WhyVTZ() {
  return (
    <section aria-labelledby="why-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="why-heading"
        eyebrow="Why VTZ?"
        title="Making Everyday Commutes Easier"
        copy="Finding the right tricycle terminal should not be confusing. VTZ brings terminal information and commuter-focused services into one accessible platform designed for Valenzuela City."
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">
        {whyCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08} y={28}>
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group h-full rounded-[2rem] border border-white/65 bg-white/75 p-7 shadow-sm backdrop-blur-xl transition hover:border-aqua/50 hover:shadow-premium"
            >
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white transition group-hover:bg-gradient-to-br group-hover:from-aqua group-hover:to-signal group-hover:text-ink">
                <card.icon size={25} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black">{card.title}</h3>
              <p className="mt-3 leading-7 text-ink/60">{card.copy}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative bg-ink px-5 py-24 text-white lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
      <div aria-hidden="true" className="absolute left-12 top-10 h-64 w-64 rounded-full bg-aqua/15 blur-3xl" />
      <SectionHeader
        id="how-heading"
        light
        eyebrow="How VTZ Works"
        title="From Searching to Getting Where You Need to Go"
        copy="Follow a simple Discover, Find, Understand, and Commute progression built around terminal information."
      />
      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {journeySteps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08} y={30}>
            <div className="relative h-full rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl">
              <div className="mb-8 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-aqua font-black text-ink">{step.index}</span>
                <ChevronRight size={18} className="text-white/25" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-black">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CommuterServices() {
  return (
    <section aria-labelledby="services-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="services-heading"
        eyebrow="Commuter Services"
        title="Built Around Everyday Commuters"
        copy="Supporting services help commuters handle common concerns during tricycle travel."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
        <Reveal y={28}>
          <article className="h-full rounded-[2rem] border border-white/65 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-aqua">
              <PackageSearch size={25} aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black">Lost Item</h3>
            <p className="mt-3 text-lg leading-8 text-ink/60">
              Report a lost item and access relevant lost-item information to help commuters keep track of items
              they may have misplaced during their journey.
            </p>
          </article>
        </Reveal>
        <Reveal delay={0.08} y={28}>
          <article className="h-full rounded-[2rem] border border-white/65 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-aqua">
              <FileWarning size={25} aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black">Complaint Reporting</h3>
            <p className="mt-3 text-lg leading-8 text-ink/60">
              Provide a convenient way for commuters to submit concerns through the application&apos;s complaint
              reporting feature.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function AboutVTZ() {
  const points = [
    { icon: MapPin, title: 'Valenzuela City focus', copy: 'Designed around local tricycle terminals and routes.' },
    { icon: ReceiptText, title: 'Terminal and fare context', copy: 'Review useful details before choosing a terminal.' },
    { icon: Wallet, title: 'No booking or payments', copy: 'VTZ is an information guide, not ride-hailing.' },
    { icon: CircleAlert, title: 'Commuter support', copy: 'Lost Item and Complaint Reporting are built in.' },
  ];
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden bg-ink px-5 py-24 text-white lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
      <div aria-hidden="true" className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-aqua/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-aqua">About VTZ</p>
            <h2 id="about-heading" className="mt-4 text-4xl font-black leading-tight md:text-5xl">Built for Valenzuela City</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              VTZ is designed with the needs of Valenzuela commuters in mind, bringing tricycle terminal discovery
              and useful transportation information into a single mobile experience.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                  <point.icon size={22} className="text-aqua" aria-hidden="true" />
                  <p className="mt-3 font-black">{point.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{point.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} y={30}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
            <img src={previewValenzuela} alt="Valenzuela People's Park landmark in Valenzuela City" loading="lazy" className="h-80 w-full rounded-[2rem] object-cover" />
            <div className="mt-6 flex flex-wrap gap-2">
              {['Valenzuela City', 'Tricycle terminals', 'Routes', 'Fare information', 'Everyday commuting'].map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/75">{chip}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" aria-labelledby="download-heading" className="px-5 py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.75rem] bg-ink text-white shadow-premium">
        <div aria-hidden="true" className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-aqua/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 left-24 h-80 w-80 rounded-full bg-signal/25 blur-3xl" />
        <div aria-hidden="true" className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
        <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_.95fr] lg:p-16">
          <Reveal>
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black uppercase text-aqua">
                <Sparkles size={16} aria-hidden="true" /> Valenzuela Tricycle Zone
              </p>
              <h2 id="download-heading" className="text-4xl font-black leading-tight md:text-6xl">Ready to Explore VTZ?</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                Get the VTZ Android application and discover a more convenient way to access tricycle terminal
                information in Valenzuela City.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <DownloadButton variant="light" label="Download Now" />
                <a
                  href={GITHUB_RELEASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-6 py-4 text-base font-extrabold text-white transition hover:border-aqua/60 hover:text-aqua focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
                >
                  <Github size={18} aria-hidden="true" /> View GitHub Release
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 text-center backdrop-blur-xl sm:p-7">
              <a
                href={APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tap the QR code to download VTZ"
                className="group mx-auto block w-fit overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <img src={qrCodeImage} alt="VTZ download QR code" loading="lazy" className="h-48 w-48 rounded-[1.25rem] bg-white object-contain transition duration-300 group-hover:scale-[1.02]" />
              </a>
              <p className="mt-5 font-black">Scan to download</p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/60">
                Point your phone camera at the code to download VTZ instantly.
              </p>
              <DownloadButton variant="qr" label="Download Now" className="mt-5 w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DownloadButton({ variant = 'hero', label = 'Download', className = '', onClick }) {
  const styles = {
    nav: 'items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-[#0f2b32]',
    hero: 'group inline-flex items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-4 text-base font-extrabold text-white shadow-premium transition duration-300 hover:-translate-y-1 hover:bg-[#113039] hover:shadow-glow active:translate-y-0',
    mobile: 'inline-flex items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-white shadow-premium transition active:scale-[.98]',
    light: 'group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-extrabold text-ink shadow-premium transition duration-300 hover:-translate-y-1 hover:bg-aqua hover:shadow-glow active:translate-y-0',
    qr: 'inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-extrabold text-white transition duration-300 hover:border-aqua/60 hover:bg-aqua hover:text-ink active:scale-[.98]',
  };
  const iconWrap = variant === 'light'
    ? 'bg-ink text-aqua'
    : 'bg-aqua/20 text-aqua group-hover:bg-ink group-hover:text-aqua';
  return (
    <a
      href={APK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      title="Download VTZ - Valenzuela Tricycle Zone"
      aria-label="Download VTZ - Valenzuela Tricycle Zone"
      className={`${styles[variant] ?? styles.hero} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${className}`}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition ${iconWrap}`}>
        <DownloadIcon size={19} strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap text-base font-extrabold leading-none">{label}</span>
      {(variant === 'hero' || variant === 'light') && (
        <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
      )}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10">
              <img src={markerArt} alt="VTZ logo" className="h-10 w-10 object-contain" />
            </span>
            <div>
              <p className="font-black">VTZ</p>
              <p className="text-sm font-bold text-ink/55">Valenzuela Tricycle Zone</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm leading-7 text-ink/60">
            A commuter-focused tricycle terminal discovery and information application for Valenzuela City.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-ink/45">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm font-bold text-ink/65">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-ink/45">Get VTZ</p>
          <ul className="mt-4 space-y-3 text-sm font-bold text-ink/65">
            <li>
              <a href={APK_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">
                Download Android app
              </a>
            </li>
            <li>
              <a href={GITHUB_RELEASE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-ink">
                <Github size={16} aria-hidden="true" /> GitHub release
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-ink/10 pt-6 text-sm text-ink/45">© 2026 VTZ · Valenzuela Tricycle Zone.</p>
    </footer>
  );
}

function DeviceFrame({
  image = previewMap,
  alt = 'VTZ app preview',
  label = 'VTZ Live',
  caption = 'Nearby terminals',
  float = false,
  floatDelay = 0,
}) {
  const reduceMotion = useReducedMotion();
  const floatMotion = float && !reduceMotion
    ? {
        animate: { y: [0, -9, 0] },
        transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
      }
    : {};
  return (
    <motion.div
      {...floatMotion}
      className="relative mx-auto w-full max-w-[230px]"
    >
      <div className="rounded-[2.2rem] bg-ink p-[10px] shadow-premium ring-1 ring-white/20">
        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#0b1620]">
          <div aria-hidden="true" className="absolute left-1/2 top-2.5 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="h-[380px] w-full select-none object-cover object-top"
            draggable={false}
          />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/55 to-transparent" />
          <div className="absolute left-3 right-3 top-9 flex items-center justify-between rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-premium backdrop-blur">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-ink/45">{label}</p>
              <p className="truncate text-[13px] font-black text-ink">{caption}</p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-aqua">
              <Map size={15} aria-hidden="true" />
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3.5 shadow-premium backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[13px] font-black text-ink">Terminal information</p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-aqua">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-aqua" /> Guide
              </span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-aqua to-signal" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FloatingTransportCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, 12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -right-2 top-7 z-10 hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-premium backdrop-blur-xl sm:block"
    >
      <div className="flex items-center gap-3">
        <img src={markerArt} alt="VTZ terminal marker" className="h-12 w-12 rounded-2xl object-cover" />
        <div>
          <p className="text-xs font-black uppercase text-ink/45">Valenzuela City</p>
          <p className="font-black">Tricycle terminal guide</p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({ id, eyebrow, title, copy, light = false }) {
  return (
    <Reveal>
      <div className="relative mx-auto max-w-3xl text-center">
        <p className={`text-sm font-black uppercase tracking-[0.16em] ${light ? 'text-aqua' : 'text-signal'}`}>{eyebrow}</p>
        <h2 id={id} className={`mt-4 text-4xl font-black leading-tight md:text-5xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
        <p className={`mx-auto mt-5 max-w-2xl text-lg leading-8 ${light ? 'text-white/65' : 'text-ink/62'}`}>{copy}</p>
      </div>
    </Reveal>
  );
}

function Reveal({ children, delay = 0, y = 26 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function BackgroundLines() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines bg-[length:46px_46px] opacity-55" />
      <motion.svg
        initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
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
    </div>
  );
}

export default App;
