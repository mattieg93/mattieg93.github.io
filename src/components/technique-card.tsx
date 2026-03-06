interface TechniqueCardProps {
  title: string;
  category: 'fundamental' | 'advanced';
  description: string;
  techniques: string[];
  useCase: string;
  icon: string;
}

export function TechniqueCard({ 
  title, 
  category, 
  description, 
  techniques, 
  useCase, 
  icon 
}: TechniqueCardProps) {
  const categoryColors = {
    fundamental: {
      border: 'color-mix(in srgb, var(--primary) 30%, transparent)',
      text: 'var(--primary)',
      badgeBg: 'color-mix(in srgb, var(--primary) 20%, transparent)',
      badgeText: 'color-mix(in srgb, var(--primary) 80%, white)',
      badgeBorder: 'color-mix(in srgb, var(--primary) 30%, transparent)'
    },
    advanced: {
      border: 'color-mix(in srgb, var(--secondary) 30%, transparent)',
      text: 'var(--secondary)',
      badgeBg: 'color-mix(in srgb, var(--secondary) 20%, transparent)',
      badgeText: 'color-mix(in srgb, var(--secondary) 80%, white)',
      badgeBorder: 'color-mix(in srgb, var(--secondary) 30%, transparent)'
    }
  };

  const colors = categoryColors[category];

  return (
    <div 
      className="rounded-xl p-6 border transition-all duration-300 transform hover:scale-105 h-full"
      style={{
        backgroundColor: 'transparent',
        borderColor: colors.border,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <span 
          className="px-3 py-1 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: colors.badgeBg,
            color: colors.badgeText,
            borderColor: colors.badgeBorder
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
        {title}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      
      <div className="mb-4">
        <h4 className="text-white font-semibold text-sm mb-2">Key Techniques:</h4>
        <div className="flex flex-wrap gap-2">
          {techniques.map((technique, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 border border-gray-600/30"
            >
              {technique}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-700/50 pt-4">
        <h4 className="text-white font-semibold text-sm mb-1">Common Use Case:</h4>
        <p className="text-gray-400 text-xs italic">
          {useCase}
        </p>
      </div>
    </div>
  );
}