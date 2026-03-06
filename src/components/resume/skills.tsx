const skillCategories = [
  {
    title: "Data Visualization & Web Development",
    color: "purple",
    skills: [
      { name: "Tableau", years: "5+", level: "Expert" },
      { name: "JavaScript", years: "4+", level: "Advanced" },
      { name: "HTML/CSS", years: "6+", level: "Expert" },
      { name: "Data Visualization", years: "9+", level: "Expert" },
      { name: "D3.js", years: "3+", level: "Advanced" },
      { name: "React", years: "2+", level: "Proficient" },
      { name: "UX Design", years: "4+", level: "Advanced" }
    ]
  },
  {
    title: "Data Analysis & Engineering", 
    color: "blue",
    skills: [
      { name: "SQL", years: "9+", level: "Expert" },
      { name: "Python", years: "6+", level: "Expert" },
      { name: "R", years: "4+", level: "Advanced" },
      { name: "Apache Airflow", years: "3+", level: "Advanced" },
      { name: "ETL/ELT", years: "5+", level: "Expert" },
      { name: "BigQuery", years: "3+", level: "Advanced" },
      { name: "Snowflake", years: "2+", level: "Proficient" },
      { name: "dbt", years: "2+", level: "Advanced" }
    ]
  },
  {
    title: "Cloud & Infrastructure",
    color: "emerald", 
    skills: [
      { name: "Microsoft Azure", years: "4+", level: "Advanced" },
      { name: "Azure SQL", years: "4+", level: "Advanced" },
      { name: "Apache Spark", years: "2+", level: "Proficient" },
      { name: "Docker", years: "2+", level: "Proficient" },
      { name: "CI/CD Pipelines", years: "3+", level: "Advanced" },
      { name: "Git", years: "6+", level: "Expert" },
      { name: "PowerShell", years: "3+", level: "Advanced" }
    ]
  },
  {
    title: "Leadership & Process",
    color: "indigo",
    skills: [
      { name: "Project Management", years: "7+", level: "Expert" },
      { name: "Team Leadership", years: "5+", level: "Advanced" },
      { name: "Stakeholder Management", years: "6+", level: "Expert" },
      { name: "Agile/Scrum", years: "4+", level: "Advanced" },
      { name: "Data Governance", years: "3+", level: "Advanced" },
      { name: "Technical Writing", years: "5+", level: "Advanced" },
      { name: "Process Optimization", years: "6+", level: "Expert" }
    ]
  }
];

const getColorClasses = (color: string) => {
  const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
    purple: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/50" },
    blue: { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/50" },
    emerald: { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/50" },
    indigo: { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/50" }
  };
  return colorMap[color] || colorMap.purple;
};

export function Skills() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">Technical Skills</h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => {
          const colors = getColorClasses(category.color);
          return (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <h3 className={`text-xl font-bold mb-6 ${colors.text}`}>
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${colors.bg} ${colors.border}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-semibold ${colors.text}`}>
                        {skill.name}
                      </span>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        {skill.years}
                      </span>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600">
                      {skill.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Technology Stack Overview */}
      <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Technology Stack Overview</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="font-bold text-lg mb-2" style={{ color: 'var(--secondary)' }}>Primary Languages</div>
            <div className="text-gray-400 text-sm">SQL (9+ years), Python (6+ years), R (4+ years)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg mb-2" style={{ color: 'var(--primary)' }}>Cloud Platforms</div>
            <div className="text-gray-400 text-sm">Microsoft Azure, Google Cloud, AWS (Databricks)</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg mb-2" style={{ color: 'var(--primary)' }}>Visualization Tools</div>
            <div className="text-gray-400 text-sm">Tableau (Expert), D3.js, Power BI, Custom Dashboards</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-600">
          <div className="text-center">
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold" style={{ color: 'var(--secondary)' }}>Expert:</span> 5+ years daily use | 
              <span className="font-semibold" style={{ color: 'var(--primary)' }}> Advanced:</span> 2-4 years regular use | 
              <span className="font-semibold" style={{ color: 'var(--primary)' }}> Proficient:</span> 1-2 years project experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}