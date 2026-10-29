import { Navbar } from '@/components/site/navbar';
import { Hero } from '@/components/site/hero';
import { PlatformCapabilities } from '@/components/site/platform-capabilities';
import { TradeWorkflow } from '@/components/site/trade-workflow';
import { ProductWorkbench } from '@/components/site/product-workbench';
import { AIDocumentIntelligence } from '@/components/site/ai-document-intelligence';
import { BusinessFinanceSection } from '@/components/site/business-finance-section';
import { LCDiscrepancy } from '@/components/site/lc-discrepancy';
import { AIClientAssessment } from '@/components/site/ai-client-assessment';
import { FeaturesSection } from '@/components/site/features-section';
import { PricingSection } from '@/components/site/pricing-section';
import { ResponsibleAI } from '@/components/site/responsible-ai';
import { FAQSection } from '@/components/site/faq-section';
import { FinalCTA } from '@/components/site/final-cta';
import { Footer } from '@/components/site/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformCapabilities />
        <TradeWorkflow />
        <ProductWorkbench />
        <AIDocumentIntelligence />
        <BusinessFinanceSection />
        <LCDiscrepancy />
        <AIClientAssessment />
        <FeaturesSection />
        <PricingSection />
        <ResponsibleAI />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}