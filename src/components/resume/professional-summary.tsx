const summaryStats = [
  {
    value: "9+",
    label: "Years Experience",
    description: "Meta, Microsoft, CBRE",
    color: "purple"
  },
  {
    value: "$9B+",
    label: "Total Business Impact",
    description: "$2B saved + $7B assets managed",
    color: "blue"
  },
  {
    value: "160+",
    label: "Analyst Hours/Month",
    description: "Automated via AI pipelines",
    color: "emerald"
  },
  {
    value: "400+",
    label: "Monthly Active Users",
    description: "Self-serve analytics platform",
    color: "indigo"
  }
];

const keyHighlights = [
  {
    title: "Self-Serve AI Data Platforms",
    description: "Builds AI-powered warehouses, forecasting models, and self-serve analytics layers that business teams actually use - ranked top-10 internal data product at Meta",
    // icon: "🤖"
  },
  {
    title: "Automation at Scale",
    description: "Python and Airflow pipelines that eliminated 160+ analyst hours per month - geospatial and time-series models guiding $1.7B/year in portfolio decisions",
    // icon: "⚡"
  },
  {
    title: "Experimentation & Causal Rigor",
    description: "Designs A/B tests for model changes with imperfect randomization and delayed outcomes, delivering 37% SLA improvement with UX and backlog guardrails",
    // icon: "🔬"
  },
  {
    title: "Executive-Level Impact",
    description: "Translates complex models into clear narratives driving $9B+ in total business impact ($2B saved, $7B in assets managed) across Meta and Microsoft",
    // icon: "📊"
  }
];

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; text: string; border: string; accent: string } } = {
    purple: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/50", accent: "text-purple-400" },
    blue: { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/50", accent: "text-teal-500" },
    emerald: { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/50", accent: "text-teal-600" },
    indigo: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/50", accent: "text-purple-400" }
  };
  return colorMap[color] || colorMap.purple;
};

export function ProfessionalSummary() {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">Professional Summary</h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {summaryStats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <div 
              key={index}
              className={`text-center p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${colors.bg} ${colors.border}`}
            >
              <div className={`text-3xl font-bold mb-2 ${colors.accent}`}>
                {stat.value}
              </div>
              <div className="text-white font-semibold text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-gray-400 text-xs">
                {stat.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Career Progression */}
      <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Career Progression</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px" style={{ backgroundColor: 'var(--primary)' }}></div>
          
          <div className="space-y-8 relative">
            <div className="flex items-center gap-6">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                9+
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold" style={{ color: 'var(--secondary)' }}>Senior Data Analyst · Meta (via CBRE)</h4>
                <p className="text-gray-300">Experimentation frameworks, ML platforms & self-serve analytics for $1.7B/year portfolio decisions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                7
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>Senior Business Analyst · Microsoft (via CBRE)</h4>
                <p className="text-gray-300">Governed data warehouses & analytics solutions for $7B+ programs</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-purple-400">Program Manager · Microsoft (via CBRE)</h4>
                <p className="text-gray-300">Led $15M digital transformation and analytics-driven initiatives globally</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid md:grid-cols-2 gap-6">
        {keyHighlights.map((highlight, index) => (
          <div 
            key={index}
            className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {/* <div className="text-2xl">{highlight.icon}</div> */}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-2">{highlight.title}</h4>
                <p className="text-gray-400 leading-relaxed">{highlight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}