import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden group">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 group-hover:scale-[1.02] transition-transform duration-700" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl group-hover:bg-amber-300/30 transition-colors duration-500" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-colors duration-500" />
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold text-sm mb-6 hover:bg-white/25 transition-colors duration-300">
              <Sparkles className="w-4 h-4" />
              Start Your Digital Transformation
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Transform Your Business with <span className="text-amber-300">AI-Powered</span> Solutions?
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Join hundreds of businesses that have already elevated their operations with iSparks Technologies. Let's discuss how we can help you achieve your goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-white/95 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-400 group/btn"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/15 hover:border-white/80 transition-all duration-400"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
