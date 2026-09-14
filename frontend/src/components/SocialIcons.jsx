// Premium sosyal medya ikonları — lucide'dan bağımsız, site diline uygun yumuşak köşeli özel çizimler.
// Footer ve iletişim sayfasında aynı ikonlar kullanılır.
export const InstagramIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.1" cy="6.9" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedinIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <path d="M8 10.6v5.9" />
    <circle cx="8" cy="7.7" r="0.5" fill="currentColor" stroke="none" />
    <path d="M11.6 16.5v-5.9" />
    <path d="M11.6 13.3c0-1.5 1.1-2.7 2.5-2.7 1.5 0 2.3 1.2 2.3 2.7v3.2" />
  </svg>
);
