import { useInView } from '../hooks/useInView';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({ badge, title, highlight, description, centered = true }: SectionHeadingProps) {
  const { ref, isInView } = useInView();

  return (
    <div ref={ref} className={`${centered ? 'text-center' : ''} max-w-3xl ${centered ? 'mx-auto' : ''} mb-12 lg:mb-16`}>
      {badge && (
        <span className={`badge-brand mb-4 inline-block transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight transition-all duration-500 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-4 text-lg text-steel-400 leading-relaxed transition-all duration-500 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
