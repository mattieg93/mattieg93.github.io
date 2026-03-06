interface Certification {
  name: string;
  issuer: string;
  date: string;
  color: string;
  featured?: boolean;
  expired?: string;
  credentialId?: string;
  skills?: string[];
}

const certifications: Certification[] = [
  // IBM AI Engineer Track (in progress - Feb 2026)
  {
    name: "Deep Learning with PyTorch",
    issuer: "IBM",
    date: "February 2026",
    color: "purple",
    featured: true,
    credentialId: "UAKZ08KW61E4",
    skills: ["Deep Learning", "Machine Learning", "PyTorch"]
  },
  {
    name: "Deep Learning with Keras and TensorFlow",
    issuer: "IBM",
    date: "February 2026",
    color: "blue",
    featured: true,
    credentialId: "HW3X0X0WES3A",
    skills: ["Keras", "TensorFlow", "Deep Learning"]
  },
  {
    name: "Machine Learning with Python",
    issuer: "IBM",
    date: "February 2026",
    color: "emerald",
    featured: true,
    credentialId: "1ERRLPE97SCZ",
    skills: ["Machine Learning", "Python", "RAG", "LangChain", "Predictive Analytics"]
  },
  {
    name: "Google Data Analytics Certificate",
    issuer: "Coursera",
    date: "August 2022",
    color: "emerald",
    featured: true,
    skills: ["Statistics", "R Programming", "Data Cleaning", "Statistical Data Analysis", "Business Analytics", "Tableau", "Data Architecture", "Data-driven Decision Making"]
  },
  {
    name: "Tableau Essential Training",
    issuer: "LinkedIn Learning",
    date: "November 2022",
    color: "purple",
    featured: true,
    skills: ["Data Architecture"]
  },
  {
    name: "Advanced SQL for Data Scientists",
    issuer: "LinkedIn Learning", 
    date: "August 2022",
    color: "blue",
    featured: true,
    skills: ["Transact-SQL (T-SQL)", "PostgreSQL", "Data Architecture"]
  },
  {
    name: "Google Analytics Certification",
    issuer: "Google",
    date: "November 2022",
    expired: "November 2023",
    color: "indigo",
    skills: ["Data Architecture"]
  },
  {
    name: "Google Ads - Measurement Certification",
    issuer: "Google",
    date: "October 2022",
    expired: "October 2023",
    credentialId: "130435327",
    color: "emerald",
    skills: ["Data Architecture"]
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

export function Certifications() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-white">Certifications</h2>
        <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--primary)' }}></div>
      </div>

      {/* IBM AI Engineer Track */}
      <div className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-white">IBM AI Engineer Track</h3>
          <span 
            className="text-xs px-2 py-1 rounded-full border font-medium"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--secondary) 20%, transparent)',
              color: 'color-mix(in srgb, var(--secondary) 80%, white)',
              borderColor: 'color-mix(in srgb, var(--secondary) 40%, transparent)'
            }}
          >
            In Progress
          </span>
        </div>
        <p className="text-center text-gray-400 text-sm mb-6">Working toward the IBM AI Engineering Professional Certificate</p>
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.filter(cert => cert.issuer === "IBM").map((cert, index) => {
            const colors = getColorClasses(cert.color);
            return (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/50 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="inline-block px-3 py-1 text-xs font-medium rounded-full border bg-gray-700/50 text-gray-300 border-gray-600">
                    {cert.date}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--secondary)' }}>IBM</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">{cert.name}</h3>
                {cert.credentialId && (
                  <p className="text-xs text-gray-500 mb-3">ID: {cert.credentialId}</p>
                )}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Certifications */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6 text-center">Core Certifications</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.filter(cert => cert.featured && cert.issuer !== "IBM").map((cert, index) => {
            const colors = getColorClasses(cert.color);
            return (
              <div 
                key={index} 
                className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/50 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="inline-block px-3 py-1 text-xs font-medium rounded-full border mb-4 bg-gray-700/50 text-gray-300 border-gray-600">
                  {cert.date}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  {cert.name}
                </h3>
                <p className={`font-semibold mb-3 ${colors.text}`}>
                  {cert.issuer}
                </p>
                {cert.skills && (
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="text-xs text-gray-500">+{cert.skills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Certifications */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6 text-center">Additional Certifications</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.filter(cert => !cert.featured && cert.issuer !== "IBM").map((cert, index) => {
            const colors = getColorClasses(cert.color);
            const isExpired = cert.expired;
            return (
              <div 
                key={index} 
                className={`bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 ${isExpired ? 'opacity-75' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="inline-block px-2 py-1 text-xs font-medium rounded-full border bg-gray-700/50 text-gray-300 border-gray-600">
                    {cert.date}
                  </div>
                  {isExpired && (
                    <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/30">
                      Expired {cert.expired}
                    </div>
                  )}
                </div>
                <h4 className="text-md font-semibold text-white mb-1 leading-tight">
                  {cert.name}
                </h4>
                <p className={`text-sm mb-2 ${colors.text}`}>
                  {cert.issuer}
                </p>
                {cert.credentialId && (
                  <p className="text-xs text-gray-400">
                    ID: {cert.credentialId}
                  </p>
                )}
                {cert.skills && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certification Summary */}
      <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Professional Development</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--secondary)' }}>Core Competencies</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                <span className="text-gray-300 text-sm">Google Data Analytics (Comprehensive)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                <span className="text-gray-300 text-sm">Tableau Data Visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--secondary)' }}></div>
                <span className="text-gray-300 text-sm">Advanced SQL & Database Architecture</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--secondary)' }}>Current Focus</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Actively pursuing the IBM AI Engineering Professional Certificate - covering deep learning, PyTorch,
              Keras, TensorFlow, RAG, and LangChain. Strong existing foundation in Google data analytics methodology,
              advanced SQL, and data visualization. Each certification maps directly to production work already shipped.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}