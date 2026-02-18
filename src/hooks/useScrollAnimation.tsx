import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Component wrapper for scroll animations
interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'scale' | 'slide-left' | 'slide-right';
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}) => {
  const { ref, isVisible } = useScrollAnimation();

  const animationClasses = {
    'fade-up': 'translate-y-8 opacity-0',
    'fade-in': 'opacity-0',
    'scale': 'scale-95 opacity-0',
    'slide-left': '-translate-x-8 opacity-0',
    'slide-right': 'translate-x-8 opacity-0',
  };

  const visibleClasses = 'translate-y-0 translate-x-0 scale-100 opacity-100';

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClasses : animationClasses[animation]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default useScrollAnimation;
