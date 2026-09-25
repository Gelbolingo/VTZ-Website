import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Compass,
  Download as DownloadIcon,
  FileWarning,
  Info,
  Landmark,
  Languages,
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
import { useEffect, useRef, useState } from 'react';
import markerArt from '../Asset/MAERKER.png';
import previewHelpdesk from '../Asset/preview/Helpdesk.png';
import previewMap from '../Asset/preview/map.png';
import previewNotifications from '../Asset/preview/notification.png';
import previewValenzuela from '../Asset/preview/Valenzuela.jpg';
import qrCodeImage from '../Asset/Qrcode/VTZv.1.4QrCode.png';
import { LANGUAGE_META, LANGUAGE_VALUES, MODAL_COPY, STRINGS, normalizeLanguage, persistLanguage, readSavedLanguage } from './i18n.js';

const APK_URL = 'https://github.com/Gelbolingo/VTZ-Website/releases/download/1.4/VTZv.1.4.apk';

const CORE_FEATURE_ICONS = [Search, MapPin, Landmark, PackageSearch, FileWarning, ReceiptText];
const WHY_CARD_ICONS = [Compass, Info, ClipboardList];
const JOURNEY_INDEXES = ['01', '02', '03', '04'];
const HERO_PHONE_IMAGES = [previewMap, previewNotifications, previewHelpdesk];

function App() {
  // Synchronous init from localStorage: returning visitors render directly
  // in their saved language with no flash and no repeated prompt.
  const [language, setLanguage] = useState(() => readSavedLanguage() || 'english');
  const [languageReady, setLanguageReady] = useState(() => readSavedLanguage() !== null);
  const [languageOpen, setLanguageOpen] = useState(() => readSavedLanguage() === null);
  const t = STRINGS[normalizeLanguage(language)] || STRINGS.english;

  useEffect(() => {
    persistLanguage(language);
  }, [language]);

  // Lock background scroll while the entry prompt is visible.
  useEffect(() => {
    if (!languageOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [languageOpen]);

  const chooseLanguage = (value) => {
    const next = normalizeLanguage(value);
    if (!next) return;
    setLanguage(next);
    persistLanguage(next);
    setLanguageReady(true);
    setLanguageOpen(false);
  };

  if (!languageReady) {
    return (
      <LanguageGate
        mode="first-visit"
        active={language}
        onChoose={chooseLanguage}
        onClose={null}
      />
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6fbfa] text-ink">
      <Navbar t={t} language={language} onChooseLanguage={chooseLanguage} />
      <main>
        <Hero t={t} />
        <CoreFeatures t={t} />
        <CommuterServices t={t} />
        <AboutVTZ t={t} />
        <Download t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

function Navbar({ t, language, onChooseLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = t.nav;
  const navLinks = [
    { label: nav.home, href: '#home' },
    { label: nav.features, href: '#features' },
    { label: nav.how, href: '#how-it-works' },
    { label: nav.about, href: '#about' },
    { label: nav.download, href: '#download' },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/25 bg-white/80 backdrop-blur-2xl">
      <nav aria-label="Primary" className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a
          href="#home"
          aria-label={nav.homeAria}
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
        <div className="hidden items-center gap-2 lg:flex">
          <LanguageDropdown t={t} language={language} onChoose={onChooseLanguage} />
          <DownloadButton variant="nav" label={nav.downloadBtn} />
        </div>
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
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
          <LanguageMenuRow t={t} language={language} onChoose={onChooseLanguage} />
          <DownloadButton variant="mobile" label={nav.downloadBtn} className="mt-2 w-full" onClick={() => setMenuOpen(false)} />
        </motion.div>
      )}
    </header>
  );
}

function LanguageDropdown({ t, language, onChoose }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const activeMeta = LANGUAGE_META[normalizeLanguage(language)] || LANGUAGE_META.english;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  const pick = (value) => {
    const next = normalizeLanguage(value);
    if (!next) return;
    onChoose(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.nav.changeLanguage}
        title={t.nav.changeLanguage}
        className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-3 text-sm font-bold text-ink/75 shadow-sm transition hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <Languages size={16} aria-hidden="true" />
        <span aria-hidden="true">{activeMeta.flag}</span>
        <span>{activeMeta.label}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`text-ink/45 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          aria-label={t.nav.changeLanguage}
          className="absolute right-0 top-[calc(100%+10px)] z-[60] w-56 overflow-hidden rounded-2xl border border-ink/10 bg-white p-1.5 shadow-premium"
        >
          {LANGUAGE_VALUES.map((value) => {
            const meta = LANGUAGE_META[value];
            const selected = normalizeLanguage(language) === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => pick(value)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink ${
                  selected ? 'bg-ink/[0.06] text-ink' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                }`}
              >
                <span aria-hidden="true" className="text-lg leading-none">{meta.flag}</span>
                <span className="flex-1 text-left">{meta.label}</span>
                {selected && <Check size={16} aria-hidden="true" className="shrink-0 text-ink" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LanguageMenuRow({ t, language, onChoose }) {
  const [open, setOpen] = useState(false);
  const activeMeta = LANGUAGE_META[normalizeLanguage(language)] || LANGUAGE_META.english;

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open ]);

  const pick = (value) => {
    const next = normalizeLanguage(value);
    if (!next) return;
    onChoose(next);
    setOpen(false);
  };

  return (
    <div className="mt-1 overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t.nav.changeLanguage}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold text-ink/75 transition hover:bg-ink/5"
      >
        <span className="inline-flex items-center gap-2">
          <Languages size={16} aria-hidden="true" />
          {activeMeta.flag} {activeMeta.label}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div role="group" aria-label={t.nav.changeLanguage} className="grid gap-1 px-1 pb-1 pt-0.5">
          {LANGUAGE_VALUES.map((value) => {
            const meta = LANGUAGE_META[value];
            const selected = normalizeLanguage(language) === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => pick(value)}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${
                  selected ? 'bg-ink/[0.06] text-ink' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                }`}
              >
                <span aria-hidden="true" className="text-lg leading-none">{meta.flag}</span>
                <span className="flex-1 text-left">{meta.label}</span>
                {selected && <Check size={16} aria-hidden="true" className="shrink-0 text-ink" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Hero({ t }) {
  const hero = t.hero;
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
            {hero.badge}
          </p>
          <h1 id="hero-heading" className="text-4xl font-black leading-[1.05] tracking-normal text-ink sm:text-5xl md:text-7xl">
            {hero.titleA} <span className="text-signal">{hero.titleB}</span> {hero.titleC}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-ink/64 md:mt-7 md:max-w-2xl md:text-xl md:leading-8">
            {hero.copy}
          </p>
          <div className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <DownloadButton variant="hero" label={hero.downloadNow} className="w-full justify-center sm:w-auto" />
            <a
              href="#features"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-7 py-4 text-base font-extrabold text-ink shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
            >
              {hero.explore}
              <Play size={18} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <HeroPhoneGallery t={t} />
      </div>
    </section>
  );
}

function HeroPhoneGallery({ t }) {
  const phones = t.phones.map((phone, index) => ({ ...phone, image: HERO_PHONE_IMAGES[index] }));
  return (
    <div className="relative mx-auto mt-16 w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="relative"
      >
        <FloatingTransportCard t={t} />
        <div
          role="img"
          aria-label="Preview of three VTZ mobile application screens: terminal map, report updates, and Help Desk"
          className="grid grid-cols-1 items-end justify-items-center gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-7"
        >
          {phones.map((phone, index) => (
            <motion.div
              key={phone.label}
              initial={{ opacity: 0, y: 36, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -4 : index === 2 ? 4 : 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              className={index === 1 ? 'sm:-mt-8' : ''}
            >
              <DeviceFrame
                t={t}
                image={phone.image}
                alt={phone.alt}
                label={phone.label}
                caption={phone.caption}
                float={index === 1}
                floatDelay={index * 0.9}
              />
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm font-black uppercase tracking-[0.2em] text-ink/45">{t.heroPreviewEyebrow}</p>
      </motion.div>
    </div>
  );
}

function CoreFeatures({ t }) {
  const features = t.features.items.map((item, index) => ({ ...item, icon: CORE_FEATURE_ICONS[index] }));
  return (
    <section id="features" aria-labelledby="features-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="features-heading"
        eyebrow={t.features.eyebrow}
        title={t.features.title}
        copy={t.features.copy}
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={(index % 3) * 0.07} y={26}>
            <article className="h-full rounded-[2rem] border border-white/65 bg-white/75 p-7 shadow-sm backdrop-blur-xl">
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
                <feature.icon size={25} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-ink/60">{feature.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyVTZ({ t }) {
  const cards = t.why.cards.map((card, index) => ({ ...card, icon: WHY_CARD_ICONS[index] }));
  return (
    <section aria-labelledby="why-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="why-heading"
        eyebrow={t.why.eyebrow}
        title={t.why.title}
        copy={t.why.copy}
      />
      <div className="mx-auto mt-14 grid max-w-7xl gap-5 md:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08} y={28}>
            <article className="h-full rounded-[2rem] border border-white/65 bg-white/75 p-7 shadow-sm backdrop-blur-xl">
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
                <card.icon size={25} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black">{card.title}</h3>
              <p className="mt-3 leading-7 text-ink/60">{card.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ t }) {
  const steps = t.how.steps.map((step, index) => ({ ...step, index: JOURNEY_INDEXES[index] }));
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative bg-ink px-5 py-24 text-white lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
      <div aria-hidden="true" className="absolute left-12 top-10 h-64 w-64 rounded-full bg-aqua/15 blur-3xl" />
      <SectionHeader
        id="how-heading"
        light
        eyebrow={t.how.eyebrow}
        title={t.how.title}
        copy={t.how.copy}
      />
      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08} y={30}>
            <div className="relative h-full rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl">
              <div className="mb-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-aqua font-black text-ink">{step.index}</span>
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

function CommuterServices({ t }) {
  const services = [
    { icon: PackageSearch, title: t.features.items[3].title, copy: t.features.items[3].copy },
    { icon: FileWarning, title: t.features.items[4].title, copy: t.features.items[4].copy },
  ];
  return (
    <section aria-labelledby="services-heading" className="relative px-5 py-24 lg:px-8">
      <SectionHeader
        id="services-heading"
        eyebrow={t.features.eyebrow}
        title={t.why.title}
        copy={t.features.copy}
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
        {services.map((service) => (
        <Reveal key={service.title} y={28}>
          <article className="h-full rounded-[2rem] border border-white/65 bg-white/75 p-8 shadow-sm backdrop-blur-xl">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-ink text-aqua">
              <service.icon size={25} aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-black">{service.title}</h3>
            <p className="mt-3 text-lg leading-8 text-ink/60">
              {service.copy}
            </p>
          </article>
        </Reveal>
        ))}
      </div>
    </section>
  );
}

function AboutVTZ({ t }) {
  const about = t.about;
  const pointIcons = [MapPin, ReceiptText, Wallet, CircleAlert];
  const points = about.checklist.map((copy, index) => ({
    icon: pointIcons[index % pointIcons.length],
    title: copy.split('—')[0].trim(),
    copy,
  }));
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden bg-ink px-5 py-24 text-white lg:px-8">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines bg-[length:38px_38px] opacity-10" />
      <div aria-hidden="true" className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-aqua/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-aqua">{about.eyebrow}</p>
            <h2 id="about-heading" className="mt-4 text-4xl font-black leading-tight md:text-5xl">{about.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/65">
              {about.p1}
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/55">
              {about.p2}
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
            <img src={previewValenzuela} alt={about.imgAlt} loading="lazy" className="h-80 w-full rounded-[2rem] object-cover" />
            <div className="mt-6 flex flex-wrap gap-2">
              {about.stats.map((stat) => (
                <span key={stat.label} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white/75">{stat.value} · {stat.label}</span>
              ))}
            </div>
            <p className="mt-4 text-sm font-bold text-aqua/90">{about.badge}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Download({ t }) {
  const dl = t.download;
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
                <Sparkles size={16} aria-hidden="true" /> {dl.badge}
              </p>
              <h2 id="download-heading" className="text-4xl font-black leading-tight md:text-6xl">{dl.heading}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                {dl.copy}
              </p>
              <div className="mt-8">
                <DownloadButton variant="light" label={dl.downloadNow} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 text-center backdrop-blur-xl sm:p-7">
              <a
                href={APK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={dl.qrAria}
                className="group mx-auto block w-fit overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <img src={qrCodeImage} alt={dl.qrAlt} loading="lazy" className="h-48 w-48 rounded-[1.25rem] bg-white object-contain transition duration-300 group-hover:scale-[1.02] sm:h-56 sm:w-56" />
              </a>
              <p className="mt-5 font-black">{dl.scanTitle}</p>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-white/60">
                {dl.scanCopy}
              </p>
              <DownloadButton variant="qr" label={dl.downloadNow} className="mt-5 w-full" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DownloadButton({ variant = 'hero', label = 'Download', className = '', onClick }) {
  const styles = {
    nav: 'inline-flex w-auto max-w-full items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white shadow-premium transition hover:-translate-y-0.5 hover:bg-[#0f2b32]',
    hero: 'group inline-flex items-center justify-center gap-3 rounded-2xl bg-ink px-6 py-4 text-base font-extrabold text-white shadow-premium transition duration-300 hover:-translate-y-1 hover:bg-[#113039] hover:shadow-glow active:translate-y-0',
    mobile: 'inline-flex items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-3.5 text-sm font-bold text-white shadow-premium transition active:scale-[.98]',
    light: 'group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base font-extrabold text-ink shadow-premium transition duration-300 hover:-translate-y-1 hover:bg-aqua hover:shadow-glow active:translate-y-0',
    qr: 'inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-extrabold text-white transition duration-300 hover:border-aqua/60 hover:bg-aqua hover:text-ink active:scale-[.98]',
  };
  const iconWrap = variant === 'light'
    ? 'bg-ink text-aqua'
    : 'bg-aqua/20 text-aqua group-hover:bg-ink group-hover:text-aqua';
  const isNav = variant === 'nav';
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
      <span className={`grid shrink-0 place-items-center transition ${isNav ? 'h-7 w-7 rounded-lg' : 'h-10 w-10 rounded-xl'} ${iconWrap}`}>
        <DownloadIcon size={isNav ? 15 : 19} strokeWidth={2.6} aria-hidden="true" />
      </span>
      <span className={`whitespace-nowrap leading-none ${isNav ? 'text-sm font-bold' : 'text-base font-extrabold'}`}>{label}</span>
      {(variant === 'hero' || variant === 'light') && (
        <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
      )}
    </a>
  );
}

function Footer({ t }) {
  const foot = t.footer;
  const links = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.how, href: '#how-it-works' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.download, href: '#download' },
  ];
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
            {foot.tagline}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-ink/45">{foot.exploreTitle}</p>
          <ul className="mt-4 space-y-3 text-sm font-bold text-ink/65">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-ink/45">{foot.downloadTitle}</p>
          <ul className="mt-4 space-y-3 text-sm font-bold text-ink/65">
            <li>
              <a href={APK_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">
                {foot.downloadApp}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-ink/10 pt-6 text-sm text-ink/45">{foot.rights} {foot.builtFor}</p>
    </footer>
  );
}

function DeviceFrame({
  t,
  image = previewMap,
  alt = 'VTZ app preview',
  label = null,
  caption = 'Nearby terminals',
  float = false,
  floatDelay = 0,
}) {
  const live = label ?? t?.phoneLive ?? 'VTZ Live';
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
              <p className="truncate text-[10px] font-black uppercase tracking-[0.14em] text-ink/45">{live}</p>
              <p className="truncate text-[13px] font-black text-ink">{caption}</p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-aqua">
              <Map size={15} aria-hidden="true" />
            </span>
          </div>
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/95 p-3.5 shadow-premium backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[13px] font-black text-ink">{t?.phoneInfo ?? 'Terminal information'}</p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-aqua">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-aqua" /> {t?.mapCard?.guide ?? 'Guide'}
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

function FloatingTransportCard({ t }) {
  const floating = (t && t.floating) || { city: 'Valenzuela City', guide: 'Tricycle terminal guide' };
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
          <p className="text-xs font-black uppercase text-ink/45">{floating.city}</p>
          <p className="font-black">{floating.guide}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LanguageGate({ mode = 'first-visit', active, onChoose, onClose }) {
  const isFirstVisit = mode === 'first-visit';
  useEffect(() => {
    if (!isFirstVisit) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isFirstVisit]);
  useEffect(() => {
    if (isFirstVisit) return;
    const onKey = (event) => { if (event.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFirstVisit, onClose]);
  const shell = isFirstVisit
    ? 'flex min-h-screen items-center justify-center bg-[#f6fbfa] p-5'
    : 'fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-5 backdrop-blur-sm';
  return (
    <div className={shell} role="dialog" aria-modal="true" aria-labelledby="language-title" aria-describedby="language-desc">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/60 bg-white p-7 text-center shadow-premium sm:p-10"
      >
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-aqua/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-signal/20 blur-3xl" />
        <div className="relative">
          {!isFirstVisit && (
            <button
              type="button"
              onClick={onClose}
              aria-label={MODAL_COPY.close}
              className="absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-2xl border border-ink/10 bg-white text-ink shadow-sm transition hover:bg-ink/5"
            >
              <X size={20} />
            </button>
          )}
          <span className="mx-auto grid h-16 w-16 place-items-center overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10">
            <img src={markerArt} alt="VTZ logo" className="h-14 w-14 object-contain" />
          </span>
          <h2 id="language-title" className="mt-5 text-3xl font-black text-ink sm:text-4xl">{MODAL_COPY.title}</h2>
          <p id="language-desc" className="mx-auto mt-3 max-w-sm text-base leading-7 text-ink/60">{MODAL_COPY.description}</p>
          <div className="mt-7 grid gap-3" role="group" aria-label={MODAL_COPY.title}>
            {LANGUAGE_VALUES.map((value) => {
              const meta = LANGUAGE_META[value];
              const selected = normalizeLanguage(active) === value;
              return (
                <button
                  key={value}
                  type="button"
                  autoFocus={isFirstVisit && selected}
                  onClick={() => onChoose(value)}
                  aria-pressed={selected}
                  className={`flex min-h-[64px] w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left text-base font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                    selected
                      ? 'border-ink bg-ink text-white shadow-premium'
                      : 'border-ink/10 bg-[#f6fbfa] text-ink hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white hover:shadow-premium active:translate-y-0'
                  }`}
                >
                  <span aria-hidden="true" className="text-2xl leading-none">{meta.flag}</span>
                  <span className="flex-1">
                    <span className="block text-lg">{meta.label}</span>
                    <span className={`block text-sm font-bold ${selected ? 'text-white/70' : 'text-ink/55'}`}>{meta.hint}</span>
                  </span>
                  {selected && <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-aqua text-ink">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
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
