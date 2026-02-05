import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TechMarquee from '@/components/TechMarquee';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import ServicesStrip from '@/components/ServicesStrip';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ProcessSection from '@/components/ProcessSection';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import EnquiryPopup from '@/components/EnquiryPopup';

const Index = () => {
  return (
    <>
      {/* Fixed AI Background */}
      <div className="ai-background" />
      
      <div className="relative min-h-screen">
        {/* Sticky Header */}
        <Header />

        {/* Hero Section */}
        <HeroSection />

        {/* All sections after hero with navy blue overlay */}
        <div className="relative">
          {/* Navy blue transparent overlay - matches hero section */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-slate-900/90 pointer-events-none z-0" />
          
          {/* Content with higher z-index */}
          <div className="relative z-10">
            {/* Tech Marquee */}
            <TechMarquee />

            {/* About Section */}
            <AboutSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Services Strip */}
            <ServicesStrip />

            {/* Services Section */}
            <ServicesSection />

            {/* Why Choose Us Section */}
            <WhyChooseUsSection />

            {/* Process Section */}
            <ProcessSection />

            {/* CTA Section */}
            <CTASection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
          </div>
        </div>

        {/* Floating Buttons (WhatsApp + Chatbot) */}
        <FloatingButtons />

        {/* Enquiry Popup (appears after 11 seconds, once per session) */}
        <EnquiryPopup />
      </div>
    </>
  );
};

export default Index;
