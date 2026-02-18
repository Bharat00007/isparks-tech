import { useEffect, useRef, useState } from 'react';
import { Users, Award, Briefcase, Clock } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 150, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, value: 50, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 8, suffix: '+', label: 'Years Experience' },
  { icon: Clock, value: 99, suffix: '%', label: 'Uptime Guarantee' },
];

const AnimatedCounter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Businesses <span className="text-amber-300">Worldwide</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Our track record speaks for itself. We've helped organizations across industries achieve their digital transformation goals.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:bg-white/15 hover:border-white/30 hover:-translate-y-2 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                <stat.icon className="w-8 h-8 text-amber-300" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-white/70 mt-2 font-medium group-hover:text-white/90 transition-colors duration-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
