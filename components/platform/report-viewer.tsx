import { Download, ExternalLink, FileText, MoveVertical } from "lucide-react";

/**
 * Shows a PDF report as a continuous, scrollable "roll" inside a framed viewer,
 * with a download button underneath. Uses the browser's own PDF reader, so text stays sharp
 * and selectable. Browsers without an inline PDF reader get the download and open links.
 */
export function ReportViewer({
  src,
  title,
  subtitle,
  filename,
  height = 560,
}: {
  src: string;
  title: string;
  subtitle?: string;
  filename?: string;
  height?: number;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-lift">
      <div className="flex items-center justify-between gap-3 border-b border-brand-line bg-brand-paper px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-accent-soft text-brand-accent-dark">
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold text-brand-ink">
              {title}
            </p>
            {subtitle && (
              <p className="truncate text-xs text-brand-slate">{subtitle}</p>
            )}
          </div>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-slate shadow-soft sm:inline-flex">
          <MoveVertical className="h-3.5 w-3.5 animate-float-y" /> Scroll to
          read
        </span>
      </div>

      <div className="relative bg-[#525659]" style={{ height }}>
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
          title={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />

        <noscript>
          <a
            href={src}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            Open the report
          </a>
        </noscript>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-line bg-white px-4 py-3">
        <p className="text-xs text-brand-slate">
          Can&apos;t see the report? Open it in a new tab or download it.
        </p>
        <div className="flex gap-2">
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary !px-3 !py-1.5 text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open
          </a>
          <a
            href={src}
            download={filename}
            className="btn-primary !px-3 !py-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" /> Download
          </a>
        </div>
      </div>
    </div>
  );
}
