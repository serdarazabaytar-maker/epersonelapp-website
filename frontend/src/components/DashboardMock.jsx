import { motion } from "framer-motion";

// Demo dashboard mockup — gerçek uygulama ekran görüntüleri hazır olduğunda
// bu bileşenin içeriği görsellerle değiştirilecek şekilde tasarlandı. Veriler örnektir.
const TABS = {
  siparisler: {
    stats: [
      ["Toplam Sipariş", "1.284", "+%12"],
      ["Ciro", "₺186.4K", "+%8"],
      ["Geciken Sipariş", "3", ""],
      ["Ort. Hazırlama", "14 dk", ""],
    ],
    cols: ["Sipariş", "Kanal", "Durum", "Süre"],
    rows: [
      ["#10482", "Trendyol", "Hazırlanıyor", "08:12"],
      ["#10481", "Yemeksepeti", "Kuryede", "12:40"],
      ["#10480", "Getir", "Teslim Edildi", "21:03"],
      ["#10479", "Mobil Uygulama", "Yeni", "00:32"],
      ["#10478", "Web", "Hazırlanıyor", "04:55"],
    ],
  },
  urunler: {
    stats: [
      ["Aktif Ürün", "2.431", "+%3"],
      ["Kritik Stok", "18", ""],
      ["Fiyat Bekleyen", "6", ""],
      ["Mağaza", "12", ""],
    ],
    cols: ["Ürün", "Stok", "Fiyat", "Durum"],
    rows: [
      ["Dana Kıyma 500g", "bar:82", "₺389,90", "Yayında"],
      ["Süzme Yoğurt 1kg", "bar:64", "₺74,99", "Yayında"],
      ["Tam Buğday Ekmek", "bar:12", "₺32,50", "Kritik"],
      ["Organik Yumurta 10'lu", "bar:47", "₺89,90", "Yayında"],
      ["Fıstıklı Baklava 1kg", "bar:91", "₺640,00", "Yayında"],
    ],
  },
  stok: {
    stats: [
      ["Stok Değeri", "₺412K", ""],
      ["Kritik Ürün", "18", ""],
      ["Virman Talebi", "4", ""],
      ["Son Aktarım", "10:00", ""],
    ],
    cols: ["Ürün", "Seviye", "Şube", "Durum"],
    rows: [
      ["Dana Kıyma 500g", "bar:82", "Merkez", "Normal"],
      ["Tam Buğday Ekmek", "bar:12", "Cadde", "Kritik"],
      ["Süzme Yoğurt 1kg", "bar:64", "Merkez", "Normal"],
      ["Tavuk But 1kg", "bar:28", "Park", "Düşük"],
      ["Organik Yumurta 10'lu", "bar:47", "Cadde", "Normal"],
    ],
  },
  fiyat: {
    stats: [
      ["Güncellenen Fiyat", "142", ""],
      ["Markup Kuralı", "9", ""],
      ["Bekleyen Onay", "6", ""],
      ["Son Aktarım", "10:00", ""],
    ],
    cols: ["Ürün", "Eski", "Yeni", "Kural"],
    rows: [
      ["Süzme Yoğurt 1kg", "₺72,50", "₺74,99", ".99"],
      ["Dana Kıyma 500g", "₺379,90", "₺389,90", "Kategori"],
      ["Tam Buğday Ekmek", "₺30,00", "₺32,49", ".49"],
      ["Tavuk But 1kg", "₺119,90", "₺124,99", ".99"],
      ["Fıstıklı Baklava 1kg", "₺620,00", "₺640,00", "Kategori"],
    ],
  },
  personel: {
    stats: [
      ["Aktif Personel", "24", ""],
      ["Hazırlanan Sipariş", "318", ""],
      ["Ort. Süre", "11 dk", "-%6"],
      ["Vardiya", "3", ""],
    ],
    cols: ["Personel", "Hazırlanan", "Ort. Süre", "Durum"],
    rows: [
      ["A. Yılmaz", "46", "9 dk", "Aktif"],
      ["E. Demir", "41", "10 dk", "Aktif"],
      ["M. Kaya", "38", "12 dk", "Aktif"],
      ["S. Aydın", "33", "11 dk", "Mola"],
      ["B. Çelik", "29", "13 dk", "Aktif"],
    ],
  },
  subeler: {
    stats: [
      ["Aktif Şube", "12", ""],
      ["Bugünkü Sipariş", "1.284", "+%12"],
      ["En Yoğun", "Merkez", ""],
      ["Kapalı", "0", ""],
    ],
    cols: ["Şube", "Sipariş", "Ciro", "Durum"],
    rows: [
      ["Merkez", "214", "₺32.1K", "Açık"],
      ["Cadde", "186", "₺27.4K", "Açık"],
      ["Park", "162", "₺23.8K", "Açık"],
      ["Marina", "141", "₺20.2K", "Açık"],
      ["Vadi", "118", "₺17.9K", "Açık"],
    ],
  },
};

const PILL_TONES = {
  Yeni: "bg-brand text-ink",
  Hazırlanıyor: "bg-ink text-white",
  Kuryede: "bg-mist text-ink border border-line",
  "Teslim Edildi": "bg-mist text-mute",
  Yayında: "bg-mist text-ink border border-line",
  Kritik: "bg-ink text-white",
  Düşük: "bg-mist text-ink border border-line",
  Normal: "bg-mist text-mute",
  Aktif: "bg-mist text-ink border border-line",
  Mola: "bg-mist text-mute",
  "Açık": "bg-mist text-ink border border-line",
};

const Cell = ({ value }) => {
  if (typeof value === "string" && value.startsWith("bar:")) {
    const pct = Number(value.slice(4));
    return (
      <div className="h-1.5 w-full max-w-[90px] overflow-hidden rounded-full bg-line">
        <motion.div
          className={`h-full rounded-full ${pct <= 20 ? "bg-ink" : "bg-brand"}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }
  if (PILL_TONES[value]) {
    return (
      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${PILL_TONES[value]}`}>{value}</span>
    );
  }
  return <span className="text-[13px] font-semibold text-ink">{value}</span>;
};

export const DashboardMock = ({ tab = "siparisler", compact = false }) => {
  const data = TABS[tab] || TABS.siparisler;
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_80px_rgba(16,17,16,0.1)]"
      data-testid={`dashboard-mock-${tab}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand" />
        <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] font-semibold text-mute border border-line">
          panel.epersonel.co
        </span>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-mute">Örnek veri</span>
      </div>
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={compact ? "p-4" : "p-6"}
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {data.stats.map(([label, value, delta]) => (
            <div key={label} className={`rounded-xl border border-line bg-mist ${compact ? "p-3" : "p-4"}`}>
              <p className="text-[11px] font-bold uppercase tracking-wider text-mute">{label}</p>
              <p className={`mt-1 font-extrabold tracking-tight text-ink ${compact ? "text-lg" : "text-2xl"}`}>
                {value}
                {delta && <span className="ml-1.5 align-middle text-[11px] font-bold text-mute">{delta}</span>}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-mist">
                {data.cols.map((c) => (
                  <th key={c} className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-mute">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, i) => (
                <motion.tr
                  key={row[0]}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  className="border-b border-line last:border-0"
                >
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 ${compact ? "py-2.5" : "py-3"}`}>
                      <Cell value={cell} />
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
