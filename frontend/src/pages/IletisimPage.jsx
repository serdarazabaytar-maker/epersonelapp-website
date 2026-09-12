import { Phone, Mail, MessageCircle } from "lucide-react";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";

// İletişim kartları — gerçek telefon, WhatsApp ve e-posta bilgileri eklendiğinde güncellenecek.
const CONTACT_CARDS = [
  { icon: Phone, title: "Telefon", note: "Bilgi ekleniyor" },
  { icon: MessageCircle, title: "WhatsApp", note: "Bilgi ekleniyor" },
  { icon: Mail, title: "E-posta", note: "Bilgi ekleniyor" },
];

export default function IletisimPage() {
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
              {CONTACT_CARDS.map((c, i) => (
                <Reveal key={c.title} delay={0.1 + i * 0.07}>
                  <div
                    className="flex items-center gap-5 rounded-3xl border border-line bg-white p-6"
                    data-testid={`contact-card-${c.title.toLowerCase()}`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-white">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-bold text-ink">{c.title}</p>
                      <p className="text-sm text-mute">{c.note}</p>
                    </div>
                  </div>
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
