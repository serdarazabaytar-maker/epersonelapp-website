import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VARIANTS = {
  primary:
    "bg-brand text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(var(--brand-rgb),0.4)]",
  dark: "bg-ink text-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,17,16,0.3)]",
  ghost: "border border-line bg-white text-ink hover:border-ink",
  white: "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
};

export const CTAButton = ({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  testId,
  type = "button",
  noArrow = false,
}) => {
  const cls = `group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-300 ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {!noArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.4} />
      )}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} data-testid={testId}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} data-testid={testId}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} data-testid={testId}>
      {inner}
    </button>
  );
};
