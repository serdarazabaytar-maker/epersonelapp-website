import Seo from "@/components/Seo";
import { Reveal } from "@/components/Reveal";

// NOT: Aşağıdaki metinler genel çerçeve metinlerdir; yayına almadan önce
// hukuki danışman incelemesinden geçirilmelidir.
const CONTENT = {
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    seo: "Epersonel KVKK aydınlatma metni — kişisel verilerin işlenmesi hakkında bilgilendirme.",
    paragraphs: [
      "Epersonel olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.",
      "Web sitemizdeki formlar aracılığıyla paylaştığınız işletme adı, yetkili adı soyadı, e-posta adresi ve telefon numarası gibi kişisel veriler; yalnızca talebinizin yanıtlanması, size özel teklif hazırlanması ve görüşme planlanması amaçlarıyla işlenir.",
      "Kişisel verileriniz açık rızanız olmaksızın üçüncü kişilerle paylaşılmaz ve işleme amacının gerektirdiği süre boyunca saklanır.",
      "KVKK'nın 11. maddesi kapsamındaki haklarınızı (verilerinize erişme, düzeltilmesini veya silinmesini talep etme vb.) bizimle iletişime geçerek kullanabilirsiniz.",
    ],
  },
  gizlilik: {
    title: "Gizlilik Politikası",
    seo: "Epersonel gizlilik politikası — web sitesi ziyaretçilerinin verilerinin korunması.",
    paragraphs: [
      "Bu gizlilik politikası, Epersonel web sitesini ziyaret ettiğinizde hangi verilerin toplandığını ve nasıl kullanıldığını açıklar.",
      "Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla anonim kullanım istatistikleri toplayabilir. Bu veriler kimliğinizi belirlemek için kullanılmaz.",
      "İletişim ve teklif formları aracılığıyla paylaştığınız veriler, yalnızca talebinizin karşılanması amacıyla kullanılır ve KVKK Aydınlatma Metni kapsamında korunur.",
      "Bu politika gerektiğinde güncellenebilir; güncel sürüm her zaman bu sayfada yayınlanır.",
    ],
  },
  cerez: {
    title: "Çerez Politikası",
    seo: "Epersonel çerez politikası — sitede kullanılan çerezler hakkında bilgilendirme.",
    paragraphs: [
      "Epersonel web sitesi, temel işlevsellik ve kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanır.",
      "Zorunlu çerezler sitenin düzgün çalışması için gereklidir. Analitik çerezler, site kullanımını anonim olarak anlamamıza yardımcı olur.",
      "Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Bazı çerezleri engellemeniz sitenin belirli özelliklerini etkileyebilir.",
    ],
  },
};

export const LegalPage = ({ kind }) => {
  const content = CONTENT[kind] || CONTENT.kvkk;
  return (
    <>
      <Seo title={`${content.title} | Epersonel`} siteName="Epersonel" description={content.seo} />
      <section className="pb-24 pt-36 md:pt-44" data-testid={`legal-${kind}`}>
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">{content.title}</h1>
            <div className="mt-10 space-y-6">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-mute md:text-lg">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-12 border-t border-line pt-6 text-sm text-mute">Son güncelleme: Temmuz 2026</p>
          </Reveal>
        </div>
      </section>
    </>
  );
};
