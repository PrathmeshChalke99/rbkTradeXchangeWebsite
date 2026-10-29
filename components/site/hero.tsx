"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  FileCheck2,
  FileText,
  Globe2,
  Landmark,
  Menu,
  Network,
  Play,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Users2,
  X,
  Zap,
} from "lucide-react";

const modules = [
  {
    id: "trade",
    label: "Trade management",
    icon: FileText,
    color: "blue",
    title: "Every document, one intelligent workspace.",
    copy: "Upload invoices, packing lists, purchase orders and bills of lading. See fields, links and exceptions in one clear view.",
    metric: "94%",
    metricLabel: "fields cross-checked",
    tags: ["Import", "Export", "Documents"],
  },
  {
    id: "finance",
    label: "Business finance",
    icon: Landmark,
    color: "violet",
    title: "Finance applications, without the guesswork.",
    copy: "Organize KYC, financial statements and supporting documents into an application lenders can assess faster.",
    metric: "3.2×",
    metricLabel: "faster preparation",
    tags: ["KYC", "P&L", "Applications"],
  },
  {
    id: "network",
    label: "Business network",
    icon: Network,
    color: "mint",
    title: "Your whole trade network, connected.",
    copy: "Bring buyers, suppliers and logistics partners into a living map of the relationships that move your business.",
    metric: "128",
    metricLabel: "connected partners",
    tags: ["Buyers", "Suppliers", "Logistics"],
  },
  {
    id: "quotes",
    label: "Lender quotes",
    icon: BarChart3,
    color: "peach",
    title: "Compare quotes with confidence.",
    copy: "Track assignments, lender responses and quotations in one transparent timeline. You stay in control of the decision.",
    metric: "6",
    metricLabel: "quote fields visible",
    tags: ["Compare", "Track", "Decide"],
  },
  {
    id: "edocs",
    label: "E-docs studio",
    icon: FileCheck2,
    color: "pink",
    title: "Trade paperwork that starts ready.",
    copy: "Create proforma invoices, contracts, POs and packing lists from reusable, structured templates.",
    metric: "7 min",
    metricLabel: "to first draft",
    tags: ["Templates", "Preview", "Export"],
  },
];

function Logo() {
  return (
    <Link href="#top" className="brand" aria-label="RBK TradeXchange home">
      <span className="brand-mark">
        <span />
      </span>
      <span>
        RBK <b>TRADEXCHANGE</b>
      </span>
    </Link>
  );
}

function DocumentCard({
  type,
  className = "",
}: {
  type: string;
  className?: string;
}) {
  return (
    <div className={`document-card ${className}`}>
      <div className="doc-top">
        <span className="doc-dot" />
        <span className="doc-code">RBK / {type.slice(0, 3).toUpperCase()}</span>
        <span className="doc-status">
          <Check size={11} /> checked
        </span>
      </div>
      <div className="doc-title">{type}</div>
      <div className="doc-lines">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="doc-highlight">
        <span /> <span /> <span />
      </div>
      <div className="doc-total">
        <small>TOTAL VALUE</small>
        <strong>$48,620.00</strong>
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      className="hero-visual"
      aria-label="Animated document intelligence demonstration"
    >
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="hero-grid" />
      <div className="scan-ring" />
      <div className="hero-doc doc-back">
        <DocumentCard type="Packing list" />
      </div>
      <div className="hero-doc doc-mid">
        <DocumentCard type="Bill of lading" />
      </div>
      <div className="hero-doc doc-front">
        <DocumentCard type="Commercial invoice" />
      </div>
      <div className="scan-beam">
        <span />
      </div>
      <div className="match-pill">
        <span className="pulse-dot" />
        <div>
          <b>Fields matched</b>
          <small>Cross-check complete</small>
        </div>
        <strong>94%</strong>
      </div>
      <div className="floating-label label-one">
        <FileCheck2 size={15} /> Invoice identified
      </div>
      <div className="floating-label label-two">
        <ScanLine size={15} /> AI scan active
      </div>
    </div>
  );
}

function Workbench({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const selected = modules.find((item) => item.id === active) ?? modules[0];
  const Icon = selected.icon;
  return (
    <section id="workbench" className="section workbench-section">
      <div className="section-heading centered">
        <span className="eyebrow">
          <Sparkles size={14} /> Interactive workbench
        </span>
        <h2>
          See the platform <em>in motion.</em>
        </h2>
        <p>
          Explore the core workflows your team uses to move trade forward. Each
          view is a live product demonstration.
        </p>
      </div>
      <div className="workbench">
        <div className="module-tabs" role="tablist">
          {modules.map((item) => {
            const TabIcon = item.icon;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={active === item.id}
                className={`module-tab ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <TabIcon size={18} />
                <span>{item.label}</span>
                <ArrowRight size={15} />
              </button>
            );
          })}
        </div>
        <div className={`workbench-stage stage-${selected.color}`}>
          <div className="stage-copy">
            <span className="stage-kicker">
              <Icon size={15} /> {selected.label}
            </span>
            <h3>{selected.title}</h3>
            <p>{selected.copy}</p>
            <div className="stage-tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button
              className="text-button"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Talk to our team <ArrowRight size={16} />
            </button>
          </div>
          <div className="stage-dashboard">
            <div className="dashboard-top">
              <span>
                <i className="live-dot" /> live demonstration
              </span>
              <span>RBK / {selected.id}</span>
            </div>
            <div className="dashboard-main">
              <div className="metric-card">
                <small>{selected.metricLabel}</small>
                <strong>{selected.metric}</strong>
                <div className="mini-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="dashboard-card">
                <div className="dash-heading">
                  <span>Analysis progress</span>
                  <b>Today</b>
                </div>
                <div className="progress-line">
                  <span />
                </div>
                <div className="dash-stats">
                  <span>
                    <b>38</b> documents
                  </span>
                  <span>
                    <b>12</b> partners
                  </span>
                </div>
              </div>
            </div>
            <div className="dashboard-list">
              {["Commercial invoice", "Packing list", "Purchase order"].map(
                (name, index) => (
                  <div key={name}>
                    <span className={`list-icon list-${index}`}>
                      <Check size={13} />
                    </span>
                    <span>{name}</span>
                    <small>
                      {index === 0
                        ? "Cross-checked"
                        : index === 1
                          ? "Ready to review"
                          : "Uploaded"}
                    </small>
                    <ArrowRight size={14} />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  // Workbench state (moved from page.tsx)
  const [active, setActive] = useState("trade");

  // If you want to keep the mobile nav state here too, uncomment:
  // const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main id="top">
      {/* ===== YOUR PAGE'S TOP SECTION ===== */}
      <section className="hero section">
        <div className="hero-copy">
          <div className="announcement">
            <span className="announcement-dot" /> A clearer way to move trade{" "}
            <ArrowRight size={14} />
          </div>
          <h1>
            Trade moves fast.
            <br />
            <span>So should your</span> <i>workflow.</i>
          </h1>
          <p className="hero-text">
            RBK TradeXchange brings trade documents, finance workflows, business
            relationships and lender conversations into one intelligent
            workspace.
          </p>
          <div className="hero-actions">
            <Link href="#workbench" className="primary-button">
              Explore the platform <ArrowRight size={17} />
            </Link>
            <button
              className="play-button"
              onClick={() =>
                document
                  .getElementById("workbench")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>
                <Play size={14} fill="currentColor" />
              </span>{" "}
              See how it works
            </button>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <span>R</span>
              <span>T</span>
              <span>X</span>
              <span>+</span>
            </div>
            <p>
              Built for the teams
              <br />
              <b>behind every shipment.</b>
            </p>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="logo-strip">
        <span>ONE WORKSPACE FOR</span>
        <div>
          <b>
            <Globe2 size={18} /> IMPORT / EXPORT
          </b>
          <b>
            <ShieldCheck size={18} /> DOCUMENT INTELLIGENCE
          </b>
          <b>
            <Zap size={18} /> FINANCE WORKFLOWS
          </b>
          <b>
            <Users2 size={18} /> BUSINESS NETWORKS
          </b>
        </div>
      </section>

      <Workbench active={active} setActive={setActive} />
    </main>
  );
}
