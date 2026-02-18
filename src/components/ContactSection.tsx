 import { useState, useEffect, useRef } from 'react';
 import { Check, Loader2 } from 'lucide-react';
 import { supabase } from '@/integrations/supabase/client';
 import { toast } from '@/hooks/use-toast';

const serviceOptions = [
  'AI Chatbot',
  'Doc-AI Extraction',
  'Website Development',
  'Semiconductor Testing Software',
  'App Development',
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     
     if (!formData.fullName || !formData.email) {
       toast({
         title: "Error",
         description: "Please fill in required fields",
         variant: "destructive",
       });
       return;
     }
 
     setIsSubmitting(true);
     
     try {
       const { data, error } = await supabase.functions.invoke('send-enquiry', {
         body: {
           fullName: formData.fullName,
           email: formData.email,
           phone: formData.phone,
           company: formData.company,
           service: formData.service,
           message: formData.message,
           source: 'contact',
         },
       });
 
       if (error) throw error;
 
       toast({
         title: "Success!",
         description: "Your enquiry has been sent. We'll get back to you shortly.",
       });
 
       // Reset form
       setFormData({
         fullName: '',
         email: '',
         phone: '',
         company: '',
         service: '',
         message: '',
       });
     } catch (error: any) {
       console.error('Error submitting form:', error);
       toast({
         title: "Error",
         description: "Failed to send enquiry. Please try again.",
         variant: "destructive",
       });
     } finally {
       setIsSubmitting(false);
     }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Build Smarter Solutions Together
          </h2>
          <p className="text-white/90 text-lg md:text-xl">
            Tell us about requirement and our experts will get back to you shortly
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="form-card rounded-2xl p-8 hover:shadow-[0_30px_80px_-20px_hsl(207_90%_30%/0.35)] transition-shadow duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              {/* Email & Service Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div className="relative">
                  <button
                    type="button"
                    className="input-field text-left flex items-center justify-between"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={formData.service ? 'text-foreground' : 'text-muted-foreground'}>
                      {formData.service || 'Service Interested In:'}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10">
                      {serviceOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-2 text-sm"
                          onClick={() => {
                            setFormData({ ...formData, service: option });
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.service === option ? 'border-primary bg-primary' : 'border-muted-foreground'
                          }`}>
                            {formData.service === option && <Check className="w-3 h-3 text-white" />}
                          </div>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="input-field"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="input-field resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                 className="btn-primary w-full md:w-auto ripple-effect hover:shadow-[0_12px_40px_-8px_hsl(207_90%_54%/0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 disabled={isSubmitting}
              >
                 {isSubmitting ? (
                   <>
                     <Loader2 className="w-4 h-4 animate-spin" />
                     Sending...
                   </>
                 ) : (
                   'Submit Enquiry'
                 )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
