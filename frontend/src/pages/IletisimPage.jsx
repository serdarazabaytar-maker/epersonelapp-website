import { Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { CONTACT } from "@/data/site";

// İletişim kartları merkezi CONTACT config'inden beslenir (src/data/site.js).
// WhatsApp numarası tanımlanana kadar kart tıklanamaz "Yakında" olarak görünür.
const ContactCard = ({ icon: Icon, title, value, href, testId }) => {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold text-ink">{title}</p>
        <p className="truncate text-sm text-mute">{value || "Yakında eklenecek"}</p>
      </div>
      {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );
  const cls = `group flex items-center gap-5 rounded-3xl border border-line bg-white p-6 transition-all duration-300 ${
    href ? "hover:-translate-y-0.5 hover:border-ink" : "cursor-default"
  }`;
  return href ? (
    <a href={href} className={cls} data-testid={testId}>
      {inner}
    </a>
  ) : (
    <div className={cls} data-testid={testId} title="Yakında">
      {inner}
    </div>
  );
};

export default function IletisimPage() {
  const cards = [
    {
      icon: Phone,
      title: "Telefon",
      value: CONTACT.phone,
      href: CONTACT.phoneTel ? `tel:${CONTACT.phoneTel}` : null,
      testId: "contact-card-telefon",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: CONTACT.whatsapp,
      href: CONTACT.whatsapp ? `https://wa.me/${String(CONTACT.whatsapp).replace(/\D/g, "")}` : null,
      testId: "contact-card-whatsapp",
    },
    {
      icon: Mail,
      title: "E-posta",
      value: CONTACT.email,
      href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
      testId: "contact-card-eposta",
    },
  ];

  return (
    <>
      <Seo
        title="İletişim | Epersonel"
        siteName="Epersonel"
        description="İşletmenizi konuşalım. Online veya yüz yüze görüşme planlayın; size uygun teknoloji ve operasyon modelini birlikte oluşturalım."
      />
      <section className="pb-24 pt-36 md:pt-44" data-testid="contact-page">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-mute">
                <span className="inline-block h-2 w-2 rounded-[3px] bg-brand" aria-hidden="true" />
                İletişim
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="contact-title">
                İşletmenizi konuşalım.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-mute md:text-lg">
                Online veya yüz yüze — ihtiyacınızı anlatın, size uygun çözümü birlikte belirleyelim.
              </p>
            </Reveal>
            <div className="mt-12 space-y-3">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={0.1 + i * 0.07}>
                  <ContactCard {...c} />
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15}>
            <LeadForm
              formType="iletisim"
              buttonLabel="Görüşme Talep Et"
              showMeetingType
              testId="contact-lead-form"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
