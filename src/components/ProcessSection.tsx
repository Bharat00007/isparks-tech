import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Search, Cog, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Discovery',
    description: 'We start by understanding your business challenges, goals, and current infrastructure through detailed consultations.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Analysis',
    description: 'Our experts analyze your requirements and identify the best AI-powered solutions tailored to your needs.',
  },
  {
    icon: Cog,
    step: '03',
    title: 'Development',
    description: 'We build and implement your custom solution using cutting-edge technologies and agile methodologies.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Deployment',
    description: 'Seamless deployment with thorough testing, training, and ongoing support to ensure success.',
  },
];

const ProcessSection = () => {
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

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-300/20 text-amber-300 font-semibold text-sm mb-4">
            HOW WE WORK
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-amber-300">Process</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            A proven approach to delivering exceptional results
          </p>
        </div>

        <div className="relative">
          {/* Connection Line (hidden on mobile) */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-1 bg-gradient-to-r from-primary via-amber-300 to-primary rounded-full" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative text-center transition-all duration-700 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110 transition-all duration-400">
                  <step.icon className="w-8 h-8 text-white" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-300 text-primary font-bold text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">{step.title}</h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
