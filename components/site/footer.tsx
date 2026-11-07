import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/site/navbar";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1115] text-white/80">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(120% 90% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="RBK TradeXchange home"
              className="inline-block rounded-lg"
            >
              <Logo light className="h-12 sm:h-12" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:info@rbktradexchange.com"
                  className="inline-flex items-center gap-2.5 text-white/65 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 text-white/40" aria-hidden />
                  info@rbktradexchange.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919175827909"
                  className="inline-flex items-center gap-2.5 text-white/65 transition hover:text-white"
                >
                  <Phone className="h-4 w-4 text-white/40" aria-hidden />
                  +91 9175827909
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/65">
                <MapPin className="h-14 w-14 text-white/40" aria-hidden />
                Office No 615, Platinum Square, opp. WEIKFIELD IT CITI INFO
                PARK, Sakore Nagar, Viman Nagar, Pune, Maharashtra 411014{" "}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-4">
            {Object.entries(siteConfig.footerNav).map(([section, links]) => (
              <nav key={section} aria-label={section}>
                <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                  {section}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group relative inline-block text-sm text-white/65 transition hover:text-white"
                      >
                        {link.label}
                        <span
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/50 transition-transform duration-300 group-hover:scale-x-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} RBK TradeXchange. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.14em]">
            Import · Export · Trade finance
          </p>
        </div>
      </div>
    </footer>
  );
}
