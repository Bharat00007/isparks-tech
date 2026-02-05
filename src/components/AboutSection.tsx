import { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, Users, TrendingUp, CheckCircle } from 'lucide-react';
import aboutIllustration from '@/assets/about-illustration.png';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const features = [
    { icon: Target, text: 'AI-Driven Solutions' },
    { icon: Lightbulb, text: 'Innovation First' },
    { icon: Users, text: 'Client-Centric Approach' },
    { icon: TrendingUp, text: 'Scalable Systems' },
  ];

  const highlights = [
    'Secure & Scalable Technology',
    'Intelligent IT Systems',
    'Digital Transformation',
    'Business Automation',
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="pill-badge mb-4">ABOUT US</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-6 mb-4">
            Who We Are
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Pioneering the future of enterprise technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Illustration with floating elements */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Floating Feature Cards */}
            <div className="absolute -top-4 -left-4 z-20">
              <div className="glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '0s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 z-20">
              <div className="glass-card p-3 rounded-xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">Scalable</span>
                </div>
              </div>
            </div>

            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="about-container p-6 lg:p-8 relative">
                <img
                  src={aboutIllustration}
                  alt="AI Technology Solutions"
                  className="w-full max-w-md mx-auto transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Company Description */}
            <div className="about-container p-6 lg:p-8">
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
                <span className="text-2xl font-bold text-amber-300">iSparks Technologies</span> is an IT services company delivering secure, scalable, and <span className="text-amber-300 font-semibold">AI-enabled</span> technology solutions. We help organizations improve efficiency, enhance decision-making, and stay competitive through <span className="text-amber-300 font-semibold">intelligent IT systems</span>.
              </p>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                By combining strong technical expertise with practical business insight, we integrate <span className="text-amber-300 font-semibold">AI</span> across IT operations to drive <span className="text-amber-300 font-semibold">automation</span>, performance, and growth. Our focus is on delivering reliable, <span className="text-amber-300 font-semibold">future-ready IT services</span>.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`glass-card p-4 rounded-xl transition-all duration-500 hover:bg-white/20 group cursor-default ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Icons */}
            <div className="flex flex-wrap gap-4 justify-start">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <feature.icon className="w-4 h-4 text-amber-400" />
                  <span className="text-white text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
