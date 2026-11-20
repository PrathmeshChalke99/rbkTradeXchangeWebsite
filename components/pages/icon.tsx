import {
  Accessibility,
  FileCheck,
  FilePlus,
  FileSearch,
  FileSignature,
  FileText,
  FileWarning,
  Handshake,
  Landmark,
  Layers,
  LayoutDashboard,
  Package,
  Receipt,
  ScanLine,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserPlus,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Accessibility,
  FileCheck,
  FilePlus,
  FileSearch,
  FileSignature,
  FileText,
  FileWarning,
  Handshake,
  Landmark,
  Layers,
  LayoutDashboard,
  Package,
  Receipt,
  ScanLine,
  Share2,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = icons[name] ?? Sparkles;
  return <C aria-hidden {...props} />;
}
