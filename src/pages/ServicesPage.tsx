import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowRight, Globe, Smartphone, MessageCircle, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PricingCard {
  title: string;
  features: string[];
  price: string;
  popular?: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  displayName: string;
}

interface EnquiryFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  description: string;
}

const websitePackages: PricingCard[] = [
  {
    title: 'Basic Website Development',
    features: [
      '4–5 pages',
      'Mobile-responsive design',
      'Basic on-page SEO',
      'Domain & hosting included (1 year)',
    ],
    price: 'SGD 1,050',
  },
  {
    title: 'Standard Website Development',
    features: [
      '5–10 pages',
      'Custom design',
      'CMS (WordPress)',
      'Basic SEO',
      'Domain & hosting included',
    ],
    price: 'SGD 2,450',
    popular: true,
  },
  {
    title: 'Premium Website Development',
    features: [
      'Custom UI/UX design',
      'Advanced SEO setup',
      'Performance optimization',
      'Analytics & ongoing support',
      'Hosting included',
    ],
    price: 'SGD 4,900',
  },
];

const appPackages: PricingCard[] = [
  {
    title: 'Basic Mobile App',
    features: [
      'Android & iOS app',
      'Flutter / React Native',
      'Core features & clean UI',
    ],
    price: 'SGD 21,000',
  },
  {
    title: 'Standard Mobile App',
    features: [
      'Backend development',
      'User login & authentication',
      'Push notifications',
      'API integrations',
    ],
    price: 'SGD 35,000',
    popular: true,
  },
  {
    title: 'Enterprise Mobile App',
    features: [
      'Complex features & workflows',
      'Admin dashboard',
      'Third-party integrations',
      'Analytics & scalability',
    ],
    price: 'SGD 70,000',
  },
];

const chatbotPackages: PricingCard[] = [
  {
    title: 'Basic Chatbot',
    features: [
      'Website chatbot',
      'Predefined flows',
      'FAQs & lead capture',
      'Admin access',
    ],
    price: 'SGD 2,100',
  },
  {
    title: 'Standard Chatbot',
    features: [
      'AI-powered (rules + NLP)',
      'Website/app integration',
      'CRM/email integration',
      'Analytics dashboard',
    ],
    price: 'SGD 4,200',
    popular: true,
  },
  {
    title: 'Advanced / Enterprise Chatbot',
    features: [
      'AI & LLM-powered',
      'Multi-platform support',
      'API access',
      'Scalable architecture',
    ],
    price: 'SGD 7,000',
  },
];

const PricingCard = ({ card, index }: { card: PricingCard; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-card/95 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-border/50 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_hsl(207_90%_30%/0.25)] hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${card.popular ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''}`}
    >
      {card.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <h4 className="text-lg lg:text-xl font-bold text-foreground mb-4">{card.title}</h4>

      <ul className="space-y-3 mb-6">
        {card.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm lg:text-base">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-border">
        <p className="text-muted-foreground text-sm mb-1">Starting from</p>
        <p className="text-2xl lg:text-3xl font-bold text-primary">{card.price}</p>
      </div>
    </div>
  );
};

const PricingModal = ({
  serviceName,
  packages,
  onClose,
  onEnquire,
}: {
  serviceName: string;
  packages: PricingCard[];
  onClose: () => void;
  onEnquire: (serviceId: string) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl border border-border max-w-5xl w-full my-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card z-10">
          <h2 className="text-2xl font-bold text-foreground">{serviceName} - Pricing Packages</h2>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-muted p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg, index) => (
              <PricingCard key={pkg.title} card={pkg} index={index} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={() => {
                onEnquire(serviceName.toLowerCase().replace(/\s+/g, '-'));
                onClose();
              }}
              className="flex items-center gap-2 text-base lg:text-lg px-8 py-4"
            >
              Get a Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnquiryForm = ({
  service,
  onClose,
  onSubmit,
}: {
  service: ServiceCategory;
  onClose: () => void;
  onSubmit: (data: EnquiryFormData, service: string) => void;
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(formData, service.id);
      setFormData({ name: '', company: '', email: '', phone: '', description: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card rounded-2xl border border-border max-w-2xl w-full my-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
          <div>
            <p className="text-sm text-muted-foreground">Service Enquiry</p>
            <h3 className="text-xl font-bold text-foreground">{service.displayName}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-muted p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company *
            </label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company name"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+65 xxxx xxxx"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Selected Service
            </label>
            <div className="px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-sm">
              {service.displayName}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your project needs..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Submitting...' : 'Get a Custom Quote'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ServiceCard = ({
  icon: Icon,
  title,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-border/50 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-2 group flex flex-col items-center justify-center text-center min-h-[280px] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Icon className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mt-2">Click to view pricing</p>
    </div>
  );
};

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [pricingModal, setPricingModal] = useState<{
    serviceName: string;
    packages: PricingCard[];
  } | null>(null);

  // On page load, check URL query param `open` to auto-open pricing modal
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const open = params.get('open');
      if (open) {
        if (open.includes('website')) {
          setPricingModal({ serviceName: 'Website Development', packages: websitePackages });
        } else if (open.includes('app')) {
          setPricingModal({ serviceName: 'App Development', packages: appPackages });
        } else if (open.includes('chatbot')) {
          setPricingModal({ serviceName: 'AI Chatbot Development', packages: chatbotPackages });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleServiceClick = (serviceName: string, packages: PricingCard[]) => {
    setPricingModal({ serviceName, packages });
  };

  const handleEnquire = (serviceId: string) => {
    setPricingModal(null);
    const serviceMap: Record<string, ServiceCategory> = {
      'website-development': {
        id: 'website',
        name: 'Website',
        displayName: 'Website Development',
      },
      'app-development': {
        id: 'app',
        name: 'Mobile App',
        displayName: 'Mobile App Development',
      },
      'ai-chatbot-development': {
        id: 'chatbot',
        name: 'Chatbot',
        displayName: 'AI Chatbot Development',
      },
    };
    setSelectedService(serviceMap[serviceId] || null);
  };

  return (
    <>
      <Helmet>
        <title>IT Services Company in Singapore | Website & App Development</title>
        <meta
          name="description"
          content="Professional IT services in Singapore. Website development, mobile app development, AI chatbots, and digital solutions for SMEs, startups, and enterprises. Get a quote today."
        />
        <meta
          name="keywords"
          content="website development Singapore, mobile app development Singapore, AI chatbot Singapore, IT company Singapore, web design Singapore, app developer Singapore"
        />
        <link rel="canonical" href="https://isparkstech.com/services" />
      </Helmet>

      <div className="ai-background" />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                IT Services Company in Singapore | Website & App Development
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Empowering Singapore businesses with professional digital solutions. From responsive websites to scalable mobile applications and AI-powered chatbots, we deliver results that drive growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16">
              Our Services
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <ServiceCard
                icon={Globe}
                title="Website Development"
                onClick={() => handleServiceClick('Website Development', websitePackages)}
              />
              <ServiceCard
                icon={MessageCircle}
                title="AI Chatbot Development"
                onClick={() => handleServiceClick('AI Chatbot Development', chatbotPackages)}
              />
              <ServiceCard
                icon={Smartphone}
                title="App Development"
                onClick={() => handleServiceClick('App Development', appPackages)}
              />
            </div>
          </div>
        </section>

        {/* Website Development Section */}
        <section className="py-16 lg:py-20 section-overlay">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                🌐 Website Development Services Singapore
              </h2>
            </div>

            <p className="text-white/80 text-base md:text-lg max-w-3xl mb-12">
              As a trusted <strong className="text-amber-300">website development company in Singapore</strong>, we specialize in creating modern, high-performing websites. Our <strong className="text-amber-300">web design services Singapore</strong> teams build business websites that convert visitors into customers.
            </p>

            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Website Development Company in Singapore
              </h3>
              <p className="text-white/75 text-base md:text-lg max-w-4xl">
                We provide professional website development services in Singapore, helping businesses build fast, responsive, and SEO-ready websites designed for growth and credibility.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => handleServiceClick('Website Development', websitePackages)}
                className="flex items-center gap-2 text-base lg:text-lg px-8 py-4 mx-auto"
              >
                View Website Pricing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Mobile App Development Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                📱 Mobile App Development Company in Singapore
              </h2>
            </div>

            <p className="text-white/80 text-base md:text-lg max-w-3xl mb-12">
              Looking for reliable <strong className="text-amber-300">mobile app development Singapore</strong> services? Our experienced <strong className="text-amber-300">app developer Singapore</strong> team delivers native and cross-platform <strong className="text-amber-300">iOS Android app development Singapore</strong> solutions.
            </p>

            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                App Development Services Singapore
              </h3>
              <p className="text-white/75 text-base md:text-lg max-w-4xl">
                We design and develop scalable mobile applications for startups and enterprises in Singapore, using modern cross-platform technologies.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => handleServiceClick('App Development', appPackages)}
                className="flex items-center gap-2 text-base lg:text-lg px-8 py-4 mx-auto"
              >
                View App Pricing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* AI Chatbot Development Section */}
        <section className="py-16 lg:py-20 section-overlay">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                🤖 AI Chatbot Development Company in Singapore
              </h2>
            </div>

            <p className="text-white/80 text-base md:text-lg max-w-3xl mb-12">
              Discover the power of <strong className="text-amber-300">AI chatbot development Singapore</strong>. Our <strong className="text-amber-300">business chatbot Singapore</strong> solutions provide intelligent <strong className="text-amber-300">website chatbot Singapore</strong> that enhance customer engagement and automate support.
            </p>

            <div className="mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Chatbot Development Services Singapore
              </h3>
              <p className="text-white/75 text-base md:text-lg max-w-4xl">
                We create intelligent AI chatbots that understand context and deliver meaningful interactions. From basic rule-based systems to advanced LLM-powered solutions.
              </p>
            </div>

            <div className="text-center">
              <Button
                onClick={() => handleServiceClick('AI Chatbot Development', chatbotPackages)}
                className="flex items-center gap-2 text-base lg:text-lg px-8 py-4 mx-auto"
              >
                View Chatbot Pricing
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 lg:py-20 section-overlay">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Why Singapore Businesses Choose iSparks
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Local Expertise', desc: 'Singapore-based team' },
                  { label: 'Quality Delivery', desc: 'On-time & on-budget' },
                  { label: 'Ongoing Support', desc: 'Post-launch assistance' },
                  { label: 'Transparent Pricing', desc: 'No hidden costs' },
                ].map((item, i) => (
                  <div key={i} className="bg-card/80 backdrop-blur-sm rounded-xl p-5 border border-border/50">
                    <p className="font-semibold text-foreground mb-1">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Pricing Modal */}
      {pricingModal && (
        <PricingModal
          serviceName={pricingModal.serviceName}
          packages={pricingModal.packages}
          onClose={() => setPricingModal(null)}
          onEnquire={handleEnquire}
        />
      )}

      {/* Enquiry Form Modal */}
      {selectedService && (
        <EnquiryForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSubmit={(data, service) => {
            console.log('Enquiry submitted:', { ...data, service });
            setSelectedService(null);
            // TODO: Integrate with backend/email service
          }}
        />
      )}

      <Footer />
    </>
  );
};

export default ServicesPage;
