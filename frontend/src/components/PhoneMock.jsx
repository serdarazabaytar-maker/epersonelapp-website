import { motion } from "framer-motion";
import { Barcode, Search, Plus, Minus, ChevronRight, Clock3, Package } from "lucide-react";

// Telefon mockup — gerçek uygulama ekran görüntüleri hazır olduğunda
// ekran içerikleri görsellerle değiştirilecek şekilde tasarlandı.

const EpScreen = () => (
  <div className="flex h-full flex-col bg-mist">
    <div className="bg-ink px-5 pb-5 pt-4 text-white">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">EP Uygulaması</p>
      <p className="mt-1 text-base font-bold">Ürün Yönetimi</p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5">
        <Search className="h-4 w-4 text-white/50" />
        <span className="text-xs text-white/50">Ürün ara veya barkod okut</span>
      </div>
    </div>
    <div className="flex-1 space-y-2.5 overflow-hidden p-4">
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-ink">
        <Barcode className="h-4 w-4" /> Barkod Okut
      </button>
      {[
        ["Dana Kıyma 500g", "₺389,90", "Stok: 42"],
        ["Süzme Yoğurt 1kg", "₺74,99", "Stok: 18"],
        ["Tam Buğday Ekmek", "₺32,50", "Stok: 6"],
      ].map(([name, price, stock], i) => (
        <motion.div
          key={name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.12 }}
          className="flex items-center gap-3 rounded-xl border border-line bg-white p-3"
        >
          <div className="h-10 w-10 shrink-0 rounded-lg bg-mist" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-bold text-ink">{name}</p>
            <p className="text-[11px] text-mute">{stock}</p>
          </div>
          <p className="text-[13px] font-extrabold text-ink">{price}</p>
        </motion.div>
      ))}
    </div>
    <div className="flex items-center justify-around border-t border-line bg-white px-4 py-3">
      {["Ürünler", "Stok", "Fiyat", "Kampanya"].map((t, i) => (
        <span key={t} className={`text-[10px] font-bold ${i === 0 ? "text-ink" : "text-mute"}`}>
          {t}
        </span>
      ))}
    </div>
  </div>
);

const PersonelScreen = () => (
  <div className="flex h-full flex-col bg-mist">
    <div className="bg-ink px-5 pb-5 pt-4 text-white">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Personel Uygulaması</p>
      <p className="mt-1 text-base font-bold">Tek Ekran — Tüm Siparişler</p>
    </div>
    <div className="flex-1 space-y-2.5 overflow-hidden p-4">
      {[
        ["#10482", "Trendyol", "Hazırlanıyor", "08:12"],
        ["#10481", "Yemeksepeti", "Kuryede", "12:40"],
        ["#10479", "Kendi Uygulaması", "Yeni", "00:32"],
        ["#10478", "Getir", "Hazırlanıyor", "04:55"],
      ].map(([id, channel, status, time], i) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.12 }}
          className="rounded-xl border border-line bg-white p-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-extrabold text-ink">{id}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                status === "Yeni" ? "bg-brand text-ink" : status === "Kuryede" ? "bg-mist text-mute" : "bg-ink text-white"
              }`}
            >
              {status}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-mute">
            <span className="flex items-center gap-1">
              <Package className="h-3 w-3" /> {channel}
            </span>
            <span className="flex items-center gap-1">
              <Clock3 className="h-3 w-3" /> {time}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="border-t border-line bg-white px-5 py-3 text-center text-[10px] font-bold text-mute">
      4 kanal · tek uygulama
    </div>
  </div>
);

const EpfoodScreen = () => (
  <div className="flex h-full flex-col bg-mist">
    <div className="bg-ink px-5 pb-5 pt-4 text-white">
      <p className="text-[10px] font-bold uppercase tracking-widest text-food">EPfood</p>
      <p className="mt-1 text-base font-bold">Menü Yönetimi</p>
      <div className="mt-3 flex gap-2">
        {["Burgerler", "Menüler", "İçecek", "Tatlı"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${i === 0 ? "bg-food text-ink" : "bg-white/10 text-white/60"}`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
    <div className="flex-1 space-y-2.5 overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-line bg-white p-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 to-orange-300 text-lg font-extrabold text-ink">
            B
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-ink">Klasik Burger</p>
            <p className="text-[11px] text-mute">₺189,90</p>
          </div>
          <ChevronRight className="h-4 w-4 text-mute" />
        </div>
        <div className="mt-3 space-y-1.5 border-t border-line pt-3">
          {["Pişirme: Az / Orta / İyi", "Ekstra cheddar +₺25", "Patates seçimi", "Sos seçimi"].map((o) => (
            <p key={o} className="flex items-center gap-2 text-[11px] text-mute">
              <span className="h-1 w-1 rounded-full bg-food" /> {o}
            </p>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl border border-line bg-white p-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-bold text-ink">Açık ürün stok</p>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-mist"><Minus className="h-3 w-3" /></span>
            <span className="text-[13px] font-extrabold">24</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white"><Plus className="h-3 w-3" /></span>
          </div>
        </div>
      </motion.div>
    </div>
    <div className="border-t border-line bg-white px-5 py-3 text-center text-[10px] font-bold text-mute">
      Menü · Opsiyon · Görsel · Sipariş
    </div>
  </div>
);

const SCREENS = { ep: EpScreen, personel: PersonelScreen, epfood: EpfoodScreen };

export const PhoneMock = ({ variant = "ep", className = "" }) => {
  const Screen = SCREENS[variant] || EpScreen;
  return (
    <div
      className={`relative w-[270px] overflow-hidden rounded-[2.6rem] border-[10px] border-ink bg-white shadow-[0_30px_80px_rgba(16,17,16,0.25)] ${className}`}
      data-testid={`phone-mock-${variant}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
      <div className="aspect-[9/19] pt-6">
        <Screen />
      </div>
    </div>
  );
};
