const awards = [
  {
    title: "Digital Innovation Award",
    organization: "CBRE Technology Excellence",
    date: "2023",
    description: "Recognized for developing automated data pipelines that reduced manual work by 160+ hours monthly",
    // icon: "🏆",
    color: "emerald"
  },
  {
    title: "Excellence in Data Visualization",
    organization: "CBRE Analytics Team",
    date: "2024",
    description: "Outstanding achievement in transforming complex real estate data into executive-ready visualizations",
    // icon: "📊",
    color: "purple"
  },
  {
    title: "Global Program Leadership Recognition",
    organization: "CBRE Digital Transformation",
    date: "2020",
    description: "Led $15M digital transformation program with 150% increase in project velocity",
    // icon: "🌍",
    color: "blue"
  },
  {
    title: "Dean's List",
    organization: "Bellevue College",
    date: "2022-2024",
    description: "Multiple quarters recognition for academic excellence (3.82 GPA) while working full-time",
    // icon: "🎓",
    color: "indigo"
  }
];

const achievements = [
  {
    metric: "$15M+",
    description: "New Business Generated",
    detail: "Through digital transformation leadership"
  },
  {
    metric: "160+",
    description: "Hours Saved Monthly",
    detail: "Via automated data pipeline development"
  },
  {
    metric: "500+",
    description: "Enterprise Users Supported",
    detail: "Across scalable data warehouse solutions"
  },
  {
    metric: "95%",
    description: "Reduction in User Issues",
    detail: "Through automated reporting systems"
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

export function Awards() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">Awards & Recognition</h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
      </div>

      {/* Key Achievements Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {achievements.map((achievement, index) => (
          <div 
            key={index}
            className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--secondary)' }}>
              {achievement.metric}
            </div>
            <div className="text-white font-semibold text-sm mb-1">
              {achievement.description}
            </div>
            <div className="text-gray-400 text-xs">
              {achievement.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Awards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {awards.map((award, index) => {
          const colors = getColorClasses(award.color);
          return (
            <div 
              key={index}
              className={`bg-gray-800/50 rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 ${colors.border}`}
            >
              <div className="flex items-start gap-4">
                {/* <div className="text-3xl">{award.icon}</div> */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {award.title}
                    </h3>
                    <div className={`px-3 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {award.date}
                    </div>
                  </div>
                  <p className={`font-semibold mb-2 ${colors.accent}`}>
                    {award.organization}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Professional Recognition Statement */}
      <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700 text-center">
        <h3 className="text-xl font-bold text-white mb-4">Professional Impact</h3>
        <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Consistently recognized for delivering high-impact solutions that drive business value, 
          streamline operations, and transform complex data into actionable insights. Proven track 
          record of leading cross-functional teams to achieve measurable outcomes while maintaining 
          excellence in technical execution and stakeholder communication.
        </p>
      </div>
    </section>
  );
}