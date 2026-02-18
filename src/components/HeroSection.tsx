import { Cpu, Code, ChevronRight, Zap, Shield, Globe, Database } from 'lucide-react';
import heroIllustration from '@/assets/hero-illustration-new.png';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Full-width background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroIllustration})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/50" />
      </div>

      {/* Floating decorative elements - Left side */}
      <div className="absolute left-4 lg:left-12 top-1/4 z-10 hidden lg:flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Zap className="w-6 h-6 text-amber-300" />
        </div>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Shield className="w-6 h-6 text-amber-300" />
        </div>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Database className="w-6 h-6 text-amber-300" />
        </div>
      </div>

      {/* Floating decorative elements - Right side */}
      <div className="absolute right-4 lg:right-12 top-1/3 z-10 hidden lg:flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Globe className="w-6 h-6 text-amber-300" />
        </div>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Code className="w-6 h-6 text-amber-300" />
        </div>
        <div className="w-14 h-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110">
          <Cpu className="w-6 h-6 text-amber-300" />
        </div>
      </div>

      {/* Decorative lines/shapes */}
      <div className="absolute left-0 top-1/2 w-32 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent hidden xl:block" />
      <div className="absolute right-0 top-2/3 w-32 h-px bg-gradient-to-l from-transparent via-amber-400/30 to-transparent hidden xl:block" />

      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 opacity-0 animate-blur-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-white/90">AI-Powered Solutions Available</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="whitespace-nowrap">Empowering Enterprises with</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-[length:200%_auto] animate-shimmer">
              AI-Enabled
            </span>
            <br />
            Future-Ready IT Solutions
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
            Transform your business with cutting-edge AI chatbots, intelligent data extraction, 
            and custom software solutions designed for the modern enterprise.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-14 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full font-semibold uppercase tracking-wide text-sm shadow-[0_8px_30px_-8px_hsl(207_90%_54%/0.5)] hover:shadow-[0_12px_40px_-8px_hsl(207_90%_54%/0.6)] transition-all duration-400 hover:scale-[1.03] hover:-translate-y-0.5"
            >
              View Our Services
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-white/20 hover:border-white/50 transition-all duration-400"
            >
              Contact Us
            </a>
          </div>

          {/* Service Tags - Extended to fill width */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {[
              { icon: Cpu, label: 'AI Solutions' },
              { icon: Code, label: 'Software Development' },
              { icon: Database, label: 'Data Mining' },
              { icon: Globe, label: 'Web Development' },
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 opacity-0 animate-fade-in-up hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default group"
                style={{ animationDelay: `${0.6 + index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-amber-300" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-white/60 uppercase tracking-wider">Expertise</span>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
