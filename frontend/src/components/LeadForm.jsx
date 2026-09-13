import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { BRANCH_OPTIONS, SOLUTIONS } from "@/data/site";
import IL_ILCE from "@/data/il-ilce.json";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ILLER = Object.keys(IL_ILCE);

const schema = z.object({
  businessName: z.string().min(2, "İşletme adı gerekli"),
  branchCount: z.string().min(1, "Şube sayısı seçin"),
  contactName: z.string().min(3, "Ad soyad gerekli"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  phone: z
    .string()
    .refine((v) => /^0?[2-5]\d{9}$/.test(v.replace(/\D/g, "")), "Geçerli bir telefon numarası girin"),
  il: z.string().min(1, "İl seçin"),
  ilce: z.string().min(1, "İlçe seçin"),
  solution: z.string().optional(),
  meetingType: z.string().optional(),
  deliveryType: z.string().optional(),
  dailyOrders: z.string().optional(),
  message: z.string().max(2000).optional(),
  kvkk: z.literal(true, { errorMap: () => ({ message: "Devam etmek için KVKK metnini onaylayın" }) }),
});

// Türkiye telefon formatı: 0 (5XX) XXX XX XX
const formatPhone = (value) => {
  const d = value.replace(/\D/g, "").slice(0, 11);
  let out = d.slice(0, 1);
  if (d.length > 1) out += " (" + d.slice(1, 4);
  if (d.length > 4) out += ") " + d.slice(4, 7);
  if (d.length > 7) out += " " + d.slice(7, 9);
  if (d.length > 9) out += " " + d.slice(9, 11);
  return out;
};

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] font-medium text-ink placeholder:text-mute/60 transition-colors focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:bg-mist disabled:text-mute";
const labelCls = "mb-2 block text-sm font-bold text-ink";
const errCls = "mt-1.5 text-[13px] font-semibold text-red-600";

const Field = ({ label, error, children, required = true }) => (
  <div>
    <label className={labelCls}>
      {label} {required && <span className="text-mute">*</span>}
    </label>
    {children}
    {error && <p className={errCls} role="alert">{error}</p>}
  </div>
);

export const LeadForm = ({
  formType = "gorusme",
  buttonLabel = "Görüşme Talep Et",
  defaultSolution,
  showSolution = true,
  showMeetingType = false,
  showDelivery = false,
  testId = "lead-form",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { solution: defaultSolution || "", il: "", ilce: "", meetingType: showMeetingType ? "Online Görüşme" : undefined, kvkk: false },
  });

  const selectedIl = watch("il");
  const ilceOptions = (selectedIl && IL_ILCE[selectedIl]) || [];

  const onSubmit = async (values) => {
    const payload = {
      business_name: values.businessName.trim(),
      branch_count: values.branchCount,
      contact_name: values.contactName.trim(),
      email: values.email.trim(),
      phone: values.phone,
      il: values.il,
      ilce: values.ilce,
      solution: values.solution || null,
      meeting_type: values.meetingType || null,
      delivery_type: values.deliveryType || null,
      daily_orders: values.dailyOrders || null,
      message: values.message || null,
      form_type: formType,
      source_page: location.pathname,
      kvkk: values.kvkk,
    };
    await axios.post(`${API}/leads`, payload);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-white p-10 text-center"
        data-testid={`${testId}-success`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand">
          <CheckCircle2 className="h-8 w-8 text-ink" />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink md:text-3xl">Talebiniz alındı.</h3>
        <p className="mt-3 max-w-sm text-base text-mute">
          Ekibimiz en kısa sürede sizinle iletişime geçecek.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border border-line bg-white p-6 md:p-9"
      data-testid={testId}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="İşletme Adı" error={errors.businessName?.message}>
          <input
            {...register("businessName")}
            data-testid={`${testId}-business-input`}
            className={inputCls}
            placeholder="Örn. Yılmaz Market"
            autoComplete="organization"
          />
        </Field>
        <Field label="Şube Sayısı" error={errors.branchCount?.message}>
          <select {...register("branchCount")} data-testid={`${testId}-branch-select`} className={inputCls} defaultValue="">
            <option value="" disabled>
              Seçin
            </option>
            {BRANCH_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Yetkili Kişi Adı Soyadı" error={errors.contactName?.message}>
          <input
            {...register("contactName")}
            data-testid={`${testId}-contact-input`}
            className={inputCls}
            placeholder="Ad Soyad"
            autoComplete="name"
          />
        </Field>
        <Field label="Telefon Numarası" error={errors.phone?.message}>
          <input
            {...register("phone")}
            data-testid={`${testId}-phone-input`}
            className={inputCls}
            placeholder="0 (5XX) XXX XX XX"
            inputMode="tel"
            autoComplete="tel"
            onChange={(e) => setValue("phone", formatPhone(e.target.value), { shouldValidate: true })}
            value={watch("phone") || ""}
          />
        </Field>
        <Field label="E-posta Adresi" error={errors.email?.message}>
          <input
            {...register("email")}
            data-testid={`${testId}-email-input`}
            className={inputCls}
            placeholder="ornek@isletme.com"
            type="email"
            autoComplete="email"
          />
        </Field>
        {showSolution && (
          <Field label="İlgilendiğiniz Çözüm" error={errors.solution?.message} required={false}>
            <select {...register("solution")} data-testid={`${testId}-solution-select`} className={inputCls}>
              <option value="">Seçin (opsiyonel)</option>
              {SOLUTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        )}
        <Field label="İl" error={errors.il?.message}>
          <select
            {...register("il")}
            data-testid={`${testId}-il-select`}
            className={inputCls}
            onChange={(e) => {
              setValue("il", e.target.value, { shouldValidate: true });
              setValue("ilce", "");
            }}
          >
            <option value="" disabled>
              Seçin
            </option>
            {ILLER.map((il) => (
              <option key={il} value={il}>
                {il}
              </option>
            ))}
          </select>
        </Field>
        <Field label="İlçe" error={errors.ilce?.message}>
          <select
            {...register("ilce")}
            data-testid={`${testId}-ilce-select`}
            className={inputCls}
            disabled={!selectedIl}
          >
            <option value="" disabled>
              {selectedIl ? "Seçin" : "Önce il seçin"}
            </option>
            {ilceOptions.map((ilce) => (
              <option key={ilce} value={ilce}>
                {ilce}
              </option>
            ))}
          </select>
        </Field>
        {showMeetingType && (
          <Field label="Görüşme Türü" required={false}>
            <div className="flex gap-2" data-testid={`${testId}-meeting-type`}>
              {["Online Görüşme", "Yüz Yüze Görüşme"].map((m) => (
                <label
                  key={m}
                  className={`flex flex-1 cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-sm font-bold transition-colors ${
                    watch("meetingType") === m ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  <input type="radio" value={m} {...register("meetingType")} className="sr-only" />
                  {m}
                </label>
              ))}
            </div>
          </Field>
        )}
        {showDelivery && (
          <>
            <Field label="Teslimat İhtiyacı" required={false}>
              <select {...register("deliveryType")} data-testid={`${testId}-delivery-select`} className={inputCls} defaultValue="">
                <option value="" disabled>
                  Seçin (opsiyonel)
                </option>
                {["30–45 dk Hemen Teslim", "Randevulu Teslim", "Moto Kurye", "Frigolu Panelvan", "Karma"].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Günlük Tahmini Sipariş" required={false}>
              <select {...register("dailyOrders")} data-testid={`${testId}-orders-select`} className={inputCls} defaultValue="">
                <option value="" disabled>
                  Seçin (opsiyonel)
                </option>
                {["0–50", "50–200", "200–500", "500+"].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}
        <div className="sm:col-span-2">
          <Field label="Mesaj / İhtiyacınız" required={false}>
            <textarea
              {...register("message")}
              data-testid={`${testId}-message-input`}
              className={`${inputCls} min-h-[110px] resize-y`}
              placeholder="Kısaca ihtiyacınızı anlatın (opsiyonel)"
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-3" data-testid={`${testId}-kvkk-label`}>
          <input
            type="checkbox"
            {...register("kvkk")}
            data-testid={`${testId}-kvkk-checkbox`}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-black"
          />
          <span className="text-[13px] leading-relaxed text-mute">
            Kişisel verilerimin, taleplerimin yanıtlanması amacıyla işlenmesini{" "}
            <Link to="/kvkk" className="font-bold text-ink underline underline-offset-2">
              KVKK Aydınlatma Metni
            </Link>{" "}
            kapsamında kabul ediyorum.
          </span>
        </label>
        {errors.kvkk && <p className={errCls} role="alert">{errors.kvkk.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-testid={`${testId}-submit`}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(var(--brand-rgb),0.4)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            Gönderiliyor <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
          </>
        )}
      </button>
    </form>
  );
};
