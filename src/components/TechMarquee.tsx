import { Bot, Database, Cloud, Shield, Cpu, Code, Zap, Globe, Server, Lock } from 'lucide-react';

const techItems = [
  { icon: Bot, label: 'AI & Machine Learning' },
  { icon: Database, label: 'Data Analytics' },
  { icon: Cloud, label: 'Cloud Solutions' },
  { icon: Shield, label: 'Cybersecurity' },
  { icon: Cpu, label: 'Automation' },
  { icon: Code, label: 'Custom Development' },
  { icon: Zap, label: 'Real-time Processing' },
  { icon: Globe, label: 'Global Deployment' },
  { icon: Server, label: 'Infrastructure' },
  { icon: Lock, label: 'Data Protection' },
];

const TechMarquee = () => {
  return (
    <section className="py-8 overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/10">
      <div className="relative">
        {/* First Marquee - Left to Right */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...techItems, ...techItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-8 px-6 py-3 rounded-full bg-white/10 border border-white/20"
            >
              <item.icon className="w-5 h-5 text-amber-300" />
              <span className="text-white font-medium text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
