import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Target, Rocket, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Lightbulb,
    title: 'Innovative Solutions',
    description: 'We leverage cutting-edge AI and automation technologies to deliver solutions that keep you ahead of the competition.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'Our focus is on delivering measurable outcomes that directly impact your bottom line and business growth.',
  },
  {
    icon: Rocket,
    title: 'Fast Deployment',
    description: 'Agile methodologies and experienced teams ensure rapid implementation without compromising quality.',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Support',
    description: '24/7 support and maintenance to ensure your systems run smoothly around the clock.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    description: 'Bank-grade security protocols and compliance standards to protect your sensitive data.',
  },
  {
    icon: Sparkles,
    title: 'Tailored Approach',
    description: 'Every solution is customized to your unique business needs, not one-size-fits-all templates.',
  },
];

const WhyChooseUsSection = () => {
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
    <section ref={sectionRef} className="py-20 relative bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-amber-300/20 text-amber-300 font-semibold text-sm mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your Success is Our <span className="text-amber-300">Priority</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Discover what sets iSparks Technologies apart from the rest
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 cursor-pointer hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-400">
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors duration-300">{reason.title}</h3>
              <p className="text-white/70 leading-relaxed group-hover:text-white/85 transition-colors duration-300">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
