import { useEffect, useRef, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import iconChatbot from '@/assets/icon-chatbot.png';
import iconInvoice from '@/assets/icon-invoice.png';
import iconWebdev from '@/assets/icon-webdev.png';
import iconSemiconductor from '@/assets/icon-semiconductor.png';
import iconAppdev from '@/assets/icon-appdev.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const services = [
  {
    title: 'AI CHATBOT',
    image: iconChatbot,
    position: 'top-left',
    hasPlans: false,
  },
  {
    title: 'DOC-AI EXTRACTION',
    image: iconInvoice,
    position: 'bottom-left',
    hasPlans: false,
  },
  {
    title: 'WEBSITE DEVELOPMENT',
    image: iconWebdev,
    position: 'bottom-right',
    hasPlans: false,
  },
  {
    title: 'SEMICONDUCTOR TESTING SOFTWARE',
    image: iconSemiconductor,
    position: 'center',
    hasPlans: false,
  },
  {
    title: 'APP DEVELOPMENT',
    image: iconAppdev,
    position: 'center',
    hasPlans: false,
  },
];

const chatbotPlans = [
  {
    name: 'Basic Chatbot',
    price: 'SGD 2,100',
    features: [
      'Website chatbot',
      'Predefined flows',
      'FAQs & lead capture',
      'Admin access',
    ],
    recommended: false,
  },
  {
    name: 'Standard Chatbot',
    price: 'SGD 4,200',
    features: [
      'AI-powered (rules + NLP)',
      'Website/app integration',
      'CRM / email integration',
      'Analytics dashboard',
    ],
    recommended: true,
  },
  {
    name: 'Advanced / Enterprise Chatbot',
    price: 'SGD 7,000',
    features: [
      'AI & LLM-powered',
      'Multi-platform support',
      'API access',
      'Analytics & scalable architecture',
    ],
    recommended: false,
  },
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPlansModal, setShowPlansModal] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<any[] | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (serviceTitle: string) => {
    // Open local modal with relevant plans — do not navigate away
    const title = serviceTitle;
    let plans: any[] | null = null;

    if (serviceTitle.toLowerCase().includes('website')) {
      plans = [
        {
          name: 'Basic Website Development',
          price: 'SGD 1,050',
          features: ['4–5 pages', 'Mobile-responsive design', 'Basic on-page SEO', 'Domain & hosting included (1 year)'],
        },
        {
          name: 'Standard Website Development',
          price: 'SGD 2,450',
          features: ['5–10 pages', 'Custom design', 'CMS (WordPress)', 'Basic SEO', 'Domain & hosting included'],
          recommended: true,
        },
        {
          name: 'Premium Website Development',
          price: 'SGD 4,900',
          features: ['Custom UI/UX design', 'Advanced SEO setup', 'Performance optimization', 'Analytics & ongoing support', 'Hosting included'],
        },
      ];
    } else if (serviceTitle.toLowerCase().includes('app')) {
      plans = [
        { name: 'Basic Mobile App', price: 'SGD 21,000', features: ['Android & iOS app', 'Flutter / React Native', 'Core features & clean UI'] },
        { name: 'Standard Mobile App', price: 'SGD 35,000', features: ['Backend development', 'User login & authentication', 'Push notifications', 'API integrations'], recommended: true },
        { name: 'Enterprise Mobile App', price: 'SGD 70,000', features: ['Complex features & workflows', 'Admin dashboard', 'Third-party integrations', 'Analytics & scalability'] },
      ];
    } else if (serviceTitle.toLowerCase().includes('chatbot')) {
      plans = chatbotPlans;
    }

    setSelectedTitle(title);
    setSelectedPlans(plans);
    // Only open modal when there are plans to show or we still want an enquiry for the service
    if (plans) {
      setShowPlansModal(true);
    } else {
      // No plans (e.g., DOC-AI) — open a lightweight enquiry modal by setting title and showing the modal
      // here we will still open the modal but without plans; the modal will render enquiry-only content
      setShowPlansModal(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnquiryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppRedirect = (type: 'rfq' | 'enquiry') => {
    // Submit enquiry to backend Netlify Function which sends email via SMTP
    const { name, email, phone, company, message } = enquiryForm;
    const svc = selectedTitle || 'Service Enquiry';
    if (!name || !email) {
      toast({
        title: 'Error',
        description: 'Please provide your name and email.',
        variant: 'destructive',
      });
      return;
    }

    (async () => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/.netlify/functions/send-enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: name,
            email,
            phone,
            company,
            service: svc,
            message,
            source: 'services',
            intent: type,
          }),
        });

        let result: any = {};
        const text = await response.text();
        if (text) {
          try {
            result = JSON.parse(text);
          } catch {
            result = { text };
          }
        }

        if (!response.ok) throw new Error(result.error || result.message || 'Failed to send enquiry');

        toast({
          title: 'Success',
          description: "Your enquiry has been sent. We'll contact you shortly.",
        });

        setIsSubmitted(true);
        setTimeout(() => {
          setShowPlansModal(false);
          setIsSubmitted(false);
          setEnquiryForm({ name: '', email: '', phone: '', company: '', message: '' });
        }, 1800);
      } catch (err: any) {
        console.error('Error sending enquiry from services modal:', err);
        toast({
          title: 'Error',
          description: err.message || 'Failed to send enquiry. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our <span className="text-yellow-300">AI-enabled</span> IT Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Layout - Single row */}
          <div className="hidden lg:grid grid-cols-5 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                isVisible={isVisible}
                delay={index * 100}
                onClick={() => handleCardClick(service.title)}
              />
            ))}
          </div>

          {/* Tablet Layout - 3+2 grid */}
          <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                isVisible={isVisible}
                delay={index * 100}
                onClick={() => handleCardClick(service.title)}
              />
            ))}
          </div>
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 max-w-md mx-auto">
            {services.slice(3).map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                isVisible={isVisible}
                delay={(index + 3) * 100}
                onClick={() => handleCardClick(service.title)}
              />
            ))}
          </div>

          {/* Mobile Layout - 2 column grid */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                isVisible={isVisible}
                delay={index * 100}
                onClick={() => handleCardClick(service.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Plans Modal (dynamic) */}
      <Dialog
        open={showPlansModal}
        onOpenChange={(open) => {
          setShowPlansModal(open);
          if (!open) {
            setSelectedPlans(null);
            setSelectedTitle('');
          }
        }}
      >
        <DialogContent className="max-w-5xl bg-slate-50 border-0 p-0 max-h-[90vh] overflow-y-auto">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl font-bold text-primary">
                {selectedTitle || 'Service Pricing'}
              </DialogTitle>
              <p className="text-lg font-semibold text-foreground mt-2">Plans</p>
            </DialogHeader>

            <div className="p-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(selectedPlans ?? []).length > 0 ? (
                  (selectedPlans ?? []).map((plan: any) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white rounded-xl p-6 shadow-sm border ${
                      plan.recommended ? 'border-primary/20' : 'border-gray-100'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                          Recommended
                        </span>
                      </div>
                    )}

                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                      {plan.name}
                    </h3>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.note && <p className="text-xs text-muted-foreground mt-auto">{plan.note}</p>}
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-white rounded-xl p-6 border border-gray-100">
                    <p className="text-foreground">We do not display standard packages for this service. Please send an enquiry and our team will provide a customised proposal.</p>
                  </div>
                )}
              </div>

              {/* Enquiry Form */}
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-foreground mb-4">Enquiry Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                    className="bg-slate-50 border-gray-200"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={enquiryForm.email}
                    onChange={handleInputChange}
                    className="bg-slate-50 border-gray-200"
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={enquiryForm.phone}
                    onChange={handleInputChange}
                    className="bg-slate-50 border-gray-200"
                  />
                  <Input
                    name="company"
                    placeholder="Company Name"
                    value={enquiryForm.company}
                    onChange={handleInputChange}
                    className="bg-slate-50 border-gray-200"
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={enquiryForm.message}
                  onChange={handleInputChange}
                  className="bg-slate-50 border-gray-200 mb-4"
                  rows={3}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleWhatsAppRedirect('rfq')}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...
                      </>
                    ) : (
                      'Request RFQ'
                    )}
                  </Button>
                  <Button
                    onClick={() => handleWhatsAppRedirect('enquiry')}
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
      </Dialog>
    </section>
  );
};

interface ServiceCardProps {
  service: {
    title: string;
    image: string;
    hasPlans: boolean;
  };
  isVisible: boolean;
  delay: number;
  onClick: () => void;
}

const ServiceCard = ({ service, isVisible, delay, onClick }: ServiceCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`service-card rounded-2xl p-8 text-center transition-all duration-500 group cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-6 flex justify-center">
        <img
          src={service.image}
          alt={service.title}
          className="w-32 h-32 object-contain transition-transform duration-400 group-hover:scale-110"
        />
      </div>
      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h4>
    </div>
  );
};

export default ServicesSection;
