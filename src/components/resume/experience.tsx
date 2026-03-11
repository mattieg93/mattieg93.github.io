const experiences = [
  {
    title: "Senior Data Analyst",
    company: "CBRE · Client: Meta",
    location: "Seattle, Washington, United States",
    period: "Sep 2022 - Dec 2025",
    achievements: [
      "Owned the experimentation framework for service tooling changes with imperfect randomization and delayed outcomes, delivering a 37% improvement in SLAs while monitoring UX and backlog guardrails.",
      "Built geospatial and time-series forecasting models that automated ~160 analyst hours per month and guided $1.7B/year in portfolio decisions.",
      "Architected a Hive data warehouse + self-serve analytics layer integrating 12+ production models from disparate systems, serving 50+ stakeholders and ~400 monthly active users; consistently ranked as a top-10 internal data product.",
      "Implemented automated alerting for model health and account-level metrics, reducing user-reported issues by 95% and improving platform reliability for high-volume analytics workloads.",
      "Authored ML/statistics best-practice documentation and mentored 15+ teammates on experimentation, causal inference, metric hygiene, and SQL, raising the organization's baseline for statistical rigor."
    ]
  },
  {
    title: "Senior Business Analyst",
    company: "CBRE · Client: Microsoft",
    location: "Redmond, Washington, United States",
    period: "Dec 2020 - Sep 2022",
    achievements: [
      "Built end-to-end analytics solutions for Diverse Supplier and human-behavior data, improving reporting quality by 75% and enabling trustworthy decision-making across $7B+ programs.",
      "Designed governed Azure SQL warehouses unifying data from 5+ sources (PR, PO, invoicing, payments, accruals, forecasting), supporting executive dashboards and recurring analyses.",
      "Defined measurement frameworks, success metrics, and guardrails in Azure DevOps, standardizing health dashboards and enabling cross-functional teams to reason about performance consistently.",
      "Led technical mentorship for junior analysts on SQL optimization, statistical methodology, and dashboard design for production usage."
    ]
  },
  {
    title: "Program Manager - Global Digital Transformation",
    company: "CBRE · Client: Microsoft",
    location: "Redmond, Washington, United States", 
    period: "Apr 2020 - Dec 2020",
    achievements: [
      "Led analytics-driven transformation initiatives that generated $15M in new business.",
      "Reduced costs by $500K annually by insourcing cloud consulting resources.",
      "Standardized global data collection and reporting processes, increasing project velocity by 150% and improving cross-team communication.",
      "Developed and documented deep technologies and project governance processes, aligning international stakeholders and streamlining operations."
    ]
  },
  {
    title: "Business Systems Analyst - Campus Modernization",
    company: "CBRE · Client: Microsoft",
    location: "Redmond, Washington, United States",
    period: "Mar 2019 - Apr 2020",
    achievements: [
      "Designed Azure SQL warehouses supporting 500+ users and $5B in annual budgets, reducing user-reported issues by 95% and quadrupling analyst productivity through observability and documentation.",
      "Led the design and development of front-to-back-end web applications, streamlining business processes and improving user satisfaction."
    ]
  },
  {
    title: "Associate Project Manager - Campus Modernization",
    company: "CBRE · Client: Microsoft",
    location: "Redmond, WA, United States",
    period: "May 2018 - Mar 2019",
    achievements: [
      "Led the design and architecture of an easy-to-use training hub on SharePoint using modern web technologies.",
      "Led the design and maintenance of a weekly publication delivered to 100+ stakeholders."
    ]
  },
  {
    title: "Studio Coordinator",
    company: "SkB Architects",
    location: "Greater Seattle Area, United States",
    period: "Aug 2016 - May 2018",
    achievements: [
      "Project Management, Business Operations, Data Cleaning"
    ]
  },
  {
    title: "Project Assistant",
    company: "LMN Architects", 
    location: "Seattle, Washington, United States",
    period: "Oct 2015 - Aug 2016",
    achievements: [
      "Project Management, Business Operations, Data Cleaning, Microsoft Excel"
    ]
  },
  {
    title: "General Manager",
    company: "Chipotle Mexican Grill",
    location: "Harrisonburg, Virginia, United States",
    period: "Sep 2012 - Jul 2015",
    achievements: [
      "Project Management, Operations Leadership, Team Development"
    ]
  }
];

export function Experience() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">Experience</h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-purple-400 font-semibold">{exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.location}</p>
              </div>
              <div 
                className="font-medium text-sm px-3 py-1 rounded-full border"
                style={{
                  color: 'var(--secondary)',
                  backgroundColor: 'color-mix(in srgb, var(--secondary) 10%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--secondary) 30%, transparent)'
                }}
              >
                {exp.period}
              </div>
            </div>
            
            <ul className="space-y-3">
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="text-gray-300 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}></div>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}