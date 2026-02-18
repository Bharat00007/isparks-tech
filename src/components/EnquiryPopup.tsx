import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const serviceOptions = [
  'AI Chatbot',
  'Doc-AI Extraction',
  'Website Development',
  'Semiconductor Testing',
  'App Development',
];

const EnquiryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
   const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if popup was already shown this session
    const popupShown = sessionStorage.getItem('enquiryPopupShown');
    
    if (!popupShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('enquiryPopupShown', 'true');
      }, 11000); // 11 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/.netlify/functions/send-enquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.companyName,
            service: formData.service,
            message: formData.message,
            source: 'popup',
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

        setIsSubmitted(true);
        
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } catch (error: any) {
        console.error('Error submitting popup form:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to send enquiry. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-white/10 rounded-2xl shadow-2xl shadow-primary/20 animate-scale-in overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  Let's Build Something <span className="text-amber-300">Powerful</span> Together
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  Tell us about your requirement and our team will get back to you shortly.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className={`w-full px-4 py-3 bg-white/5 border ${errors.fullName ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Company Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Company Name (Optional)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                {/* Email & Phone Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className={`w-full px-4 py-3 bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-left flex items-center justify-between focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={formData.service ? 'text-white' : 'text-white/50'}>
                      {formData.service || 'Service Interested In'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/50 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-lg z-20 overflow-hidden">
                      {serviceOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center gap-2 text-sm text-white/90 transition-colors"
                          onClick={() => {
                            setFormData({ ...formData, service: option });
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.service === option ? 'border-amber-300 bg-amber-300' : 'border-white/30'
                          }`}>
                            {formData.service === option && <Check className="w-3 h-3 text-slate-900" />}
                          </div>
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder="Message / Requirement"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                   className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                   disabled={isSubmitting}
                >
                   {isSubmitting ? (
                     <>
                       <Loader2 className="w-4 h-4 animate-spin" />
                       Sending...
                     </>
                   ) : (
                     'Request Consultation'
                   )}
                </button>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Thank You!
              </h3>
              <p className="text-white/70">
                Our team will contact you shortly.
              </p>
            </div>
          )}
        </div>

        {/* Decorative gradient */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
};

export default EnquiryPopup;
