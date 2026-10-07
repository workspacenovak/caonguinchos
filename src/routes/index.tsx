import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone, Clock, MapPin, Truck, Siren, Car, ChevronLeft, ChevronRight,
  QrCode, Banknote, CreditCard, FileText, Menu, X, ArrowRight,
} from "lucide-react";

/* ====== DADOS DA EMPRESA — edite aqui ====== */
const COMPANY = {
  name: "AGENOR CAON GUINCHOS",
  city: "Caxias do Sul - RS",
  phoneMain: "+55 54 99958-2481",
  phoneMainDigits: "5554999582481",
  phoneAlt: "+55 54 99963-4738",
  phoneAltDigits: "5554999634738",
  logo: "/logo.png", // troque o arquivo da logo aqui
  mapUrl: "https://www.google.com/maps?q=Caxias+do+Sul+-+RS&output=embed", // URL_DO_MAPA_AQUI
};
const WA_TEXT = encodeURIComponent("Olá, AGENOR CAON GUINCHOS! Preciso de um guincho.");
const waLink = (text = WA_TEXT) => `https://wa.me/${COMPANY.phoneMainDigits}?text=${text}`;
const telMain = `tel:+${COMPANY.phoneMainDigits}`;
const telAlt = `tel:+${COMPANY.phoneAltDigits}`;

/* Galeria — substitua pelos arquivos reais em /public/images */
const GALLERY = [
  { src: "/images/guincho-1.jpg", alt: "Caminhão guincho plataforma da AGENOR CAON GUINCHOS transportando um carro" },
  { src: "/images/guincho-2.jpg", alt: "Operador prendendo veículo na plataforma do guincho durante atendimento noturno" },
  { src: "/images/guincho-3.jpg", alt: "Guincho plataforma em rodovia da Serra Gaúcha, região de Caxias do Sul" },
  { src: "/images/guincho-4.jpg", alt: "Atendimento de guincho em veículo avariado na cidade" },
  { src: "/images/guincho-5.jpg", alt: "Guincho realizando transporte seguro de veículo em área urbana" },
  { src: "/images/guincho-6.jpg", alt: "Equipe da AGENOR CAON GUINCHOS em atendimento de emergência" },
  { src: "/images/guincho-7.jpg", alt: "Veículo em plataforma do guincho preparado para remoção" },
  { src: "/images/guincho-8.jpg", alt: "Guincho em operação em Caxias do Sul e região" },
  { src: "/images/guincho-9.jpg", alt: "Atendimento de guincho para veículo com pane ou acidente" },
  { src: "/images/guincho-10.jpg", alt: "Guincho da AGENOR CAON GUINCHOS em deslocamento para atendimento" },
  { src: "/images/guincho-11.jpg", alt: "Veículo sendo transportado com segurança pela equipe" },
  { src: "/images/guincho-12.jpg", alt: "Guincho da empresa em atendimento rápido e profissional" },
  { src: "/images/guincho-13.jpg", alt: "Operação de remoção e transporte de veículos em rodovia" },
  { src: "/images/guincho-14.jpg", alt: "Guincho em atendimento para remoção de veículo" },
  { src: "/images/guincho-15.jpg", alt: "Caminhão guincho em serviço de transporte veicular" },
  { src: "/images/guincho-16.jpg", alt: "Atendimento de guincho com plataforma para veículo" },
  { src: "/images/guincho-17.jpg", alt: "Guincho preparado para transporte seguro de automóvel" },
  { src: "/images/guincho-18.jpg", alt: "Serviço de guincho em Caxias do Sul e região" },
  { src: "/images/guincho-19.jpg", alt: "Veículo sendo atendido por guincho plataforma" },
];

const SERVICES = [
  { icon: Clock, title: "Guincho 24 horas", text: "Atendimento todos os dias, a qualquer hora, inclusive feriados." },
  { icon: MapPin, title: "Atendimento em Caxias do Sul - RS", text: "Base local para chegar rápido em toda a cidade e região." },
  { icon: Truck, title: "Remoção e transporte de veículos", text: "Remoção de veículos avariados, acidentados ou sem condições de rodar." },
  { icon: Siren, title: "Atendimento rápido para emergências", text: "Pane, acidente ou pneu furado: saímos assim que você chama." },
  { icon: Car, title: "Transporte de veículos", text: "Transporte seguro com plataforma, para curtas e longas distâncias." },
];

const PAYMENTS = [
  { icon: QrCode, label: "PIX" },
  { icon: Banknote, label: "Dinheiro" },
  { icon: CreditCard, label: "Cartão" },
  { icon: FileText, label: "Boleto" },
];

const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#pagamento", label: "Pagamento" },
  { href: "#contato", label: "Contato" },
  { href: "#regiao", label: "Região" },
];

const TITLE = "Guincho 24 horas em Caxias do Sul - RS | AGENOR CAON GUINCHOS";
const DESC = "AGENOR CAON GUINCHOS: guincho 24 horas em Caxias do Sul - RS e região. Remoção e transporte de veículos com atendimento rápido. Chame no WhatsApp ou ligue.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: COMPANY.name,
  description: DESC,
  telephone: COMPANY.phoneMain,
  openingHours: "Mo-Su 00:00-23:59",
  areaServed: "Caxias do Sul - RS e região",
  address: { "@type": "PostalAddress", addressLocality: "Caxias do Sul", addressRegion: "RS", addressCountry: "BR" },
  paymentAccepted: "PIX, Dinheiro, Cartão, Boleto",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
}

const btnBase = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-soft`;
const btnOutline = `${btnBase} border border-border text-foreground hover:border-primary hover:text-primary`;

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, cls: seen ? "reveal" : "opacity-0" };
}

function Section({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode }) {
  const { ref, cls } = useInView<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`mx-auto max-w-6xl px-5 py-20 md:py-28 ${cls} ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">{children}</p>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/90 backdrop-blur" : "bg-background"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-18">
        <a href="#inicio" aria-label={COMPANY.name} className="shrink-0">
          <img src={COMPANY.logo} alt={COMPANY.name} className="h-16 w-auto md:h-14" width={160} height={48} />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu" aria-expanded={open}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 py-3 md:hidden" aria-label="Menu móvel">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-foreground">{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-36">
      <div className="reveal">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-brand" /></span>
          Disponível agora · 24h
        </span>
        <p className="mt-6 font-display text-sm font-semibold tracking-[0.25em] text-primary">AGENOR CAON GUINCHOS</p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.08] text-foreground md:text-6xl">
          Guincho 24 horas em <span className="text-primary">Caxias do Sul - RS</span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted-foreground">Atendimento rápido e profissional.</p>
      </div>
      <div className="reveal relative" style={{ animationDelay: "120ms" }}>
        <img src={GALLERY[0]!.src} alt={GALLERY[0]!.alt} width={1280} height={896} fetchPriority="high" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section id="servicos">
      <Eyebrow>Serviços</Eyebrow>
      <h2 className="max-w-xl text-3xl font-bold text-foreground md:text-4xl">Serviço de guincho para carros em Caxias do Sul</h2>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, text }) => (
          <article key={title} className="group bg-background p-7 transition-colors duration-300 hover:bg-muted">
            <Icon className="size-6 text-brand transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.75} />
            <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </article>
        ))}
        <a href={waLink()} target="_blank" rel="noopener" className="group flex flex-col justify-between bg-primary p-7 text-primary-foreground">
          <h3 className="text-lg font-semibold">Precisa agora?</h3>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Chamar no WhatsApp <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
        </a>
      </div>
    </Section>
  );
}

function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <Section id="galeria">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>Galeria</Eyebrow>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Nossos veículos e atendimentos</h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} aria-label="Foto anterior" className="rounded-full border border-border p-3 transition-colors hover:border-primary hover:text-primary"><ChevronLeft className="size-5" /></button>
          <button onClick={() => scroll(1)} aria-label="Próxima foto" className="rounded-full border border-border p-3 transition-colors hover:border-primary hover:text-primary"><ChevronRight className="size-5" /></button>
        </div>
      </div>
      <div ref={track} className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5">
        {GALLERY.map((img) => (
          <figure key={img.src} className="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[60%] lg:w-[45%]">
            <img src={img.src} alt={img.alt} loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Payments() {
  return (
    <section id="pagamento" className="border-y border-border bg-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-foreground">Formas de pagamento</h2>
        <ul className="grid grid-cols-2 gap-3 sm:flex sm:gap-8">
          {PAYMENTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
              <Icon className="size-5 text-brand" strokeWidth={1.75} /> {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/30";

function ContactForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = [
      "*Solicitação pelo site — AGENOR CAON GUINCHOS*",
      "",
      `*Nome:* ${f.get("nome")}`,
      `*Telefone:* ${f.get("telefone")}`,
      `*Serviço:* ${f.get("servico")}`,
      `*Mensagem:* ${f.get("mensagem") || "-"}`,
    ].join("\n");
    window.open(waLink(encodeURIComponent(msg)), "_blank", "noopener");
  };
  return (
    <Section id="contato" className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
      <div>
        <Eyebrow>Contato</Eyebrow>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Solicite seu atendimento</h2>
        <p className="mt-4 max-w-sm text-muted-foreground">Preencha os dados e sua mensagem será enviada direto para o nosso WhatsApp.</p>
        <div className="mt-8 space-y-3 text-sm">
          <a href={telMain} className="flex items-center gap-3 font-semibold text-foreground hover:text-primary"><Phone className="size-4 text-brand" /> {COMPANY.phoneMain}</a>
          <a href={telAlt} className="flex items-center gap-3 text-muted-foreground hover:text-primary"><Phone className="size-4 text-brand" /> {COMPANY.phoneAlt} <span className="text-xs">(alternativo)</span></a>
        </div>
      </div>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-foreground">Nome
          <input name="nome" required className={field} placeholder="Seu nome" autoComplete="name" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground">Telefone
          <input name="telefone" required type="tel" className={field} placeholder="(54) 9 0000-0000" autoComplete="tel" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground sm:col-span-2">Tipo de serviço
          <select name="servico" required className={field} defaultValue="">
            <option value="" disabled>Selecione</option>
            {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
            <option>Outro</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-foreground sm:col-span-2">Mensagem
          <textarea name="mensagem" rows={4} className={field} placeholder="Local, tipo de veículo e o que aconteceu" />
        </label>
        <button type="submit" className={`${btnPrimary} sm:col-span-2`}><WhatsAppIcon /> Enviar pelo WhatsApp</button>
      </form>
    </Section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5">
      <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-16 md:py-20">
        <h2 className="text-3xl font-bold md:text-4xl">Precisa de um guincho?</h2>
        <p className="mx-auto mt-4 max-w-lg opacity-85">Entre em contato com a AGENOR CAON GUINCHOS. Atendimento 24 horas em Caxias do Sul - RS.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={waLink()} target="_blank" rel="noopener" className={`${btnBase} bg-background text-primary hover:-translate-y-0.5`}><WhatsAppIcon /> WhatsApp</a>
          <a href={telMain} className={`${btnBase} border border-primary-foreground/40 hover:bg-primary-foreground/10`}><Phone className="size-4" /> Ligar agora</a>
        </div>
      </div>
    </section>
  );
}

function Region() {
  return (
    <Section id="regiao" className="grid items-center gap-10 md:grid-cols-[1fr_1.4fr]">
      <div>
        <Eyebrow>Região de Atendimento</Eyebrow>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">Atendemos Caxias do Sul e região</h2>
        <p className="mt-4 text-muted-foreground">Guincho 24 horas para atendimento e transporte de veículos.</p>
      </div>
      <iframe
        title="Mapa da região de atendimento — Caxias do Sul - RS"
        src={COMPANY.mapUrl}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-2xl"
      />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pb-28 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3">
        <div>
          <img src={COMPANY.logo} alt={COMPANY.name} className="h-10 w-auto" loading="lazy" width={160} height={48} />
          <p className="mt-4 text-sm text-muted-foreground">Guincho 24 horas em Caxias do Sul - RS.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Contato</p>
          <a href={telMain} className="block text-muted-foreground hover:text-primary">Telefone: {COMPANY.phoneMain}</a>
          <a href={telAlt} className="block text-muted-foreground hover:text-primary">Alternativo: {COMPANY.phoneAlt}</a>
          <a href={waLink()} target="_blank" rel="noopener" className="block text-muted-foreground hover:text-primary">WhatsApp: {COMPANY.phoneMain}</a>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-foreground">Formas de pagamento</p>
          <p className="text-muted-foreground">PIX · Dinheiro · Cartão · Boleto</p>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl px-5 text-xs text-muted-foreground">© {new Date().getFullYear()} AGENOR CAON GUINCHOS. Todos os direitos reservados.</p>
    </footer>
  );
}

function FloatingButtons() {
  const fab = "fixed bottom-5 z-50 flex size-14 items-center justify-center rounded-full shadow-soft transition-transform duration-300 hover:scale-105";
  return (
    <>
      <a href={telMain} aria-label={`Ligar para ${COMPANY.phoneMain}`} className={`${fab} left-5 border border-border bg-background text-primary`}>
        <Phone className="size-5" />
      </a>
      <a href={waLink()} target="_blank" rel="noopener" aria-label="Conversar no WhatsApp" className={`${fab} right-5 bg-brand text-primary-foreground`}>
        <WhatsAppIcon className="size-6" />
      </a>
    </>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Payments />
        <ContactForm />
        <CTA />
        <Region />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
